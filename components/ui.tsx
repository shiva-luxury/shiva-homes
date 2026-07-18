'use client'

import React from 'react'

export function SectionTitle({ eyebrow, title, subtitle, light }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${light ? 'text-gold-light' : 'text-gold-dark'}`}>{eyebrow}</p>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl mb-4 ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`text-sm sm:text-base leading-relaxed ${light ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{subtitle}</p>}
    </div>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'ghost' | 'gold'
  size?: 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-4 text-base' }
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light border border-navy',
    outline: 'border border-white/40 text-white hover:bg-white/10',
    ghost: 'text-navy hover:bg-black/5',
    gold: 'bg-gold text-navy hover:bg-gold-light font-semibold',
  }
  return (
    <button {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-[var(--border)] rounded-xl ${className}`}>{children}</div>
}

export function Placeholder({ label, aspect = 'aspect-[4/3]', className = '' }: { label: string; aspect?: string; className?: string }) {
  return <div className={`placeholder-media rounded-lg ${aspect} ${className}`}>{label}</div>
}

/** Labeled placeholder for real media the site owner still needs to add — sized exactly, never silently blank. */
export function AddMediaPlaceholder({ label, width, height, className = '' }: { label: string; width: number; height: number; className?: string }) {
  return (
    <div
      className={`placeholder-media rounded-lg border-2 border-dashed border-gold ${className}`}
      style={{ width, height, maxWidth: '100%' }}
    >
      {label}
    </div>
  )
}

export function UnsplashPhoto({
  img, w, h, aspect = 'aspect-[4/3]', className = '', creditPosition = 'bottom-right',
}: {
  img: { id: string; alt: string; photographer: string; photographerUsername: string }
  w: number
  h?: number
  aspect?: string
  className?: string
  creditPosition?: 'bottom-right' | 'bottom-left'
}) {
  const src = `https://images.unsplash.com/${img.id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`
  const creditHref = `https://unsplash.com/@${img.photographerUsername}?utm_source=shiva_luxury&utm_medium=referral`
  return (
    <div className={`relative overflow-hidden rounded-lg ${aspect} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
      {/* span, not <a> — this component can render inside a Link/<a> (e.g. blog cards), and nested anchors are invalid HTML */}
      <span
        role="link"
        tabIndex={0}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(creditHref, '_blank', 'noopener,noreferrer') }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); window.open(creditHref, '_blank', 'noopener,noreferrer') } }}
        className={`absolute ${creditPosition === 'bottom-right' ? 'bottom-1.5 right-2' : 'bottom-1.5 left-2'} text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm hover:text-white cursor-pointer`}
      >
        Photo: {img.photographer} / Unsplash
      </span>
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full text-sm px-3.5 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-navy focus:outline-none focus:border-gold transition-colors placeholder:text-[var(--text-muted)] ${props.className || ''}`}
    />
  )
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full text-sm px-3.5 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-navy focus:outline-none focus:border-gold transition-colors appearance-none ${props.className || ''}`}
    >
      {children}
    </select>
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full text-sm px-3.5 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-navy focus:outline-none focus:border-gold transition-colors resize-y min-h-[80px] placeholder:text-[var(--text-muted)] ${props.className || ''}`}
    />
  )
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{children}</label>
}

export function CheckboxGroup({
  options, selected, onChange,
}: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt])
  }
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="accent-gold w-4 h-4" />
          {opt}
        </label>
      ))}
    </div>
  )
}

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= Math.round(rating) ? '#c9a84c' : '#e5e0d3'}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </span>
  )
}
