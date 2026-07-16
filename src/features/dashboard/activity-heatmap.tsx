"use client"

import { cn } from "@/lib/utils"

interface ActivityHeatmapProps {
  className?: string
}

export function ActivityHeatmap({ className }: ActivityHeatmapProps) {
  // Generate mock activity for the heatmap (5x7 grid as in design)
  const cells = Array.from({ length: 35 }).map(() => ({
    intensity: Math.floor(Math.random() * 5), // 0 to 4
    active: Math.random() > 0.3
  }))

  const getIntensityClass = (intensity: number) => {
    switch (intensity) {
      case 1: return "bg-cyan-500/10"
      case 2: return "bg-cyan-500/30"
      case 3: return "bg-cyan-500/60 shadow-[0_0_8px_rgba(0,240,255,0.2)]"
      case 4: return "bg-cyan-500/90 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
      default: return "bg-white/5"
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, i) => (
          <div 
            key={i} 
            className={cn(
              "aspect-square rounded-sm transition-all duration-500",
              getIntensityClass(cell.intensity)
            )}
          />
        ))}
      </div>
      
      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Intensity Profile</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-white/20 mr-1">Less</span>
          <div className="w-2 h-2 rounded-[1px] bg-cyan-500/10" />
          <div className="w-2 h-2 rounded-[1px] bg-cyan-500/30" />
          <div className="w-2 h-2 rounded-[1px] bg-cyan-500/60" />
          <div className="w-2 h-2 rounded-[1px] bg-cyan-500/90" />
          <span className="text-[8px] font-mono text-white/20 ml-1">More</span>
        </div>
      </div>
    </div>
  )
}
