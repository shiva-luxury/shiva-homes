'use client'

import { useState } from 'react'
import { submitEbookLead } from '../../lib/ebookWebhook'

const EBOOK_PDF_URL = 'https://drive.google.com/file/d/1l2qS6rPs6_mr1pDwQLQhC3gA2jajJMVi/view'

const TIMELINE_OPTIONS = [
  'Ready to buy now',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Just researching',
]

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  buyingTimeline: string
}

const EMPTY_FORM: FormState = { firstName: '', lastName: '', email: '', phone: '', buyingTimeline: TIMELINE_OPTIONS[0] }

export default function EbookForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormState, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.buyingTimeline.trim()) {
      setError('First name, last name, email, and buying timeline are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await submitEbookLead(form)
      if (!result.delivered) throw new Error('Something went wrong. Please try again.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-2xl text-center md:text-left">
        <p className="text-[var(--gold-dark)] text-xs font-semibold uppercase tracking-widest mb-2">You&apos;re In</p>
        <h2 className="font-serif text-2xl text-[var(--navy)] mb-3">Your guide is ready</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Thanks, {form.firstName}! Click below to download your copy of the LA Luxury Home Buyers Guide. We also emailed the link to {form.email}.
        </p>
        <a
          href={EBOOK_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-lg bg-[var(--navy)] text-white hover:bg-[var(--navy-light)] transition-all"
        >
          Download the PDF
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-2xl">
      <h2 className="font-serif text-xl text-[var(--navy)] mb-1">Get the free guide</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-5">Enter your details below and we&apos;ll send it right over.</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">First Name *</label>
          <input
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full text-sm px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:border-[var(--navy-light)]"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Last Name *</label>
          <input
            required
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full text-sm px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:border-[var(--navy-light)]"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full text-sm px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:border-[var(--navy-light)]"
        />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Phone <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="w-full text-sm px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:border-[var(--navy-light)]"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">When are you looking to buy? *</label>
        <select
          required
          value={form.buyingTimeline}
          onChange={(e) => update('buyingTimeline', e.target.value)}
          className="w-full text-sm px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:border-[var(--navy-light)]"
        >
          {TIMELINE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-[var(--navy)] text-white hover:bg-[var(--navy-light)] transition-all disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send Me the Guide'}
      </button>

      <p className="text-[11px] text-[var(--text-muted)] mt-4 text-center">
        No spam — just the guide and occasional LA market updates. Unsubscribe anytime.
      </p>
    </form>
  )
}
