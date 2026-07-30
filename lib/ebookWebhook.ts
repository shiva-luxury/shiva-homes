'use client'

export type EbookFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  buyingTimeline: string
}

/** Posts an ebook lead directly to the dedicated Zapier "Catch Raw Hook" for the LA Buyer's Guide funnel — same client-side, no-cors pattern as lib/webhook.ts's submitLead, since this response is opaque either way. */
export async function submitEbookLead(data: EbookFormData): Promise<{ delivered: boolean }> {
  const url = process.env.NEXT_PUBLIC_EBOOK_WEBHOOK

  if (!url) {
    console.warn('NEXT_PUBLIC_EBOOK_WEBHOOK is not set — ebook lead was not delivered.')
    return { delivered: false }
  }

  const payload = {
    date: new Date().toISOString(),
    source: 'Ebook Download',
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || '',
    buyingTimeline: data.buyingTimeline,
    tags: ['ebook-downloaded', 'la-buyers-guide'],
  }

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { delivered: true }
  } catch {
    return { delivered: false }
  }
}
