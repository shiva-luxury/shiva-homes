import type { Metadata } from 'next'
import { Card, Placeholder, Button } from '../../components/ui'
import { FEATURED_PROPERTIES } from '../../lib/properties'

const PROPERTIES_TITLE = 'All Properties'
const PROPERTIES_DESCRIPTION = 'Browse current listings across Los Angeles with Shiva Nelson, Rise Real Estate Group.'

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
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROPERTIES.map((p) => (
            <Card key={p.id} className="overflow-hidden">
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
        <p className="text-xs text-[var(--text-muted)] mt-10 text-center">
          Listings shown are placeholders — connect an IDX/MLS feed to display live inventory.
        </p>
      </div>
    </main>
  )
}
