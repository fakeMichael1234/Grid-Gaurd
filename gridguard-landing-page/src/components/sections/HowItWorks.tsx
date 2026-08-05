'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Database, Cpu, Zap } from 'lucide-react'

const steps = [
  {
    icon: <Database className="w-10 h-10 text-cyan-400" />,
    title: "1. Collect Grid Data",
    description: "High-frequency sensors placed on critical infrastructure ingest gigabytes of telemetry data per second."
  },
  {
    icon: <Cpu className="w-10 h-10 text-purple-400" />,
    title: "2. AI Analyzes Patterns",
    description: "Proprietary machine learning algorithms detect micro-anomalies that precede widespread failures."
  },
  {
    icon: <Zap className="w-10 h-10 text-blue-400" />,
    title: "3. Prevent Failures",
    description: "Automated routing and instant dispatch workflows mitigate faults before they trigger blackouts."
  }
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050816]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How GridGuard <span className="text-gradient">Operates</span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/50 to-blue-500/20 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center p-8 glass rounded-2xl max-w-md w-full border-t-2 border-t-transparent hover:border-t-cyan-500 transition-colors"
            >
              <div className="mb-6 p-5 rounded-full bg-[#050816] cyan-glow shadow-lg inline-block">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
