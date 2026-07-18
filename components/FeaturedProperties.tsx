import { SectionTitle, Button, UnsplashPhoto } from './ui'
import { CTA_LISTINGS_IMAGE } from '../lib/images'
import { BRAND } from '../lib/constants'
import LeadFormLink from './LeadFormLink'

export default function FeaturedProperties() {
  return (
    <section className="section-pad max-w-7xl mx-auto px-6">
      <SectionTitle eyebrow="Portfolio" title="Current Listings" subtitle="New properties are added weekly across Los Angeles's most desired neighborhoods." />

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <UnsplashPhoto img={CTA_LISTINGS_IMAGE} w={900} h={675} aspect="aspect-[4/3]" />
        <div className="text-center lg:text-left">
          <p className="font-serif text-2xl sm:text-3xl text-navy mb-4">See What's Available Right Now</p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            Contact {BRAND} for current available listings — new properties are added weekly across Encino, Sherman Oaks, Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, and Woodland Hills.
          </p>
          <LeadFormLink type="buy">
            <Button variant="primary" size="lg">Contact {BRAND}</Button>
          </LeadFormLink>
        </div>
      </div>
    </section>
  )
}
