import { MOCK_BOUNTIES } from "@/lib/mock-data";
import BountyCard from "./BountyCard";
import Link from "next/link";
import { Trophy, Plus, ArrowRight } from "lucide-react";

export default function BountiesSection() {
  return (
    <section id="bounties" className="py-16 border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
              <Trophy className="h-3.5 w-3.5" />
              Reverse Marketplace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Funded Problem Bounties
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Studios, enterprises, and venture funds deposit cash into escrow for solutions to specific problems. Submit your proposal to win the award.
            </p>
          </div>

          <Link
            href="/post-bounty"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          >
            <Plus className="h-4 w-4 text-emerald-400" />
            <span>Post a Bounty ($500+)</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_BOUNTIES.map((bounty) => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Have a specific venture problem or looking for a show bible?</h3>
            <p className="text-xs text-zinc-400 mt-1">Escrow funds with our platform and invite thousands of vetted problem-solvers to pitch directly to you.</p>
          </div>
          <Link
            href="/post-bounty"
            className="whitespace-nowrap inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
          >
            <span>Create a Bounty Challenge</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
