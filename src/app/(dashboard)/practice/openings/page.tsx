"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swords, Compass, Lock, ChevronRight, Award, Plus, Target, Shield } from "lucide-react";
import { getAllWhiteRepertoires, getAllBlackRepertoires } from "@/content/openingsData";
import { curatedOpenings } from "@/content/openingsCurated";
import { getCustomVariations, getProgressRecords } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";
import type { OpeningVariation, ProgressRecord } from "@/types/lotus";
import { RepertoireCarousel } from "@/features/library/repertoire-carousel";

function OpeningsHubContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [customVariations, setCustomVariations] = useState<OpeningVariation[]>([]);
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);
  const [loadingCustom, setLoadingCustom] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function loadData() {
      try {
        const [custom, records] = await Promise.all([
          getCustomVariations(user!.uid, user!.isGuest ?? false),
          getProgressRecords(user!.uid, user!.isGuest ?? false)
        ]);
        setCustomVariations(custom);
        setProgressRecords(records);
      } catch (err) {
        console.error("Failed to load repertoire data:", err);
      } finally {
        setLoadingCustom(false);
      }
    }
    loadData();
  }, [user]);

  const whiteRepertoires = useMemo(() => {
    return getAllWhiteRepertoires().map(r => ({
      ...r,
      opening: r.name,
      variation: "Base Repertoire",
      movesSan: r.baseMoves,
      tacticalMotifs: [],
      side: "white" as const,
      curated: Boolean(curatedOpenings[r.id]),
    }));
  }, []);

  const blackRepertoires = useMemo(() => {
    return getAllBlackRepertoires().map(r => ({
      ...r,
      opening: r.name,
      variation: "Base Repertoire",
      movesSan: r.baseMoves,
      tacticalMotifs: [],
      side: "black" as const,
      curated: Boolean(curatedOpenings[r.id]),
    }));
  }, []);

  const dueIds = useMemo(() => {
    const now = new Date().getTime();
    return new Set(
      progressRecords
        .filter(r => r.lessonKind === "opening" && new Date(r.nextReviewDate).getTime() <= now)
        .map(r => r.lessonId)
    );
  }, [progressRecords]);

  const handleSelect = (item: any) => {
    router.push(`/practice/openings/${item.id}`);
  };

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

      {/* Repertoire Sections */}
      <div className="space-y-20">
        <RepertoireCarousel
          items={whiteRepertoires as any}
          dueIds={dueIds}
          title="WHITE_OPENINGS"
          side="white"
          onSelect={handleSelect}
        />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <RepertoireCarousel
          items={blackRepertoires as any}
          dueIds={dueIds}
          title="BLACK_OPENINGS"
          side="black"
          onSelect={handleSelect}
        />
      </div>

      {/* Custom Variations - High-Tech Grid */}
      <section className="space-y-8 pt-10 pb-10">
        <div className="flex items-center gap-4 px-6">
          <div className="p-2.5 rounded-xl bg-white/5 border border-amber-500/30">
            <Award className="size-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-space font-bold uppercase tracking-[0.2em] text-white">
              Custom_Neural_Paths
            </h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
              User Generated Variants: {customVariations.length}
            </p>
          </div>
        </div>

        {loadingCustom ? (
          <div className="py-12 text-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.4em]">
            Syncing_Custom_Nodes...
          </div>
        ) : customVariations.length === 0 ? (
          <div className="mx-6 py-12 border border-dashed border-white/5 rounded-2xl text-center text-xs text-slate-500 leading-normal px-4 bg-white/[0.01]">
            <Plus className="size-6 mx-auto mb-3 text-slate-700 animate-pulse" />
            No custom analytical paths detected.<br />
            Save variations during training to populate this module.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {customVariations.map((variation) => (
              <Link
                key={variation.id}
                href={`/practice/openings/train?custom=true&id=${variation.id}`}
                className="glass-panel p-6 rounded-2xl border-white/5 hover:border-amber-500/30 transition-all group overflow-hidden relative corner-accent corner-tr corner-bl"
              >
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                      {variation.side}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase font-bold">
                      Custom
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-space font-bold text-white group-hover:text-amber-400 transition-colors">
                      {variation.variation}
                    </h3>
                    <p className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider">
                      Base: {variation.opening}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{variation.movesSan.length} Ply Recorded</span>
                    <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Drill Node
                      <Shield className="size-3" />
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent pointer-events-none" />
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
