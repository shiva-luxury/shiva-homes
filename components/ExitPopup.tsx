'use client'

import { useEffect, useState } from 'react'
import { Input, Button } from './ui'
import { submitLead, TCPA_CONSENT } from '../lib/webhook'
import { AGENT_NAME } from '../lib/constants'

const SESSION_KEY = 'shiva_homes_popup_shown'

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 8000)
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
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm animate-[slideIn_0.4s_ease_forwards]">
      <div className="bg-white rounded-xl shadow-2xl border border-[var(--border)] p-5 relative">
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 text-navy/40 hover:text-navy" aria-label="Close">✕</button>
        {success ? (
          <div className="py-2">
            <p className="font-serif text-lg text-navy mb-1">You&apos;re on the list!</p>
            <p className="text-sm text-[var(--text-secondary)]">Watch your inbox for LA market updates.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="font-serif text-lg text-navy mb-1 pr-5">Get LA Market Updates Free</p>
            <p className="text-xs text-[var(--text-secondary)] mb-3">Monthly insights on pricing, inventory, and off-market opportunities.</p>
            <div className="flex flex-col gap-2 mb-2">
              <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mb-3 leading-snug">{TCPA_CONSENT(AGENT_NAME)}</p>
            <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
              {submitting ? 'Sending…' : 'Sign Me Up'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
