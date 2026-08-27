'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, Waves, Zap, Activity, Cpu } from 'lucide-react'
import { SensorInfo, SensorData } from '@/lib/simulation-engine'

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves className="w-6 h-6 text-blue-400" />,
  Zap: <Zap className="w-6 h-6 text-amber-400" />,
  Activity: <Activity className="w-6 h-6 text-purple-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
}

function getCurrentValue(sensor: SensorInfo, data: SensorData): string {
  switch (sensor.name) {
    case 'JSN-SR04T': return `${data.waterLevel} cm`
    case 'ZMPT101B': return `${data.voltage} V`
    case 'SCT-013': return `${data.current.toFixed(1)} A`
    case 'ESP32 NodeMCU': return `Pole GG-P15 | ${data.timestamp}`
    default: return '—'
  }
}

function getStatus(sensor: SensorInfo, data: SensorData): { label: string; color: string } {
  switch (sensor.name) {
    case 'JSN-SR04T': return data.waterLevel > 50 ? { label: 'WARNING', color: '#f59e0b' } : { label: 'NORMAL', color: '#10b981' }
    case 'ZMPT101B': return data.voltage < 200 ? { label: 'ANOMALY', color: '#ef4444' } : { label: 'NORMAL', color: '#10b981' }
    case 'SCT-013': return data.current > 8 ? { label: 'OVERCURRENT', color: '#ef4444' } : { label: 'NORMAL', color: '#10b981' }
    default: return { label: 'ONLINE', color: '#10b981' }
  }
}

export default function SensorModal({ sensor, onClose, currentData }: { sensor: SensorInfo; onClose: () => void; currentData: SensorData }) {
  const status = getStatus(sensor, currentData)
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0f25] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">{iconMap[sensor.icon]}</div>
              <div>
                <h2 className="text-lg font-bold text-white">{sensor.name}</h2>
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: status.color }}>{status.label}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Purpose', value: sensor.purpose },
              { label: 'Measures', value: sensor.measures },
              { label: 'Current Value', value: getCurrentValue(sensor, currentData) },
              { label: 'GridGuard Role', value: sensor.role },
            ].map(row => (
              <div key={row.label} className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{row.label}</p>
                <p className="text-sm text-white/80 leading-relaxed">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
