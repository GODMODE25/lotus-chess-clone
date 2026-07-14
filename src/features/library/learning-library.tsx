"use client";

import { useMemo, useState } from "react";
import { BookOpen, Crown, Layers3, Search, X } from "lucide-react";
import { starRatingFromRank } from "@/services/learning/mastery";
import type { EndgameLesson, OpeningVariation, ReviewItem } from "@/types/lotus";

interface LearningLibraryProps {
  openings: OpeningVariation[];
  endgames: EndgameLesson[];
  reviews: ReviewItem[];
}

/** All unique filter categories derived from the data */
type SideFilter = "All" | "White" | "Black vs e4" | "Black vs d4";
type DifficultyFilter = "All" | "1" | "2" | "3" | "4" | "5";

export function LearningLibrary({ openings, endgames, reviews }: LearningLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sideFilter, setSideFilter] = useState<SideFilter>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");

  /** Collect unique ECO codes for chip filtering */
  const ecoSet = useMemo(() => {
    const codes = new Set<string>();
    openings.forEach((o) => codes.add(o.eco));
    return Array.from(codes).sort();
  }, [openings]);

  const [ecoFilter, setEcoFilter] = useState<string>("All");

  /** Unique endgame categories */
  const endgameCategories = useMemo(() => {
    const cats = new Set<string>();
    endgames.forEach((e) => cats.add(e.category));
    return Array.from(cats).sort();
  }, [endgames]);

  const [endgameCatFilter, setEndgameCatFilter] = useState<string>("All");

  const normalizedQuery = searchQuery.toLowerCase().trim();

  /** Filter openings */
  const filteredOpenings = useMemo(() => {
    return openings.filter((o) => {
      // Search across name, variation, concepts, motifs, ECO
      if (normalizedQuery) {
        const searchable = [
          o.opening,
          o.variation,
          o.eco,
          o.overview,
          ...o.concepts,
          ...o.tacticalMotifs,
          ...o.keyIdeas,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(normalizedQuery)) return false;
      }

      if (sideFilter !== "All" && o.category !== sideFilter) return false;
      if (ecoFilter !== "All" && o.eco !== ecoFilter) return false;
      if (difficultyFilter !== "All" && o.difficulty !== Number(difficultyFilter)) return false;

      return true;
    });
  }, [openings, normalizedQuery, sideFilter, ecoFilter, difficultyFilter]);

  /** Filter endgames */
  const filteredEndgames = useMemo(() => {
    return endgames.filter((e) => {
      if (normalizedQuery) {
        const searchable = [e.name, e.category, e.objective, e.winningMethod, ...e.tags]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(normalizedQuery)) return false;
      }

      if (endgameCatFilter !== "All" && e.category !== endgameCatFilter) return false;
      if (difficultyFilter !== "All" && e.difficulty !== Number(difficultyFilter)) return false;

      return true;
    });
  }, [endgames, normalizedQuery, endgameCatFilter, difficultyFilter]);

  const hasActiveFilters =
    sideFilter !== "All" ||
    ecoFilter !== "All" ||
    difficultyFilter !== "All" ||
    endgameCatFilter !== "All" ||
    normalizedQuery.length > 0;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSideFilter("All");
    setEcoFilter("All");
    setDifficultyFilter("All");
    setEndgameCatFilter("All");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400"
        />
        <input
          id="library-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search openings, endgames, motifs, concepts..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="space-y-3">
        {/* Row 1: Side / Category */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mr-1">Side</span>
          {(["All", "White", "Black vs e4", "Black vs d4"] as SideFilter[]).map((side) => (
            <button
              key={side}
              onClick={() => setSideFilter(side)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                sideFilter === side
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {side}
            </button>
          ))}
        </div>

        {/* Row 2: ECO */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mr-1">ECO</span>
          <button
            onClick={() => setEcoFilter("All")}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
              ecoFilter === "All"
                ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
            }`}
          >
            All
          </button>
          {ecoSet.map((eco) => (
            <button
              key={eco}
              onClick={() => setEcoFilter(eco === ecoFilter ? "All" : eco)}
              className={`rounded-full px-3 py-1 text-xs font-mono font-medium border transition-all ${
                ecoFilter === eco
                  ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {eco}
            </button>
          ))}
        </div>

        {/* Row 3: Difficulty */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mr-1">Difficulty</span>
          {(["All", "1", "2", "3", "4", "5"] as DifficultyFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                difficultyFilter === d
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {d === "All" ? "All" : `★ ${d}`}
            </button>
          ))}
        </div>

        {/* Row 4: Endgame Category */}
        {endgameCategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mr-1">Endgame</span>
            <button
              onClick={() => setEndgameCatFilter("All")}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                endgameCatFilter === "All"
                  ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              All
            </button>
            {endgameCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setEndgameCatFilter(cat === endgameCatFilter ? "All" : cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                  endgameCatFilter === cat
                    ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/5 px-3 py-1 text-xs font-medium text-rose-300 hover:bg-rose-400/10 transition-all"
          >
            <X className="size-3" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="library-heading" className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">Library</p>
              <h2 id="library-heading" className="text-xl font-semibold text-white">
                Openings and Endgames
              </h2>
            </div>
            <BookOpen aria-hidden="true" className="size-5 text-emerald-200" />
          </div>

          <div className="space-y-5">
            {/* Openings */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-200">
                Openings
                <span className="ml-2 text-xs font-normal text-slate-500">
                  ({filteredOpenings.length}/{openings.length})
                </span>
              </h3>
              {filteredOpenings.length === 0 ? (
                <p className="rounded-md border border-white/5 bg-white/[0.02] p-4 text-center text-sm text-slate-500">
                  No openings match your filters.
                </p>
              ) : (
                <div className="divide-y divide-white/10 rounded-md border border-white/10">
                  {filteredOpenings.map((opening) => (
                    <div
                      key={opening.id}
                      className="grid gap-2 p-3 sm:grid-cols-[1fr_auto] sm:items-center transition-colors hover:bg-white/[0.02]"
                    >
                      <div>
                        <p className="font-medium text-white">{opening.opening}</p>
                        <p className="text-sm text-slate-400">{opening.variation}</p>
                        {opening.concepts.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {opening.concepts.map((c) => (
                              <span
                                key={c}
                                className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300/80 border border-emerald-500/10"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="rounded-md border border-white/10 px-2 py-1 font-mono">{opening.eco}</span>
                        <span className="rounded-md border border-white/10 px-2 py-1">{opening.category}</span>
                        <span className="text-amber-300/60">{"★".repeat(opening.difficulty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Endgames */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-200">
                Endgames
                <span className="ml-2 text-xs font-normal text-slate-500">
                  ({filteredEndgames.length}/{endgames.length})
                </span>
              </h3>
              {filteredEndgames.length === 0 ? (
                <p className="rounded-md border border-white/5 bg-white/[0.02] p-4 text-center text-sm text-slate-500">
                  No endgames match your filters.
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-3">
                  {filteredEndgames.map((endgame) => (
                    <article
                      key={endgame.id}
                      className="rounded-md border border-white/10 p-3 transition-colors hover:bg-white/[0.02]"
                    >
                      <p className="font-medium text-white">{endgame.name}</p>
                      <p className="text-sm text-slate-400">{endgame.category}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-amber-300/60 text-xs">{"★".repeat(endgame.difficulty)}</span>
                        <div className="flex gap-1">
                          {endgame.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-300/80 border border-violet-500/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Review Queue Section */}
        <section aria-labelledby="review-heading" className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-200">Adaptive review</p>
              <h2 id="review-heading" className="text-xl font-semibold text-white">
                Due Queue
              </h2>
            </div>
            <Layers3 aria-hidden="true" className="size-5 text-sky-200" />
          </div>

          <div className="divide-y divide-white/10">
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">No reviews pending.</p>
            ) : (
              reviews.map((review) => {
                const stars = "★".repeat(starRatingFromRank(review.rank)).padEnd(5, "☆");

                return (
                  <article key={review.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{review.title}</p>
                        <p className="text-sm text-slate-400">{review.subtitle}</p>
                      </div>
                      <span className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">
                        {review.dueLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-1 text-amber-200">
                        <Crown aria-hidden="true" className="size-4" />
                        {review.rank}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{stars}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        aria-hidden="true"
                        className="h-full rounded-full bg-sky-300"
                        style={{ width: `${review.confidence}%` }}
                      />
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
