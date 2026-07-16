const PRESS = [
  { name: 'Voyage LA', href: 'https://voyagela.com/interview/hidden-gems-meet-shiva-tamara-of-shiva-luxury/', confirmed: true },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
  { name: 'Press Feature', href: '#', confirmed: false },
]

export default function PressStrip() {
  return (
    <section className="py-12 border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">As Featured In</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PRESS.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target={p.confirmed ? '_blank' : undefined}
              rel={p.confirmed ? 'noopener noreferrer' : undefined}
              className={`font-serif text-lg ${p.confirmed ? 'text-navy hover:text-gold-dark' : 'text-[var(--text-muted)] cursor-default'}`}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
