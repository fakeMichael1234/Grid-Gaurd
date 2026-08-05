import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'GridGuard - AI-Powered Smart Grid Monitoring',
  description: 'Monitor, predict, and prevent electrical failures before they happen using real-time analytics and intelligent automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="antialiased bg-[#050816] text-white">
        {children}
      </body>
    </html>
  )
}
