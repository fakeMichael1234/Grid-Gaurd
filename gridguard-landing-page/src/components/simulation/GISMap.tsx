'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, AlertTriangle, Shield, CheckCircle, Info, X } from 'lucide-react'
import { PoleData, RiskLevel } from '@/lib/simulation-engine'

const riskColors: Record<RiskLevel, string> = {
  SAFE: '#10b981',
  FLOOD_WARNING: '#f59e0b',
  GRID_ANOMALY: '#f59e0b',
  CRITICAL: '#ef4444',
}

interface GISMapProps {
  poles: PoleData[]
  selectedPole: string | null
  onSelectPole: (poleId: string | null) => void
}

// Fixed Positions on Tamil Nadu Outline Map
const TN_POLE_LOCATIONS = [
  { id: 'GG-P11', district: 'Chennai', x: 78, y: 20 },
  { id: 'GG-P12', district: 'Coimbatore', x: 25, y: 48 },
  { id: 'GG-P13', district: 'Madurai', x: 48, y: 72 },
  { id: 'GG-P14', district: 'Tiruchirappalli (Trichy)', x: 55, y: 54 },
  { id: 'GG-P15', district: 'Cuddalore Coastal Line', x: 74, y: 38 },
]

export default function GISMap({ poles, selectedPole, onSelectPole }: GISMapProps) {
  const selectedPoleData = poles.find(p => p.id === selectedPole)

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 relative overflow-hidden flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-3 z-10">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" /> Tamil Nadu GIS Grid Telemetry Map
          </h3>
          <p className="text-[10px] text-cyan-400 font-mono">Standalone Tamil Nadu Boundary · 5 Monitored Districts</p>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
        </div>
      </div>

      {/* Standalone Tamil Nadu Map Container */}
      <div className="relative flex-1 rounded-lg border border-white/10 bg-[#030615] overflow-hidden select-none">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Tamil Nadu State Outline Vector SVG */}
        <svg className="absolute inset-0 w-full h-full p-4 opacity-40 pointer-events-none" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 230 40 L 270 45 L 310 60 L 370 70 L 410 80 L 430 110 L 410 150 L 400 200 L 420 240 L 435 270 L 420 310 L 390 350 L 360 400 L 330 460 L 290 510 L 260 550 L 240 570 L 220 560 L 200 520 L 190 470 L 160 430 L 130 380 L 100 340 L 80 300 L 90 260 L 120 230 L 150 200 L 170 160 L 190 110 L 210 70 Z"
            fill="rgba(0, 229, 255, 0.05)"
            stroke="#00e5ff"
            strokeWidth="2.5"
          />
          <text x="370" y="440" fill="rgba(0, 229, 255, 0.3)" fontSize="12" fontFamily="monospace">BAY OF BENGAL</text>
        </svg>

        {/* Map Markers for Tamil Nadu Districts */}
        {poles.map((pole, index) => {
          const loc = TN_POLE_LOCATIONS[index] || { district: 'TN Region', x: 50, y: 50 }
          const isSelected = selectedPole === pole.id
          const isCritical = pole.risk === 'CRITICAL'
          const color = riskColors[pole.risk]

          return (
            <div
              key={pole.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              onClick={() => onSelectPole(isSelected ? null : pole.id)}
            >
              {/* Critical risk radius pulse */}
              {isCritical && (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/50 bg-red-500/15 pointer-events-none"
                  animate={{ width: [25, 70, 25], height: [25, 70, 25], opacity: [0.7, 0.1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              )}

              {/* Marker pin */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`relative flex items-center justify-center w-7 h-7 rounded-full border shadow-lg ${
                  isSelected ? 'ring-2 ring-white scale-110 z-40' : ''
                }`}
                style={{
                  backgroundColor: `${color}30`,
                  borderColor: color,
                  boxShadow: `0 0 12px ${color}70`,
                }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color }} />
              </motion.div>

              {/* Label */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/90 shadow-md">
                {pole.id} · <span className="text-cyan-400">{loc.district}</span>
              </div>
            </div>
          )
        })}

        {/* Selected Pole Detail Panel */}
        <AnimatePresence>
          {selectedPoleData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-3 left-3 right-3 z-50 bg-[#0a0f25]/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-cyan-400">{selectedPoleData.id}</span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${riskColors[selectedPoleData.risk]}20`,
                        color: riskColors[selectedPoleData.risk],
                        border: `1px solid ${riskColors[selectedPoleData.risk]}40`,
                      }}
                    >
                      {selectedPoleData.risk}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">{selectedPoleData.label}</p>
                </div>
                <button
                  onClick={() => onSelectPole(null)}
                  className="text-white/40 hover:text-white p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/5 text-center">
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="block text-[9px] uppercase tracking-wider text-white/40">Water Level</span>
                  <span className="text-xs font-mono font-bold text-blue-400">{selectedPoleData.sensors.waterLevel} cm</span>
                </div>
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="block text-[9px] uppercase tracking-wider text-white/30">Voltage</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{selectedPoleData.sensors.voltage} V</span>
                </div>
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="block text-[9px] uppercase tracking-wider text-white/30">Current</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{selectedPoleData.sensors.current.toFixed(1)} A</span>
                </div>
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="block text-[9px] uppercase tracking-wider text-white/30">Status</span>
                  <span className="text-xs font-mono font-bold text-white/80">{selectedPoleData.isolated ? 'Isolated' : 'Active'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
