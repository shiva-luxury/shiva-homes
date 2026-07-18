'use client'

import { useState } from 'react'
import { Input, Button } from '../../components/ui'
import { submitLead, TCPA_CONSENT } from '../../lib/webhook'
import { BRAND } from '../../lib/constants'

const TOPICS = [
  'Weekly market stats — pricing, inventory, and days on market',
  'New and off-market listings before they hit the public search',
  'Neighborhood guides across Encino, Sherman Oaks, Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, and Woodland Hills',
  'Buying and selling strategy for the current LA market',
]

export default function NewsletterPage() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !email.trim()) return
    setSubmitting(true)
    try {
      await submitLead('Market Update Signup', { firstName, email })
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-white">
      <div className="bg-navy py-16 text-center">
        <h1 className="font-serif text-4xl text-white mb-2">The {BRAND} Newsletter</h1>
        <p className="text-white/70">Weekly LA real estate insights, straight to your inbox</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-12 items-start">
        <div>
          <p className="font-serif text-2xl text-navy mb-4">What You&apos;ll Get</p>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            {TOPICS.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-gold-dark mt-0.5">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--text-secondary)] mt-6">
            Sent weekly. Unsubscribe anytime with one click.
          </p>
        </div>

        <div className="bg-[var(--surface)] rounded-xl p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <p className="font-serif text-xl text-navy mb-2">You&apos;re on the list!</p>
              <p className="text-sm text-[var(--text-secondary)]">Watch your inbox for the next issue.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="font-serif text-lg text-navy mb-4">Subscribe Free</p>
              <div className="flex flex-col gap-2 mb-2">
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mb-4 leading-snug">{TCPA_CONSENT(BRAND)}</p>
              <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
                {submitting ? 'Signing you up…' : 'Subscribe Free'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
