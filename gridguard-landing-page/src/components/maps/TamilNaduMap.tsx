'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Zap, Waves, Activity, AlertTriangle, ShieldCheck, Info, X } from 'lucide-react'

export type TamilNaduRisk = 'NORMAL' | 'WATCH' | 'WARNING' | 'CRITICAL'

export interface TNDistrict {
  id: string
  name: string
  tamilName: string
  region: string
  lat: number
  lng: number
  svgPos: { x: number; y: number } // Percentage position inside standalone TN map SVG
  risk: TamilNaduRisk
  rainfall: number // mm
  waterLevel: number // cm
  voltage: number // V
  current: number // A
  polesCount: number
  condition: string
  timestamp: string
}

export const TN_DISTRICTS: TNDistrict[] = [
  {
    id: 'TN-CHE',
    name: 'Chennai',
    tamilName: 'சென்னை',
    region: 'Northern Coastal Region',
    lat: 13.0827,
    lng: 80.2707,
    svgPos: { x: 78, y: 18 },
    risk: 'CRITICAL',
    rainfall: 58.4,
    waterLevel: 88,
    voltage: 180,
    current: 12.4,
    polesCount: 42,
    condition: 'Heavy Coastal Downpour & High Inundation',
    timestamp: 'Just now',
  },
  {
    id: 'TN-CBE',
    name: 'Coimbatore',
    tamilName: 'கோயம்புத்தூர்',
    region: 'Western Plateau Region',
    lat: 11.0168,
    lng: 76.9558,
    svgPos: { x: 25, y: 48 },
    risk: 'NORMAL',
    rainfall: 4.2,
    waterLevel: 14,
    voltage: 238,
    current: 4.1,
    polesCount: 35,
    condition: 'Fair / Light Breeze',
    timestamp: '2 mins ago',
  },
  {
    id: 'TN-MDU',
    name: 'Madurai',
    tamilName: 'மதுரை',
    region: 'Southern Vaigai Basin',
    lat: 9.9252,
    lng: 78.1198,
    svgPos: { x: 48, y: 72 },
    risk: 'WARNING',
    rainfall: 36.8,
    waterLevel: 62,
    voltage: 210,
    current: 7.8,
    polesCount: 28,
    condition: 'Moderate Rainfall & River Surge',
    timestamp: 'Just now',
  },
  {
    id: 'TN-TRY',
    name: 'Tiruchirappalli (Trichy)',
    tamilName: 'திருச்சிராப்பள்ளி',
    region: 'Central Kaveri Delta',
    lat: 10.7905,
    lng: 78.7047,
    svgPos: { x: 55, y: 54 },
    risk: 'WATCH',
    rainfall: 18.5,
    waterLevel: 38,
    voltage: 230,
    current: 5.2,
    polesCount: 30,
    condition: 'Overcast & Intermittent Drizzle',
    timestamp: '4 mins ago',
  },
  {
    id: 'TN-SLM',
    name: 'Salem',
    tamilName: 'சேலம்',
    region: 'North-Central Plateau',
    lat: 11.6643,
    lng: 78.1460,
    svgPos: { x: 46, y: 36 },
    risk: 'NORMAL',
    rainfall: 8.0,
    waterLevel: 20,
    voltage: 240,
    current: 3.8,
    polesCount: 24,
    condition: 'Passing Clouds',
    timestamp: '5 mins ago',
  },
  {
    id: 'TN-CUD',
    name: 'Cuddalore',
    tamilName: 'கடலூர்',
    region: 'Coromandel Coastal Lowlands',
    lat: 11.7480,
    lng: 79.7714,
    svgPos: { x: 74, y: 38 },
    risk: 'CRITICAL',
    rainfall: 64.2,
    waterLevel: 94,
    voltage: 165,
    current: 14.1,
    polesCount: 32,
    condition: 'Severe Cyclonic Inundation Alert',
    timestamp: '1 min ago',
  },
]

const riskColors: Record<TamilNaduRisk, string> = {
  NORMAL: '#10b981',
  WATCH: '#3b82f6',
  WARNING: '#f59e0b',
  CRITICAL: '#ef4444',
}

interface TamilNaduMapProps {
  onSelectDistrict?: (dist: TNDistrict) => void
}

export default function TamilNaduMap({ onSelectDistrict }: TamilNaduMapProps) {
  const [districts, setDistricts] = useState<TNDistrict[]>(TN_DISTRICTS)
  const [selectedId, setSelectedId] = useState<string>('TN-CHE')

  const selectedDist = districts.find(d => d.id === selectedId) || districts[0]

  const handleSelect = (dist: TNDistrict) => {
    setSelectedId(dist.id)
    if (onSelectDistrict) onSelectDistrict(dist)
  }

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#020512] p-5 relative overflow-hidden flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base font-bold text-white tracking-wide">Tamil Nadu District Infrastructure Map</h3>
          </div>
          <p className="text-xs text-white/40 mt-0.5">Exclusive Standalone Map of Tamil Nadu (தமிழ்நாடு) · 6 Major Districts Covered</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Watch</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Standalone Tamil Nadu Vector Map Canvas */}
        <div className="lg:col-span-2 relative rounded-xl border border-white/10 bg-[#030718] h-[460px] overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Standalone Map of Tamil Nadu Outline SVG */}
          <svg className="w-full h-full p-6 text-cyan-500/20" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet">
            {/* Tamil Nadu Standalone State Boundary Path */}
            <path
              d="M 230 40 
                 L 270 45 L 310 60 L 370 70 L 410 80 
                 L 430 110 L 410 150 L 400 200 L 420 240 L 435 270 
                 L 420 310 L 390 350 L 360 400 L 330 460 L 290 510 
                 L 260 550 L 240 570 L 220 560 L 200 520 L 190 470 
                 L 160 430 L 130 380 L 100 340 L 80 300 L 90 260 
                 L 120 230 L 150 200 L 170 160 L 190 110 L 210 70 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="rgba(0, 229, 255, 0.4)"
              strokeWidth="3"
              strokeDasharray="none"
              filter="drop-shadow(0px 0px 12px rgba(0, 229, 255, 0.15))"
            />

            {/* Internal District Region Division Lines */}
            <path d="M 370 70 L 280 180 L 390 350" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 170 160 L 280 180 L 130 380" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 280 180 L 260 550" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Kaveri River Delta Path */}
            <path d="M 170 240 Q 250 280 415 280" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Bay of Bengal label */}
            <text x="380" y="450" fill="rgba(0, 229, 255, 0.25)" fontSize="14" fontFamily="monospace" fontWeight="bold" transform="rotate(70 380 450)">BAY OF BENGAL</text>
            <text x="210" y="580" fill="rgba(255, 255, 255, 0.3)" fontSize="11" fontFamily="monospace" fontWeight="bold">INDIAN OCEAN</text>
          </svg>

          {/* District Pins Placed Precisely on the Tamil Nadu Map */}
          {districts.map(dist => {
            const isSelected = selectedId === dist.id
            const color = riskColors[dist.risk]

            return (
              <div
                key={dist.id}
                style={{ left: `${dist.svgPos.x}%`, top: `${dist.svgPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                onClick={() => handleSelect(dist)}
              >
                {/* Pulsing Critical Risk Ring */}
                {dist.risk === 'CRITICAL' && (
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/60 bg-red-500/20 pointer-events-none"
                    animate={{ width: [30, 75, 30], height: [30, 75, 30], opacity: [0.8, 0.1, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}

                {/* Pin Button */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'ring-2 ring-white scale-125 z-40 shadow-2xl' : ''
                  }`}
                  style={{
                    backgroundColor: `${color}35`,
                    borderColor: color,
                    boxShadow: `0 0 16px ${color}90`,
                  }}
                >
                  <MapPin className="w-4 h-4 text-white" style={{ color }} />
                </motion.div>

                {/* District Label */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-white/90 whitespace-nowrap opacity-90 group-hover:opacity-100 shadow-md">
                  {dist.name} <span className="text-[10px] text-cyan-400">({dist.tamilName})</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected District Telemetry & Risk Panel */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">{selectedDist.region}</span>
                <h3 className="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                  {selectedDist.name} <span className="text-sm font-normal text-white/40">({selectedDist.tamilName})</span>
                </h3>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${riskColors[selectedDist.risk]}20`,
                  color: riskColors[selectedDist.risk],
                  border: `1px solid ${riskColors[selectedDist.risk]}40`,
                }}
              >
                {selectedDist.risk}
              </span>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-4">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase text-white/40 block mb-0.5">Precipitation</span>
                <span className="text-sm font-mono font-bold text-blue-400">{selectedDist.rainfall} mm</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase text-white/40 block mb-0.5">Water Inundation</span>
                <span className="text-sm font-mono font-bold text-cyan-400">{selectedDist.waterLevel} cm</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase text-white/40 block mb-0.5">Bus Voltage</span>
                <span className="text-sm font-mono font-bold text-amber-400">{selectedDist.voltage} V</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase text-white/40 block mb-0.5">Monitored Poles</span>
                <span className="text-sm font-mono font-bold text-purple-400">{selectedDist.polesCount} Nodes</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
              <span className="text-white/40 block mb-1">Environmental Status:</span>
              <p className="text-white/80 leading-relaxed">{selectedDist.condition}</p>
            </div>
          </div>

          {/* Quick Select Buttons for 6 Districts */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Covered Districts</h4>
            <div className="grid grid-cols-2 gap-2">
              {districts.map(d => (
                <button
                  key={d.id}
                  onClick={() => handleSelect(d)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedId === d.id
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                      : 'bg-white/[0.02] border-white/[0.05] text-white/70 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{d.name}</p>
                    <p className="text-[9px] opacity-50">{d.tamilName}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColors[d.risk] }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
