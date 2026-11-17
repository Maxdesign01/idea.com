export interface IdeaItem {
  id: string;
  slug: string;
  title: string;
  oneLineHook: string;
  category: "BUSINESS_BLUEPRINT" | "ENTERTAINMENT_SHOW" | "TECH_INNOVATION" | "WORLD_IMPACT";
  saleModel: "NON_EXCLUSIVE" | "EXCLUSIVE";
  priceCents: number;
  creator: {
    name: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  };
  teaser: {
    problemStatement: string;
    targetMarket: string;
    whyNow: string;
    estimatedLaunchCost: string;
    tractionSignals: string;
    tam: string;
  };
  payloadPreview: {
    blueprintItemsCount: number;
    hasSupplierList: boolean;
    hasFinancialModel: boolean;
    hasMediaScript: boolean;
    fileAttachmentTypes: string[];
  };
  stats: {
    buyersCount: number;
    viewsCount: number;
    rating: number;
    reviewCount: number;
  };
  createdAt: string;
}

export interface BountyItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  prizeCents: number;
  category: "BUSINESS_BLUEPRINT" | "ENTERTAINMENT_SHOW" | "TECH_INNOVATION" | "WORLD_IMPACT";
  poster: {
    name: string;
    organization: string;
    verifiedBuyer: boolean;
  };
  deadline: string;
  submissionsCount: number;
  status: "ACTIVE" | "REVIEWING" | "AWARDED";
}

export const MOCK_IDEAS: IdeaItem[] = [
  {
    id: "idea-1",
    slug: "ai-property-tax-appeals-engine",
    title: "Autonomous Municipal Property Tax Appeal Bot",
    oneLineHook: "A zero-touch contingency SaaS that scrapes county appraisal records, files automated property tax appeals, and pockets 35% of homeowner savings.",
    category: "BUSINESS_BLUEPRINT",
    saleModel: "NON_EXCLUSIVE",
    priceCents: 9900, // $99.00
    creator: {
      name: "Marcus Sterling",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      reputation: 98,
      verified: true,
    },
    teaser: {
      problemStatement: "82% of US suburban single-family homes are systematically over-assessed by municipal algorithms, but standard homeowners don't contest it because hiring a tax attorney costs $1,500+ upfront.",
      targetMarket: "78 Million US Single-Family Homeowners in states with mandatory annual re-assessments (TX, CA, FL, GA, IL).",
      whyNow: "County tax assessor databases in 42 states have now opened public GIS REST APIs; LLM vision models can parse complex property deeds in sub-seconds.",
      estimatedLaunchCost: "$3,500 - $7,000 (API costs + entity formation)",
      tractionSignals: "Tested prototype in Harris County, TX: 412 filings completed, $341,000 in aggregate tax roll cuts achieved.",
      tam: "$4.2 Billion annual contestable homeowner savings",
    },
    payloadPreview: {
      blueprintItemsCount: 14,
      hasSupplierList: true,
      hasFinancialModel: true,
      hasMediaScript: false,
      fileAttachmentTypes: ["PDF (34-page Bible)", "XLSX (Unit Economics & Projections)", "Python (County Scraper Skeleton)"],
    },
    stats: {
      buyersCount: 67,
      viewsCount: 3410,
      rating: 4.9,
      reviewCount: 38,
    },
    createdAt: "2 days ago",
  },
  {
    id: "idea-2",
    slug: "the-creator-gauntlet-show",
    title: "The Creator Gauntlet: 72 Hours to Go Viral or Go Dark",
    oneLineHook: "A high-stakes unscripted entertainment format where 6 top YouTubers are locked in an empty studio with $0 and 72 hours to build a trending project.",
    category: "ENTERTAINMENT_SHOW",
    saleModel: "EXCLUSIVE",
    priceCents: 450000, // $4,500.00
    creator: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      reputation: 99,
      verified: true,
    },
    teaser: {
      problemStatement: "Reality TV viewing has plummeted among 18-34s because traditional formats feel staged; creator economy audiences want real, unpolished engineering challenges with genuine stakes.",
      targetMarket: "Streaming platforms (Netflix, YouTube Originals, Prime Video) and Tier-1 digital media networks seeking Gen-Z retention.",
      whyNow: "Production costs for traditional reality sets cost $1.2M/ep. This format leverages high-tension livestream cams and creator IP for 1/10th the budget with built-in millions of fans.",
      estimatedLaunchCost: "$150,000 for Season 1 (8 episodes)",
      tractionSignals: "Format tested with 3 indie streamers on Twitch: reached #1 trending category and 2.8M peak concurrent impressions.",
      tam: "$850 Million digital reality streaming market",
    },
    payloadPreview: {
      blueprintItemsCount: 22,
      hasSupplierList: true,
      hasFinancialModel: true,
      hasMediaScript: true,
      fileAttachmentTypes: ["PDF (Complete Series Bible)", "Pitch Deck Keynote", "Talent Contract Rider Templates", "Legal Release Pack"],
    },
    stats: {
      buyersCount: 0, // Exclusive: not sold yet
      viewsCount: 1820,
      rating: 5.0,
      reviewCount: 6,
    },
    createdAt: "Just now",
  },
  {
    id: "idea-3",
    slug: "decentralized-greywater-heat-recycler",
    title: "Passive Shower Greywater Thermal Exchanger",
    oneLineHook: "A modular, plumber-free copper coil exchanger that recycles 65% of wasted residential water heater thermal energy into incoming mains.",
    category: "WORLD_IMPACT",
    saleModel: "NON_EXCLUSIVE",
    priceCents: 14900, // $149.00
    creator: {
      name: "Dr. Aris Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      reputation: 96,
      verified: true,
    },
    teaser: {
      problemStatement: "Domestic water heating accounts for 18% of global household carbon emissions and energy bills; 85% of that hot water runs directly down the drain after 4 seconds of body contact.",
      targetMarket: "140M European and North American households facing escalating winter gas/electric utility rates.",
      whyNow: "New EU eco-design directives offer direct subventions for retrofit energy-efficiency equipment under $500.",
      estimatedLaunchCost: "$12,000 (Initial injection tooling and copper tube fabrication run)",
      tractionSignals: "Physical prototype tested in 12 dormitories: slashed domestic water heating power usage by 58.4% consistently.",
      tam: "$14.7 Billion residential retrofitting market",
    },
    payloadPreview: {
      blueprintItemsCount: 18,
      hasSupplierList: true,
      hasFinancialModel: true,
      hasMediaScript: false,
      fileAttachmentTypes: ["CAD SolidWorks Step Files", "BOM & Chinese Supplier Quotations", "UL/CE Certification Guide"],
    },
    stats: {
      buyersCount: 42,
      viewsCount: 2190,
      rating: 4.8,
      reviewCount: 19,
    },
    createdAt: "3 days ago",
  },
  {
    id: "idea-4",
    slug: "b2b-unclaimed-property-recovery",
    title: "B2B Unclaimed Corporate Treasury Recovery Agency",
    oneLineHook: "A turn-key corporate service agency that audits state comptroller unclaimed property vaults for Fortune 5000 vendor checks and takes a 20% recovery finder's fee.",
    category: "BUSINESS_BLUEPRINT",
    saleModel: "NON_EXCLUSIVE",
    priceCents: 19900, // $199.00
    creator: {
      name: "Sarah Lin, CPA",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      reputation: 100,
      verified: true,
    },
    teaser: {
      problemStatement: "Over $58 Billion sits in state unclaimed property divisions across the United States. Mid-market companies ($10M-$100M revenue) lose millions in misaddressed vendor rebate checks and never claim them.",
      targetMarket: "CFOs, Controllers, and Treasurers at US mid-market enterprises.",
      whyNow: "Corporate treasury turnover post-pandemic has left orphaned vendor escrow balances at all-time highs; states now publish machine-readable monthly claims ledgers.",
      estimatedLaunchCost: "$1,200 (Outreach CRM + LinkedIn Sales Navigator + Legal engagement templates)",
      tractionSignals: "First quarter operator results: $210,000 recovered across 7 clients, yielding $42,000 net finder fees.",
      tam: "$5.8 Billion addressable corporate finder fee commissions",
    },
    payloadPreview: {
      blueprintItemsCount: 26,
      hasSupplierList: true,
      hasFinancialModel: true,
      hasMediaScript: false,
      fileAttachmentTypes: ["PDF Legal Agreement Pack", "Cold Email Sequences with 42% Reply Rate", "50-State Claim Filing SOP"],
    },
    stats: {
      buyersCount: 114,
      viewsCount: 5800,
      rating: 4.9,
      reviewCount: 72,
    },
    createdAt: "1 week ago",
  },
  {
    id: "idea-5",
    slug: "hyper-local-dark-kitchen-brand-franchise",
    title: "Virtual Smash-Burger Micro-Franchise for Idle Diners",
    oneLineHook: "License a viral smash-burger menu, branding, and DoorDash algorithm playbook to existing local diners during their dead hours (2 PM - 5 PM).",
    category: "BUSINESS_BLUEPRINT",
    saleModel: "EXCLUSIVE",
    priceCents: 280000, // $2,800.00
    creator: {
      name: "Dante Morales",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      reputation: 95,
      verified: true,
    },
    teaser: {
      problemStatement: "Traditional restaurants operate with razor-thin 5% margins and bleed overhead during slow afternoon hours when fryers and kitchen staff sit idle.",
      targetMarket: "Independent diners, pubs, and cafes in dense university towns and urban centers.",
      whyNow: "Third-party delivery apps favor tight, single-item menu brands with sub-12 minute ticket times over broad 50-item menus.",
      estimatedLaunchCost: "$4,000 (Packaging inventory, digital brand assets, local influencer seeding)",
      tractionSignals: "Piloted in 3 partner kitchens in Austin, TX: $18,400 monthly profit split per kitchen.",
      tam: "$28 Billion ghost kitchen delivery sector",
    },
    payloadPreview: {
      blueprintItemsCount: 19,
      hasSupplierList: true,
      hasFinancialModel: true,
      hasMediaScript: false,
      fileAttachmentTypes: ["Full Brand Book & Vector Logos", "Recipe Costing Sheets", "Commercial Kitchen Partner Agreement"],
    },
    stats: {
      buyersCount: 0,
      viewsCount: 1450,
      rating: 4.8,
      reviewCount: 4,
    },
    createdAt: "5 days ago",
  },
];

export const MOCK_BOUNTIES: BountyItem[] = [
  {
    id: "bounty-1",
    slug: "gamified-carbon-offset-fintech",
    title: "Micro-Investing App Hooked to Plastic-Free Daily Decisions",
    description: "We are an early-stage venture studio seeking an execution blueprint for an iOS/Android app that rounds up debit card purchases into regenerative agriculture micro-investments while rewarding users with brand discounts.",
    prizeCents: 500000, // $5,000.00
    category: "TECH_INNOVATION",
    poster: {
      name: "Horizon Venture Studio",
      organization: "Horizon Labs Capital",
      verifiedBuyer: true,
    },
    deadline: "Dec 15, 2026",
    submissionsCount: 18,
    status: "ACTIVE",
  },
  {
    id: "bounty-2",
    slug: "next-gen-interactive-courtroom-show",
    title: "Format Bible: Unscripted Digital Courtroom for Internet Drama",
    description: "Top YouTube network (12M+ subscribers) wants a complete 8-episode pilot format and script treatment for a live, audience-polled courtroom show adjudicating online drama, creator contract disputes, and internet beefs.",
    prizeCents: 350000, // $3,500.00
    category: "ENTERTAINMENT_SHOW",
    poster: {
      name: "Apex Media Collective",
      organization: "Apex Studios",
      verifiedBuyer: true,
    },
    deadline: "Nov 30, 2026",
    submissionsCount: 24,
    status: "ACTIVE",
  },
  {
    id: "bounty-3",
    slug: "modular-dry-ice-vaccine-cooler",
    title: "Low-Cost Off-Grid Cold Chain Storage Unit for Rural Clinics",
    description: "Seeking engineering design blueprint and bill of materials (BOM) under $80 per unit that maintains 2°C - 8°C vaccine stability for 120 hours without grid electricity.",
    prizeCents: 1000000, // $10,000.00
    category: "WORLD_IMPACT",
    poster: {
      name: "Global Health Innovation Fund",
      organization: "GHIF Initiative",
      verifiedBuyer: true,
    },
    deadline: "Jan 10, 2027",
    submissionsCount: 11,
    status: "ACTIVE",
  },
];
