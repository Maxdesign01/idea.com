import { ShieldCheck, FileKey, RefreshCw, Scale, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Thinker Publishes a Structured Blueprint",
      description: "Creators don't just write a 2-sentence note. They submit a structured package: a public teaser (problem, market size, TAM) and a locked payload (SOPs, supplier lists, financial models, scripts).",
      icon: FileKey,
    },
    {
      step: "02",
      title: "AI Review & Plagiarism Fingerprinting",
      description: "Submissions pass through an automated LLM quality scan. The blueprint is timestamped and cryptographically fingerprinted to establish undeniable prior art in our registry.",
      icon: CheckCircle,
    },
    {
      step: "03",
      title: "Clickwrap NDA & Escrow Deposit",
      description: "Buyers review the teaser. Before unlocking the payload, they agree to non-circumvention terms and deposit payment into neutral escrow via Stripe Checkout.",
      icon: ShieldCheck,
    },
    {
      step: "04",
      title: "Instant Unlock & Automated Payout",
      description: "Buyer receives decrypted access to all blueprints and files. After a 72-hour review period, the creator receives their 80%-85% payout directly to their bank account.",
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-20 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-3">
            <Scale className="h-3.5 w-3.5" />
            Legal & Financial Architecture
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            How You Get Paid Without Risk of Idea Theft
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            We solved Kenneth Arrow&apos;s Information Paradox by transforming unprotectable abstract thoughts into enforceable digital assets.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                      STEP {s.step}
                    </span>
                    <Icon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Sided Breakdown Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Creators */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                For Creators & Thinkers
              </span>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Earn $29 – $50,000+
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Monetize Your Insight Without Needing To Build It
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep your proprietary secret sauce private until the buyer executes payment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sell non-exclusive licenses to multiple operators for steady passive cash flow.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Option to sell 100% exclusive rights with automatic digital copyright assignment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Get paid directly to your bank account via Stripe Connect in 100+ countries.</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <Link
                href="/post-idea"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Submit Your Blueprint</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* For Buyers */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                For Founders, Investors & Studios
              </span>
              <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-full">
                Save 6+ Months of R&D
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Acquire Validated, Actionable Ventures
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Every submission is vetted for depth—no 2-sentence generic startup pitches.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Receive ready-to-run deliverables: supplier contracts, unit economics, and show bibles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>72-hour escrow inspection period guarantees assets match advertised teaser specs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Post targeted cash bounties to crowdsource exact solutions for your business.</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <Link
                href="/#marketplace"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Browse Available Blueprints</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
