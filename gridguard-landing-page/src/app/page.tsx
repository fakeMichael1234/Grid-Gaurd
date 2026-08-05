'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SparklesCore } from '@/components/ui/sparkles'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { Zap, Shield, Activity } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden select-none">

      {/* ── Layered backgrounds ── */}
      {/* Deep radial ambient */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,80,120,0.18) 0%, transparent 70%)' }}
      />

      {/* Sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="gridguard-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1.1}
          particleDensity={60}
          particleColor="#00E5FF"
          speed={0.8}
          className="w-full h-full"
        />
      </div>

      {/* Bottom fog */}
      <div className="absolute bottom-0 left-0 w-full h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Top fog */}
      <div className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }}
      />

      {/* Subtle center vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Status badge */}
        <motion.div {...fadeUp(0)}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
          </span>
          <div className="h-3 w-px bg-white/20" />
          <div className="p-0.5 rounded bg-gradient-to-br from-cyan-500 to-blue-600">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.15em] text-cyan-400/90 uppercase">
            GridGuard OS v2.4 &nbsp;·&nbsp; All Systems Nominal
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1 {...fadeUp(0.1)}
          className="font-black leading-[0.95] tracking-[-0.04em] mb-6"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
        >
          <span className="text-white">Grid</span>
          <span className="text-shimmer">Guard</span>
        </motion.h1>

        {/* Glow divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-64 h-px mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent h-[2px] blur-md opacity-60" />
        </motion.div>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.3)}
          className="text-base md:text-lg text-white/40 max-w-lg leading-relaxed mb-12 font-light"
        >
          AI-powered electrical grid monitoring & telemetry.
          <br />
          <span className="text-white/25">Predict and prevent infrastructure failures — in real time.</span>
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.45)} className="flex flex-col items-center gap-6">
          <LiquidMetalButton
            label="Login to Portal"
            onClick={() => { window.location.href = '/login.html' }}
          />
          <p className="text-[11px] text-white/20 tracking-widest uppercase">
            Secured · TLS 1.3 · End-to-end encrypted
          </p>
        </motion.div>
      </div>

      {/* ── Bottom stat bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-6 left-0 right-0 z-20 flex justify-center"
      >
        <div className="flex items-center gap-8 px-8 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
          {[
            { icon: <Activity className="w-3.5 h-3.5 text-cyan-400" />, label: 'Grid Status', value: 'Nominal' },
            { icon: <Zap className="w-3.5 h-3.5 text-emerald-400" />, label: 'AI Alerts', value: '14 Active' },
            { icon: <Shield className="w-3.5 h-3.5 text-blue-400" />, label: 'Uptime', value: '99.98%' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              {icon}
              <div className="text-left">
                <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none mb-0.5">{label}</p>
                <p className="text-xs font-semibold text-white/70 leading-none">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </main>
  )
}
