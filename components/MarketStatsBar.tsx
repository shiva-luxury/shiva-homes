'use client'

import { useEffect, useState } from 'react'

type Stats = {
  medianPrice: string
  daysOnMarket: string
  pricePerSqft: string
  activeListings: string
  asOf: string
  live: boolean
  updatedAt: string
}

const CACHE_KEY = 'shiva_homes_market_stats'
const DAY_MS = 24 * 60 * 60 * 1000

export default function MarketStatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed: Stats = JSON.parse(cached)
      setStats(parsed)
      if (Date.now() - new Date(parsed.updatedAt).getTime() < DAY_MS) return
    }
    fetch('/api/market-stats')
      .then((r) => r.json())
      .then((data: Stats) => {
        setStats(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      })
      .catch(() => {})
  }, [])

  const items = [
    { label: 'Median Home Price', value: stats?.medianPrice },
    { label: 'Avg. Days on Market', value: stats?.daysOnMarket },
    { label: 'Price / Sq Ft', value: stats?.pricePerSqft },
    { label: 'Active Listings', value: stats?.activeListings },
  ]

  return (
    <div className="bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-serif text-2xl sm:text-3xl text-navy">{item.value || '—'}</p>
            <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)] mt-1">{item.label}</p>
          </div>
        ))}
      </div>
      {stats && (
        <p className="text-center text-[11px] text-[var(--text-muted)] pb-4">
          {stats.live ? 'Live market data' : 'Reference snapshot'} · {stats.asOf} · Updated {new Date(stats.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      )}
    </div>
  )
}
