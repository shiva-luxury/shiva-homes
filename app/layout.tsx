import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsletterPopup from '../components/NewsletterPopup'
import { SITE_URL, BRAND, DRE } from '../lib/constants'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['500', '600', '700'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600'] })

const HOME_TITLE = `${BRAND} — California Real Estate Expert`
const HOME_DESCRIPTION = `Award-winning California real estate brand ${BRAND} specializes in luxury homes, buyers, sellers, and investors across Los Angeles, Encino, Malibu, Venice, and Santa Monica. ${DRE}.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${BRAND}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    'California real estate agent',
    'luxury homes Los Angeles',
    'Encino real estate',
    'Sherman Oaks homes for sale',
    'Malibu luxury real estate',
    'Venice Beach real estate agent',
    'Santa Monica homes',
    'Beverly Hills real estate',
  ],
  openGraph: {
    type: 'website',
    siteName: BRAND,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  verification: {
    // REPLACE WITH YOUR GOOGLE SEARCH CONSOLE VERIFICATION CODE
    google: 'REPLACE_WITH_GSC_VERIFICATION_CODE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
        <NewsletterPopup />
      </body>
    </html>
  )
}
