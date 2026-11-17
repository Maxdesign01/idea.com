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
|     Authentication & Auth     |   |       Core API & Actions      |   |       Stripe Connect API      |
|   (Supabase Auth / NextAuth)  |   |   (Server Actions / Route)    |   |  (Checkout, Transfers, Webhook)
+-------------------------------+   +---------------+---------------+   +---------------+---------------+
                                                      |                                   |
                  +-----------------------------------+                                   v
                  |                                   |                          Stripe Escrow & Payout
                  v                                   v
+-------------------------------+   +-------------------------------+
|      PostgreSQL Database      |   |   Secure Cloud Storage (S3)   |
|   (Neon / Supabase + Prisma)  |   | (Encrypted Asset Blueprints)  |
+-------------------------------+   +-------------------------------+
                  |
                  v
+-------------------------------+
|     Background Jobs (QStash)  |
|  (Escrow Release, Reminders)  |
+-------------------------------+
```

---

## 2. Technology Stack Selection

* **Frontend Framework:** Next.js 15 (React 19, Server Components & Server Actions)
* **Styling & UI Components:** Tailwind CSS + Radix UI / `shadcn/ui` + Lucide Icons
* **Database & ORM:** PostgreSQL (Neon Serverless or Supabase) with Prisma ORM
* **Authentication:** Supabase Auth or Auth.js (supporting Google, GitHub, and Magic Link Email)
* **Payment & Escrow Infrastructure:**
  * **Stripe Checkout** for processing payments.
  * **Stripe Connect Express** for creator onboarding, automated KYC verification, and international bank payouts.
  * **Separate Auth & Capture / Transfer Groups** for custom 72-hour escrow hold logic.
* **Encrypted File Storage:** AWS S3 / Cloudflare R2 with time-limited Pre-Signed URLs for blueprint downloads (PDFs, pitch decks, spreadsheets).
* **AI Quality & Spam Filter:** Gemini 1.5 Flash API for automated submission scoring, structure validation, and plagiarism checks.
* **Email & Notifications:** Resend + React Email for transactional purchase receipts, escrow updates, and bounty notifications.

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
  NON_EXCLUSIVE // Multiple buyers can unlock at set price ($29-$299)
  EXCLUSIVE     // Single buyer acquires 100% rights ($1,000+)
}

enum IdeaStatus {
  DRAFT
  UNDER_REVIEW
  ACTIVE
  SOLD_OUT
  REJECTED
}

enum EscrowStatus {
  HELD
  RELEASED_TO_SELLER
  REFUNDED_TO_BUYER
  IN_DISPUTE
}

model User {
  id                String       @id @default(cuid())
  email             String       @unique
  name              String?
  avatarUrl         String?
  role              Role         @default(USER)
  stripeCustomerId  String?      @unique
  stripeConnectId   String?      @unique // For receiving creator payouts
  stripePayoutsOn   Boolean      @default(false)
  isProSubscriber   Boolean      @default(false)
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  ideas             Idea[]       @relation("CreatorIdeas")
  purchases         Purchase[]   @relation("BuyerPurchases")
  bountiesPosted    Bounty[]     @relation("BountyPoster")
  bountySubmissions BountySubmission[]
  reviewsWritten    Review[]
}

model Idea {
  id                String       @id @default(cuid())
  creatorId         String
  creator           User         @relation("CreatorIdeas", fields: [creatorId], references: [id], onDelete: Cascade)
  
  title             String
  slug              String       @unique
  oneLineHook       String
  category          IdeaType
  saleModel         SaleModel    @default(NON_EXCLUSIVE)
  
  // Public Teaser (Visible to all)
  problemStatement  String       @db.Text
  targetMarket      String       @db.Text
  whyNow            String       @db.Text
  estimatedLaunchCost String?
  tractionSignals   String?
  
  // Protected Payload (Gated behind purchase)
  executionPlan     String       @db.Text
  supplierVendorList String?     @db.Text
  financialModel    String?      @db.Text
  mediaScript       String?      @db.Text
  assetFileUrls     String[]     // Encrypted S3 asset links
  
  priceCents        Int          // In USD Cents
  status            IdeaStatus   @default(ACTIVE)
  aiCompletenessScore Int?       // 0-100 scale evaluated by LLM
  
  purchases         Purchase[]
  reviews           Review[]
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

model Purchase {
  id                String       @id @default(cuid())
  ideaId            String
  idea              Idea         @relation(fields: [ideaId], references: [id])
  buyerId           String
  buyer             User         @relation("BuyerPurchases", fields: [buyerId], references: [id])
  
  amountCents       Int
  platformFeeCents  Int
  sellerAmountCents Int
  stripePaymentId   String       @unique
  
  escrowStatus      EscrowStatus @default(HELD)
  escrowReleaseAt   DateTime
  clickwrapAgreedAt DateTime     @default(now())
  ipAssignmentHash  String?      // Digital verification hash of the transfer agreement
  
  createdAt         DateTime     @default(now())
}

model Bounty {
  id                String       @id @default(cuid())
  posterId          String
  poster            User         @relation("BountyPoster", fields: [posterId], references: [id])
  
  title             String
  description       String       @db.Text
  prizeCents        Int
  deadline          DateTime
  isActive          Boolean      @default(true)
  winnerSubmissionId String?     @unique

  submissions       BountySubmission[]
  createdAt         DateTime     @default(now())
}

model BountySubmission {
  id                String       @id @default(cuid())
  bountyId          String
  bounty            Bounty       @relation(fields: [bountyId], references: [id], onDelete: Cascade)
  solverId          String
  solver            User         @relation(fields: [solverId], references: [id])
  
  proposalText      String       @db.Text
  attachmentUrls    String[]
  isWinner          Boolean      @default(false)
  createdAt         DateTime     @default(now())
}

model Review {
  id                String       @id @default(cuid())
  ideaId            String
  idea              Idea         @relation(fields: [ideaId], references: [id], onDelete: Cascade)
  buyerId           String
  buyer             User         @relation(fields: [buyerId], references: [id])
  
  rating            Int          // 1 to 5
  feedback          String?
  createdAt         DateTime     @default(now())
}
```

---

## 4. Phase-by-Phase Implementation Roadmap

### Phase 1: Foundation, Data Models & Authentication
* Setup Next.js 15 repository with TypeScript, Tailwind CSS, Lucide Icons, and Prisma.
* Configure PostgreSQL connection on Neon / Supabase.
* Implement authentication (Sign In with Google + Email Magic Link).
* Design base UI Layout: Navbar, Hero, Category Pills, Footer, Dashboard Shell.

### Phase 2: Idea Submission Engine & "Teaser vs Payload"
* Build the multi-step Idea Submission Form:
  * Step 1: Hook, Category, Target Audience, Sale Model (Exclusive vs Non-Exclusive).
  * Step 2: Public Teaser (Problem, Market Size, Why Now, Feasibility).
  * Step 3: Gated Execution Payload (Detailed Strategy, Supplier/Vendor lists, Script/Deck uploads).
  * Step 4: Pricing & Stripe Connect Onboarding verification.
* Implement AI Screening via Gemini API:
  * Automatically evaluate submission depth, flag generic low-effort spam, and calculate a `Completeness Score (0-100)`.
* Secure Payload Architecture:
  * Ensure server components and API routes never send the payload fields (`executionPlan`, `assetFileUrls`) to unauthenticated or non-purchaser clients.

### Phase 3: Stripe Connect, Payments & Escrow Engine
* Integrate **Stripe Connect Express**:
  * Creators complete Stripe hosted onboarding to link bank accounts/debit cards.
  * Webhook listener updates `stripePayoutsOn` in the database.
* Implement Checkout Flow for Non-Exclusive and Exclusive Sales:
  * Buyer clicks "Unlock Blueprint" or "Acquire Exclusive Rights".
  * Clickwrap NDA & Terms of Purchase modal prompt: Buyer checks consent box.
  * Stripe Checkout Session created with application fee (15% platform take rate).
* Escrow Mechanics:
  * For Exclusive Sales ($1,000+), funds are captured and held in platform account.
  * An automated 72-hour countdown timer begins.
  * If no dispute is raised, funds are released via `stripe.transfers.create` to the seller's Connect account.

### Phase 4: Marketplace Discovery, Search & Pro Subscriptions
* Build the Marketplace Feed with real-time filters:
  * Categories: Six-Figure Businesses, TV/Media Shows, Tech/AI Startups, World Impact Innovations.
  * Price ranges, Verification badges, AI Completeness score.
* Full-text search and keyword indexing.
* Buyer Pro Membership ($49/month):
  * Stripe Billing integration.
  * 48-hour early access to newly posted blueprints before general public.
  * Private messaging channel with verified creators.

### Phase 5: Reverse Bounty Board ("Seeker & Solver")
* Build the Bounty Request interface for businesses/studios:
  * Client posts a problem brief (e.g., "Need an interactive reality TV concept for YouTube with $10K budget").
  * Client escrows the prize pool ($1,000 - $10,000).
* Submission portal for creators to pitch private solutions directly to the buyer.
* Winner selection UI with automated prize transfer and IP assignment generation.

### Phase 6: Security Hardening, Watermarking & Production Launch
* Encrypted file uploads using AWS S3 / Cloudflare R2 with signed URLs (valid for 15 minutes).
* PDF Watermarking: Dynamically stamp buyer's email and transaction ID onto downloaded blueprint assets to deter leaking.
* Comprehensive testing of Stripe Webhook edge cases (refunds, chargebacks, failed payouts).
* Deployment on Vercel with automated CI/CD and custom domain configuration.

---

## 5. Security & Legal Safeguards
1. **DRM & Leak Deterrence:** Every purchased payload and PDF export contains a cryptographic watermark with the Buyer's Legal Name, Email, and Purchase Timestamp.
2. **Digital IP Assignment Deed:** Exclusive transactions automatically generate an executed digital PDF contract certifying transfer of rights under the platform's terms of service.
3. **Anti-Circumvention Policy:** In-app messaging prevents sharing of direct phone numbers, personal emails, or external wire details before a transaction is completed.
