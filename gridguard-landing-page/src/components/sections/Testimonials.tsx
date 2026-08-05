'use client'

import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    company: "National Grid Corp",
    quote: "GridGuard completely transformed our incident response. We detected a major substation failure 4 hours before it occurred, saving millions in downtime.",
    author: "Sarah Jenkins, CTO"
  },
  {
    company: "Pacific Utilities",
    quote: "The AI prediction models are terrifyingly accurate. It's like having a crystal ball for our infrastructure. The ROI was realized in month one.",
    author: "David Chen, VP of Operations"
  },
  {
    company: "EuroPower Network",
    quote: "Deployment was seamless, and the glass UI is a massive step up from our legacy tools. Our dispatchers love it.",
    author: "Elena Rostova, Grid Lead"
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0f25]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Enterprise Utilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass p-8 rounded-2xl relative"
            >
              <div className="text-4xl text-cyan-500 opacity-20 absolute top-4 left-4">"</div>
              <p className="text-gray-300 italic mb-6 relative z-10">
                "{t.quote}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-bold text-white">{t.author}</p>
                <p className="text-cyan-500 text-sm">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
