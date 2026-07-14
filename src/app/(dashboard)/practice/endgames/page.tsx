"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Flame, Award, ChevronRight, Compass } from "lucide-react";
import { endgameCategories } from "@/content/endgamesData";
import { getProgressRecords } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";

function EndgamesHubContent() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    const currentUser = user;
    async function loadProgress() {
      try {
        const records = await getProgressRecords(currentUser.uid, currentUser.isGuest);
        const completed = new Set<string>();
        records.forEach((rec) => {
          if (rec.mastery >= 70 && rec.lessonKind === "endgame") {
            completed.add(rec.lessonId);
          }
        });
        setCompletedLessons(completed);
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    }
    loadProgress();
  }, [user]);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/20">
          <Flame className="size-3.5 animate-pulse" />
          Endgame Training
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Theoretical Endgame Drills
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
          Practice critical chess endgames against Stockfish. Learn the winning techniques and defensive postures for rook, pawn, queen, and minor piece endings.
        </p>
      </section>

      {/* Grid of categories */}
      <div className="space-y-8">
        {endgameCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight">{category.name}</h2>
              <p className="text-xs text-slate-400 font-normal">{category.description}</p>
            </div>
            
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {category.lessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    href={`/practice/endgames/${lesson.id}`}
                    className="group relative rounded-xl border border-white/5 bg-[#0b120f]/60 hover:bg-[#0b120f]/80 p-5 backdrop-blur-md shadow-md hover:border-amber-500/20 hover:shadow-amber-950/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-[160px]"
                  >
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-white/15 uppercase tracking-wider text-slate-400">
                          {lesson.category}
                        </span>
                        {isCompleted && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 uppercase tracking-wider">
                            Mastered
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight pt-1">
                        {lesson.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal font-normal">
                        {lesson.objective}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 font-medium">
                      <span>Diff: {lesson.difficulty}/5</span>
                      <span className="flex items-center gap-0.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Drill <ChevronRight className="size-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EndgamesPracticePage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-sm font-semibold uppercase text-slate-500 tracking-wider">
        Loading Endgames Arena...
      </div>
    }>
      <EndgamesHubContent />
    </Suspense>
  );
}
