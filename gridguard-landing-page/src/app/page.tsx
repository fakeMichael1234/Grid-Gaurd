'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SparklesCore } from '@/components/ui/sparkles'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { GlassButton } from '@/components/ui/glass-button'
import { Zap, Shield, Activity, Globe, Lock, Cpu } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-hidden">
      
      {/* Full-screen Layered Background Ambient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,180,255,0.18) 0%, transparent 80%)' }}
      />

      {/* Full-screen Canvas Sparkles Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <SparklesCore
          id="gridguard-sparkles-fullscreen"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={85}
          particleColor="#00E5FF"
          speed={0.8}
          className="w-full h-full"
        />
      </div>

      {/* Top Brand Header */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">GridGuard</span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mt-0.5">
              AI Flood &amp; Grid Safety System
            </span>
          </div>
        </div>

        {/* Header Navigation Glass Buttons */}
        <div className="flex items-center gap-3">
          <GlassButton
            label="Login Portal"
            variant="default"
            icon={<Lock className="w-3.5 h-3.5 text-cyan-400" />}
            onClick={() => { window.location.href = '/login.html' }}
            className="!px-4 !py-2 !rounded-xl text-xs"
          />
          <GlassButton
            label="Simulation"
            variant="cyan"
            icon={<Cpu className="w-3.5 h-3.5" />}
            onClick={() => { window.location.href = '/simulation' }}
            className="!px-4 !py-2 !rounded-xl text-xs"
          />
        </div>
      </header>

      {/* Main Hero Overview */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-12 select-none">
        <div className="relative z-10 flex flex-col items-center">
          {/* Status badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <div className="h-3 w-px bg-white/20" />
            <div className="p-0.5 rounded bg-gradient-to-br from-cyan-500 to-blue-600">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.15em] text-cyan-400/90 uppercase">
              GridGuard Core System Operational
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-black leading-[0.95] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
          >
            <span className="text-white">Grid</span>
            <span className="text-shimmer">Guard</span>
          </motion.h1>

          {/* Glow Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-64 h-px mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />
            <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent h-[2px] blur-md opacity-60" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-10 font-light"
          >
            AI-Powered Flood &amp; Grid Safety System.
            <br />
            <span className="text-white/40">Select Portal Login to access Citizen or Officers portals, or Launch Simulation to view the Flood Digital Twin.</span>
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.45)} className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <LiquidMetalButton
                label="Login Portal"
                onClick={() => { window.location.href = '/login.html' }}
              />
              <LiquidMetalButton
                label="Simulation"
                onClick={() => { window.location.href = '/simulation' }}
              />
            </div>
            <p className="text-[11px] text-white/30 tracking-widest uppercase">
              Secured · TLS 1.3 · Municipal Safety Portal
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 border-t border-white/5 bg-[#02040c] text-center text-xs text-white/30 font-mono">
        <p>GridGuard Platform · AI-Powered Flood &amp; Grid Safety System</p>
      </footer>
    </div>
  )
}
