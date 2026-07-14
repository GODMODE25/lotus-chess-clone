import { Flame, GraduationCap, ShieldCheck, Sparkles, Target, Trophy } from "lucide-react";
import type { DashboardSnapshot } from "@/types/lotus";

interface ProgressDashboardProps {
  snapshot: DashboardSnapshot;
}

const metricIcons = {
  goal: Target,
  streak: Flame,
  openings: GraduationCap,
  endgames: ShieldCheck,
  xp: Sparkles,
  rank: Trophy,
};

export function ProgressDashboard({ snapshot }: ProgressDashboardProps) {
  const metrics = [
    {
      label: "Today's goal",
      value: `${snapshot.studiedMinutes}/${snapshot.goalMinutes} min`,
      icon: metricIcons.goal,
      tone: "text-emerald-300 bg-emerald-300/10 border-emerald-300/20",
    },
    {
      label: "Current streak",
      value: `${snapshot.streakDays} days`,
      icon: metricIcons.streak,
      tone: "text-amber-300 bg-amber-300/10 border-amber-300/20",
    },
    {
      label: "Openings mastered",
      value: snapshot.openingsMastered.toString(),
      icon: metricIcons.openings,
      tone: "text-sky-300 bg-sky-300/10 border-sky-300/20",
    },
    {
      label: "Endgames mastered",
      value: snapshot.endgamesMastered.toString(),
      icon: metricIcons.endgames,
      tone: "text-violet-300 bg-violet-300/10 border-violet-300/20",
    },
    {
      label: "XP",
      value: snapshot.xp.toLocaleString(),
      icon: metricIcons.xp,
      tone: "text-rose-300 bg-rose-300/10 border-rose-300/20",
    },
    {
      label: "Rank",
      value: snapshot.currentRank,
      icon: metricIcons.rank,
      tone: "text-lime-300 bg-lime-300/10 border-lime-300/20",
    },
  ];

  return (
    <section aria-label="Progress dashboard" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <article
            key={metric.label}
            className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-sm shadow-black/20"
          >
            <div className="flex items-center gap-3">
              <span className={`flex size-10 items-center justify-center rounded-md border ${metric.tone}`}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                <p className="text-xl font-semibold text-white">{metric.value}</p>
              </div>
            </div>
          </article>
        );
      })}

      <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-sm shadow-black/20 sm:col-span-2 xl:col-span-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">Legend progress</p>
          <p className="text-sm text-emerald-200">{snapshot.legendProgress}%</p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            aria-hidden="true"
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300"
            style={{ width: `${snapshot.legendProgress}%` }}
          />
        </div>
      </article>
    </section>
  );
}
