import Link from 'next/link'
import { Card, Placeholder, SectionTitle, Button } from './ui'
import { FEATURED_PROPERTIES } from '../lib/properties'

export default function FeaturedProperties() {
  return (
    <section className="section-pad max-w-7xl mx-auto px-6">
      <SectionTitle eyebrow="Portfolio" title="Featured Properties" subtitle="A curated look at what's currently available across Los Angeles's most desired neighborhoods." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {FEATURED_PROPERTIES.map((p) => (
          <Card key={p.id} className="overflow-hidden group">
            <div className="relative">
              <Placeholder label={`Photo — ${p.address}`} aspect="aspect-[4/3]" className="rounded-none" />
              <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wide bg-navy text-white px-2.5 py-1 rounded-full">{p.status}</span>
            </div>
            <div className="p-5">
              <p className="font-serif text-xl text-navy mb-1">{p.price}</p>
              <p className="text-sm text-navy font-medium">{p.address}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{p.city}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-4">{p.beds} bd · {p.baths} ba · {p.sqft} sqft</p>
              <Button variant="ghost" className="!px-0 text-navy underline underline-offset-4">View Details →</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/properties">
          <Button variant="primary" size="lg">View All Properties</Button>
        </Link>
      </div>
    </section>
  )
}
