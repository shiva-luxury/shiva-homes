import Hero from '../components/Hero'
import MarketStatsBar from '../components/MarketStatsBar'
import FeaturedProperties from '../components/FeaturedProperties'
import NeighborhoodGuides from '../components/NeighborhoodGuides'
import BlogSection from '../components/BlogSection'
import YouTubeSection from '../components/YouTubeSection'
import GoogleReviews from '../components/GoogleReviews'
import PressStrip from '../components/PressStrip'
import AboutSection from '../components/AboutSection'
import { BRAND, BROKERAGE, DRE, PHONE, SITE_URL } from '../lib/constants'
import { VERIFIED_AGGREGATE } from '../lib/reviews'

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: BRAND,
    url: SITE_URL,
    telephone: PHONE,
    areaServed: ['Encino', 'Sherman Oaks', 'Malibu', 'Venice', 'Santa Monica', 'Beverly Hills', 'Calabasas', 'Woodland Hills', 'Los Angeles'],
    worksFor: { '@type': 'Organization', name: BROKERAGE },
    identifier: DRE,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: VERIFIED_AGGREGATE.rating,
      reviewCount: VERIFIED_AGGREGATE.reviewCount,
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero />
      <MarketStatsBar />
      <FeaturedProperties />
      <div id="neighborhoods"><NeighborhoodGuides /></div>
      <BlogSection />
      <YouTubeSection />
      <GoogleReviews />
      <PressStrip />
      <AboutSection />
    </main>
  )
}
