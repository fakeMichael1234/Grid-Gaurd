'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Waves, Zap, Activity, Cpu, Radio, Shield, AlertTriangle } from 'lucide-react'
import { SensorData, SensorInfo, SENSOR_DETAILS, RiskLevel } from '@/lib/simulation-engine'

const riskColors: Record<RiskLevel, string> = {
  SAFE: '#10b981',
  FLOOD_WARNING: '#f59e0b',
  GRID_ANOMALY: '#f59e0b',
  CRITICAL: '#ef4444',
}

interface Props {
  sensors: SensorData
  risk: RiskLevel
  isolated: boolean
  onSensorClick: (s: SensorInfo) => void
}

export default function PhysicalLayer({ sensors, risk, isolated, onSensorClick }: Props) {
  // Physical water height calculation: waterLevel is 0-100 cm
  const waterHeightPercent = Math.min(100, Math.max(10, sensors.waterLevel * 0.75))
  const isSparking = sensors.voltage < 180 && sensors.voltage > 0
  const isCritical = risk === 'CRITICAL'

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" /> Physical Infrastructure — Utility Pole GG-P15
        </h3>
        <span
          className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${riskColors[risk]}20`,
            color: riskColors[risk],
            border: `1px solid ${riskColors[risk]}40`,
          }}
        >
          {isolated ? 'ISOLATED' : risk}
        </span>
      </div>

      {/* Physical Pole & Environment Stage */}
      <div className="relative w-full h-[320px] rounded-lg border border-white/5 bg-[#030714] overflow-hidden flex flex-col justify-between p-4">
        {/* Sky background / grid ambient */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Dynamic Water Layer at Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none transition-all duration-700 ease-out"
          style={{
            height: `${waterHeightPercent}%`,
            background: 'linear-gradient(to top, rgba(0, 120, 212, 0.65) 0%, rgba(0, 229, 255, 0.3) 80%, rgba(0, 229, 255, 0.45) 100%)',
            borderTop: '2px solid rgba(0, 240, 255, 0.8)',
            boxShadow: '0 -4px 20px rgba(0, 229, 255, 0.3)',
          }}
        >
          {/* Animated wave surface line */}
          <svg className="w-full h-3 -mt-2 opacity-70" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path
              d="M 0 0 Q 300 60 600 0 T 1200 0 L 1200 120 L 0 120 Z"
              fill="rgba(0, 240, 255, 0.3)"
            />
          </svg>
          <div className="absolute top-2 left-3 text-[10px] font-mono font-bold text-cyan-200">
            Submerged Level: {sensors.waterLevel} cm
          </div>
        </motion.div>

        {/* Electrical Wires at top of pole */}
        <svg className="absolute top-10 left-0 right-0 w-full h-12 z-20 pointer-events-none opacity-40">
          <path d="M 0 15 Q 200 35 400 15 T 800 15" fill="none" stroke="#00e5ff" strokeWidth="2" />
          <path d="M 0 25 Q 200 45 400 25 T 800 25" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
        </svg>

        {/* Electrical Sparking Effect if Fault */}
        {isSparking && (
          <motion.div
            animate={{ opacity: [0.2, 1, 0.3, 1, 0.1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <Zap className="w-8 h-8 text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
          </motion.div>
        )}

        {/* Central Physical Utility Pole Structure */}
        <div className="relative z-20 flex flex-col items-center h-full justify-between py-2">
          {/* Top Cross-Arm & Transformer Box */}
          <div className="relative flex flex-col items-center">
            {/* Horizontal Cross-Arm */}
            <div className="w-44 h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded border border-white/20 shadow-md flex items-center justify-between px-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 blur-[1px]" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 blur-[1px]" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 blur-[1px]" />
            </div>

            {/* Transformer Box with ZMPT101B */}
            <div className="relative mt-1 w-20 h-16 bg-slate-800 border border-slate-600 rounded-md p-1 flex flex-col items-center justify-center shadow-lg">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">TRANSFORMER</span>
              <span className="text-xs font-mono font-bold" style={{ color: sensors.voltage < 180 ? '#ef4444' : '#f59e0b' }}>
                {sensors.voltage}V
              </span>

              {/* ZMPT101B Sensor Button mounted directly on Transformer */}
              <button
                onClick={() => onSensorClick(SENSOR_DETAILS['ZMPT101B'])}
                className="mt-1 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono font-bold text-amber-300 hover:bg-amber-500/40 transition-colors cursor-pointer"
              >
                ZMPT101B
              </button>
            </div>
          </div>

          {/* Vertical Pole Shaft */}
          <div className="relative w-4 flex-1 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 border-x border-slate-500 flex flex-col items-center justify-around">
            {/* SCT-013 Current Sensor Clamp on Pole */}
            <button
              onClick={() => onSensorClick(SENSOR_DETAILS['SCT-013'])}
              className="z-30 px-1.5 py-0.5 rounded bg-purple-500/30 border border-purple-500/50 text-[9px] font-mono font-bold text-purple-300 hover:bg-purple-500/50 transition-colors cursor-pointer whitespace-nowrap shadow-lg -translate-x-8"
            >
              SCT-013: {sensors.current.toFixed(1)}A
            </button>

            {/* ESP32 Edge Processing Unit mounted at mid-pole */}
            <button
              onClick={() => onSensorClick(SENSOR_DETAILS['ESP32'])}
              className="z-30 px-2 py-1 rounded bg-cyan-500/20 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300 hover:bg-cyan-500/40 transition-colors cursor-pointer flex items-center gap-1 shadow-xl"
            >
              <Cpu className="w-3 h-3 text-cyan-400 animate-pulse" /> ESP32 Edge
            </button>

            {/* JSN-SR04T Water Sensor pointing downward */}
            <button
              onClick={() => onSensorClick(SENSOR_DETAILS['JSN-SR04T'])}
              className="z-30 px-1.5 py-0.5 rounded bg-blue-500/30 border border-blue-500/50 text-[9px] font-mono font-bold text-blue-300 hover:bg-blue-500/50 transition-colors cursor-pointer whitespace-nowrap shadow-lg translate-x-8"
            >
              JSN-SR04T: {sensors.waterLevel}cm
            </button>
          </div>

          {/* Concrete Base */}
          <div className="w-12 h-4 bg-slate-600 border border-slate-500 rounded-t-sm z-20 flex items-center justify-center">
            <span className="text-[7px] font-mono text-slate-300">BASE</span>
          </div>
        </div>
      </div>

      {/* Sensor Interactive Cards Grid */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {[
          { key: 'JSN-SR04T', name: 'JSN-SR04T', val: `${sensors.waterLevel} cm`, label: 'Water Level', color: '#3b82f6', icon: <Waves className="w-3.5 h-3.5" /> },
          { key: 'ZMPT101B', name: 'ZMPT101B', val: `${sensors.voltage} V`, label: 'Voltage', color: '#f59e0b', icon: <Zap className="w-3.5 h-3.5" /> },
          { key: 'SCT-013', name: 'SCT-013', val: `${sensors.current.toFixed(1)} A`, label: 'Current', color: '#8b5cf6', icon: <Activity className="w-3.5 h-3.5" /> },
          { key: 'ESP32', name: 'ESP32 NodeMCU', val: isolated ? 'ISOLATED' : 'ONLINE', label: 'Edge Core', color: '#00e5ff', icon: <Cpu className="w-3.5 h-3.5" /> },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => onSensorClick(SENSOR_DETAILS[s.key])}
            className="p-2 rounded.lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-1.5 mb-1" style={{ color: s.color }}>
              {s.icon} <span className="text-[10px] font-bold font-mono text-white/80">{s.name}</span>
            </div>
            <span className="text-xs font-mono font-bold block" style={{ color: s.color }}>{s.val}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
