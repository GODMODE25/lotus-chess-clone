"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Swords, Compass, Lock, ChevronRight, Award, Plus } from "lucide-react";
import { getAllWhiteRepertoires, getAllBlackRepertoires } from "@/content/openingsData";
import { getCustomVariations } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";
import type { OpeningVariation } from "@/types/lotus";

function OpeningsHubContent() {
  const { user } = useAuth();
  const [customVariations, setCustomVariations] = useState<OpeningVariation[]>([]);
  const [loadingCustom, setLoadingCustom] = useState(true);

  useEffect(() => {
    if (!user) return;
    const currentUser = user;
    async function loadCustom() {
      try {
        const list = await getCustomVariations(currentUser.uid, currentUser.isGuest ?? false);
        setCustomVariations(list);
      } catch (err) {
        console.error("Failed to load custom variations:", err);
      } finally {
        setLoadingCustom(false);
      }
    }
    loadCustom();
  }, [user]);

  const whiteOpenings = getAllWhiteRepertoires();
  const blackOpenings = getAllBlackRepertoires();

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20 animate-pulse">
          <Swords className="size-3.5" />
          Opening Repertoires
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Choose Your Repertoire
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
          Select a repertoire to build your opening library. Drill up to 850 lines of variations structured across 7 mastery levels from Beginner to Legend.
        </p>
      </section>

      {/* Row 1: White Openings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-white border border-slate-600" />
          <h2 className="text-lg font-bold text-white tracking-tight">White Openings (Top 10)</h2>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {whiteOpenings.map((opening) => (
            <Link
              key={opening.id}
              href={`/practice/openings/${opening.id}`}
              className="group relative rounded-xl border border-white/5 bg-[#0b120f]/60 hover:bg-[#0b120f]/80 p-5 backdrop-blur-md shadow-md hover:border-emerald-500/20 hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-[160px]"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">{opening.eco}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-slate-400">White</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight pt-1">
                  {opening.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal font-normal">
                  {opening.overview}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 font-medium">
                <span>{opening.difficulty === 1 ? "★" : "★".repeat(opening.difficulty)}</span>
                <span className="flex items-center gap-0.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Train <ChevronRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Row 2: Black Openings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-950 border border-slate-600" />
          <h2 className="text-lg font-bold text-white tracking-tight">Black Openings (Top 10)</h2>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {blackOpenings.map((opening) => (
            <Link
              key={opening.id}
              href={`/practice/openings/${opening.id}`}
              className="group relative rounded-xl border border-white/5 bg-[#0b120f]/60 hover:bg-[#0b120f]/80 p-5 backdrop-blur-md shadow-md hover:border-emerald-500/20 hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-[160px]"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">{opening.eco}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-slate-400">Black</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight pt-1">
                  {opening.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal font-normal">
                  {opening.overview}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 font-medium">
                <span>{opening.difficulty === 1 ? "★" : "★".repeat(opening.difficulty)}</span>
                <span className="flex items-center gap-0.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Train <ChevronRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Row 3: Custom Variations */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Award className="size-4.5 text-amber-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Custom Variations</h2>
        </div>
        
        {loadingCustom ? (
          <div className="py-12 text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Loading variations...
          </div>
        ) : customVariations.length === 0 ? (
          <div className="py-12 border border-dashed border-white/5 rounded-2xl text-center text-xs text-slate-500 leading-normal px-4">
            <Plus className="size-5 mx-auto mb-2 text-slate-600 animate-pulse" />
            You haven&apos;t saved any custom variations yet.<br />
            During opening drills, play any stray move and save the line as a custom variation.
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {customVariations.map((variation) => (
              <Link
                key={variation.id}
                href={`/practice/openings/train?custom=true&id=${variation.id}`}
                className="group relative rounded-xl border border-white/5 bg-[#101416]/40 hover:bg-[#101416]/60 p-5 backdrop-blur-md shadow-md hover:border-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-[140px]"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-slate-400">{variation.side}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 uppercase tracking-wider text-amber-300">Custom</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight pt-1">
                    {variation.variation}
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-normal mt-1">
                    Base: {variation.opening}
                  </p>
                </div>
                <div className="flex justify-between items-end pt-2 text-[10px] text-slate-500 font-medium">
                  <span>{variation.movesSan.length} ply</span>
                  <span className="flex items-center gap-0.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Train <ChevronRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function OpeningsPracticePage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-sm font-semibold uppercase text-slate-500 tracking-wider">
        Loading Openings Arena...
      </div>
    }>
      <OpeningsHubContent />
    </Suspense>
  );
}
