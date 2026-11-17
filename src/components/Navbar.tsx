import Link from "next/link";
import { Lightbulb, ShieldCheck, Sparkles, PlusCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
            <Lightbulb className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              IdeaSprint
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-500/20">
                PRO
              </span>
            </span>
            <span className="text-[11px] font-medium text-zinc-400 -mt-1">
              Protected Blueprint & Bounty Exchange
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link href="/#marketplace" className="transition hover:text-white">
            Explore Blueprints
          </Link>
          <Link href="/#bounties" className="flex items-center gap-1.5 transition hover:text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Problem Bounties
          </Link>
          <Link href="/how-it-works" className="flex items-center gap-1.5 transition hover:text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            How Escrow & IP Works
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/pro"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Buyer Access
          </Link>

          <Link
            href="/post-idea"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:brightness-110 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post Idea & Get Paid</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
