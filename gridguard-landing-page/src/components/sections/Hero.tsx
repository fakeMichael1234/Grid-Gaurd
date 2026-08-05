'use client'

import React from 'react'
import { motion } from 'framer-motion'
import GridModel from '../three/GridModel'
import { ArrowRight, Activity, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#050816]">
      {/* 3D Background */}
      <GridModel />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-cyan-500/30">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-medium text-cyan-500 tracking-wider uppercase">GridGuard OS v2.4 Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Powering Smarter Grids <br />
            <span className="text-gradient">with AI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Monitor, predict, and prevent electrical failures before they happen using real-time analytics and intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="group relative px-8 py-4 bg-transparent rounded-lg font-semibold text-white overflow-hidden w-full sm:w-auto cyan-glow">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2">
                Request Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button className="px-8 py-4 glass glass-hover rounded-lg font-semibold text-white transition-all duration-300 w-full sm:w-auto">
              Explore Platform
            </button>
          </div>
        </motion.div>

        {/* Floating KPI Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Live Grid Status', value: 'Nominal', icon: <Activity className="text-cyan-500" />, delay: 0.2 },
            { title: 'AI Alerts Active', value: '14 Predictions', icon: <Zap className="text-purple-500" />, delay: 0.4 },
            { title: 'Overall Uptime', value: '99.98%', icon: <Activity className="text-blue-500" />, delay: 0.6 }
          ].map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + kpi.delay }}
              className="glass p-6 rounded-xl text-left border-t border-t-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 font-medium">{kpi.title}</span>
                {kpi.icon}
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none w-full"></div>
    </section>
  )
}
