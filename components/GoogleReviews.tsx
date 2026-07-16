'use client'

import { useEffect, useState } from 'react'
import { SectionTitle, Card, StarRating, Button } from './ui'
import { VERIFIED_AGGREGATE, VERIFIED_REVIEWS, fetchLiveReviews, GoogleReview } from '../lib/reviews'
import { GOOGLE_BUSINESS } from '../lib/constants'

export default function GoogleReviews() {
  const [rating, setRating] = useState(VERIFIED_AGGREGATE.rating)
  const [count, setCount] = useState(VERIFIED_AGGREGATE.reviewCount)
  const [reviews, setReviews] = useState<GoogleReview[]>(VERIFIED_REVIEWS)

  useEffect(() => {
    fetchLiveReviews().then((live) => {
      if (live) {
        setRating(live.rating)
        setCount(live.reviewCount)
        if (live.reviews.length) setReviews(live.reviews)
      }
    })
  }, [])

  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle eyebrow="Trust" title="What Clients Are Saying" />

        <div className="flex flex-col items-center mb-10">
          <p className="font-serif text-5xl text-navy mb-2">{rating.toFixed(1)}</p>
          <StarRating rating={rating} size={22} />
          <p className="text-sm text-[var(--text-secondary)] mt-2">{count} Google Reviews</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {reviews.map((r, i) => (
            <Card key={i} className="p-6">
              <StarRating rating={r.rating} />
              <p className="text-sm text-navy mt-3 mb-3 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <p className="text-xs text-[var(--text-secondary)]">{r.authorName} · {r.relativeTime}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href={GOOGLE_BUSINESS.reviewUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="!border-navy !text-navy hover:!bg-navy hover:!text-white">Leave a Review</Button>
          </a>
        </div>
      </div>
    </section>
  )
}
