'use client'

import React from 'react'
import { Zap, Activity, Network, Code } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'API Docs'],
  Resources: ['Documentation', 'Case Studies', 'White Papers', 'Blog', 'Webinars'],
  Company: ['About', 'Careers', 'Press Kit', 'Partners', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-[#030610] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">GridGuard</span>
            </a>
            <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
              AI-powered grid intelligence platform. Monitor, predict, and prevent electrical infrastructure failures at scale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors"><Network className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors"><Activity className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors"><Code className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">2026 GridGuard Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
