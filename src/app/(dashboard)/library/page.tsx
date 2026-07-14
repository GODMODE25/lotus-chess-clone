"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { LearningLibrary } from "@/features/library/learning-library";
import { openingCatalog, endgameCatalog, reviewQueue } from "@/content/lotus";

export default function LibraryPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20">
          <BookOpen className="size-3.5" />
          Learning Library
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Browse Repertoire & Endgames
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Browse your active opening catalogs, select endgames to practice against the engine, and check your pending review intervals.
        </p>
      </section>

      <div className="rounded-xl border border-white/5 bg-[#0b1713]/20 p-1 backdrop-blur-sm">
        <LearningLibrary
          openings={openingCatalog}
          endgames={endgameCatalog}
          reviews={reviewQueue}
        />
      </div>
    </div>
  );
}
