'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-32 relative bg-[#050816]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-800/30 to-purple-700/20"></div>
          <div className="absolute inset-0 bg-[#0a0f25]/80 backdrop-blur-xl"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-500/30"></div>
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 blur-sm"></div>

          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Modernize<br />
              <span className="text-gradient">Your Grid?</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Join leading utility companies already using GridGuard to prevent outages, reduce costs, and deliver uninterrupted power to millions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="group relative px-8 py-4 bg-transparent rounded-lg font-semibold text-white overflow-hidden cyan-glow">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2">
                  Schedule Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="px-8 py-4 glass glass-hover rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
