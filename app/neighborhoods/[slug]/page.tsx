import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NEIGHBORHOODS, getNeighborhood, getNeighborhoods } from '../../../lib/neighborhoods'
import { BLOG_POSTS } from '../../../lib/blog'
import { Card, UnsplashPhoto, Button, SectionTitle } from '../../../components/ui'
import LeadFormLink from '../../../components/LeadFormLink'
import { BRAND, SITE_URL } from '../../../lib/constants'
import { NEIGHBORHOOD_IMAGES } from '../../../lib/images'

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = getNeighborhood(params.slug)
  if (!n) return {}
  const bareTitle = n.metaTitle.replace(/\s*\|\s*Shiva Luxury\s*$/i, '')
  return {
    title: bareTitle,
    description: n.metaDescription,
    keywords: [n.focusKeyword],
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: { title: n.metaTitle, description: n.metaDescription, url: `${SITE_URL}/neighborhoods/${n.slug}` },
    twitter: { card: 'summary_large_image', title: n.metaTitle, description: n.metaDescription },
  }
}

function relatedBlogPosts(n: ReturnType<typeof getNeighborhood>) {
  if (!n) return []
  const nameMatches = BLOG_POSTS.filter((p) => p.title.toLowerCase().includes(n.name.toLowerCase()) || p.keyword.toLowerCase().includes(n.name.toLowerCase()))
  const fallback = BLOG_POSTS.filter((p) => !nameMatches.includes(p) && ['how-to-sell-your-home-los-angeles', 'first-time-buyer-los-angeles-california'].includes(p.slug))
  return [...nameMatches, ...fallback].slice(0, 3)
}

export default function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const n = getNeighborhood(params.slug)
  if (!n) return notFound()

  const nearby = getNeighborhoods(n.nearby)
  const posts = relatedBlogPosts(n)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${n.name}, Los Angeles, CA`,
    description: n.overview[0],
    containedInPlace: { '@type': 'City', name: 'Los Angeles' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Neighborhoods', item: `${SITE_URL}/#neighborhoods` },
      { '@type': 'ListItem', position: 3, name: n.name, item: `${SITE_URL}/neighborhoods/${n.slug}` },
    ],
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="relative">
        <UnsplashPhoto img={NEIGHBORHOOD_IMAGES[n.slug]} w={1600} h={800} aspect="h-[50vh]" className="rounded-none" creditPosition="bottom-left" />
        <div className="absolute inset-0 bg-navy/50 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-10 w-full">
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-2">Living in {n.name}, CA</h1>
            <p className="text-white/80">{n.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-14">
        <section>
          <h2 className="font-serif text-2xl text-navy mb-4">Overview</h2>
          <div className="space-y-4">
            {n.overview.map((p, i) => (
              <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">{p}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-navy mb-4">{n.name} Real Estate Market</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Median Home Price</p><p className="text-navy font-medium mt-1">{n.market.medianPrice}</p></Card>
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Price / Sq Ft</p><p className="text-navy font-medium mt-1">{n.market.pricePerSqft}</p></Card>
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Avg. Days on Market</p><p className="text-navy font-medium mt-1">{n.market.daysOnMarket}</p></Card>
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Condos</p><p className="text-navy font-medium mt-1">{n.market.condoRange}</p></Card>
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Single-Family Homes</p><p className="text-navy font-medium mt-1">{n.market.sfrRange}</p></Card>
            <Card className="p-4"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Year-Over-Year</p><p className="text-navy font-medium mt-1">{n.market.yoyChange}</p></Card>
            <Card className="p-4 sm:col-span-2 lg:col-span-3"><p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Inventory</p><p className="text-navy font-medium mt-1">{n.market.inventory}</p></Card>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3">Source: {n.market.asOf}. Market data shifts monthly — contact {BRAND} for a live, current comp.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-navy mb-4">Lifestyle in {n.name}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <LifestyleList title="Restaurants & Dining" items={n.dining} />
            <LifestyleList title="Coffee" items={n.coffee} />
            <LifestyleList title="Grocery" items={n.grocery} />
            <LifestyleList title="Nightlife" items={n.nightlife} />
            <LifestyleList title="Shopping" items={n.shopping} />
            <LifestyleList title="Outdoor & Parks" items={n.outdoor} />
            <LifestyleList title="Fitness" items={n.fitness} />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-navy mb-4">Schools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {n.schools.map((s) => (
              <Card key={s.name} className="p-4">
                <p className="text-sm font-medium text-navy">{s.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{s.note}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-navy mb-4">Commute From {n.name}</h2>
          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {n.commute.map((c) => (
              <div key={c.destination} className="flex items-center justify-between text-sm border-b border-[var(--border)] pb-2">
                <span className="text-[var(--text-secondary)]">{c.destination}</span>
                <span className="font-medium text-navy">{c.time}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-1"><span className="font-medium text-navy">Freeway access: </span>{n.freewayAccess}</p>
          <p className="text-sm text-[var(--text-secondary)]"><span className="font-medium text-navy">Metro: </span>{n.metro}</p>
        </section>

        <section className="bg-[var(--surface)] rounded-xl p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-navy mb-4">Why People Relocate Here</h2>
          <ul className="space-y-2.5">
            {n.relocatorPoints.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-gold-dark mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-navy mb-2">What Locals Say</h2>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Themes from Los Angeles-area community discussion — explore further on{' '}
            <a href="https://www.reddit.com/r/LosAngeles/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark">r/LosAngeles</a>
            {' '}or{' '}
            <a href="https://www.reddit.com/r/AskLosAngeles/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark">r/AskLosAngeles</a>.
          </p>
          <div className="space-y-3">
            {n.localInsights.map((insight, i) => (
              <Card key={i} className="p-4">
                <p className="text-sm font-medium text-navy">{insight.theme}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{insight.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-navy mb-4">Related Reading</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="text-sm text-navy underline underline-offset-4 hover:text-gold-dark">
                  {p.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {nearby.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-navy mb-4">Nearby Neighborhoods</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {nearby.map((nb) => (
                <Link key={nb.slug} href={`/neighborhoods/${nb.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <UnsplashPhoto img={NEIGHBORHOOD_IMAGES[nb.slug]} w={400} h={300} aspect="aspect-[4/3]" className="rounded-none" />
                    <div className="p-3">
                      <p className="font-serif text-navy">{nb.name}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{nb.tagline}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="text-center bg-navy rounded-xl p-8 sm:p-10">
          <SectionTitle eyebrow={n.focusKeyword} title={`Find Your Home in ${n.name}`} light />
          <LeadFormLink type="buy">
            <Button variant="gold" size="lg">Contact {BRAND} About {n.name}</Button>
          </LeadFormLink>
        </section>
      </div>
    </main>
  )
}

function LifestyleList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div>
      <p className="text-xs font-semibold text-gold-dark uppercase tracking-wide mb-2">{title}</p>
      <ul className="text-sm text-[var(--text-secondary)] space-y-1">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}
