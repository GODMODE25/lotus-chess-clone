"use client";

import { motion } from "framer-motion";
import { ChevronRight, Activity } from "lucide-react";
import type { OpeningVariation } from "@/types/lotus";
import { OpeningSnapshot } from "./opening-snapshot";

interface OpeningCardProps {
  opening: OpeningVariation;
  isActive: boolean;
  isDue?: boolean;
  curated?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

/**
 * Premium Opening Card featuring a variation snapshot and tactical technical data.
 */
export function OpeningCard({ opening, isActive, isDue, curated, onClick, style }: OpeningCardProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      style={style}
      className={`relative w-[320px] shrink-0 glass-panel rounded-2xl p-5 cursor-pointer transition-all duration-700 overflow-hidden group corner-accent corner-tl corner-br ${isActive
          ? "neon-border-cyan z-20 shadow-[0_0_30px_rgba(0,240,255,0.15)] ring-1 ring-cyan-500/30"
          : "opacity-40 grayscale-[0.3] scale-90 blur-[0.5px]"
        }`}
    >
      {/* Review Due Badge */}
      {isDue && (
        <div className="absolute top-4 right-4 z-30">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-[9px] font-mono font-bold text-purple-300 uppercase tracking-widest animate-pulse">
            <Activity className="size-2.5" />
            Review_Required
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Visual Snapshot with subtle hover zoom */}
        <div className="overflow-hidden rounded-lg">
          <OpeningSnapshot moves={opening.movesSan} side={opening.side} />
        </div>

        {/* Technical Specification Container */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-grow">
              <h3 className="text-xl font-space font-bold text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                {opening.opening}
              </h3>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mt-2">
                {opening.variation}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-1">
              {curated && (
                <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                  Curated
                </span>
              )}
              <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 font-bold">
                {opening.eco}
              </span>
            </div>
          </div>

          {/* Tactical Motif Chips */}
          <div className="flex flex-wrap gap-1.5 min-h-[44px]">
            {opening.tacticalMotifs && opening.tacticalMotifs.length > 0
              ? opening.tacticalMotifs.slice(0, 3).map((motif) => (
                <span
                  key={motif}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest"
                >
                  {motif}
                </span>
              ))
              : null}
          </div>

          {/* Data Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mr-1">Complexity</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < opening.difficulty ? "bg-cyan-400 shadow-[0_0_4px_#00f0ff]" : "bg-white/5"
                      }`}
                  />
                ))}
              </div>
            </div>

            {isActive && (
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest"
              >
                Launch Protocol
                <ChevronRight className="size-3" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Atmospheric FX */}
      {isActive && (
        <>
          <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
        </>
      )}
    </motion.div>
  );
}
