'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Waves, Zap, Activity } from 'lucide-react'

interface TelemetryChartsProps {
  waterHistory: number[]
  voltageHistory: number[]
  currentHistory: number[]
}

function MiniChart({ data, color, max, label, unit }: { data: number[]; color: string; max: number; label: string; unit: string }) {
  const currentVal = data[data.length - 1] ?? 0
  const points = data.map((val, idx) => {
    const x = (idx / Math.max(data.length - 1, 1)) * 100
    const y = 100 - (val / max) * 100
    return `${x},${Math.max(5, Math.min(95, y))}`
  }).join(' ')

  return (
    <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-semibold text-white/50">{label}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{currentVal} {unit}</span>
      </div>
      <div className="h-14 w-full relative mt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  )
}

export default function TelemetryCharts({ waterHistory, voltageHistory, currentHistory }: TelemetryChartsProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-purple-400" /> Real-Time Sensor Telemetry Charts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniChart data={waterHistory} color="#3b82f6" max={100} label="Water Level (JSN-SR04T)" unit="cm" />
        <MiniChart data={voltageHistory} color="#f59e0b" max={260} label="Voltage (ZMPT101B)" unit="V" />
        <MiniChart data={currentHistory} color="#8b5cf6" max={15} label="Current (SCT-013)" unit="A" />
      </div>
    </div>
  )
}
