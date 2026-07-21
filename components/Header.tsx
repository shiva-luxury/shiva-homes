'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PHONE, PHONE_RAW } from '../lib/constants'
import { PORTRAIT_PHOTO_URL } from '../lib/images'
import LeadFormModal from './LeadFormModal'

const NAV = [
  { label: 'Buy', href: '/#buy' },
  { label: 'Sell', href: '/#sell' },
  { label: 'Rent', href: '/#rent' },
  { label: 'Neighborhoods', href: '/#neighborhoods' },
  { label: 'Blog', href: '/blog' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#buy' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled ? 'bg-navy shadow-lg' : 'bg-navy/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="https://shivaluxury.com" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PORTRAIT_PHOTO_URL} alt="Shiva Luxury" className="w-9 h-9 rounded-full object-cover border border-gold" />
            <span className="font-serif text-white text-lg tracking-wide hidden sm:inline">Shiva Luxury</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="text-white/80 hover:text-gold-light text-sm transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className="hidden md:inline text-white/80 hover:text-gold-light text-sm">
              {PHONE}
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
            >
              Contact Shiva
            </button>
            <button className="lg:hidden text-white" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-navy border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-gold-light text-sm">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {modalOpen && <LeadFormModal type="buy" onClose={() => setModalOpen(false)} />}
    </>
  )
}
