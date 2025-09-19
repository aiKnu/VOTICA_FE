'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      label: 'Product',
      dropdown: ['Video Editor', 'AI Tools', 'Analytics', 'Live Streaming']
    },
    {
      label: 'Solutions',
      dropdown: ['Marketing', 'Sales', 'Education', 'Enterprise']
    },
    {
      label: 'Resources',
      dropdown: ['Blog', 'Case Studies', 'Webinars', 'Documentation']
    },
    { label: 'Pricing', dropdown: null },
    { label: 'Demo', dropdown: null }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              VOTICA
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`#${item.label.toLowerCase()}`}
                  className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium group"
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-gray-800 overflow-hidden"
                    >
                      {item.dropdown.map((subItem, index) => (
                        <motion.a
                          key={subItem}
                          href={`#${subItem.toLowerCase().replace(' ', '-')}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 transition-all"
                        >
                          {subItem}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="#login"
              className="hidden md:block text-white/90 hover:text-white transition-colors font-medium"
            >
              Log in
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}