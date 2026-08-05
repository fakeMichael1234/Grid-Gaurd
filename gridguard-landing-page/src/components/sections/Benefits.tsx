'use client'

import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const AnimatedNumber = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          // If the final number has decimals, we ensure it shows properly, but for this impl we assume ints or manually handled
          if(end === 99.8) setCount(99.8)
          else setCount(end)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Benefits() {
  const stats = [
    { number: 99.8, suffix: "%", label: "System Uptime", desc: "Reliability across the grid" },
    { number: 40, suffix: "%", label: "Lower Maintenance", desc: "Cost reduction year-over-year" },
    { number: 85, suffix: "%", label: "Faster Detection", desc: "Decrease in fault response times" },
    { number: 24, suffix: "/7", label: "Monitoring", desc: "Continuous asset surveillance" }
  ]

  return (
    <section className="py-24 bg-[#0a0f25] relative border-y border-white/5">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600 mb-2">
                <AnimatedNumber end={stat.number} suffix={stat.suffix} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{stat.label}</h4>
              <p className="text-sm text-cyan-500/80 uppercase tracking-widest">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
