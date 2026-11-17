import { MOCK_IDEAS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Calendar,
  Users,
  Eye,
  Award,
  PhoneCall,
} from "lucide-react";
import IdeaUnlockButton from "@/components/IdeaUnlockButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_IDEAS.map((idea) => ({
    slug: idea.slug,
  }));
}

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const idea = MOCK_IDEAS.find((i) => i.slug === slug);

  if (!idea) {
    notFound();
  }

  const isExclusive = idea.saleModel === "EXCLUSIVE";

  return (
    <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#marketplace"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blueprints Marketplace</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                {idea.category.replace("_", " ")}
              </span>

              {isExclusive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  100% EXCLUSIVE IP BUYOUT
                </span>
              ) : (
                <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
                  NON-EXCLUSIVE BLUEPRINT LICENSE
                </span>
              )}
            </div>

            {/* Title & Hook */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {idea.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {idea.oneLineHook}
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-6 border-y border-zinc-800 py-3.5 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-zinc-500" />
                <span>{idea.stats.buyersCount} Licensed Operators</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-zinc-500" />
                <span>{idea.stats.viewsCount} Teaser Impressions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span>Listed {idea.createdAt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Award className="h-4 w-4" />
                <span>
                  {idea.stats.rating} Rating ({idea.stats.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Public Teaser Cards */}
            <div className="space-y-6 pt-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Public Opportunity Teaser</span>
                <span className="text-[11px] font-normal text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                  Verified Data
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    The Problem & Unfair Gap
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {idea.teaser.problemStatement}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Target Market & TAM
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {idea.teaser.targetMarket}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-emerald-400">
                    Estimated TAM: {idea.teaser.tam}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Why Now? (Timing Trigger)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {idea.teaser.whyNow}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Traction & Cost to Launch
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {idea.teaser.tractionSignals}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-amber-400">
                    Est. Capital Required: {idea.teaser.estimatedLaunchCost}
                  </div>
                </div>
              </div>

              {/* Locked Payload Container */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-zinc-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Lock className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Protected Execution Payload (Gated)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    Included with Purchase
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  The actual operational secrets, contact directories, and financial models remain cryptographically encrypted until payment is escrowed.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-xs text-zinc-300">
                    <div className="flex items-center gap-2.5">
                      <Lock className="h-4 w-4 text-amber-400" />
                      <span className="font-semibold text-white">
                        {idea.payloadPreview.blueprintItemsCount}-Step Operational Launch Playbook
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Encrypted Markdown</span>
                  </div>

                  {idea.payloadPreview.hasFinancialModel && (
                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-xs text-zinc-300">
                      <div className="flex items-center gap-2.5">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
                        <span className="font-semibold text-white">
                          3-Year Pro-Forma Financial Model & Unit Economics
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500">.XLSX File</span>
                    </div>
                  )}

                  {idea.payloadPreview.hasSupplierList && (
                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-xs text-zinc-300">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span className="font-semibold text-white">
                          Vetted Supplier & Contract Manufacturer Directory
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500">Verified Contacts</span>
                    </div>
                  )}

                  {idea.payloadPreview.fileAttachmentTypes.map((att, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-xs text-zinc-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock className="h-4 w-4 text-zinc-500" />
                        <span>{att}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">Signed Download URL</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Purchase & Creator Box */}
          <div className="space-y-6">
            {/* Purchase Box */}
            <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Price
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatCurrency(idea.priceCents)}
                </span>
              </div>

              <div className="text-[11px] text-zinc-400 mb-6 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Stripe 72-Hour Inspection Escrow</span>
                </div>
                <div>
                  {isExclusive
                    ? "Full ownership transfer with automated digital IP assignment contract."
                    : "Single-user license for commercial use. Downloadable instantly."}
                </div>
              </div>

              {/* Interactive Unlock Button with Clickwrap Modal */}
              <IdeaUnlockButton
                ideaId={idea.id}
                title={idea.title}
                priceCents={idea.priceCents}
                isExclusive={isExclusive}
              />

              <div className="mt-4 text-center text-[10px] text-zinc-500 leading-tight">
                Protected by platform Non-Circumvention Policy & Timestamped Fingerprinting.
              </div>

              {/* Creator Card */}
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
                  Blueprint Creator
                </span>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-zinc-700">
                    <Image
                      src={idea.creator.avatar}
                      alt={idea.creator.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                      <span>{idea.creator.name}</span>
                      {idea.creator.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">
                      {idea.creator.reputation}% Positive Feedback
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 py-2.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                  <span>Book 30m Advisory Call ($150)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
