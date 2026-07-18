"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Swords, BookOpen, Star, Trophy, ArrowRight, ShieldCheck, Lock, Circle } from "lucide-react";
import { getRepertoireById, type Repertoire, type RepertoireLine } from "@/content/openingsData";
import { curatedOpenings } from "@/content/openingsCurated";
import { OpeningTrainer } from "@/features/trainer/opening-trainer";
import { getProgressRecords } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";
import type { OpeningVariation, ProgressRecord } from "@/types/lotus";
import type { CuratedLine } from "@/content/openingsCurated";
import {
  isLineUnlocked,
  isLevelUnlocked,
  getNextLine,
  getLineDisplayName,
  buildProgressMap,
} from "@/services/learning/progression";

type MasteryLevel = "Beginner" | "Novice" | "Intermediate" | "Advanced" | "Expert" | "Master" | "Legend";

export default function RepertoirePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState<MasteryLevel>("Beginner");
  const [selectedLine, setSelectedLine] = useState<RepertoireLine | null>(null);
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);

  const curated = curatedOpenings[id] ?? null;
  const hasCurated = curated !== null;

  // Load repertoire data client-side
  useEffect(() => {
    setLoading(true);
    const rep = getRepertoireById(id);
    setRepertoire(rep);
    setLoading(false);
    if (rep && rep.lines.length > 0) {
      setSelectedLine(rep.lines[0]); // default select first line
    }
  }, [id]);

  // Load progress to highlight completed/drilled lines
  useEffect(() => {
    if (!user) return;
    const currentUser = user;
    async function loadProgress() {
      try {
        const records = await getProgressRecords(currentUser.uid, currentUser.isGuest);
        setProgressRecords(records);
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    }
    loadProgress();
  }, [user]);

  const progressMap = useMemo(() => buildProgressMap(progressRecords), [progressRecords]);

  // Dynamic level tabs derived from curated metadata (or synthetic fallback ranges).
  const LEVEL_TABS: { label: string; value: MasteryLevel; range: string }[] = useMemo(() => {
    if (curated) {
      return curated.metadata.masteryLevels.map((lvl) => ({
        label: lvl.tier,
        value: lvl.tier as MasteryLevel,
        range: lvl.graduationRequirements,
      }));
    }
    return [
      { label: "Beginner", value: "Beginner", range: "Lines 1-25" },
      { label: "Novice", value: "Novice", range: "Lines 26-50" },
      { label: "Intermediate", value: "Intermediate", range: "Lines 51-75" },
      { label: "Advanced", value: "Advanced", range: "Lines 76-100" },
      { label: "Expert", value: "Expert", range: "Lines 101-125" },
      { label: "Master", value: "Master", range: "Lines 126-150" },
      { label: "Legend", value: "Legend", range: "Lines 151-850" },
    ];
  }, [curated]);

  // Lines for the active level (tier-index based for curated, slice for synthetic).
  const currentLevelLines = useMemo<RepertoireLine[]>(() => {
    if (!repertoire) return [];
    if (curated) {
      const tierIndex = curated.metadata.masteryLevels.findIndex(
        (l) => l.tier === activeLevel
      );
      return repertoire.lines.filter((l) => (l.masteryLevel ?? "") === activeLevel || (l as any).tierIndex === tierIndex);
    }
    switch (activeLevel) {
      case "Beginner": return repertoire.lines.slice(0, 25);
      case "Novice": return repertoire.lines.slice(25, 50);
      case "Intermediate": return repertoire.lines.slice(50, 75);
      case "Advanced": return repertoire.lines.slice(75, 100);
      case "Expert": return repertoire.lines.slice(100, 125);
      case "Master": return repertoire.lines.slice(125, 150);
      case "Legend": return repertoire.lines.slice(150, 850);
      default: return [];
    }
  }, [repertoire, activeLevel, curated]);

  // Progression helpers only apply to curated openings.
  const lineUnlockState = useMemo(() => {
    if (!selectedLine || !hasCurated) return null;
    return isLineUnlocked(selectedLine as unknown as CuratedLine, repertoire!.lines as unknown as CuratedLine[], progressMap);
  }, [selectedLine, hasCurated, repertoire, progressMap]);

  const nextLineResult = useMemo(() => {
    if (!selectedLine || !hasCurated || !curated) return null;
    return getNextLine(
      selectedLine.id,
      repertoire!.lines as unknown as CuratedLine[],
      progressMap,
      curated.metadata
    );
  }, [selectedLine, hasCurated, curated, repertoire, progressMap]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <p className="text-xl font-bold text-primary tracking-widest uppercase animate-pulse">LOADING</p>
      </div>
    );
  }

  if (!repertoire) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <h2 className="text-xl font-bold text-white">Repertoire not found</h2>
        <p className="text-sm text-slate-400">The requested opening repertoire does not exist.</p>
        <Link href="/practice/openings" className="text-xs text-emerald-400 font-bold hover:underline">
          Back to Openings
        </Link>
      </div>
    );
  }

  // Construct standard OpeningVariation for selected line
  const activeLesson: OpeningVariation | null = selectedLine
    ? {
        id: selectedLine.id,
        opening: repertoire.name,
        variation: selectedLine.variationName ?? selectedLine.name,
        category: repertoire.side === "white" ? "White" : "Black vs e4",
        side: repertoire.side,
        eco: repertoire.eco,
        difficulty: selectedLine.difficulty,
        overview: repertoire.overview,
        keyIdeas: selectedLine.strategicIdeas ?? [],
        movesSan: selectedLine.movesSan,
        pgn: `1. ${selectedLine.movesSan.join(" ")}`,
        concepts: selectedLine.conceptIds ?? [],
        commonMistakes: selectedLine.commonMistakes ?? [],
        tacticalMotifs: [],
        modelGames: [],
        prerequisites: selectedLine.prerequisites,
        continuationIds: selectedLine.continuationIds,
        masteryLevel: selectedLine.masteryLevel,
        aliases: selectedLine.aliases,
        uciMoves: selectedLine.uciMoves,
        startingFen: selectedLine.startingFen,
        moveDepth: selectedLine.moveDepth,
        popularity: selectedLine.popularity,
        reviewPriority: selectedLine.reviewPriority,
        estimatedStudyMinutes: selectedLine.estimatedStudyMinutes,
        masteryXp: selectedLine.masteryXp,
      }
    : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/practice/openings"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to Openings Hub
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-slate-400">
            ECO {repertoire.eco}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-emerald-400">
            {repertoire.side}
          </span>
          {hasCurated && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 uppercase tracking-wider text-primary">
              Curated
            </span>
          )}
        </div>
      </div>

      <section className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {repertoire.name} Repertoire
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {repertoire.overview}
        </p>
      </section>

      {/* Main Split-Pane Workspace */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        
        {/* Left Side: Variation Selector & Level Tabs */}
        <div className="rounded-xl border border-white/5 bg-[#0b120f]/60 p-5 backdrop-blur-md flex flex-col h-[650px]">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <BookOpen className="size-4 text-emerald-400" />
            Training Levels ({repertoire.lines.length} Lines)
          </h2>

          {/* Horizontal scrollable Level Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none border-b border-white/5 mb-4 shrink-0">
            {LEVEL_TABS.map((tab) => {
              const unlockState = hasCurated
                ? isLevelUnlocked(
                    curated!.metadata.masteryLevels.findIndex((l) => l.tier === tab.value),
                    curated!.metadata,
                    progressMap,
                    repertoire.lines as unknown as CuratedLine[]
                  )
                : { isUnlocked: true, isGraduated: false, reason: undefined };
              const isActive = activeLevel === tab.value && unlockState.isUnlocked;
              return (
                <button
                  key={tab.value}
                  disabled={!unlockState.isUnlocked}
                  onClick={() => {
                    if (!unlockState.isUnlocked) return;
                    setActiveLevel(tab.value);
                    const lvlLines = repertoire.lines.filter(
                      (l) => (l.masteryLevel ?? "") === tab.value
                    );
                    if (lvlLines.length > 0) setSelectedLine(lvlLines[0]);
                  }}
                  title={!unlockState.isUnlocked ? unlockState.reason : undefined}
                  className={cn(
                    "px-3 py-2 rounded-lg text-left shrink-0 border transition-all",
                    !unlockState.isUnlocked && "opacity-50 cursor-not-allowed border-white/5 text-slate-500",
                    isActive
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                      : unlockState.isUnlocked && "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white"
                  )}
                >
                  <p className="text-xs font-bold leading-none flex items-center gap-1">
                    {tab.label}
                    {unlockState.isGraduated && <Trophy className="size-3 text-amber-400" />}
                    {!unlockState.isUnlocked && <Lock className="size-3 text-slate-500" />}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-1">
                    {unlockState.isUnlocked ? tab.range : unlockState.reason}
                  </p>
                </button>
              );
            })}
          </div>

          {/* List of lines within active level */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {currentLevelLines.map((line) => {
              const record = progressMap.get(line.id);
              const isCompleted = record ? record.mastery >= 70 && record.completedRepetitions >= 1 : false;
              const unlockState = hasCurated
                ? isLineUnlocked(line as unknown as CuratedLine, repertoire.lines as unknown as CuratedLine[], progressMap)
                : { isUnlocked: true };
              const isLocked = !unlockState.isUnlocked;
              const isSelected = selectedLine?.id === line.id;
              return (
                <div
                  key={line.id}
                  onClick={() => { if (!isLocked) setSelectedLine(line); }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all flex justify-between items-center",
                    isLocked && "opacity-60 cursor-not-allowed",
                    !isLocked && "hover:border-white/10 hover:bg-white/[0.02] cursor-pointer",
                    isSelected && "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                  )}
                >
                  <div className="space-y-0.5 max-w-[220px]">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-white truncate">
                        {hasCurated ? getLineDisplayName(line as unknown as CuratedLine) : line.name}
                      </h3>
                      {isCompleted && <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />}
                      {isLocked && <Lock className="size-3 text-slate-600 shrink-0" />}
                      {!isLocked && !isCompleted && <Circle className="size-3 text-primary/50 shrink-0" />}
                    </div>
                    {isLocked && (line.prerequisites ?? []).length > 0 && (
                      <p className="text-[10px] text-slate-500 font-mono">
                        Requires: {getLineDisplayName(
                          repertoire.lines.find((l) => l.id === (line.prerequisites ?? [])[0]) as unknown as CuratedLine
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[9px] shrink-0">
                    <span className="text-slate-500 font-medium">
                      {record ? `${record.mastery}%` : "—"}
                    </span>
                    <span className="text-amber-300">{"★".repeat(line.difficulty)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Chessboard Trainer */}
        <div className="rounded-xl border border-white/5 bg-[#0b1713]/10 p-1 backdrop-blur-sm shadow-md">
          {activeLesson ? (
            <OpeningTrainer
              lesson={activeLesson}
              isLineUnlocked={lineUnlockState?.isUnlocked ?? true}
              onLineComplete={() => {
                // Refresh progress after a line completes.
                if (user) {
                  getProgressRecords(user.uid, user.isGuest).then(setProgressRecords).catch(console.error);
                }
              }}
              onNextLine={() => {
                if (nextLineResult?.line) {
                  const next = repertoire!.lines.find((l) => l.id === nextLineResult.line!.id);
                  if (next) setSelectedLine(next);
                }
              }}
              onReplay={() => { /* handled by trainer internal reset */ }}
              onBackToLevels={() => {
                const panel = document.getElementById("training-levels");
                panel?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              hasNextLine={nextLineResult?.line !== null}
              nextLineLockReason={nextLineResult?.reason}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-3">
              <Trophy className="size-10 text-slate-600 animate-pulse" />
              <p className="text-sm text-slate-400">Select a variation line from the left panel to begin training.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
