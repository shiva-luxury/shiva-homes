'use client'

export type LeadSource = 'Buy Lead' | 'Sell Lead' | 'Rent Lead' | 'Market Update Signup' | 'Footer Signup'

export async function submitLead(source: LeadSource, fields: Record<string, string>) {
  const payload = {
    date: new Date().toISOString(),
    source,
    ...fields,
  }

  const sheetsUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK
  const fubUrl = process.env.NEXT_PUBLIC_FUB_WEBHOOK

  const requests: Promise<Response>[] = []
  if (sheetsUrl) {
    requests.push(
      fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    )
  }
  if (fubUrl) {
    requests.push(
      fetch(fubUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    )
  }

  if (requests.length === 0) {
    console.warn('No webhook URLs configured — NEXT_PUBLIC_SHEETS_WEBHOOK / NEXT_PUBLIC_FUB_WEBHOOK are unset.')
  }

  await Promise.allSettled(requests)
  return { delivered: requests.length }
}

export const TCPA_CONSENT = (agentName: string) =>
  `I agree to be contacted by ${agentName} via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary. Privacy Policy.`
