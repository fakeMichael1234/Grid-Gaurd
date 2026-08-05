'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Thermometer, Zap, AlertTriangle } from 'lucide-react'

export default function Showcase() {
  return (
    <section className="py-32 relative bg-[#050816] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Unprecedented <span className="text-gradient">Visibility</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A command center designed for precision. Real-time telemetry, AI predictions, and automated dispatch control at your fingertips.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/10 glass p-2 md:p-4 shadow-2xl shadow-cyan-500/10"
        >
          {/* Mac-like header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-500 font-mono">gridguard-ops-dashboard</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Panel */}
            <div className="flex flex-col gap-4">
              <div className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Power Consumption</p>
                  <p className="text-2xl font-bold text-white">4.2 GW</p>
                </div>
                <Zap className="text-yellow-400 opacity-50" />
              </div>
              <div className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg Temperature</p>
                  <p className="text-2xl font-bold text-white">42.4°C</p>
                </div>
                <Thermometer className="text-orange-400 opacity-50" />
              </div>
              <div className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between bg-red-950/20 border-red-500/20">
                <div>
                  <p className="text-red-400 text-xs uppercase tracking-wider mb-1">AI Alerts</p>
                  <p className="text-2xl font-bold text-white">3 Critical</p>
                </div>
                <AlertTriangle className="text-red-500 animate-pulse" />
              </div>
            </div>

            {/* Center Main Panel (Graph Mockup) */}
            <div className="lg:col-span-2 glass p-6 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white">Voltage Oscillation</h4>
                  <p className="text-xs text-gray-400">Sector 7 Alpha Grid (Live)</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30">Live Sync</span>
                </div>
              </div>
              
              {/* CSS Graph Animation Placeholder */}
              <div className="h-48 w-full flex items-end gap-1 px-2 pb-2">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: "10%" }}
                    animate={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-purple-500 rounded-t-sm opacity-80"
                  ></motion.div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050816] to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
