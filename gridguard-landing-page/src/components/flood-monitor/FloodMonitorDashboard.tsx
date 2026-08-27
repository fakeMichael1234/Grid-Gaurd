'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Search, Wind, Droplets, CloudRain, Thermometer, MapPin,
  Clock, ShieldAlert, ArrowLeft, RefreshCw, Layers, CheckCircle2, AlertTriangle, Navigation
} from 'lucide-react'

export type LocationRisk = 'Normal' | 'Watch' | 'Warning' | 'Critical'

export interface MonitoredDistrict {
  id: string
  name: string
  tamilName: string
  region: string
  lat: number
  lng: number
  svgPos: { x: number; y: number } // Percentage position inside standalone TN map SVG
  risk: LocationRisk
  temp: number
  rainfall: number
  humidity: number
  windSpeed: number
  condition: string
  timestamp: string
  waterLevelRatio: number // 0 - 100%
}

const TN_DISTRICT_PRESETS: MonitoredDistrict[] = [
  { id: 'LOC-CHENNAI', name: 'Chennai', tamilName: 'சென்னை', region: 'Tamil Nadu (Northern Coastal)', lat: 13.0827, lng: 80.2707, svgPos: { x: 78, y: 18 }, risk: 'Warning', temp: 31.2, rainfall: 34.5, humidity: 84, windSpeed: 21.0, condition: 'Tropical Coastal Downpour', timestamp: 'Just now', waterLevelRatio: 68 },
  { id: 'LOC-CUDDALORE', name: 'Cuddalore', tamilName: 'கடலூர்', region: 'Tamil Nadu (Coastal Belt)', lat: 11.7480, lng: 79.7714, svgPos: { x: 74, y: 38 }, risk: 'Critical', temp: 29.5, rainfall: 58.4, humidity: 91, windSpeed: 26.2, condition: 'Severe Coastal Flood Alert', timestamp: '1 min ago', waterLevelRatio: 88 },
  { id: 'LOC-MADURAI', name: 'Madurai', tamilName: 'மதுரை', region: 'Tamil Nadu (Southern Basin)', lat: 9.9252, lng: 78.1198, svgPos: { x: 48, y: 72 }, risk: 'Warning', temp: 30.1, rainfall: 38.2, humidity: 82, windSpeed: 18.4, condition: 'Vaigai Basin Rain Surge', timestamp: '3 mins ago', waterLevelRatio: 64 },
  { id: 'LOC-TRICHY', name: 'Tiruchirappalli (Trichy)', tamilName: 'திருச்சிராப்பள்ளி', region: 'Tamil Nadu (Kaveri Delta)', lat: 10.7905, lng: 78.7047, svgPos: { x: 55, y: 54 }, risk: 'Watch', temp: 32.0, rainfall: 16.5, humidity: 74, windSpeed: 14.0, condition: 'Intermittent Showers', timestamp: 'Just now', waterLevelRatio: 42 },
  { id: 'LOC-COIMBATORE', name: 'Coimbatore', tamilName: 'கோயம்புத்தூர்', region: 'Tamil Nadu (Western Plateau)', lat: 11.0168, lng: 76.9558, svgPos: { x: 25, y: 48 }, risk: 'Normal', temp: 26.4, rainfall: 4.8, humidity: 68, windSpeed: 12.5, condition: 'Light Passing Drizzle', timestamp: '4 mins ago', waterLevelRatio: 18 },
  { id: 'LOC-SALEM', name: 'Salem', tamilName: 'சேலம்', region: 'Tamil Nadu (North-Central)', lat: 11.6643, lng: 78.1460, svgPos: { x: 46, y: 36 }, risk: 'Normal', temp: 29.8, rainfall: 8.2, humidity: 62, windSpeed: 11.0, condition: 'Overcast Skies', timestamp: '5 mins ago', waterLevelRatio: 22 },
  { id: 'LOC-TIRUNELVELI', name: 'Tirunelveli', tamilName: 'திருநெல்வேலி', region: 'Tamil Nadu (Tamirabharani Basin)', lat: 8.7139, lng: 77.7567, svgPos: { x: 38, y: 88 }, risk: 'Watch', temp: 28.5, rainfall: 22.4, humidity: 78, windSpeed: 16.8, condition: 'Moderate Riverbank Rainfall', timestamp: '2 mins ago', waterLevelRatio: 48 },
  { id: 'LOC-KANYAKUMARI', name: 'Kanyakumari', tamilName: 'கன்னியாகுமரி', region: 'Tamil Nadu (Southern Cape)', lat: 8.0883, lng: 77.5385, svgPos: { x: 30, y: 94 }, risk: 'Critical', temp: 27.9, rainfall: 62.0, humidity: 94, windSpeed: 31.5, condition: 'High Tide & Heavy Coastal Rainfall', timestamp: 'Just now', waterLevelRatio: 92 },
]

const riskColors: Record<LocationRisk, string> = {
  Normal: '#10b981',
  Watch: '#3b82f6',
  Warning: '#f59e0b',
  Critical: '#ef4444',
}

export default function FloodMonitorDashboard() {
  const [locations, setLocations] = useState<MonitoredDistrict[]>(TN_DISTRICT_PRESETS)
  const [selectedId, setSelectedId] = useState<string>('LOC-CHENNAI')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const selectedLocation = locations.find(l => l.id === selectedId) || locations[0]

  // Filter locations by search query (matching English name or Tamil name)
  const filteredLocations = locations.filter(
    l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         l.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         l.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Fetch real-time weather data from Open-Meteo for selected Tamil Nadu district
  const fetchOpenMeteoData = useCallback(async (loc: MonitoredDistrict) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&current_weather=true&hourly=precipitation,relativehumidity_2m`
      const res = await fetch(url)
      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      if (data && data.current_weather) {
        const cw = data.current_weather
        const rain = data.hourly?.precipitation?.[0] ?? (cw.weathercode > 50 ? 25 : 4)
        const humidity = data.hourly?.relativehumidity_2m?.[0] ?? 80
        
        let newRisk: LocationRisk = 'Normal'
        if (rain > 40) newRisk = 'Critical'
        else if (rain > 20) newRisk = 'Warning'
        else if (rain > 8) newRisk = 'Watch'

        setLocations(prev =>
          prev.map(p =>
            p.id === loc.id
              ? {
                  ...p,
                  temp: cw.temperature,
                  windSpeed: cw.windspeed,
                  rainfall: rain,
                  humidity,
                  risk: newRisk,
                  waterLevelRatio: Math.min(100, Math.round(rain * 1.6 + 18)),
                  timestamp: 'Live Open-Meteo API',
                }
              : p
          )
        )
        setIsDemoMode(false)
      }
    } catch {
      setIsDemoMode(true)
    }
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      fetchOpenMeteoData(selectedLocation)
    }
  }, [selectedId, fetchOpenMeteoData])

  const totalMonitored = locations.length
  const criticalCount = locations.filter(l => l.risk === 'Critical').length
  const warningCount = locations.filter(l => l.risk === 'Warning').length
  const watchCount = locations.filter(l => l.risk === 'Watch').length

  return (
    <div className="min-h-screen bg-[#050816] text-white select-none">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> <span className="text-sm hidden sm:inline">Home</span>
            </a>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-gradient-to-br from-cyan-500 to-blue-600">
                <Globe className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm">GridGuard Tamil Nadu Real-Time Flood Intelligence</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{isDemoMode ? 'Simulation / Demo Mode' : 'Open-Meteo Live Weather API'}</span>
            </div>
            <button
              onClick={() => selectedLocation && fetchOpenMeteoData(selectedLocation)}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'TN Monitored Districts', value: totalMonitored, color: '#00e5ff', icon: <MapPin className="w-4 h-4" /> },
            { label: 'Critical Flood Risk', value: criticalCount, color: '#ef4444', icon: <ShieldAlert className="w-4 h-4" /> },
            { label: 'Active Warnings', value: warningCount, color: '#f59e0b', icon: <AlertTriangle className="w-4 h-4" /> },
            { label: 'Watch State', value: watchCount, color: '#3b82f6', icon: <CheckCircle2 className="w-4 h-4" /> },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-white/40 block mb-1">{stat.label}</span>
                <span className="text-2xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Map Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4 flex flex-col">
            {/* Search Bar */}
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search Tamil Nadu district... (e.g. Chennai, Madurai, Coimbatore, Trichy, Cuddalore)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-lg p-1 text-xs">
                <button onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.2))} className="px-2 py-1 hover:bg-white/10 rounded font-bold cursor-pointer">-</button>
                <span className="px-2 text-white/40 font-mono">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.2))} className="px-2 py-1 hover:bg-white/10 rounded font-bold cursor-pointer">+</button>
              </div>
            </div>

            {/* Standalone Tamil Nadu Vector Map Container */}
            <div className="relative rounded-xl border border-white/[0.08] bg-[#020512] h-[480px] overflow-hidden flex items-center justify-center select-none">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Tamil Nadu State Outline Vector SVG (Standalone Tamil Nadu alone) */}
              <svg
                className="absolute inset-0 w-full h-full p-6 text-cyan-500/20 pointer-events-none transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
                viewBox="0 0 500 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M 230 40 
                     L 270 45 L 310 60 L 370 70 L 410 80 
                     L 430 110 L 410 150 L 400 200 L 420 240 L 435 270 
                     L 420 310 L 390 350 L 360 400 L 330 460 L 290 510 
                     L 260 550 L 240 570 L 220 560 L 200 520 L 190 470 
                     L 160 430 L 130 380 L 100 340 L 80 300 L 90 260 
                     L 120 230 L 150 200 L 170 160 L 190 110 L 210 70 Z"
                  fill="rgba(0, 229, 255, 0.05)"
                  stroke="rgba(0, 229, 255, 0.45)"
                  strokeWidth="3.5"
                  filter="drop-shadow(0px 0px 14px rgba(0, 229, 255, 0.2))"
                />

                {/* Regional Delta Stream */}
                <path d="M 170 240 Q 250 280 415 280" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="3" strokeLinecap="round" />

                {/* Ocean Boundaries */}
                <text x="375" y="440" fill="rgba(0, 229, 255, 0.3)" fontSize="13" fontFamily="monospace" fontWeight="bold" transform="rotate(70 375 440)">BAY OF BENGAL</text>
                <text x="200" y="580" fill="rgba(255, 255, 255, 0.3)" fontSize="11" fontFamily="monospace" fontWeight="bold">INDIAN OCEAN</text>
              </svg>

              {/* Map Location Pins Placed on Tamil Nadu Outline */}
              <div
                className="absolute inset-0 transition-transform duration-300 pointer-events-auto"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {filteredLocations.map(loc => {
                  const isSelected = selectedId === loc.id
                  const color = riskColors[loc.risk]

                  return (
                    <div
                      key={loc.id}
                      style={{ left: `${loc.svgPos.x}%`, top: `${loc.svgPos.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                      onClick={() => setSelectedId(loc.id)}
                    >
                      {loc.risk === 'Critical' && (
                        <motion.div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/60 bg-red-500/20 pointer-events-none"
                          animate={{ width: [26, 64, 26], height: [26, 64, 26], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'ring-2 ring-white scale-125 z-40 shadow-2xl' : ''
                        }`}
                        style={{
                          backgroundColor: `${color}35`,
                          borderColor: color,
                          boxShadow: `0 0 14px ${color}80`,
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5" style={{ color }} />
                      </motion.div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/90 whitespace-nowrap opacity-90 group-hover:opacity-100 shadow-md">
                        {loc.name} <span className="text-cyan-400">({loc.tamilName})</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tamil Nadu Monitored Districts Table */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Tamil Nadu District Environmental Surveillance Nodes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredLocations.map(loc => (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedId(loc.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedId === loc.id
                        ? 'bg-cyan-500/10 border-cyan-500/40'
                        : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: riskColors[loc.risk] }} />
                      <div>
                        <p className="text-sm font-semibold text-white">{loc.name} <span className="text-xs font-normal text-white/40">({loc.tamilName})</span></p>
                        <p className="text-[11px] text-white/40">{loc.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-xs font-mono font-semibold text-blue-400">{loc.temp}°C / {loc.rainfall}mm</p>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider block text-center"
                        style={{
                          backgroundColor: `${riskColors[loc.risk]}20`,
                          color: riskColors[loc.risk],
                          border: `1px solid ${riskColors[loc.risk]}40`,
                        }}
                      >
                        {loc.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Selected District Detail Card */}
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedLocation.name} <span className="text-sm font-normal text-white/40">({selectedLocation.tamilName})</span>
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">{selectedLocation.region} · ({selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)})</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0"
                  style={{
                    backgroundColor: `${riskColors[selectedLocation.risk]}20`,
                    color: riskColors[selectedLocation.risk],
                    border: `1px solid ${riskColors[selectedLocation.risk]}40`,
                  }}
                >
                  {selectedLocation.risk}
                </span>
              </div>

              {/* Weather Data Parameters */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" /> <span className="text-[10px] uppercase">Temperature</span>
                  </div>
                  <span className="text-base font-mono font-bold text-white">{selectedLocation.temp} °C</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 mb-1">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" /> <span className="text-[10px] uppercase">Precipitation</span>
                  </div>
                  <span className="text-base font-mono font-bold text-blue-400">{selectedLocation.rainfall} mm</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" /> <span className="text-[10px] uppercase">Humidity</span>
                  </div>
                  <span className="text-base font-mono font-bold text-white">{selectedLocation.humidity}%</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 mb-1">
                    <Wind className="w-3.5 h-3.5 text-teal-400" /> <span className="text-[10px] uppercase">Wind Speed</span>
                  </div>
                  <span className="text-base font-mono font-bold text-white">{selectedLocation.windSpeed} km/h</span>
                </div>
              </div>

              {/* Inundation Risk Index Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/40">District Inundation Risk Index</span>
                  <span className="font-mono font-bold" style={{ color: riskColors[selectedLocation.risk] }}>{selectedLocation.waterLevelRatio}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${selectedLocation.waterLevelRatio}%`,
                      backgroundColor: riskColors[selectedLocation.risk],
                    }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-white/30 flex items-center justify-between border-t border-white/5 pt-3">
                <span>Condition: {selectedLocation.condition}</span>
                <span className="flex items-center gap-1 font-mono"><Clock className="w-3 h-3" /> {selectedLocation.timestamp}</span>
              </div>
            </div>

            {/* Link to Hardware Simulation */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Localized Hardware Simulation</h4>
                <p className="text-[11px] text-white/50 mt-0.5">Observe localized utility pole GG-P15 &amp; sensor correlation</p>
              </div>
              <a
                href="/simulation"
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Launch Simulation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
