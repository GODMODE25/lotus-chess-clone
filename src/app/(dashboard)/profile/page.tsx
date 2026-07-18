"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Crown,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Award,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { getProgressRecords } from "@/services/db/progress";
import { calculateDashboardSnapshot } from "@/services/learning/stats";
import type { DashboardSnapshot } from "@/types/lotus";

export default function ProfilePage() {
  const { user, signOutUser } = useAuth();
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
        console.error("Failed to load profile stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [user]);

  if (!user) return null;

  const joinDate = user.isGuest
    ? "Guest session"
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

  if (loading || !snapshot) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center animate-pulse">
        <div className="size-10 rounded-full border-2 border-sky-400/40 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold uppercase text-slate-500 tracking-wider">
          Loading Profile Stats...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300 border border-sky-400/20">
          <User className="size-3.5" />
          Player Profile
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Your Profile
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
          View your identity, study statistics, and achievement history.
        </p>
      </section>

      {/* Profile Identity Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0a1b15] to-[#040e0b] p-6 md:p-8 shadow-lg shadow-emerald-950/10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 size-56 rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 size-40 rounded-full bg-sky-400/5 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="size-20 rounded-2xl border-2 border-emerald-400/20 shadow-lg object-cover"
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-2xl bg-emerald-400/10 border-2 border-emerald-400/20 shadow-lg">
                <User className="size-10 text-emerald-300" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-emerald-400 text-slate-950 border-2 border-[#07100d] shadow">
              <Crown className="size-3.5" />
            </div>
          </div>

          {/* Name & Meta */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {user.displayName}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
              {user.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3" />
                  {user.email}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3" />
                Joined {joinDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="size-3" />
                {user.isGuest ? "Guest Mode" : "Authenticated"}
              </span>
            </div>

            {/* Rank Badge */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1">
              <Award className="size-3.5 text-amber-300" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {snapshot.currentRank}
              </span>
              <span className="text-[10px] text-amber-300/60 font-semibold">
                {snapshot.xp.toLocaleString()} XP
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOutUser()}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2.5 text-sm font-semibold text-rose-400 transition-colors hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500/40 sm:self-center"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Study Streak",
            value: `${snapshot.streakDays} days`,
            icon: Zap,
            color: "text-amber-300",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20",
          },
          {
            label: "Accuracy",
            value: `${snapshot.accuracy}%`,
            icon: Target,
            color: "text-emerald-300",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20",
          },
          {
            label: "Lessons Completed",
            value: snapshot.lessonsCompleted.toString(),
            icon: TrendingUp,
            color: "text-sky-300",
            bg: "bg-sky-400/10",
            border: "border-sky-400/20",
          },
          {
            label: "Study Time",
            value: `${snapshot.studiedMinutes} min`,
            icon: Clock,
            color: "text-violet-300",
            bg: "bg-violet-400/10",
            border: "border-violet-400/20",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-5 backdrop-blur-sm shadow-md space-y-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`flex size-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color} border ${stat.border}`}>
                  <Icon className="size-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-white tracking-tight">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mastery Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-6 backdrop-blur-sm shadow-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Crown className="size-4 text-emerald-400" />
            Opening Mastery
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Openings mastered</span>
              <span className="text-white font-semibold">{snapshot.openingsMastered}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-700"
                style={{ width: `${Math.min(100, (snapshot.openingsMastered / 20) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-6 backdrop-blur-sm shadow-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Crown className="size-4 text-amber-400" />
            Endgame Mastery
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Endgames mastered</span>
              <span className="text-white font-semibold">{snapshot.endgamesMastered}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700"
                style={{ width: `${Math.min(100, (snapshot.endgamesMastered / 10) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legend Progress */}
      <div className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-6 backdrop-blur-sm shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="size-4 text-violet-400" />
            Legend Progress
          </h3>
          <span className="text-xs font-bold text-violet-300">{snapshot.legendProgress}%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-400 to-fuchsia-400 transition-all duration-700"
            style={{ width: `${snapshot.legendProgress}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
          Maintain consistent study sessions and perfect accuracy to reach Legend rank.
        </p>
      </div>
    </div>
  );
}
