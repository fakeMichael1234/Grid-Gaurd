'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlassButtonProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'cyan' | 'red' | 'default'
  className?: string
}

export function GlassButton({
  label,
  icon,
  onClick,
  variant = 'default',
  className,
}: GlassButtonProps) {
  const variantStyles = {
    cyan: {
      border: 'border-cyan-400/30 hover:border-cyan-400/60',
      glow: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.25),inset_0_0_30px_rgba(0,229,255,0.06)]',
      bg: 'bg-cyan-500/[0.08] hover:bg-cyan-500/[0.15]',
      text: 'text-cyan-300',
      ring: 'focus-visible:ring-cyan-500/40',
      shine: 'from-cyan-400/20 via-transparent to-transparent',
    },
    red: {
      border: 'border-red-400/30 hover:border-red-400/60',
      glow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.25),inset_0_0_30px_rgba(239,68,68,0.06)]',
      bg: 'bg-red-500/[0.08] hover:bg-red-500/[0.15]',
      text: 'text-red-300',
      ring: 'focus-visible:ring-red-500/40',
      shine: 'from-red-400/20 via-transparent to-transparent',
    },
    default: {
      border: 'border-white/15 hover:border-white/30',
      glow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.08),inset_0_0_30px_rgba(255,255,255,0.04)]',
      bg: 'bg-white/[0.06] hover:bg-white/[0.10]',
      text: 'text-white/90',
      ring: 'focus-visible:ring-white/30',
      shine: 'from-white/15 via-transparent to-transparent',
    },
  }

  const v = variantStyles[variant]

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        // Base glass morphism
        'relative group cursor-pointer',
        'px-8 py-3.5 rounded-2xl',
        'backdrop-blur-xl',
        'border',
        v.border,
        v.bg,
        v.glow,
        v.text,
        v.ring,
        // Typography
        'font-semibold text-sm tracking-wide',
        // Layout
        'inline-flex items-center justify-center gap-2.5',
        // Transition
        'transition-all duration-300 ease-out',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        // Overflow for shine effect
        'overflow-hidden',
        className,
      )}
    >
      {/* Animated shine sweep on hover */}
      <span
        className={cn(
          'absolute inset-0 bg-gradient-to-r',
          v.shine,
          'translate-x-[-100%] group-hover:translate-x-[100%]',
          'transition-transform duration-700 ease-in-out',
        )}
      />

      {/* Top edge highlight for glass realism */}
      <span className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {icon && <span className="w-4 h-4">{icon}</span>}
        {label}
      </span>
    </motion.button>
  )
}
