"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Flame } from "lucide-react";
import { getEndgameLessonById } from "@/content/endgamesData";
import { EndgameTrainer } from "@/features/trainer/endgame-trainer";
import type { EndgameLesson } from "@/types/lotus";

export default function EndgameDrillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lesson, setLesson] = useState<EndgameLesson | null>(null);

  useEffect(() => {
    const found = getEndgameLessonById(id);
    setLesson(found);
  }, [id]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <h2 className="text-xl font-bold text-white">Endgame Drill not found</h2>
        <p className="text-sm text-slate-400">The requested theoretical endgame drill does not exist.</p>
        <Link href="/practice/endgames" className="text-xs text-amber-400 font-bold hover:underline">
          Back to Endgames Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/practice/endgames"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to Endgames Hub
        </Link>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-900 border border-white/5 uppercase tracking-wider text-amber-400">
          {lesson.category}
        </span>
      </div>

      {/* Main Endgame Workspace */}
      <div className="rounded-xl border border-white/5 bg-[#0b1713]/10 p-1 backdrop-blur-sm shadow-md">
        <EndgameTrainer lesson={lesson} />
      </div>
    </div>
  );
}
