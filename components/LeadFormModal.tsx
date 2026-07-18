'use client'

import { useState } from 'react'
import { Input, Select, Textarea, Label, CheckboxGroup, Button } from './ui'
import { submitLead, TCPA_CONSENT, LeadSource } from '../lib/webhook'
import { BRAND } from '../lib/constants'

export type LeadType = 'buy' | 'sell' | 'rent'

const NEIGHBORHOOD_OPTIONS = ['Encino', 'Sherman Oaks', 'Malibu', 'Venice', 'Santa Monica', 'Beverly Hills', 'Calabasas', 'Woodland Hills', 'Other']
const BUDGET_OPTIONS = ['Under $800K', '$800K–$1.5M', '$1.5M–$3M', '$3M–$5M', '$5M+']
const TIMELINE_OPTIONS = ['ASAP', '1–3 months', '3–6 months', 'Just exploring']
const PROPERTY_TYPES = ['Single family', 'Condo', 'Multi-family', 'Land', 'Other']
const SELL_VALUE_OPTIONS = ['Under $800K', '$800K–$1.5M', '$1.5M–$3M', '$3M–$5M', '$5M+', 'Not sure']
const SELL_TIMELINE_OPTIONS = ['ASAP', '1–3 months', '3–6 months', 'Just curious about value']
const RENT_BUDGET_OPTIONS = ['Under $3K/mo', '$3K–$6K/mo', '$6K–$10K/mo', '$10K–$20K/mo', '$20K+/mo']

const TYPE_META: Record<LeadType, { title: string; source: LeadSource; cta: string }> = {
  buy: { title: 'Tell Us What You’re Looking For', source: 'Buy Lead', cta: 'Start My Home Search' },
  sell: { title: 'Get Your Free Home Valuation', source: 'Sell Lead', cta: 'Request My Valuation' },
  rent: { title: 'Find Your Next Rental', source: 'Rent Lead', cta: 'Find Me a Rental' },
}

export default function LeadFormModal({ type, onClose }: { type: LeadType; onClose: () => void }) {
  const [activeType, setActiveType] = useState<LeadType>(type)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // shared
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // buy
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0])
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0])
  const [preApproved, setPreApproved] = useState('')

  // sell
  const [address, setAddress] = useState('')
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0])
  const [estValue, setEstValue] = useState(SELL_VALUE_OPTIONS[0])
  const [sellTimeline, setSellTimeline] = useState(SELL_TIMELINE_OPTIONS[0])
  const [spokenToAgent, setSpokenToAgent] = useState('')

  // rent
  const [area, setArea] = useState('')
  const [rentBudget, setRentBudget] = useState(RENT_BUDGET_OPTIONS[0])
  const [bedrooms, setBedrooms] = useState('')
  const [moveInDate, setMoveInDate] = useState('')

  const meta = TYPE_META[activeType]

  const validate = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) return 'First name, last name, email, and phone are required.'
    if (activeType === 'sell' && !address.trim()) return 'Property address is required.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setSubmitting(true)

    const base = { firstName, lastName, email, phone, message }
    let fields: Record<string, string> = base

    if (activeType === 'buy') {
      fields = { ...base, neighborhoods: neighborhoods.join(', '), budget, timeline, preApproved }
    } else if (activeType === 'sell') {
      fields = { ...base, propertyAddress: address, propertyType, estimatedValue: estValue, sellTimeline, spokenToAgent }
    } else {
      fields = { ...base, areaPreferred: area, budgetPerMonth: rentBudget, bedrooms, moveInDate }
    }

    try {
      await submitLead(meta.source, fields)
      setSuccess(true)
    } catch {
      setError('Something went wrong sending your request. Please call or text us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-navy/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 bg-[var(--surface)] rounded-lg p-1">
            {(['buy', 'sell', 'rent'] as LeadType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setActiveType(t); setSuccess(false); setError('') }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                  activeType === t ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="text-navy/40 hover:text-navy text-xl leading-none">✕</button>
        </div>

        {success ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
            <h3 className="font-serif text-2xl text-navy mb-2">Thank You!</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {BRAND} has received your request and will be in touch shortly.
            </p>
            <Button variant="primary" onClick={onClose} className="mt-6">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="font-serif text-2xl text-navy mb-5">{meta.title}</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><Label>First Name *</Label><Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
              <div><Label>Last Name *</Label><Input required value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><Label>Email *</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><Label>Phone *</Label><Input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            </div>

            {activeType === 'buy' && (
              <>
                <div className="mb-3">
                  <Label>Neighborhoods interested in</Label>
                  <CheckboxGroup options={NEIGHBORHOOD_OPTIONS} selected={neighborhoods} onChange={setNeighborhoods} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Budget range</Label>
                    <Select value={budget} onChange={(e) => setBudget(e.target.value)}>
                      {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>Timeline</Label>
                    <Select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                      {TIMELINE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </div>
                </div>
                <div className="mb-3">
                  <Label>Pre-approved?</Label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-1.5"><input type="radio" name="preApproved" value="Yes" checked={preApproved === 'Yes'} onChange={(e) => setPreApproved(e.target.value)} /> Yes</label>
                    <label className="flex items-center gap-1.5"><input type="radio" name="preApproved" value="No" checked={preApproved === 'No'} onChange={(e) => setPreApproved(e.target.value)} /> No</label>
                  </div>
                </div>
              </>
            )}

            {activeType === 'sell' && (
              <>
                <div className="mb-3"><Label>Property address *</Label><Input required value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Property type</Label>
                    <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                      {PROPERTY_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>Estimated value</Label>
                    <Select value={estValue} onChange={(e) => setEstValue(e.target.value)}>
                      {SELL_VALUE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </div>
                </div>
                <div className="mb-3">
                  <Label>When do you want to sell?</Label>
                  <Select value={sellTimeline} onChange={(e) => setSellTimeline(e.target.value)}>
                    {SELL_TIMELINE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Select>
                </div>
                <div className="mb-3">
                  <Label>Have you spoken to an agent?</Label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-1.5"><input type="radio" name="spokenToAgent" value="Yes" checked={spokenToAgent === 'Yes'} onChange={(e) => setSpokenToAgent(e.target.value)} /> Yes</label>
                    <label className="flex items-center gap-1.5"><input type="radio" name="spokenToAgent" value="No" checked={spokenToAgent === 'No'} onChange={(e) => setSpokenToAgent(e.target.value)} /> No</label>
                  </div>
                </div>
              </>
            )}

            {activeType === 'rent' && (
              <>
                <div className="mb-3"><Label>Area preferred</Label><Input value={area} onChange={(e) => setArea(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Budget per month</Label>
                    <Select value={rentBudget} onChange={(e) => setRentBudget(e.target.value)}>
                      {RENT_BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </div>
                  <div><Label>Bedrooms needed</Label><Input value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="e.g. 2" /></div>
                </div>
                <div className="mb-3"><Label>Move-in date</Label><Input type="date" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} /></div>
              </>
            )}

            <div className="mb-4">
              <Label>Message</Label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything else we should know?" />
            </div>

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <p className="text-[11px] leading-relaxed text-[var(--text-muted)] mb-4">{TCPA_CONSENT(BRAND)}</p>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
              {submitting ? 'Sending…' : meta.cta}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
