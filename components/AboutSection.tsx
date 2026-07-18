import Link from 'next/link'
import { Button } from './ui'
import { BRAND, BROKERAGE, DRE } from './../lib/constants'
import { PORTRAIT_PHOTO_URL } from '../lib/images'

export default function AboutSection() {
  return (
    <section id="about" className="section-pad max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PORTRAIT_PHOTO_URL} alt={`${BRAND} portrait`} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-dark mb-3">About {BRAND}</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy mb-5">Your California Real Estate Expert</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4">
            {BRAND} brings a sophisticated, design-forward approach to the Los Angeles market. With a background in art and design, the team identifies the aesthetic potential and long-term value in a property that others often overlook — pairing that eye with sharp, data-driven market strategy.
          </p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
            Multilingual and client-first, {BRAND} offers a bespoke experience across Los Angeles's most sought-after neighborhoods — from Encino and Sherman Oaks to Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, and Woodland Hills — ensuring every buying, selling, or renting journey is as strategically sound as it is well cared for.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">License</p><p className="text-navy font-medium">{DRE}</p></div>
            <div><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">Brokerage</p><p className="text-navy font-medium">{BROKERAGE}</p></div>
            <div className="col-span-2"><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">Areas Served</p><p className="text-navy font-medium">Los Angeles — Encino, Sherman Oaks, Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, Woodland Hills</p></div>
          </div>

          <Link href="/about"><Button variant="primary" size="lg">Full About Page</Button></Link>
        </div>
      </div>
    </section>
  )
}
