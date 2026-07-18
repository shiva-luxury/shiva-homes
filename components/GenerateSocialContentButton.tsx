'use client'

import { Button } from './ui'
import { CONTENT_ENGINE_URL, SITE_URL } from '../lib/constants'
import type { BlogPost } from '../lib/blog'

/**
 * Opens start.shivaluxury.com's Attract > Repurpose tab in a new tab, pre-filled with this
 * post's title/content/URL/keyword/meta description via URL params — no login required.
 */
export default function GenerateSocialContentButton({ post, className = '' }: { post: BlogPost; className?: string }) {
  const openContentEngine = () => {
    const params = new URLSearchParams({
      blog_title: post.title,
      blog_content: post.body.join('\n\n'),
      blog_url: `${SITE_URL}/blog/${post.slug}`,
      focus_keyword: post.keyword,
      meta_description: post.metaDescription,
    })
    window.open(`${CONTENT_ENGINE_URL}/?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant="outline"
      onClick={openContentEngine}
      className={`!border-navy !text-navy hover:!bg-navy hover:!text-white ${className}`}
    >
      Generate Social Content for This Post
    </Button>
  )
}
