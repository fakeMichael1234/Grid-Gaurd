'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Camera, MapPin, AlertTriangle } from 'lucide-react'

interface CitizenReportModalProps {
  onClose: () => void
  onSubmitReport: (report: {
    location: string
    type: string
    description: string
    photo: string
    timestamp: string
  }) => void
}

export default function CitizenReportModal({ onClose, onSubmitReport }: CitizenReportModalProps) {
  const [location, setLocation] = useState('452 Elm Street, Sector 4')
  const [type, setType] = useState('Rising Flood Water / Electrical Sagging')
  const [description, setDescription] = useState('Water rising rapidly near utility pole GG-P15. Visible water level approaching transformer level.')
  const [photo, setPhoto] = useState('Photo attached: flood_evid_01.jpg')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    onSubmitReport({
      location,
      type,
      description,
      photo,
      timestamp: nowStr,
    })
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0f25] shadow-2xl overflow-hidden p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Simulated Citizen Report</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <h4 className="text-base font-bold text-white">Report Logged Successfully</h4>
            <p className="text-xs text-white/50">Dispatched to Incident Feed &amp; GIS Map</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-white/50 mb-1 font-semibold uppercase tracking-wider text-[10px]">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-white/50 mb-1 font-semibold uppercase tracking-wider text-[10px]">Report Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0d1433] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="Rising Flood Water / Electrical Sagging">Rising Flood Water / Electrical Sagging</option>
                <option value="Transformer Sparking">Transformer Sparking</option>
                <option value="Water Main Leak">Water Main Leak</option>
              </select>
            </div>
            <div>
              <label className="block text-white/50 mb-1 font-semibold uppercase tracking-wider text-[10px]">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-white/50 mb-1 font-semibold uppercase tracking-wider text-[10px]">Evidence Photo</label>
              <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/5 text-white/60">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-[11px]">{photo}</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" /> Submit Report
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
