import type { Metadata } from 'next'
import { Button, UnsplashPhoto } from '../../components/ui'
import LeadFormLink from '../../components/LeadFormLink'
import { CTA_LISTINGS_IMAGE } from '../../lib/images'
import { BRAND, BROKERAGE } from '../../lib/constants'

const PROPERTIES_TITLE = 'All Properties'
const PROPERTIES_DESCRIPTION = `Browse current listings across Los Angeles with ${BRAND}, ${BROKERAGE}.`

export const metadata: Metadata = {
  title: PROPERTIES_TITLE,
  description: PROPERTIES_DESCRIPTION,
  alternates: { canonical: '/properties' },
  openGraph: { title: PROPERTIES_TITLE, description: PROPERTIES_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: PROPERTIES_TITLE, description: PROPERTIES_DESCRIPTION },
}

export default function PropertiesPage() {
  return (
    <main className="bg-white">
      <div className="bg-navy py-16 text-center">
        <h1 className="font-serif text-4xl text-white mb-2">All Properties</h1>
        <p className="text-white/70">Current listings across Los Angeles</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <UnsplashPhoto img={CTA_LISTINGS_IMAGE} w={900} h={675} aspect="aspect-[4/3]" className="mb-10" />
        <p className="font-serif text-2xl sm:text-3xl text-navy mb-4">See What's Available Right Now</p>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
          Contact {BRAND} for current available listings — new properties are added weekly across Encino, Sherman Oaks, Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, and Woodland Hills.
        </p>
        <LeadFormLink type="buy">
          <Button variant="primary" size="lg">Contact {BRAND}</Button>
        </LeadFormLink>
      </div>
    </main>
  )
}
