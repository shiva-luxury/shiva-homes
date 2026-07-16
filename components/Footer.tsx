import Link from 'next/link'
import { AGENT_NAME, BROKERAGE, DRE, PHONE, EMAIL, SOCIAL, TAGLINE } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-full border border-gold flex items-center justify-center text-gold font-serif text-sm">SL</span>
            <span className="font-serif text-white text-lg">Shiva Luxury</span>
          </div>
          <p className="text-sm">{TAGLINE}</p>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#buy" className="hover:text-gold-light">Buy</Link></li>
            <li><Link href="/#sell" className="hover:text-gold-light">Sell</Link></li>
            <li><Link href="/#rent" className="hover:text-gold-light">Rent</Link></li>
            <li><Link href="/#neighborhoods" className="hover:text-gold-light">Neighborhoods</Link></li>
            <li><Link href="/blog" className="hover:text-gold-light">Blog</Link></li>
            <li><Link href="/#watch" className="hover:text-gold-light">Watch</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Connect</p>
          <ul className="space-y-2 text-sm">
            <li><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">Instagram {SOCIAL.instagramHandle}</a></li>
            <li><a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">YouTube {SOCIAL.youtubeHandle}</a></li>
            <li><a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">TikTok {SOCIAL.tiktokHandle}</a></li>
            <li><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">Facebook</a></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>{AGENT_NAME}</li>
            <li>{BROKERAGE}</li>
            <li>{DRE}</li>
            <li><a href={`tel:${PHONE.replace(/\D/g, '')}`} className="hover:text-gold-light">{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-gold-light">{EMAIL}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-6">
        <p className="max-w-7xl mx-auto text-xs text-white/40 leading-relaxed">
          {AGENT_NAME} is a licensed real estate agent ({DRE}) with {BROKERAGE}, Los Angeles, California. All information provided is deemed reliable but is not guaranteed and should be independently verified. Equal Housing Opportunity. This is not intended as a solicitation if your property is already listed with another broker.
        </p>
        <p className="max-w-7xl mx-auto text-xs text-white/40 mt-3">© Shiva Luxury 2025. All rights reserved.</p>
      </div>
    </footer>
  )
}
