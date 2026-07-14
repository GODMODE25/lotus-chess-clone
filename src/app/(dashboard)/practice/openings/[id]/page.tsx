"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Swords, BookOpen, Star, Trophy, ArrowRight, ShieldCheck } from "lucide-react";
import { getRepertoireById, type Repertoire, type RepertoireLine } from "@/content/openingsData";
import { OpeningTrainer } from "@/features/trainer/opening-trainer";
import { getProgressRecords } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";
import type { OpeningVariation } from "@/types/lotus";

type MasteryLevel = "Beginner" | "Novice" | "Intermediate" | "Advanced" | "Expert" | "Master" | "Legend";

const LEVEL_TABS: { label: string; value: MasteryLevel; range: string }[] = [
  { label: "Beginner", value: "Beginner", range: "Lines 1-25" },
  { label: "Novice", value: "Novice", range: "Lines 26-50" },
  { label: "Intermediate", value: "Intermediate", range: "Lines 51-75" },
  { label: "Advanced", value: "Advanced", range: "Lines 76-100" },
  { label: "Expert", value: "Expert", range: "Lines 101-125" },
  { label: "Master", value: "Master", range: "Lines 126-150" },
  { label: "Legend", value: "Legend", range: "Lines 151-850" },
];

function getLinesForLevel(lines: RepertoireLine[], level: MasteryLevel): RepertoireLine[] {
  switch (level) {
    case "Beginner":
      return lines.slice(0, 25);
    case "Novice":
      return lines.slice(25, 50);
    case "Intermediate":
      return lines.slice(50, 75);
    case "Advanced":
      return lines.slice(75, 100);
    case "Expert":
      return lines.slice(100, 125);
    case "Master":
      return lines.slice(125, 150);
    case "Legend":
      return lines.slice(150, 850);
    default:
      return [];
  }
}

export default function RepertoirePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
  const [activeLevel, setActiveLevel] = useState<MasteryLevel>("Beginner");
  const [selectedLine, setSelectedLine] = useState<RepertoireLine | null>(null);
  const [completedLines, setCompletedLines] = useState<Set<string>>(new Set());

  // Load repertoire data client-side
  useEffect(() => {
    const rep = getRepertoireById(id);
    setRepertoire(rep);
    if (rep && rep.lines.length > 0) {
      setSelectedLine(rep.lines[0]); // default select first line
    }
  }, [id]);

  // Load progress to highlight completed/drilled lines
  useEffect(() => {
    if (!user || !repertoire) return;
    const currentUser = user;
    async function loadProgress() {
      try {
        const records = await getProgressRecords(currentUser.uid, currentUser.isGuest);
        const completed = new Set<string>();
        records.forEach((rec) => {
          if (rec.mastery >= 70) {
            completed.add(rec.lessonId);
          }
        });
        setCompletedLines(completed);
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    }
    loadProgress();
  }, [user, repertoire]);

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
        variation: selectedLine.name,
        category: repertoire.side === "white" ? "White" : "Black vs e4",
        side: repertoire.side,
        eco: repertoire.eco,
        difficulty: selectedLine.difficulty,
        overview: repertoire.overview,
        keyIdeas: [],
        movesSan: selectedLine.movesSan,
        pgn: `1. ${selectedLine.movesSan.join(" ")}`,
        concepts: [],
        commonMistakes: [],
        tacticalMotifs: [],
        modelGames: [],
      }
    : null;

  const currentLevelLines = getLinesForLevel(repertoire.lines, activeLevel);

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
            Training Levels (850 Lines)
          </h2>

          {/* Horizontal scrollable Level Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none border-b border-white/5 mb-4 shrink-0">
            {LEVEL_TABS.map((tab) => {
              const isActive = activeLevel === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveLevel(tab.value);
                    const lvlLines = getLinesForLevel(repertoire.lines, tab.value);
                    if (lvlLines.length > 0) {
                      setSelectedLine(lvlLines[0]);
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-left shrink-0 border transition-all ${
                    isActive
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                      : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <p className="text-xs font-bold leading-none">{tab.label}</p>
                  <p className="text-[9px] text-slate-500 mt-1">{tab.range}</p>
                </button>
              );
            })}
          </div>

          {/* List of lines within active level */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {currentLevelLines.map((line) => {
              const isSelected = selectedLine?.id === line.id;
              const isCompleted = completedLines.has(line.id);
              return (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex justify-between items-center ${
                    isSelected
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300 shadow-sm"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 text-slate-300 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="space-y-0.5 max-w-[220px]">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-white truncate">{line.name}</h3>
                      {isCompleted && (
                        <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Moves: {line.movesSan.join(" ").slice(0, 30)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[9px] shrink-0">
                    <span className="text-slate-500 font-medium">{line.movesSan.length} ply</span>
                    <span className="text-amber-300">{"★".repeat(line.difficulty)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Chessboard Trainer */}
        <div className="rounded-xl border border-white/5 bg-[#0b1713]/10 p-1 backdrop-blur-sm shadow-md">
          {activeLesson ? (
            <OpeningTrainer lesson={activeLesson} />
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
