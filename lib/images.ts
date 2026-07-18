// Real, verified Unsplash photos hotlinked from their public CDN with attribution,
// per Unsplash's guidelines for hotlinking (images.unsplash.com is the delivery CDN,
// not the rate-limited API — no key required, attribution provided via UnsplashCredit).
// Source photo IDs were found by browsing unsplash.com/s/photos/<query> directly.

export type UnsplashImage = {
  id: string
  alt: string
  photographer: string
  photographerUsername: string
}

function url(id: string, w: number, h?: number) {
  const dims = h ? `&w=${w}&h=${h}` : `&w=${w}`
  return `https://images.unsplash.com/${id}?auto=format&fit=crop${dims}&q=80`
}

export function unsplashUrl(img: UnsplashImage, w: number, h?: number) {
  return url(img.id, w, h)
}

export function unsplashCreditHref(img: UnsplashImage) {
  return `https://unsplash.com/@${img.photographerUsername}?utm_source=shiva_luxury&utm_medium=referral`
}

// Agent's own portrait photo, hosted on shivaluxury.com — not an Unsplash image.
export const PORTRAIT_PHOTO_URL =
  'https://www.shivaluxury.com/wp-content/uploads/go-x/u/e8d3ff54-4257-4904-ad7c-accaa7557ca5/l0,t23,w876,h876/image-768x768.jpg'

export const HERO_IMAGE: UnsplashImage = {
  id: 'photo-1597211833712-5e41faa202ea',
  alt: 'Luxury Los Angeles home exterior',
  photographer: 'Durian Bullet',
  photographerUsername: 'durianbullet',
}

export const CTA_LISTINGS_IMAGE: UnsplashImage = {
  id: 'photo-1600210491892-03d54c0aaf87',
  alt: 'Luxury home interior in Los Angeles',
  photographer: 'Collov Home Design',
  photographerUsername: 'collovhome',
}

export const NEIGHBORHOOD_IMAGES: Record<string, UnsplashImage> = {
  encino: {
    id: 'photo-1782012670361-299bcf88c30a',
    alt: 'Residential street with houses and palm trees at sunset',
    photographer: 'Chloe Loe',
    photographerUsername: 'chloe_loe',
  },
  'sherman-oaks': {
    id: 'photo-1771293549911-2c2ed4e8ca1b',
    alt: 'Palm trees line a residential street with parked cars',
    photographer: 'Darien Designs',
    photographerUsername: 'dariendesigns',
  },
  malibu: {
    id: 'photo-1599565508598-50662247a557',
    alt: 'Palm tree near a white concrete building in California',
    photographer: 'David Vives',
    photographerUsername: 'davidvives',
  },
  venice: {
    id: 'photo-1777244746901-a222cbb10fa2',
    alt: 'Victorian house with a white picket fence',
    photographer: 'Sam Takes Pictures',
    photographerUsername: 'samtakespictures',
  },
  'santa-monica': {
    id: 'photo-1568321431819-bb00accbca4a',
    alt: 'Aerial view of Southern California coastal cityscape',
    photographer: 'Kruser',
    photographerUsername: 'kruser',
  },
  'beverly-hills': {
    id: 'photo-1759355787113-c9ea513a4a47',
    alt: 'White house with green gate surrounded by trees',
    photographer: 'Ube Yonroad',
    photographerUsername: 'ubeyonroad',
  },
  calabasas: {
    id: 'photo-1759355787135-05a89361afb9',
    alt: 'Large white estate home with a tiled roof',
    photographer: 'Ube Yonroad',
    photographerUsername: 'ubeyonroad',
  },
  'woodland-hills': {
    id: 'photo-1777244746931-3d9a76621c9b',
    alt: 'A car drives down a winding road past houses',
    photographer: 'Sam Takes Pictures',
    photographerUsername: 'samtakespictures',
  },
}

export const BLOG_IMAGES: Record<string, UnsplashImage> = {
  'california-real-estate-done-right': {
    id: 'photo-1600210491892-03d54c0aaf87',
    alt: 'White sofa chair near a fireplace in a California home',
    photographer: 'Collov Home Design',
    photographerUsername: 'collovhome',
  },
  'luxury-homes-encino-ca': {
    id: 'photo-1613545325278-f24b0cae1224',
    alt: 'White and brown living room set in a luxury home',
    photographer: 'Zac Gudakov',
    photographerUsername: 'zacgudakov',
  },
  'homes-for-sale-sherman-oaks': {
    id: 'photo-1564078516393-cf04bd966897',
    alt: 'Gray padded chaise couch beside a window',
    photographer: 'R P Nickson',
    photographerUsername: 'rpnickson',
  },
  'malibu-luxury-real-estate-agent': {
    id: 'photo-1562438668-bcf0ca6578f0',
    alt: 'Gray bed in a luxury coastal bedroom',
    photographer: 'I Wood',
    photographerUsername: 'iwood',
  },
  'venice-beach-homes-for-sale': {
    id: 'photo-1518733057094-95b53143d2a7',
    alt: 'Throw pillows on a couch in a Venice Beach home',
    photographer: 'Rhema Kallianpur',
    photographerUsername: 'rhemakallianpur',
  },
  'santa-monica-real-estate-agent': {
    id: 'photo-1613545325268-9265e1609167',
    alt: 'White couch near a glass window with ocean light',
    photographer: 'Zac Gudakov',
    photographerUsername: 'zacgudakov',
  },
  'encino-real-estate-market-2025': {
    id: 'photo-1759355787114-09af8ee10783',
    alt: 'Large brick house with white trim',
    photographer: 'Ube Yonroad',
    photographerUsername: 'ubeyonroad',
  },
  'how-to-sell-your-home-los-angeles': {
    id: 'photo-1568321432389-7bb2cd844973',
    alt: 'Aerial view of a Los Angeles neighborhood',
    photographer: 'Kruser',
    photographerUsername: 'kruser',
  },
  'first-time-buyer-los-angeles-california': {
    id: 'photo-1779828651038-af85b4c7074f',
    alt: 'Hazy Los Angeles cityscape with buildings and distant hills',
    photographer: 'Renee Thompson Co',
    photographerUsername: 'reneethompsonco',
  },
  'off-market-homes-los-angeles': {
    id: 'photo-1759355787088-d8ba421d23ef',
    alt: 'Luxury Los Angeles home exterior',
    photographer: 'Ube Yonroad',
    photographerUsername: 'ubeyonroad',
  },
}
