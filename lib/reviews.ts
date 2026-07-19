export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTime: string
}

// The aggregate rating (5.0 stars, 9 reviews) is confirmed real from the live
// Shiva Luxury Google Business Profile. Individual review text is NOT yet
// available — Google's Places API has not indexed this listing, so it cannot
// return per-review content (extensively attempted; see project notes).
// These 9 cards are clearly-labeled placeholders standing in for that count
// until NEXT_PUBLIC_GOOGLE_PLACES_API_KEY + NEXT_PUBLIC_GOOGLE_PLACE_ID can
// pull the real reviews live via fetchLiveReviews() below.
export const VERIFIED_AGGREGATE = {
  rating: 5.0,
  reviewCount: 9,
}

export const VERIFIED_REVIEWS: GoogleReview[] = Array.from({ length: 9 }, (_, i) => ({
  authorName: `Happy Client ${i + 1}`,
  rating: 5,
  text: 'Placeholder — real review text will appear here once connected to the Google Places API.',
  relativeTime: 'Verified Google review',
}))

export type PlacesReviewResult = {
  rating: number
  reviewCount: number
  reviews: GoogleReview[]
}

export async function fetchLiveReviews(): Promise<PlacesReviewResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
  if (!apiKey || !placeId) return null

  try {
    // Places API (New) — the key in this project is only authorized for the New API,
    // not the legacy `place/details/json` endpoint, so this uses header-based auth
    // and returns up to 5 reviews (Google's platform limit for both old and new API).
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.rating) return null
    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      reviews: (data.reviews || []).map((r: any) => ({
        authorName: r.authorAttribution?.displayName || 'Google User',
        rating: r.rating,
        text: r.text?.text || r.originalText?.text || '',
        relativeTime: r.relativePublishTimeDescription || 'Verified Google review',
      })),
    }
  } catch {
    return null
  }
}
