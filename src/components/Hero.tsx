import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Sparkles, DollarSign, PlusCircle } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/15 to-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md mb-6">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Solving Arrow&apos;s Information Paradox with Escrow-Backed Blueprints</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
          Turn High-Value Ideas into Capital.{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Buy Actionable Blueprints You Can Build.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          The marketplace where visionaries get paid for six-figure business blueprints, TV/media show treatments, and world-changing inventions. Protected by automated clickwrap agreements, escrow verification, and Stripe Connect payouts.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#marketplace"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110 active:scale-[0.98]"
          >
            <span>Explore Blueprints</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/post-idea"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-800 hover:text-white hover:border-zinc-600 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4 text-orange-400" />
            <span>Post an Idea & Get Paid</span>
          </Link>
        </div>

        {/* 3 Pillar Features */}
        <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Gated Payload Engine</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Teasers are public. The secret sauce (SOPs, supplier lists, financial models) stays cryptographically locked until payment.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">72-Hour Escrow Hold</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Exclusive transactions and bounties are held in neutral escrow until the buyer confirms the deliverables meet advertised specs.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Direct Stripe Payouts</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Creators receive automated 80%-85% net payouts into their bank accounts via Stripe Connect in over 100+ countries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
