"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Flame, 
  Target, 
  Activity, 
  BarChart3, 
  Hexagon, 
  Crosshair, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight,
  Target as TargetIcon
} from "lucide-react";
import type { DashboardSnapshot, ProgressRecord } from "@/types/lotus";
import { motion, type Variants } from "framer-motion";
import { EloProgressionChart } from "./elo-chart";
import { MotifRadar } from "./motif-radar";
import { ActivityHeatmap } from "./activity-heatmap";
import { calculateEloHistory, calculateMotifStats } from "@/services/learning/stats";
import { getProgressRecords } from "@/services/db/progress";
import { useAuth } from "@/features/auth/AuthContext";
import { cn } from "@/lib/utils";

interface ProgressDashboardProps {
  snapshot: DashboardSnapshot;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export function ProgressDashboard({ snapshot }: ProgressDashboardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [eloHistory, setEloHistory] = useState<any[]>([]);
  const [motifStats, setMotifStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function loadData() {
      try {
        const records = await getProgressRecords(user!.uid, user!.isGuest ?? false);
        setEloHistory(calculateEloHistory(records));
        setMotifStats(calculateMotifStats(records));
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="size-12 rounded-full border-2 border-primary border-t-transparent shadow-neon"
        />
        <p className="text-[10px] font-mono font-bold tracking-[0.4em] text-primary/50 uppercase">Syncing Tactical Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="bento-grid"
    >
      {/* Hero Section: Progress Overview */}
      <motion.section 
        variants={item}
        className="col-span-12 lg:col-span-8 glass-panel rounded-3xl overflow-hidden min-h-[520px] flex flex-col group scanline corner-accent corner-tl corner-tr corner-bl corner-br"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img 
            alt="Holographic King" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-transform duration-1000 group-hover:scale-105" 
            src="https://images.unsplash.com/photo-1767972159445-ae8732f0a3a3?auto=format&w=1200&q=80&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,240,255,0.05),transparent)]" />
        </div>
        
        <div className="relative p-10 flex flex-col h-full justify-between flex-grow">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase mb-8">
              <Activity className="size-3 animate-pulse" />
              Strategic Analysis Platform v4.0.2
            </div>
            <h1 className="text-7xl font-heading font-bold text-white leading-tight mb-2 tracking-tighter uppercase">
              Progress<br /><span className="text-white/30">Overview</span>
            </h1>
            <p className="text-white/50 max-w-md font-body text-lg leading-relaxed">
              Holographic rendering of tactical performance and engine-evaluated growth trajectories.
            </p>
          </div>

          <div className="flex items-end gap-12">
            <div className="space-y-2">
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">Elo Rating</p>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-heading font-bold neon-text-cyan">
                  {eloHistory[eloHistory.length - 1]?.elo || 1200}
                </span>
                <span className="text-emerald-400 text-lg font-mono flex items-center gap-1">
                  <ArrowUpRight className="size-4" />
                  +14
                </span>
              </div>
            </div>
            <div className="h-16 w-px bg-white/10 mb-4" />
            <div className="space-y-2">
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">Tactical Sharpness</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-heading font-medium">94.8</span>
                <span className="text-2xl text-white/30 font-heading">%</span>
              </div>
            </div>
            <div className="h-16 w-px bg-white/10 mb-4" />
            <div className="space-y-2">
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">Win Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-heading font-medium">{snapshot.accuracy}</span>
                <span className="text-2xl text-white/30 font-heading">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 flex flex-col gap-6 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          <div className="flex flex-col items-end">
            <span>X: 19.002</span>
            <span>Y: 82.115</span>
            <span>Z: 0.144</span>
          </div>
          <div className="flex flex-col items-end">
            <span>Sector: VII</span>
            <span>Buffer: CLEAR</span>
          </div>
        </div>
      </motion.section>

      {/* Mastery Arcs */}
      <motion.section 
        variants={item}
        className="col-span-12 md:col-span-6 lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col justify-between h-full min-h-[500px] border-primary/10 shadow-neon"
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-heading font-bold tracking-tight uppercase">Mastery <span className="text-primary">Arcs</span></h3>
            <TargetIcon className="text-primary/70 size-6" />
          </div>
          
          <div className="space-y-12">
            {/* Openings Arc */}
            <div className="flex items-center gap-8 group">
              <div className="relative size-32 shrink-0">
                <svg className="size-full -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.03]" />
                  <motion.circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="364.4"
                    initial={{ strokeDashoffset: 364.4 }}
                    animate={{ strokeDashoffset: 364.4 * (1 - Math.min(snapshot.openingsMastered / 20, 1)) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-primary"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 8px #00f0ff)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold">
                    {Math.round(Math.min(snapshot.openingsMastered / 20, 1) * 100)}<span className="text-sm text-white/30">%</span>
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-heading font-medium text-white/90">Openings Mastered</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Sicilian", "Ruy Lopez", "Caro-Kann"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Endgames Arc */}
            <div className="flex items-center gap-8 group">
              <div className="relative size-32 shrink-0">
                <svg className="size-full -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.03]" />
                  <motion.circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="364.4"
                    initial={{ strokeDashoffset: 364.4 }}
                    animate={{ strokeDashoffset: 364.4 * (1 - Math.min(snapshot.endgamesMastered / 15, 1)) }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                    className="text-accent"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 8px #bd00ff)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold">
                    {Math.round(Math.min(snapshot.endgamesMastered / 15, 1) * 100)}<span className="text-sm text-white/30">%</span>
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-heading font-medium text-white/90">Endgames Mastery</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Opposition", "Lucena", "King/Pawn"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => router.push("/library")}
          className="w-full mt-8 py-4 rounded-2xl bg-primary/5 border border-primary/10 text-primary font-heading font-bold tracking-widest uppercase hover:bg-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-[10px]">
            Full Theoretical Report
            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </motion.section>

      {/* Elo Progression Chart */}
      <motion.section 
        variants={item}
        className="col-span-12 lg:col-span-8 glass-panel rounded-3xl p-8 h-full flex flex-col justify-between min-h-[400px]"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-heading font-bold tracking-tight uppercase">Elo <span className="text-accent">Progression</span></h3>
            <p className="text-white/40 text-[11px] font-mono uppercase tracking-widest mt-1">Ref: Last 30 Performance Cycles</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-heading font-medium">
              +142 PTS <span className="text-[10px] opacity-60 ml-1 font-mono uppercase">Total</span>
            </div>
            <div className="flex rounded-xl bg-white/5 border border-white/10 p-1">
              {["30D", "90D", "1Y"].map(range => (
                <button 
                  key={range}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium transition-all",
                    range === "30D" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <EloProgressionChart data={eloHistory} />
        </div>
      </motion.section>

      {/* Training Heatmap & Motif Radar Column */}
      <motion.section 
        variants={item}
        className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-6"
      >
        {/* Heatmap */}
        <div className="glass-panel rounded-2xl p-8 flex-grow">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold tracking-tight uppercase">Training <span className="text-primary">Heatmap</span></h3>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">2024 Activity Log</p>
            </div>
            <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase font-bold">
              Lv. 4 Active
            </span>
          </div>
          <ActivityHeatmap />
        </div>

        {/* Radar */}
        <div className="glass-panel rounded-2xl p-8 min-h-[340px] border-accent/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-heading font-bold tracking-tight uppercase">Motif <span className="text-accent">Radar</span></h3>
            <Crosshair className="text-accent/70 size-6" />
          </div>
          <MotifRadar data={motifStats} />
        </div>
      </motion.section>
    </motion.div>
  );
}
