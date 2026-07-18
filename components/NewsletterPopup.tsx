'use client'

import { useEffect, useState } from 'react'
import { Input, Button } from './ui'
import { submitLead, TCPA_CONSENT } from '../lib/webhook'
import { BRAND } from '../lib/constants'

const STORAGE_KEY = 'shiva_luxury_newsletter_popup'
const EXPIRY_DAYS = 7
const DELAY_MS = 10000

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const shownAt = Number(stored)
      const expired = Date.now() - shownAt > EXPIRY_DAYS * 24 * 60 * 60 * 1000
      if (!expired) return
    }
    const timer = setTimeout(() => {
      setVisible(true)
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    }, DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!visible || dismissed) return null

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
    <div className="fixed inset-0 bg-navy/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDismissed(true)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setDismissed(true)} className="absolute top-4 right-4 text-navy/40 hover:text-navy text-xl leading-none" aria-label="Close">✕</button>
        {success ? (
          <div className="py-4 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
            <p className="font-serif text-xl text-navy mb-2">You&apos;re on the list!</p>
            <p className="text-sm text-[var(--text-secondary)]">Watch your inbox for the {BRAND} weekly newsletter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-dark mb-2">Free Weekly Newsletter</p>
            <p className="font-serif text-2xl text-navy mb-2 pr-5">Get LA Real Estate Insights, Delivered Weekly</p>
            <p className="text-sm text-[var(--text-secondary)] mb-5">
              Join the {BRAND} newsletter for weekly market updates, new listings, neighborhood guides, and off-market opportunities across Los Angeles.
            </p>
            <div className="flex flex-col gap-2 mb-2">
              <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mb-4 leading-snug">{TCPA_CONSENT(BRAND)}</p>
            <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
              {submitting ? 'Signing you up…' : 'Subscribe Free'}
            </Button>
            <button type="button" onClick={() => setDismissed(true)} className="w-full text-center text-xs text-[var(--text-muted)] mt-3 hover:text-navy">
              No thanks, maybe later
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
