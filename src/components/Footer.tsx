import Link from "next/link";
import { ShieldCheck, Lock, DollarSign, FileCheck2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-sm">
                IS
              </div>
              <span className="text-base font-bold text-white">IdeaSprint</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The protected marketplace solving Arrow&apos;s Information Paradox. Converting high-conviction ideas into verified, payable execution blueprints.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Stripe Connect Escrow Protected</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/?category=BUSINESS_BLUEPRINT#marketplace" className="hover:text-white transition">
                  Six-Figure Business Blueprints
                </Link>
              </li>
              <li>
                <Link href="/?category=ENTERTAINMENT_SHOW#marketplace" className="hover:text-white transition">
                  Next-Level Entertainment & Shows
                </Link>
              </li>
              <li>
                <Link href="/?category=WORLD_IMPACT#marketplace" className="hover:text-white transition">
                  World-Impact & Green Inventions
                </Link>
              </li>
              <li>
                <Link href="/#bounties" className="hover:text-white transition">
                  Funded Problem Bounties
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & IP Protection */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-zinc-500" />
                <Link href="/legal/clickwrap-nda" className="hover:text-white transition">
                  Clickwrap NDA & Terms
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-zinc-500" />
                <Link href="/legal/ip-transfer" className="hover:text-white transition">
                  Exclusive IP Assignment Deed
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-zinc-500" />
                <Link href="/legal/escrow-policy" className="hover:text-white transition">
                  72-Hour Escrow Policy
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  Anti-Plagiarism & AI Screening
                </Link>
              </li>
            </ul>
          </div>

          {/* Creators & Buyers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              For Operators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/post-idea" className="hover:text-white transition">
                  Submit a Blueprint for Review
                </Link>
              </li>
              <li>
                <Link href="/post-bounty" className="hover:text-white transition">
                  Post a Bounty Challenge ($500+)
                </Link>
              </li>
              <li>
                <Link href="/pro" className="hover:text-white transition">
                  Buyer Pro Membership ($49/mo)
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="hover:text-white transition">
                  How Creators Get Paid via Stripe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500">
          <p>© 2026 IdeaSprint Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Protected by Automated Digital Fingerprinting & Cryptographic Watermarking.
          </p>
        </div>
      </div>
    </footer>
  );
}
