import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const FALLBACK = {
  medianPrice: '$1.02M',
  daysOnMarket: '38',
  pricePerSqft: '$612',
  activeListings: '3,400+',
  asOf: 'LA County, general snapshot',
  live: false,
}

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ...FALLBACK, updatedAt: new Date().toISOString() })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 } as unknown as Anthropic.Tool],
      messages: [
        {
          role: 'user',
          content: `Use web search to find current Los Angeles County real estate market statistics. Return ONLY valid JSON, no prose, matching exactly:
{"medianPrice": string (e.g. "$1.05M"), "daysOnMarket": string (e.g. "35"), "pricePerSqft": string (e.g. "$620"), "activeListings": string (e.g. "3,500+"), "asOf": string (short source/period description, e.g. "LA County, Q2 2026")}`,
        },
      ],
    })

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')

    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    const parsed = JSON.parse(match[0])

    return NextResponse.json({ ...parsed, live: true, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error('market-stats error', err)
    return NextResponse.json({ ...FALLBACK, updatedAt: new Date().toISOString() })
  }
}
