import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  Lock,
  ArrowRight,
  DollarSign,
  FileCheck2,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400">
            <Scale className="h-3.5 w-3.5" />
            Legal & Financial Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How IdeaSprint Protects Creators & Enables Fair Payouts
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Understanding why raw ideas fail, how we solved Kenneth Arrow&apos;s Information Paradox, and how payments and legal contracts function on the platform.
          </p>
        </div>

        {/* Section 1: Arrow's Paradox */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-400" />
            <span>The Paradox: Why You Can&apos;t Just &quot;Sell an Idea&quot;</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            In 1962, Nobel Prize-winning economist Kenneth Arrow identified what is now known as <strong>Arrow&apos;s Information Paradox</strong>: <em>The value of an idea is unknown to the buyer until it is revealed; but once the buyer learns what it is, they have acquired it without needing to pay for it.</em>
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Furthermore, under global intellectual property jurisprudence (US Copyright Act § 102(b), UK CDPA, and EU Directives), <strong>abstract ideas, concepts, and principles are strictly excluded from copyright protection</strong>. Only the concrete expression, detailed architectural plan, and confidential trade secrets can be protected.
          </p>
        </div>

        {/* Section 2: The IdeaSprint Solution */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>The IdeaSprint Solution: Teaser vs. Payload</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                1. The Public Teaser
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Free for anyone to read. Includes market analysis, total addressable market (TAM), user personas, problem definition, and why current solutions fail. It demonstrates credibility without revealing the operational secrets.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                2. The Gated Payload
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Encrypted until payment is authorized. Includes detailed step-by-step SOPs, vetted supplier and factory lists, financial models (.xlsx), source code, or show bibles.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Payment & Escrow */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            <span>How the Payment & Escrow Process Operates</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Stripe Connect Onboarding:</strong> Creators link their verified bank account via Stripe Connect Express. Payouts are supported across 100+ countries.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Clickwrap Legal Acceptance:</strong> Before payment is captured, the buyer executes our binding digital Clickwrap NDA, agreeing not to copy or publicly leak confidential trade secrets.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>72-Hour Inspection Escrow:</strong> For exclusive buyouts ($1,000+), funds are locked in neutral escrow. If the payload contains material misrepresentations or empty documents, the buyer can initiate mediation before funds are disbursed.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Automated Payout:</strong> Once the 72-hour window elapses without dispute, the platform deducts a 15% service fee and transfers the 85% net proceeds directly into the creator&apos;s bank account.
              </span>
            </li>
          </ul>
        </div>

        {/* Call to action */}
        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to Put Your Mind to Work?</h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
            Whether you have a six-figure business plan, a hit entertainment format, or an innovation that helps the planet, turn it into income today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/post-idea"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-xs font-bold text-white hover:bg-orange-400 transition"
            >
              <span>Submit a Blueprint</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#marketplace"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-semibold text-zinc-300 hover:text-white transition"
            >
              <span>Browse Blueprints</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
