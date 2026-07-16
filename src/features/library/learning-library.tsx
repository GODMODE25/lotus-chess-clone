"use client";

import { useMemo, useState } from "react";
import { Search, Sliders, Target, Shield } from "lucide-react";
import type { EndgameLesson, OpeningVariation, ReviewItem } from "@/types/lotus";
import { RepertoireCarousel } from "./repertoire-carousel";

interface LearningLibraryProps {
  openings: OpeningVariation[];
  endgames: EndgameLesson[];
  reviews: ReviewItem[];
}

type DifficultyFilter = "All" | "1" | "2" | "3" | "4" | "5";

export function LearningLibrary({ openings, endgames, reviews }: LearningLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");

  const normalizedQuery = searchQuery.toLowerCase().trim();

  // Filter openings for carousel
  const filteredOpenings = useMemo(() => {
    return openings.filter((o) => {
      if (normalizedQuery) {
        const searchable = [o.opening, o.variation, o.eco, ...o.concepts, ...o.tacticalMotifs].join(" ").toLowerCase();
        if (!searchable.includes(normalizedQuery)) return false;
      }
      if (difficultyFilter !== "All" && o.difficulty !== Number(difficultyFilter)) return false;
      return true;
    });
  }, [openings, normalizedQuery, difficultyFilter]);

  // Split openings by side for separate carousels
  const whiteOpenings = useMemo(() => filteredOpenings.filter(o => o.side === 'white'), [filteredOpenings]);
  const blackOpenings = useMemo(() => filteredOpenings.filter(o => o.side === 'black'), [filteredOpenings]);

  const openingDueIds = useMemo(() => {
    return new Set(reviews.filter(r => r.lessonKind === "opening").map(r => r.id));
  }, [reviews]);

  return (
    <div className="space-y-16">
      {/* Search & Filter Terminal */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col lg:flex-row gap-8 items-center border-white/5 shadow-inner corner-accent corner-tl corner-br">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Scan Repertoire Database..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white font-space tracking-tight outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest hidden sm:inline">Search_Active</span>
            <div className="size-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-white/30">
            <Sliders className="size-3" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Complexity</span>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            {["All", "1", "2", "3", "4", "5"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d as DifficultyFilter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficultyFilter === d 
                    ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.1)]" 
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {d === "All" ? "ALL" : `★${d}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opening Repertoire Carousels */}
      <div className="space-y-20">
        <section>
          <RepertoireCarousel 
            items={whiteOpenings} 
            dueIds={openingDueIds}
            title="Strategic_Initiative" 
            side="white" 
          />
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <section>
          <RepertoireCarousel 
            items={blackOpenings} 
            dueIds={openingDueIds}
            title="Reactive_Countermeasures" 
            side="black" 
          />
        </section>
      </div>

      {/* Endgame Drills - High-Tech Grid */}
      <section className="space-y-8 pb-10">
        <div className="flex items-center gap-4 px-6">
          <div className="p-2.5 rounded-xl bg-white/5 border border-emerald-500/30">
            <Target className="size-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-space font-bold uppercase tracking-[0.2em] text-white">
              Endgame_Protocols
            </h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
              Theoretical Performance Modules: {endgames.length}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {endgames.map((endgame) => (
            <div
              key={endgame.id}
              className="glass-panel p-6 rounded-2xl border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden relative corner-accent corner-tr corner-bl"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                    {endgame.category}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < endgame.difficulty ? "bg-emerald-400 shadow-[0_0_4px_#10b981]" : "bg-white/5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {endgame.name}
                  </h3>
                  <p className="text-xs text-white/40 mt-1 line-clamp-2 leading-relaxed">
                    {endgame.objective}
                  </p>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Deploy Drill
                    <Shield className="size-3" />
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
