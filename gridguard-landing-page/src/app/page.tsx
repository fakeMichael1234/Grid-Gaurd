'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Benefits from '@/components/sections/Benefits'
import Showcase from '@/components/sections/Showcase'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-[#050816] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <section id="features"><Features /></section>
      <section id="how-it-works"><HowItWorks /></section>
      <Benefits />
      <section id="showcase"><Showcase /></section>
      <Testimonials />
      <section id="cta"><CTA /></section>
      <Footer />
    </main>
  )
}
