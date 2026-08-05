'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Brain, BarChart3, ShieldCheck, Globe, Wrench } from 'lucide-react'

const features = [
  {
    icon: <Activity className="w-8 h-8 text-cyan-400" />,
    title: "Real-Time Monitoring",
    description: "Continuous monitoring of electrical infrastructure with sub-second latency analytics."
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    title: "AI Fault Prediction",
    description: "Detect failures before they occur through advanced machine learning models."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    title: "Smart Analytics",
    description: "Advanced dashboards and insights for dynamic grid load balancing."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security ensuring your telemetry data remains encrypted and safe."
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    title: "Remote Monitoring",
    description: "Manage multiple regional grid locations from a single unified control center."
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-400" />,
    title: "Predictive Maintenance",
    description: "Reduce downtime and maintenance costs by automatically scheduling optimal repairs."
  }
]

export default function Features() {
  return (
    <section className="py-32 relative z-10 bg-[#050816]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Capabilities that <span className="text-gradient">Redefine</span> the Grid
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Leveraging cutting edge AI and high-frequency telemetry to protect your infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass glass-hover p-8 rounded-2xl group transition-all duration-300"
            >
              <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block group-hover:scale-110 transition-transform duration-300 border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
