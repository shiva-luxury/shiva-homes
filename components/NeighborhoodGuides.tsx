import Link from 'next/link'
import { Card, Placeholder, SectionTitle, Button } from './ui'
import { NEIGHBORHOODS } from '../lib/neighborhoods'

export default function NeighborhoodGuides() {
  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Where to Live" title="Neighborhood Guides" subtitle="Eight Los Angeles submarkets, each with its own personality, pricing, and lifestyle." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEIGHBORHOODS.map((n) => (
            <Card key={n.slug} className="overflow-hidden">
              <Placeholder label={`${n.name} — photo`} aspect="aspect-[4/3]" className="rounded-none" />
              <div className="p-4">
                <p className="font-serif text-lg text-navy">{n.name}</p>
                <p className="text-xs text-gold-dark font-semibold mb-2">Median {n.medianPrice}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">{n.lifestyle}</p>
                <Link href={`/neighborhoods/${n.slug}`}>
                  <Button variant="ghost" className="!px-0 text-navy underline underline-offset-4 text-xs">Learn More →</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
