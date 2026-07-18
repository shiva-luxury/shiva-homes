'use client'

import { useState } from 'react'
import LeadFormModal, { LeadType } from './LeadFormModal'
import { BRAND } from '../lib/constants'
import { HERO_IMAGE } from '../lib/images'

export default function Hero() {
  const [openType, setOpenType] = useState<LeadType | null>(null)
  const heroSrc = `https://images.unsplash.com/${HERO_IMAGE.id}?auto=format&fit=crop&w=1920&q=80`
  const heroCredit = `https://unsplash.com/@${HERO_IMAGE.photographerUsername}?utm_source=shiva_luxury&utm_medium=referral`

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt={HERO_IMAGE.alt} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <a
          href={heroCredit}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 text-[10px] text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur-sm hover:text-white z-10"
        >
          Photo: {HERO_IMAGE.photographer} / Unsplash
        </a>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center fade-up">
        <p className="text-gold-light text-xs font-semibold tracking-[0.3em] uppercase mb-5">{BRAND} · Los Angeles</p>
        <h1 className="font-serif text-4xl sm:text-6xl text-white mb-5 leading-[1.1]">
          California Real Estate, Done Right.
        </h1>
        <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Buying, selling, or renting in Los Angeles — {BRAND} knows this market inside out.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            id="buy"
            onClick={() => setOpenType('buy')}
            className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-all text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            I want to BUY
          </button>
          <button
            id="sell"
            onClick={() => setOpenType('sell')}
            className="px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-white/90 transition-all text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            I want to SELL
          </button>
          <button
            id="rent"
            onClick={() => setOpenType('rent')}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-base hover:-translate-y-0.5"
          >
            I want to RENT
          </button>
        </div>
      </div>

      {openType && <LeadFormModal type={openType} onClose={() => setOpenType(null)} />}
    </section>
  )
}
