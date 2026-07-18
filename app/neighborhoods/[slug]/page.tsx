import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NEIGHBORHOODS, getNeighborhood } from '../../../lib/neighborhoods'
import { Card, UnsplashPhoto, Button } from '../../../components/ui'
import LeadFormLink from '../../../components/LeadFormLink'
import { BRAND, BROKERAGE, DRE, SITE_URL } from '../../../lib/constants'
import { NEIGHBORHOOD_IMAGES } from '../../../lib/images'

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = getNeighborhood(params.slug)
  if (!n) return {}
  return {
    title: `${n.name} Real Estate Guide`,
    description: `${n.name} homes for sale, market stats, schools, and lifestyle guide from ${BRAND}, ${BROKERAGE}.`,
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: { title: `${n.name} Real Estate Guide`, description: n.lifestyle, url: `${SITE_URL}/neighborhoods/${n.slug}` },
    twitter: { card: 'summary_large_image', title: `${n.name} Real Estate Guide`, description: n.lifestyle },
  }
}

export default function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const n = getNeighborhood(params.slug)
  if (!n) return notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${n.name}, Los Angeles, CA`,
    description: n.description,
    geo: { '@type': 'GeoCoordinates' },
    containedInPlace: { '@type': 'City', name: 'Los Angeles' },
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative">
        <UnsplashPhoto img={NEIGHBORHOOD_IMAGES[n.slug]} w={1600} h={800} aspect="h-[50vh]" className="rounded-none" creditPosition="bottom-left" />
        <div className="absolute inset-0 bg-navy/50 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-2">{n.name}</h1>
            <p className="text-white/80">{n.lifestyle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="font-serif text-2xl text-navy mb-3">About {n.name}</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{n.description}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy mb-3">Schools</h2>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 list-disc list-inside">
              {n.schools.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy mb-3">Recent Sales</h2>
            <div className="space-y-2">
              {n.recentSales.map((s) => (
                <div key={s.address} className="flex items-center justify-between text-sm border-b border-[var(--border)] pb-2">
                  <span>{s.address}</span>
                  <span className="text-[var(--text-secondary)]">{s.beds} bd</span>
                  <span className="font-medium text-navy">{s.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <Card className="p-6 bg-[var(--surface)] sticky top-24">
            <h3 className="font-serif text-lg text-navy mb-4">{n.name} Market Snapshot</h3>
            <dl className="space-y-3 text-sm mb-6">
              <div className="flex justify-between"><dt className="text-[var(--text-secondary)]">Median Price</dt><dd className="font-medium text-navy">{n.medianPrice}</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--text-secondary)]">Price / Sq Ft</dt><dd className="font-medium text-navy">{n.pricePerSqft}</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--text-secondary)]">Avg. Days on Market</dt><dd className="font-medium text-navy">{n.daysOnMarket}</dd></div>
            </dl>
            <LeadFormLink type="buy">
              <Button variant="primary" className="w-full">Ask {BRAND} About {n.name}</Button>
            </LeadFormLink>
            <p className="text-[11px] text-[var(--text-muted)] mt-3 text-center">{DRE} · {BROKERAGE}</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
