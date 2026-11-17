import Link from "next/link";
import Image from "next/image";
import { IdeaItem } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Lock, FileSpreadsheet, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface IdeaCardProps {
  idea: IdeaItem;
}

const CATEGORY_LABELS: Record<IdeaItem["category"], { label: string; color: string }> = {
  BUSINESS_BLUEPRINT: { label: "Business Blueprint", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  ENTERTAINMENT_SHOW: { label: "Show & Media Format", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  WORLD_IMPACT: { label: "World-Changing Innovation", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  TECH_INNOVATION: { label: "Tech Innovation", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const categoryConfig = CATEGORY_LABELS[idea.category];
  const isExclusive = idea.saleModel === "EXCLUSIVE";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-orange-500/5">
      {/* Top Tag Row */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${categoryConfig.color}`}>
            {categoryConfig.label}
          </span>

          {isExclusive ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-bold text-rose-400">
              <Sparkles className="h-3 w-3" />
              100% EXCLUSIVE BUYOUT
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
              NON-EXCLUSIVE LICENSE
            </span>
          )}
        </div>

        {/* Title & Hook */}
        <Link href={`/idea/${idea.slug}`} className="block">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-amber-400">
            {idea.title}
          </h3>
        </Link>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
          {idea.oneLineHook}
        </p>

        {/* Public Teaser Box */}
        <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 space-y-2">
          <div className="text-[11px]">
            <span className="font-semibold text-zinc-400">Target Market: </span>
            <span className="text-zinc-300 line-clamp-1">{idea.teaser.targetMarket}</span>
          </div>
          <div className="text-[11px]">
            <span className="font-semibold text-zinc-400">Market Potential (TAM): </span>
            <span className="font-medium text-emerald-400">{idea.teaser.tam}</span>
          </div>
          <div className="text-[11px]">
            <span className="font-semibold text-zinc-400">Est. Launch Capital: </span>
            <span className="text-zinc-300">{idea.teaser.estimatedLaunchCost}</span>
          </div>
        </div>

        {/* Gated Payload Preview Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">
            <Lock className="h-3 w-3 text-amber-400" />
            <span>{idea.payloadPreview.blueprintItemsCount}-Step Execution Plan</span>
          </div>
          {idea.payloadPreview.hasFinancialModel && (
            <div className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">
              <FileSpreadsheet className="h-3 w-3 text-emerald-400" />
              <span>Financial Model</span>
            </div>
          )}
          {idea.payloadPreview.hasSupplierList && (
            <div className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">
              <FileText className="h-3 w-3 text-blue-400" />
              <span>Supplier & Vendor List</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Creator & Pricing Section */}
      <div className="mt-6 border-t border-zinc-800/80 pt-4">
        <div className="flex items-center justify-between">
          {/* Creator Profile */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-zinc-700">
              <Image
                src={idea.creator.avatar}
                alt={idea.creator.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200">
                <span>{idea.creator.name}</span>
                {idea.creator.verified && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                )}
              </div>
              <span className="text-[10px] text-zinc-400">
                {idea.creator.reputation}% Reputation • {idea.stats.buyersCount} buyers
              </span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="text-right">
            <div className="text-base sm:text-lg font-black text-white">
              {formatCurrency(idea.priceCents)}
            </div>
            <span className="text-[10px] font-medium text-zinc-400">
              {isExclusive ? "One-time Buyout" : "Single License"}
            </span>
          </div>
        </div>

        <Link
          href={`/idea/${idea.slug}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/90 py-2.5 text-xs font-semibold text-white transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 active:scale-[0.99]"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Review Teaser & Unlock Blueprint</span>
        </Link>
      </div>
    </div>
  );
}
