"use client";

import { useState, useMemo } from "react";
import { MOCK_IDEAS, IdeaItem } from "@/lib/mock-data";
import IdeaCard from "./IdeaCard";
import { Search, Sparkles, Filter, Briefcase, Film, Globe2, Layers } from "lucide-react";

export default function MarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [exclusiveOnly, setExclusiveOnly] = useState<boolean>(false);

  const filteredIdeas = useMemo(() => {
    return MOCK_IDEAS.filter((idea) => {
      // Category match
      if (selectedCategory !== "ALL" && idea.category !== selectedCategory) {
        return false;
      }
      // Exclusive toggle
      if (exclusiveOnly && idea.saleModel !== "EXCLUSIVE") {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(query);
        const matchesHook = idea.oneLineHook.toLowerCase().includes(query);
        const matchesMarket = idea.teaser.targetMarket.toLowerCase().includes(query);
        const matchesProblem = idea.teaser.problemStatement.toLowerCase().includes(query);
        return matchesTitle || matchesHook || matchesMarket || matchesProblem;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, exclusiveOnly]);

  const categories = [
    { id: "ALL", label: "All Blueprints", icon: Layers },
    { id: "BUSINESS_BLUEPRINT", label: "Six-Figure Businesses", icon: Briefcase },
    { id: "ENTERTAINMENT_SHOW", label: "Shows & Media Formats", icon: Film },
    { id: "WORLD_IMPACT", label: "World-Changing Inventions", icon: Globe2 },
  ];

  return (
    <section id="marketplace" className="py-16 border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Verified & Actionable
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              The Execution Blueprint Marketplace
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Browse thoroughly vetted concepts. Every listing includes a public teaser and a locked execution pack containing step-by-step strategies, suppliers, and financial models.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, markets, TAM..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-800/60 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Exclusive Buyout Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={exclusiveOnly}
              onChange={(e) => setExclusiveOnly(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-zinc-950"
            />
            <span>Show Exclusive 100% Buyouts Only</span>
          </label>
        </div>

        {/* Cards Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-zinc-800 p-8">
            <p className="text-base font-semibold text-zinc-300">No blueprints matched your filters.</p>
            <p className="text-xs text-zinc-500 mt-1">Try loosening your search terms or view all categories.</p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
                setExclusiveOnly(false);
              }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
