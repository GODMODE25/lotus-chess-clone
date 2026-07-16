"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EloHistoryPoint {
  date: string
  elo: number
}

interface EloProgressionChartProps {
  data: EloHistoryPoint[]
}

const chartConfig = {
  elo: {
    label: "Elo Rating",
    color: "#bd00ff",
  },
}

export function EloProgressionChart({ data }: EloProgressionChartProps) {
  // Get latest elo for the reference line
  const latestElo = data[data.length - 1]?.elo || 1200

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#bd00ff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(255,255,255,0.2)" 
          fontSize={8} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: 'rgba(255,255,255,0.2)' }}
          dy={10}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.2)" 
          fontSize={8} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: 'rgba(255,255,255,0.2)' }}
          domain={['dataMin - 100', 'dataMax + 100']}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="elo"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 0 }}
          activeDot={{ r: 4, stroke: '#bd00ff', strokeWidth: 2, fill: '#050507' }}
          style={{ filter: "url(#glow)" }}
        />
        <ReferenceLine 
          y={latestElo} 
          stroke="rgba(0,240,255,0.2)" 
          strokeDasharray="3 3" 
          label={{ 
            position: 'right', 
            value: `GM CUR`, 
            fill: 'rgba(0,240,255,0.4)', 
            fontSize: 8,
            fontFamily: 'JetBrains Mono'
          }} 
        />
      </LineChart>
    </ChartContainer>
  )
}
