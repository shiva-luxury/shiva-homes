import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ExitPopup from '../components/ExitPopup'
import { SITE_URL, BRAND, AGENT_NAME, DRE } from '../lib/constants'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['500', '600', '700'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `California Real Estate, Done Right | ${BRAND}`,
    template: `%s | ${BRAND}`,
  },
  description: `Buying, selling, or renting in Los Angeles — ${AGENT_NAME} knows this market inside out. ${DRE}, Rise Real Estate Group.`,
  openGraph: {
    type: 'website',
    siteName: BRAND,
    title: `California Real Estate, Done Right | ${BRAND}`,
    description: `Buying, selling, or renting in Los Angeles — ${AGENT_NAME} knows this market inside out.`,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `California Real Estate, Done Right | ${BRAND}`,
    description: `Buying, selling, or renting in Los Angeles — ${AGENT_NAME} knows this market inside out.`,
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
        <ExitPopup />
      </body>
    </html>
  )
}
