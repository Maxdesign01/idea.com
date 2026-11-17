"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Lock,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function PostIdeaPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    oneLineHook: "",
    category: "BUSINESS_BLUEPRINT",
    saleModel: "NON_EXCLUSIVE",
    priceUsd: "99",
    problemStatement: "",
    targetMarket: "",
    whyNow: "",
    estimatedLaunchCost: "",
    tractionSignals: "",
    executionPlan: "",
    supplierList: "",
    financialModel: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-zinc-900/80 p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Blueprint Submitted for AI & Escrow Review!
            </h1>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto">
              Your concept <strong>&quot;{formData.title}&quot;</strong> has been timestamped and entered into our Prior Art Registry. Our Gemini AI screener is reviewing the blueprint completeness.
            </p>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Sale Model:</span>
                <span className="font-semibold text-white">
                  {formData.saleModel === "EXCLUSIVE" ? "Exclusive 100% Buyout" : "Non-Exclusive License"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Listed Price:</span>
                <span className="font-bold text-emerald-400">${formData.priceUsd} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Your Net Payout (85%):</span>
                <span className="font-bold text-white">
                  ${(Number(formData.priceUsd || 0) * 0.85).toFixed(2)} USD via Stripe
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#marketplace"
                className="w-full sm:w-auto rounded-xl bg-orange-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-400 transition"
              >
                Return to Marketplace
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="w-full sm:w-auto rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition"
              >
                Submit Another Blueprint
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Form Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                Monetize Your Mind
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Submit an Execution Blueprint
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                To protect your intellectual property and guarantee buyers pay real money, we separate your submission into a <strong>Public Teaser</strong> and a <strong>Gated Payload</strong>.
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4 text-xs">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-orange-400 font-bold" : "text-zinc-500"}`}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">1</span>
                <span>Concept & Pricing</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-orange-400 font-bold" : "text-zinc-500"}`}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">2</span>
                <span>Public Teaser</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? "text-orange-400 font-bold" : "text-zinc-500"}`}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">3</span>
                <span>Gated Payload</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Blueprint Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Autonomous Property Tax Appeal Contingency SaaS"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      One-Line Value Hook
                    </label>
                    <input
                      type="text"
                      name="oneLineHook"
                      required
                      value={formData.oneLineHook}
                      onChange={handleChange}
                      placeholder="e.g. A zero-touch software model that files county appeals and splits 35% of homeowner savings."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:border-orange-500 focus:outline-none"
                      >
                        <option value="BUSINESS_BLUEPRINT">Six-Figure Business Blueprint</option>
                        <option value="ENTERTAINMENT_SHOW">Next-Level Show / Media Format</option>
                        <option value="WORLD_IMPACT">World-Changing Innovation</option>
                        <option value="TECH_INNOVATION">Tech / Software Architecture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Sale Model
                      </label>
                      <select
                        name="saleModel"
                        value={formData.saleModel}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:border-orange-500 focus:outline-none"
                      >
                        <option value="NON_EXCLUSIVE">Non-Exclusive License ($29–$499)</option>
                        <option value="EXCLUSIVE">Exclusive 100% IP Buyout ($1,000+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Unlock Price (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <input
                        type="number"
                        name="priceUsd"
                        required
                        value={formData.priceUsd}
                        onChange={handleChange}
                        min="10"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-9 pr-4 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-500 mt-1 block">
                      Platform take-rate is 15%. You keep 85% ($
                      {(Number(formData.priceUsd || 0) * 0.85).toFixed(2)}) deposited via Stripe Connect.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-xs text-blue-300 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Public Information:</strong> This will be visible to all potential buyers to prove your idea has real market potential. Do NOT paste your supplier phone numbers or secret recipes here.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      The Problem & Unfair Market Gap
                    </label>
                    <textarea
                      name="problemStatement"
                      rows={3}
                      required
                      value={formData.problemStatement}
                      onChange={handleChange}
                      placeholder="Explain what is currently broken, inefficient, or overlooked..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Target Market & Audience
                      </label>
                      <input
                        type="text"
                        name="targetMarket"
                        required
                        value={formData.targetMarket}
                        onChange={handleChange}
                        placeholder="e.g. 78M US Single-Family Homeowners"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Estimated Capital to Launch
                      </label>
                      <input
                        type="text"
                        name="estimatedLaunchCost"
                        required
                        value={formData.estimatedLaunchCost}
                        onChange={handleChange}
                        placeholder="e.g. $2,500 - $5,000"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Why Now? (Timing catalyst)
                    </label>
                    <input
                      type="text"
                      name="whyNow"
                      required
                      value={formData.whyNow}
                      onChange={handleChange}
                      placeholder="e.g. County assessor APIs opened; new EU green directive passed..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-300 flex items-start gap-2">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Protected Secret Sauce:</strong> This content is encrypted. Only buyers who accept the Clickwrap NDA and execute escrow payment can see this.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Complete Step-by-Step Execution Plan
                    </label>
                    <textarea
                      name="executionPlan"
                      rows={5}
                      required
                      value={formData.executionPlan}
                      onChange={handleChange}
                      placeholder="Detail the operational steps, tech architecture, customer acquisition funnel, and weekly milestones..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Supplier, Manufacturer & Vendor Directory
                    </label>
                    <textarea
                      name="supplierList"
                      rows={3}
                      value={formData.supplierList}
                      onChange={handleChange}
                      placeholder="List vetted manufacturers, software tools, or specific contact names..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Financial Model & Unit Economics Breakdown
                    </label>
                    <textarea
                      name="financialModel"
                      rows={3}
                      value={formData.financialModel}
                      onChange={handleChange}
                      placeholder="COGS, customer acquisition cost (CAC), lifetime value (LTV), pricing tiers..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-5 py-2 text-xs font-bold text-white hover:bg-orange-400"
                  >
                    <span>Next: {step === 1 ? "Public Teaser" : "Gated Payload"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs font-bold text-white hover:brightness-110 shadow-lg shadow-orange-500/25"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Publish Blueprint & Register Prior Art</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
