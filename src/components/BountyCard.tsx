import Link from "next/link";
import { BountyItem } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Trophy, Clock, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface BountyCardProps {
  bounty: BountyItem;
}

export default function BountyCard({ bounty }: BountyCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">{bounty.poster.organization}</span>
            {bounty.poster.verifiedBuyer && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                Escrow Funded
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-base bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            <Trophy className="h-4 w-4" />
            <span>{formatCurrency(bounty.prizeCents)}</span>
          </div>
        </div>

        <Link href={`/bounty/${bounty.slug}`} className="block group">
          <h3 className="text-base font-bold text-white transition-colors group-hover:text-emerald-400">
            {bounty.title}
          </h3>
        </Link>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
          {bounty.description}
        </p>
      </div>

      <div className="mt-6 border-t border-zinc-800/80 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            <span>Deadline: {bounty.deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-zinc-500" />
            <span>{bounty.submissionsCount} proposals</span>
          </div>
        </div>

        <Link
          href={`/bounty/${bounty.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300 hover:underline"
        >
          <span>Submit Solution</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
