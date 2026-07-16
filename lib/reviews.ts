export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTime: string
}

// Manually verified from the live Shiva Luxury Google Business Profile
// (Google Maps) — aggregate rating and one review snippet are real and
// confirmed. Google's compact search view only surfaces one representative
// snippet at a time, so the remaining reviews are not included here rather
// than inventing them. Configure NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and
// NEXT_PUBLIC_GOOGLE_PLACE_ID to pull all reviews live via the Places API.
export const VERIFIED_AGGREGATE = {
  rating: 5.0,
  reviewCount: 9,
}

export const VERIFIED_REVIEWS: GoogleReview[] = [
  {
    authorName: 'Google User',
    rating: 5,
    text: 'Shiva Luxury has been such a huge help in our home search!',
    relativeTime: 'Verified Google review',
  },
]

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
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`
    )
    const data = await res.json()
    if (data.status !== 'OK') return null
    return {
      rating: data.result.rating,
      reviewCount: data.result.user_ratings_total,
      reviews: (data.result.reviews || []).map((r: any) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
      })),
    }
  } catch {
    return null
  }
}
