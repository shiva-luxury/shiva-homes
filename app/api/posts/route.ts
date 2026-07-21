import { NextResponse } from 'next/server'
import { BLOG_POSTS } from '../../../lib/blog'
import { SITE_URL } from '../../../lib/constants'

/**
 * Public JSON feed of every blog post — consumed by start.shivaluxury.com's Blog tab so
 * posts can be repurposed into social content without copy/pasting between the two apps.
 */
export async function GET() {
  const posts = BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    url: `${SITE_URL}/blog/${p.slug}`,
    focusKeyword: p.keyword,
    metaDescription: p.metaDescription,
    content: p.body.join('\n\n'),
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return NextResponse.json(
    { posts, updatedAt: new Date().toISOString() },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } }
  )
}
