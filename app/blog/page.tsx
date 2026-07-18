import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, Placeholder } from '../../components/ui'
import { BLOG_POSTS } from '../../lib/blog'

const BLOG_INDEX_TITLE = 'Blog — LA Real Estate Insights'
const BLOG_INDEX_DESCRIPTION = 'Buying, selling, and neighborhood guides for Los Angeles real estate from Shiva Nelson, Rise Real Estate Group.'

export const metadata: Metadata = {
  title: BLOG_INDEX_TITLE,
  description: BLOG_INDEX_DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: { title: BLOG_INDEX_TITLE, description: BLOG_INDEX_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: BLOG_INDEX_TITLE, description: BLOG_INDEX_DESCRIPTION },
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].reverse()
  return (
    <main className="bg-white">
      <div className="bg-navy py-16 text-center">
        <h1 className="font-serif text-4xl text-white mb-2">The Blog</h1>
        <p className="text-white/70">Straight-talk guides on buying, selling, and living in Los Angeles</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <Placeholder label={post.keyword} aspect="aspect-[16/10]" className="rounded-none" />
                <div className="p-5">
                  <p className="text-xs text-gold-dark font-semibold uppercase tracking-wide mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="font-serif text-lg text-navy leading-snug mb-2">{post.title}</p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
