'use client'

import React from 'react'

export default function SimulationDashboard() {
  return (
    <div className="w-screen h-screen bg-[#070a0d] overflow-hidden relative">
      {/* Floating Home Button */}
      <a
        href="/"
        className="fixed top-3 left-4 z-50 px-3 py-1.5 rounded-md bg-[#0d1319]/90 border border-[#1c2733] text-cyan-400 hover:text-white font-mono text-xs flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-colors"
      >
        ← Home
      </a>

      {/* Flood Digital Twin Console Frame */}
      <iframe
        src="/flood_digital_twin_3.html"
        className="w-full h-full border-0"
        title="GridGuard Flood Digital Twin Console"
      />
    </div>
  )
}
