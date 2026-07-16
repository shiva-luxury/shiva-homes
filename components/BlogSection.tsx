import Link from 'next/link'
import { Card, Placeholder, SectionTitle, Button } from './ui'
import { BLOG_POSTS } from '../lib/blog'

export default function BlogSection() {
  const latest = BLOG_POSTS.slice(-6).reverse()
  return (
    <section className="section-pad max-w-7xl mx-auto px-6">
      <SectionTitle eyebrow="Read" title="From the Blog" subtitle="Straight-talk guides on buying, selling, and living in Los Angeles." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {latest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <Placeholder label={post.keyword} aspect="aspect-[16/10]" className="rounded-none" />
              <div className="p-5">
                <p className="text-xs text-gold-dark font-semibold uppercase tracking-wide mb-2">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="font-serif text-lg text-navy leading-snug mb-2">{post.title}</p>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog"><Button variant="primary" size="lg">Read All Articles</Button></Link>
      </div>
    </section>
  )
}
