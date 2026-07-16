"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MotifStat {
  motif: string
  value: number
}

interface MotifRadarProps {
  data: MotifStat[]
}

const chartConfig = {
  value: {
    label: "Mastery",
    color: "#00f0ff",
  },
}

export function MotifRadar({ data }: MotifRadarProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.05)" />
        <PolarAngleAxis 
          dataKey="motif" 
          tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 500 }}
        />
        <Radar
          name="Mastery"
          dataKey="value"
          stroke="#bd00ff"
          fill="#bd00ff"
          fillOpacity={0.2}
          dot={{ r: 2, fill: "#bd00ff" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}
