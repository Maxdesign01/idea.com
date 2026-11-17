"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Lock, CheckCircle2, Download, ExternalLink, X } from "lucide-react";

interface IdeaUnlockButtonProps {
  ideaId: string;
  title: string;
  priceCents: number;
  isExclusive: boolean;
}

export default function IdeaUnlockButton({
  ideaId,
  title,
  priceCents,
  isExclusive,
}: IdeaUnlockButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [agreedNDA, setAgreedNDA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSimulatePayment = () => {
    if (!agreedNDA) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsUnlocked(true);
    }, 1500);
  };

  return (
    <>
      {isUnlocked ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Blueprint Unlocked & Escrow Active!</span>
          </div>
          <p className="text-[11px] text-zinc-300">
            Your 72-hour review period has started. All proprietary materials have been decrypted below.
          </p>
          <a
            href="#decrypted-assets"
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download All Files (.ZIP)</span>
          </a>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-lg transition active:scale-[0.99] ${
            isExclusive
              ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-rose-500/20 hover:brightness-110"
              : "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/20 hover:brightness-110"
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>
            {isExclusive ? "Acquire 100% Exclusive Rights" : "Unlock Blueprint License"}
          </span>
        </button>
      )}

      {/* Clickwrap & Payment Escrow Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Stripe Connect Escrow
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                Unlock {isExclusive ? "Exclusive Rights" : "Blueprint"}: {title}
              </h2>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Authorized Escrow Amount:</span>
                  <span className="font-bold text-white">{formatCurrency(priceCents)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Inspection Window:</span>
                  <span className="font-semibold text-emerald-400">72 Hours Post-Unlock</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Digital IP Assignment:</span>
                  <span className="font-semibold text-zinc-200">
                    {isExclusive ? "100% Transfer Deed" : "Commercial License"}
                  </span>
                </div>
              </div>

              {/* Clickwrap Checkbox */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedNDA}
                    onChange={(e) => setAgreedNDA(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-orange-500 focus:ring-orange-500"
                  />
                  <span>
                    I legally agree to the <strong>Platform Clickwrap NDA</strong> and Non-Circumvention agreement. I understand unauthorized redistribution of decrypted assets carries civil damages under platform terms.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={!agreedNDA || isProcessing}
                onClick={handleSimulatePayment}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span>Securing Escrow via Stripe...</span>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Authorize Escrow Payment ({formatCurrency(priceCents)})</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-zinc-500">
                Encrypted via Stripe 256-bit TLS. Funds are not disbursed to seller until review window closes.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
