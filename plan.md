# Technical Implementation Plan: IdeaSprint Platform

## 1. System Architecture Overview

```
                                      +-------------------------------+
                                      |   Next.js 15 App Router       |
                                      |   (React 19 + Tailwind CSS)   |
                                      +---------------+---------------+
                                                      |
                  +-----------------------------------+-----------------------------------+
                  |                                   |                                   |
                  v                                   v                                   v
+-------------------------------+   +-------------------------------+   +-------------------------------+
|     Authentication Layer      |   |       Core API & Actions      |   |      Stripe Connect API       |
|    NextAuth v5 (Auth.js)      |   |   (Server Actions / Routes)   |   |   (Checkout, Connect, Webhooks|
|     with Prisma Adapter       |   +---------------+---------------+   |    15% / 10% Tiered Fees)     |
+-------------------------------+                   |                   +---------------+---------------+
                                  +-----------------+-----------------+                 |
                                  |                                   |                 v
                                  v                                   v       Stripe Escrow & Payout
+-------------------------------+   +-------------------------------+ (72h Hold & 48h Dispute SLA)
|      PostgreSQL Database      |   |       Cloudflare R2 Vault     |
|   (Neon Serverless + Prisma)  |   | (Zero-Egress Asset Storage)   |
|   - Concurrency Checkout Locks|   | - Streaming pdf-lib (<=25MB)  |
|   - Unified User & IP Models  |   | - Signed URLs + SHA-256 Cert  |
+-------------------------------+   +-------------------------------+
                  |
                  v
+-------------------------------+   +-------------------------------+
|    Upstash QStash Engine      |   |   AI Quality & Screening Gate |
| - 72h Escrow Release Webhooks |   |      (Gemini 1.5 Flash API)   |
| - 48h Dispute SLA Timers      |   | - 3-Tier Gate (80/50/Draft)   |
| - Hourly Backup Reconciliation|   | - Graceful Outage Degradation |
+-------------------------------+   +-------------------------------+
```

---

## 2. Technology Stack Selection

* **Frontend Framework:** Next.js 15 (React 19, App Router, Server Components & Server Actions)
* **Styling & UI Components:** Tailwind CSS + Radix UI / `shadcn/ui` + Lucide Icons
* **Database & ORM:** PostgreSQL (Neon Serverless) with Prisma ORM
* **Authentication:** NextAuth v5 (Auth.js) with official Prisma Adapter (unified user schema, supporting Google, GitHub, and Magic Link Email)
* **Payment & Escrow Infrastructure:**
  * **Stripe Checkout** for customer payments with 15-minute transactional inventory reservation locks.
  * **Stripe Connect Express** for creator onboarding, international bank payouts, and 100% delegated KYC verification & 1099/W-8BEN tax reporting.
  * **Tiered Platform Take Rate:** 15% on non-exclusive blueprint sales ($29–$299); 10% on exclusive sales ($1,000+).
  * **Custom 72-Hour Platform Escrow:** Payouts held in platform account. All sales final upon delivery; hold is reserved strictly for formal material misrepresentation dispute arbitration.
* **Encrypted File Storage & Dynamic Watermarking:**
  * **Cloudflare R2** for zero-egress asset storage.
  * **Two-Tier Watermark Pipeline:** Dynamic streaming watermark injection via `pdf-lib` for documents $\le 25\text{ MB}$ (stamping Buyer Verified Email, Stripe Transaction ID, and SHA-256 hash slice); short-lived signed URLs with cryptographic proof-of-purchase authenticity certificates for larger archives.
* **AI Quality & Screening Engine:**
  * **Gemini 1.5 Flash API** for automated submission scoring (0–100), structure completeness checks, and spam filtering.
  * **Three-Tier Gate:** $\ge 80 \rightarrow$ auto-publish to `ACTIVE`; $50–79 \rightarrow$ queued to `UNDER_REVIEW` admin moderation; $< 50 \rightarrow$ auto-rejected to `DRAFT` with structured feedback.
  * **Graceful Degradation:** Automatic fallback to `UNDER_REVIEW` if AI API encounters outages or rate limits.
* **Background Jobs & Event Scheduling:**
  * **Upstash QStash** for precise, event-driven delayed webhook callbacks (`now + 72h` escrow release, `now + 48h` dispute rebuttal deadline), supplemented by an hourly idempotent reconciliation cron.
* **Email & Notifications:** Resend + React Email for transactional purchase receipts, escrow lifecycle notices, and bounty announcements.

---

## 3. Database Schema Design (Prisma Data Model)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  CREATOR
  BUYER
  ADMIN
}

enum IdeaType {
  BUSINESS_BLUEPRINT
  ENTERTAINMENT_SHOW
  TECH_INNOVATION
  WORLD_IMPACT
  CREATIVE_CAMPAIGN
}

enum SaleModel {
  NON_EXCLUSIVE // Multiple buyers unlock at set price ($29-$299)
  EXCLUSIVE     // Single buyer acquires 100% rights ($1,000+)
}

enum IdeaStatus {
  DRAFT
  UNDER_REVIEW
  ACTIVE
  PENDING_CHECKOUT // 15-minute reservation lock during active checkout
  SOLD_OUT
  REJECTED
}

enum EscrowStatus {
  HELD
  IN_DISPUTE
  RELEASED_TO_SELLER
  REFUNDED_TO_BUYER
}

enum DeedStatus {
  CONTINGENT_ESCROW_HOLD
  FULLY_EXECUTED_AND_ASSIGNED
  NULLIFIED_BREACH_OF_TERMS
}

enum BountyStatus {
  ACTIVE
  IN_REVIEW
  AWARDED
  REFUNDED_PARTIAL // 80% refunded to seeker, 20% retained platform fee
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id                String       @id @default(cuid())
  email             String       @unique
  emailVerified     DateTime?
  name              String?
  avatarUrl         String?
  role              Role         @default(USER)
  stripeCustomerId  String?      @unique
  stripeConnectId   String?      @unique // Stripe Connect Express ID
  stripePayoutsOn   Boolean      @default(false) // Hard gate for ACTIVE listings
  isProSubscriber   Boolean      @default(false)
  proSubscriptionId String?
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  accounts          Account[]
  sessions          Session[]
  ideas             Idea[]       @relation("CreatorIdeas")
  purchases         Purchase[]   @relation("BuyerPurchases")
  bountiesPosted    Bounty[]     @relation("BountyPoster")
  bountySubmissions BountySubmission[]
  reviewsWritten    Review[]
  disputesFiled     Dispute[]    @relation("BuyerDisputes")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Idea {
  id                  String       @id @default(cuid())
  creatorId           String
  creator             User         @relation("CreatorIdeas", fields: [creatorId], references: [id], onDelete: Cascade)
  
  title               String
  slug                String       @unique
  oneLineHook         String
  category            IdeaType
  saleModel           SaleModel    @default(NON_EXCLUSIVE)
  
  // Public Teaser (Visible to all)
  problemStatement    String       @db.Text
  targetMarket        String       @db.Text
  whyNow              String       @db.Text
  estimatedLaunchCost String?
  tractionSignals     String?
  
  // Protected Payload (Gated behind verified purchase)
  executionPlan       String       @db.Text
  supplierVendorList  String?      @db.Text
  financialModel      String?      @db.Text
  mediaScript         String?      @db.Text
  assetFileUrls       String[]     // Stored in Cloudflare R2
  
  priceCents          Int          // In USD Cents
  status              IdeaStatus   @default(DRAFT)
  aiCompletenessScore Int?         // 0-100 scale evaluated by Gemini
  aiFeedbackSummary   String?      @db.Text
  
  // Concurrency Reservation Lock (Exclusive Listings)
  checkoutLockExpiresAt DateTime?
  lockedBySessionId     String?

  purchases           Purchase[]
  reviews             Review[]
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt
}

model Purchase {
  id                String       @id @default(cuid())
  ideaId            String
  idea              Idea         @relation(fields: [ideaId], references: [id])
  buyerId           String
  buyer             User         @relation("BuyerPurchases", fields: [buyerId], references: [id])
  
  amountCents       Int
  platformFeeCents  Int          // 15% non-exclusive / 10% exclusive
  sellerAmountCents Int
  stripePaymentId   String       @unique
  
  escrowStatus      EscrowStatus @default(HELD)
  escrowReleaseAt   DateTime     // now + 72 hours
  qstashMessageId   String?      // Scheduled release job ID
  
  // Legal Contract & IP Deed Lifecycle
  deedStatus        DeedStatus   @default(CONTINGENT_ESCROW_HOLD)
  deedPdfUrl        String?      // R2 link to executed deed
  clickwrapAgreedAt DateTime     @default(now())
  ipAssignmentHash  String?      // SHA-256 verification hash
  
  dispute           Dispute?
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

model Dispute {
  id                String       @id @default(cuid())
  purchaseId        String       @unique
  purchase          Purchase     @relation(fields: [purchaseId], references: [id], onDelete: Cascade)
  buyerId           String
  buyer             User         @relation("BuyerDisputes", fields: [buyerId], references: [id])
  
  reason            String       @db.Text
  evidenceUrls      String[]
  creatorRebuttal   String?      @db.Text
  rebuttalDeadline  DateTime     // dispute filing + 48 hours
  
  adminVerdict      String?      // REFUND_BUYER or DISMISS_DISPUTE
  adminNotes        String?      @db.Text
  resolvedAt        DateTime?
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

model Bounty {
  id                 String       @id @default(cuid())
  posterId           String
  poster             User         @relation("BountyPoster", fields: [posterId], references: [id])
  
  title              String
  description        String       @db.Text
  prizeCents         Int          // 100% pre-funded into escrow
  stripePaymentId    String       @unique // Proof of upfront escrow payment
  deadline           DateTime
  status             BountyStatus @default(ACTIVE)
  winnerSubmissionId String?      @unique

  submissions        BountySubmission[]
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt
}

model BountySubmission {
  id             String       @id @default(cuid())
  bountyId       String
  bounty         Bounty       @relation(fields: [bountyId], references: [id], onDelete: Cascade)
  solverId       String
  solver         User         @relation(fields: [solverId], references: [id])
  
  proposalText   String       @db.Text
  attachmentUrls String[]
  isWinner       Boolean      @default(false)
  createdAt      DateTime     @default(now())
}

model Review {
  id        String   @id @default(cuid())
  ideaId    String
  idea      Idea     @relation(fields: [ideaId], references: [id], onDelete: Cascade)
  buyerId   String
  buyer     User     @relation(fields: [buyerId], references: [id])
  
  rating    Int      // 1 to 5
  feedback  String?  @db.Text
  createdAt DateTime @default(now())

  @@unique([ideaId, buyerId]) // One review per verified purchase
}
```

---

## 4. Phase-by-Phase Implementation Roadmap

### Phase 1: Foundation, Unified Auth & Data Models
* Setup Next.js 15 App Router with TypeScript, Tailwind CSS, Lucide Icons, and Prisma.
* Provision and connect Neon Serverless PostgreSQL database.
* Configure **NextAuth v5 (Auth.js) with Prisma Adapter** (Google OAuth + Email Magic Link).
* Design foundational UI layout: responsive Navbar, Hero, dynamic Category Pills, Footer, and Authenticated Dashboard Shell.

### Phase 2: Idea Submission Engine & Tiered AI Quality Gate
* Multi-step submission form:
  * Step 1: Hook, Category, Target Market, Sale Model (Exclusive vs Non-Exclusive).
  * Step 2: Public Teaser (Problem, Target Audience, Why Now, Feasibility).
  * Step 3: Gated Execution Payload (Detailed Step-by-Step Strategy, Supplier/Vendor lists, Media Scripts, R2 Asset Uploads).
  * Step 4: Pricing & Stripe Connect Onboarding verification.
* **Gemini 1.5 Flash Screening Integration:**
  * Evaluate submission depth, score completeness (0–100), and check for spam/generic text.
  * Implement the 3-Tier gate ($\ge 80 \rightarrow$ `ACTIVE`, $50–79 \rightarrow$ `UNDER_REVIEW`, $< 50 \rightarrow$ `DRAFT` with feedback).
  * Outage fallback: Gracefully route to `UNDER_REVIEW` if Gemini API fails or times out.
* **Seller Payout Gating:**
  * Require `stripePayoutsOn === true` before any submission can transition from `UNDER_REVIEW` to `ACTIVE`.

### Phase 3: Stripe Connect, Tiered Take Rates & Escrow Automation
* **Stripe Connect Express Integration:**
  * Host creator onboarding flows for bank payouts, delegating 100% of identity verification (KYC) and 1099/W-8BEN tax reporting to Stripe.
  * Webhook listener synchronizes `stripePayoutsOn` and account capabilities.
* **Checkout Flow & Inventory Locks:**
  * Implement 15-minute `PENDING_CHECKOUT` reservation lock on Exclusive listings to prevent double-checkout race conditions.
  * Tiered Take Rate calculation: 15% platform fee for non-exclusive ($29–$299); 10% for exclusive acquisitions ($1,000+).
  * Create Stripe Checkout session with Transfer Data / application fee.
* **Escrow Engine & Upstash QStash:**
  * Payouts held in platform account for 72 hours.
  * Schedule delayed webhook release call via Upstash QStash at `now + 72h`.
  * Fallback hourly idempotent reconciliation cron to catch any network dropouts.
* **Dispute Protocol & Legal Nullification:**
  * Disputes filed during 72-hour hold freeze payout and trigger a 48-hour creator response window.
  * Admin diff-viewer compares public teaser vs protected payload.
  * Ruling in favor of refund revokes buyer access and marks the IP Deed as `NULLIFIED_BREACH_OF_TERMS` in the audit log.

### Phase 4: Discovery, Pro Subscriptions & Anti-Circumvention Messaging
* **Marketplace Feed & Discovery:**
  * Real-time category filtering (Business Blueprints, Entertainment Shows, Tech/AI, World Impact).
  * Full-text search, verification badges, and AI Completeness score filtering.
* **Buyer Pro Membership ($49/month):**
  * Stripe Billing recurring subscription.
  * 48-hour early access window to all newly posted listings, including the right to acquire 100% exclusive ideas prior to public exposure.
  * Direct private messaging channel with verified creators.
* **Anti-Circumvention Chat Guard:**
  * Client and server-side regex filtering matching emails, phone numbers, WhatsApp/Telegram handles, and crypto wallets.
  * Blocks message dispatch with an informative modal explaining that off-platform transactions forfeit escrow and legal IP assignment indemnity.

### Phase 5: Reverse Bounty Board ("Seeker & Solver")
* **100% Upfront Escrowed Prize Pool:**
  * Enterprise seekers pay full prize amount ($1,000–$10,000) via Stripe Checkout at the time of posting.
* **Submission Portal:**
  * Creators pitch proprietary solutions directly to the seeker.
* **IP Protection Terms:**
  * Platform terms specify that seekers receive IP assignment ONLY for the selected winning submission; all non-winning proposals remain 100% proprietary to their authors.
* **Non-Selection Policy:**
  * If no winner is selected by deadline + 14-day grace period, 80% is refunded to seeker and 20% is retained as a platform listing and curation fee.

### Phase 6: Cloudflare R2 Vault, Dynamic Watermarking & Production Launch
* **Cloudflare R2 Asset Storage:**
  * Zero-egress bucket storing confidential pitch decks, spreadsheets, and vendor rosters.
* **Two-Tier Dynamic Watermarking:**
  * Files $\le 25\text{ MB}$: Streaming `pdf-lib` pipeline injecting Buyer Verified Email, Stripe Transaction ID, and a SHA-256 hash slice across each page.
  * Files $> 25\text{ MB}$ or archives (.zip/.xlsx): Short-lived pre-signed URLs accompanied by a downloadable cryptographic Certificate of Authenticity.
* **Digital Deed Generation:**
  * Two-stage lifecycle: `CONTINGENT_ESCROW_HOLD` generated upon payment $\rightarrow$ `FULLY_EXECUTED_AND_ASSIGNED` signed PDF generated once 72-hour escrow clears.
* **Review Integrity:**
  * Only verified, non-refunded purchasers can post reviews; refunded disputes automatically purge associated reviews.
* **Production Deployment:**
  * Deployed on Vercel with automated CI/CD and custom domain configuration.

---

## 5. Security & Legal Safeguards Summary
1. **Dynamic DRM & Watermarking:** Every delivered PDF dynamically stamps verified buyer email, transaction ID, and cryptographic hash to deter leaking.
2. **Two-Stage Digital IP Deed:** Exclusive acquisitions legally transition from contingent hold to full assignment upon escrow release; nullified immediately upon any refund.
3. **Strict License Boundaries:** Non-exclusive blueprints carry a perpetual commercial implementation license to execute the business while strictly barring resale or redistribution of the blueprint document.
4. **Proactive Anti-Circumvention:** Automated chat filters prevent off-platform contact sharing before transactions complete.
5. **Delegated Tax & KYC Compliance:** Stripe Connect Express directly manages all global identity verification and 1099/W-8BEN reporting, insulating the platform from tax and identity storage liabilities.
