import type { Metadata } from 'next'
import Image from 'next/image'
import EbookForm from './EbookForm'
import { BROKERAGE, DRE } from '../../lib/constants'

export const metadata: Metadata = {
  title: 'Free Guide: LA Luxury Home Buyers Guide',
  description: 'Download the free LA Luxury Home Buyers Guide — everything you need to know before buying a home in LA, from Shiva Luxury.',
  openGraph: {
    title: 'Free Guide: LA Luxury Home Buyers Guide — Shiva Luxury',
    description: 'Download the free LA Luxury Home Buyers Guide from Shiva Luxury.',
  },
  alternates: { canonical: '/ebook' },
}

export default function EbookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--navy)]">
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="text-center md:text-left">
            <p className="text-[var(--gold)] text-xs font-medium tracking-widest uppercase mb-3">Free Download</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">
              LA Luxury Home Buyers Guide
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
              Everything you need to know before buying a home in LA — neighborhoods, pricing, financing, and the exact steps to a winning offer. Straight from Shiva Luxury.
            </p>

            <div className="mx-auto md:mx-0 w-48 sm:w-56 rounded-lg border-2 border-[var(--gold)] overflow-hidden shadow-2xl">
              <Image
                src="/ebook-cover.png"
                alt="LA Luxury Home Buyers Guide — Shiva Luxury"
                width={968}
                height={1206}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>

          <EbookForm />
        </div>
      </main>

      <p className="border-t border-white/10 py-6 px-4 text-center text-xs text-white/40">
        {BROKERAGE} · {DRE} · homes.shivaluxury.com
      </p>
    </div>
  )
}
