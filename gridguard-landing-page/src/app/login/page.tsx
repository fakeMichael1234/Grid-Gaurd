'use client'

import { useEffect } from 'react'

export default function LoginPage() {
  useEffect(() => {
    window.location.href = '/login.html'
  }, [])

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
      <p className="text-sm font-mono text-cyan-400 animate-pulse">Redirecting to GridGuard Portal Gateway...</p>
    </div>
  )
}
