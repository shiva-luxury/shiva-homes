import type { Metadata } from 'next'
import { Placeholder, Button } from '../../components/ui'
import LeadFormLink from '../../components/LeadFormLink'
import { AGENT_NAME, BROKERAGE, DRE, PHONE, EMAIL } from '../../lib/constants'

const ABOUT_TITLE = 'About Shiva Nelson'
const ABOUT_DESCRIPTION = `Meet ${AGENT_NAME}, Principal Advisor with ${BROKERAGE}, ${DRE}, serving Los Angeles buyers, sellers, and renters.`

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: ABOUT_TITLE, description: ABOUT_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: ABOUT_TITLE, description: ABOUT_DESCRIPTION },
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="bg-navy py-16 text-center">
        <h1 className="font-serif text-4xl text-white mb-2">Meet {AGENT_NAME}</h1>
        <p className="text-white/70">Your California Real Estate Expert</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <Placeholder label={`${AGENT_NAME} — portrait photo`} aspect="aspect-[16/9]" className="mb-10" />

        <div className="space-y-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <p>
            As a Principal Advisor with {BROKERAGE}, {AGENT_NAME} provides a sophisticated, design-forward approach to the Los Angeles real estate market. With a background in art and design, she identifies the aesthetic potential and long-term value in a property that others often overlook, pairing that eye with sharp, data-driven market strategy.
          </p>
          <p>
            Multilingual and client-first, {AGENT_NAME} offers a bespoke experience tailored to buyers, sellers, and renters across Los Angeles's most sought-after neighborhoods — from Encino and Sherman Oaks to Malibu, Venice, Santa Monica, Beverly Hills, Calabasas, and Woodland Hills — ensuring every transaction is as strategically sound as it is well cared for.
          </p>
          <p>
            Whether you're buying your first home, selling a longtime family property, or searching for the right rental, {AGENT_NAME} brings the same level of care, transparency, and market fluency to every client relationship — treating each transaction as the start of a long-term relationship, not a one-time deal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 my-10 text-sm">
          <div className="bg-[var(--surface)] rounded-lg p-4"><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">License</p><p className="text-navy font-medium">{DRE}</p></div>
          <div className="bg-[var(--surface)] rounded-lg p-4"><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">Brokerage</p><p className="text-navy font-medium">{BROKERAGE}</p></div>
          <div className="bg-[var(--surface)] rounded-lg p-4"><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">Phone</p><p className="text-navy font-medium">{PHONE}</p></div>
          <div className="bg-[var(--surface)] rounded-lg p-4"><p className="text-[var(--text-muted)] text-xs uppercase tracking-wide">Email</p><p className="text-navy font-medium">{EMAIL}</p></div>
        </div>

        <LeadFormLink type="buy">
          <Button variant="primary" size="lg">Contact Shiva</Button>
        </LeadFormLink>
      </div>
    </main>
  )
}
