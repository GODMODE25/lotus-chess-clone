"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Cpu } from "lucide-react";
import type { OpeningVariation } from "@/types/lotus";
import { OpeningCard } from "./opening-card";

interface RepertoireCarouselProps {
  items: OpeningVariation[];
  dueIds?: Set<string>;
  title: string;
  side: "white" | "black";
  onSelect?: (item: OpeningVariation) => void;
}

/**
 * Technical Command-Center Carousel with 3-card focal depth.
 */
export function RepertoireCarousel({ items, dueIds = new Set(), title, side, onSelect }: RepertoireCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0);

  const next = () => setCenterIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCenterIndex((prev) => (prev - 1 + items.length) % items.length);

  // Helper to determine relative position in the focal loop
  const getRelativePosition = (index: number) => {
    let diff = index - centerIndex;
    
    // Handle wrap-around for infinite feeling
    if (diff > items.length / 2) diff -= items.length;
    if (diff < -items.length / 2) diff += items.length;
    
    return diff;
  };

  const accentColor = side === "white" ? "text-cyan-400" : "text-purple-400";
  const accentBorder = side === "white" ? "border-cyan-500/30" : "border-purple-500/30";

  if (items.length === 0) return null;

  return (
    <div className="space-y-8 py-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03),transparent_70%)] pointer-events-none" />

      {/* Header with System Metrics Styling */}
      <div className="flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl bg-white/5 border ${accentBorder} shadow-inner group overflow-hidden relative`}>
             <LayoutGrid className={`size-5 ${accentColor}`} />
             <div className="absolute inset-0 scanline opacity-20" />
          </div>
          <div>
            <h2 className="text-2xl font-space font-bold uppercase tracking-[0.2em] text-white">
              {title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Cpu className="size-3 text-white/20" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Repertoire_Nodes: {items.length}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/50 transition-all backdrop-blur-md"
            aria-label="Previous opening"
          >
            <ChevronLeft className="size-6" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/50 transition-all backdrop-blur-md"
            aria-label="Next opening"
          >
            <ChevronRight className="size-6" />
          </motion.button>
        </div>
      </div>

      {/* Animated Carousel Track */}
      <div className="relative h-[580px] w-full flex items-center justify-center">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) next();
            if (info.offset.x > 100) prev();
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => {
              const relPos = getRelativePosition(index);
              const isVisible = Math.abs(relPos) <= 1; // Strict 3-card focus for performance

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8, x: relPos * 400 }}
                  animate={{ 
                    opacity: Math.abs(relPos) === 0 ? 1 : 0.4 / Math.abs(relPos), 
                    scale: Math.abs(relPos) === 0 ? 1 : 0.9,
                    x: relPos * 360,
                    zIndex: 20 - Math.abs(relPos),
                  }}
                  exit={{ opacity: 0, scale: 0.5, x: relPos * 500 }}
                  transition={{ type: "spring", stiffness: 300, damping: 35 }}
                  className="absolute"
                >
                  <OpeningCard
                    opening={item}
                    isActive={relPos === 0}
                    isDue={dueIds.has(item.id)}
                    onClick={() => {
                      if (relPos === 0 && onSelect) {
                        onSelect(item);
                      } else {
                        setCenterIndex(index);
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tactical Coordinate Markers for atmosphere */}
      <div className="absolute bottom-4 left-6 flex flex-col gap-1 text-[8px] font-mono text-white/10 uppercase tracking-widest">
        <span>STRAT_X: {centerIndex}.001</span>
        <span>NODE_LINK: ENCRYPTED</span>
      </div>
    </div>
  );
}
