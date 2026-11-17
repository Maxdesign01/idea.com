import Link from "next/link";
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Building } from "lucide-react";

export default function ProPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            For Founders, VCs & Media Executives
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Acquire Unfair Early Access to High-Conviction Blueprints
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Gain a 48-hour head start before blueprints go public. Connect directly with vetted thinkers and lock in exclusive buyouts before competitors.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual Pro */}
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Solo Founder / Builder
                </span>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-300">
                  Flexible
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>48-hour early access window to all new blueprints</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Direct in-app messaging with blueprint creators</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Priority access to Exclusive 100% Buyout listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Verified Buyer Escrow badge on all offers</span>
                </li>
              </ul>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-xs font-bold text-white transition hover:bg-zinc-700">
              <span>Start 14-Day Free Pro Trial</span>
            </button>
          </div>

          {/* Venture Studio & Fund */}
          <div className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-zinc-900/80 p-8 flex flex-col justify-between backdrop-blur-md shadow-2xl">
            <div className="absolute -top-3 right-6 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-950">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Studio & Fund Syndicate
                </span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                  Institutional
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">$199</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Everything in Solo Founder plan for 5 team seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Post up to 3 active Problem Bounties per month ($0 fee)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Dedicated Escrow Officer & legal assignment concierge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Private off-market blueprint pipeline delivered weekly</span>
                </li>
              </ul>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-bold text-white transition hover:brightness-110 shadow-lg shadow-orange-500/20">
              <span>Subscribe to Studio Tier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
