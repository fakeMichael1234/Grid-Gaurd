'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Menu, X, Shield, Globe, Cpu } from 'lucide-react'

const navLinks = [
  { label: 'Overview', href: '#hero' },
  { label: 'Flood Intelligence', href: '#flood-monitor' },
  { label: 'Hardware Simulation', href: '#simulation' },
  { label: 'Architecture', href: '#architecture' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">GridGuard</span>
            <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">Flood &amp; Grid Safety</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider text-gray-400 hover:text-cyan-400 transition-colors font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login.html"
            className="text-xs px-4 py-2 rounded-lg font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            Portal Login
          </a>
          <a
            href="#simulation"
            className="text-xs px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" /> Launch Platform
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0f25] border-t border-white/10 px-6 py-6 flex flex-col gap-4"
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-sm py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/login.html"
              onClick={() => setMobileOpen(false)}
              className="text-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-white/10"
            >
              Portal Login
            </a>
            <a
              href="#simulation"
              onClick={() => setMobileOpen(false)}
              className="text-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              Launch Simulation
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
