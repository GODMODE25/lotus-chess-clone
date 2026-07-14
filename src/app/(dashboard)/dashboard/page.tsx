"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Crown, ArrowRight, BookOpen, Clock, Flame } from "lucide-react";
import { ProgressDashboard } from "@/features/dashboard/progress-dashboard";
import { ReviewQueuePanel } from "@/features/dashboard/ReviewQueuePanel";
import { getProgressRecords } from "@/services/db/progress";
import { calculateDashboardSnapshot } from "@/services/learning/stats";
import { useAuth } from "@/features/auth/AuthContext";
import type { DashboardSnapshot } from "@/types/lotus";

export default function DashboardPage() {
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const currentUser = user;
    async function loadStats() {
      try {
        const records = await getProgressRecords(currentUser.uid, currentUser.isGuest ?? false);
        const snap = calculateDashboardSnapshot(records);
        setSnapshot(snap);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [user]);

  if (loading || !snapshot) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center animate-pulse">
        <div className="size-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold uppercase text-slate-500 tracking-wider">
          Loading Dashboard Stats...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a1b15] to-[#040e0b] p-6 md:p-8 shadow-lg shadow-emerald-950/10">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 size-48 rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20">
              <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Welcome Back
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Hello, {user?.displayName}!
            </h1>
            <p className="text-sm text-slate-400 max-w-xl font-normal leading-relaxed">
              Ready to master your openings and endgames today? Work towards your daily goal of {snapshot.goalMinutes} minutes.
            </p>
          </div>
          <div>
            <Link
              href="/practice/openings"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-md shadow-emerald-400/10 hover:bg-emerald-300 hover:shadow-emerald-400/20 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Start Review Session
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid: Metrics & Ranks */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Progress Metrics (spans 2 cols on lg) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-6 md:p-8 backdrop-blur-sm shadow-md">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-emerald-400/90 uppercase tracking-[0.15em]">
                Overview
              </h2>
              <h3 className="text-2xl font-bold text-white mt-1">Study Dashboard</h3>
            </div>
            <ProgressDashboard snapshot={snapshot} />
          </div>
          
          <ReviewQueuePanel />
        </div>

        {/* Right Column: Account Rank & Stats */}
        <aside className="rounded-xl border border-white/5 bg-[#101416]/40 p-6 md:p-8 backdrop-blur-sm shadow-md flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.15em]">
                Account Rank
              </h2>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-3xl font-extrabold text-white tracking-tight">
                    {snapshot.currentRank}
                  </p>
                  <p className="mt-1 text-sm text-slate-400 font-medium">
                    {snapshot.accuracy}% Accuracy Rate
                  </p>
                </div>
                <div className="flex size-14 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-300 shadow-md">
                  <Crown className="size-7 animate-bounce" style={{ animationDuration: "3s" }} />
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/5 border-t border-b border-white/5">
              <div className="flex justify-between py-4 text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <BookOpen className="size-4 text-slate-500" />
                  Lessons Completed
                </span>
                <span className="text-white font-semibold">{snapshot.lessonsCompleted}</span>
              </div>
              <div className="flex justify-between py-4 text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="size-4 text-slate-500" />
                  Openings Mastered
                </span>
                <span className="text-white font-semibold">{snapshot.openingsMastered}</span>
              </div>
              <div className="flex justify-between py-4 text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <Flame className="size-4 text-slate-500" />
                  Endgames Mastered
                </span>
                <span className="text-white font-semibold">{snapshot.endgamesMastered}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/library"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 hover:border-white/20 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Browse Openings Library
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
