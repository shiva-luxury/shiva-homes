import { SectionTitle } from './ui'

const PRESS = [
  { name: 'Voyage LA', href: 'https://voyagela.com/interview/hidden-gems-meet-shiva-tamara-of-shiva-luxury/', confirmed: true },
  { name: 'Bold Journey', href: 'https://boldjourney.com', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
]

export default function PressStrip() {
  return (
    <section className="section-pad border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Recognition" title="Featured On" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {PRESS.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target={p.confirmed ? '_blank' : undefined}
              rel={p.confirmed ? 'noopener noreferrer' : undefined}
              className={`flex items-center justify-center text-center p-5 bg-white border border-[var(--border)] rounded-lg font-serif text-base transition-colors ${
                p.confirmed ? 'text-navy hover:text-gold-dark hover:border-gold' : 'text-[var(--text-muted)] cursor-default'
              }`}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
