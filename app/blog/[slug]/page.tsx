import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getPost } from '../../../lib/blog'
import { UnsplashPhoto, Button } from '../../../components/ui'
import LeadFormLink from '../../../components/LeadFormLink'
import GenerateSocialContentButton from '../../../components/GenerateSocialContentButton'
import { BRAND, BROKERAGE, DRE, SITE_URL } from '../../../lib/constants'
import { BLOG_IMAGES } from '../../../lib/images'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  const bareTitle = post.metaTitle.replace(/\s*\|\s*Shiva Luxury\s*$/i, '')
  return {
    title: bareTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.metaTitle, description: post.metaDescription, url: `${SITE_URL}/blog/${post.slug}`, type: 'article', publishedTime: post.date },
    twitter: { card: 'summary_large_image', title: post.metaTitle, description: post.metaDescription },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: BRAND },
    publisher: { '@type': 'Organization', name: BROKERAGE },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-xs text-gold-dark font-semibold uppercase tracking-wide mb-3">
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-navy mb-4 leading-tight">{post.title}</h1>
        <div className="mb-6">
          <GenerateSocialContentButton post={post} />
        </div>
        <UnsplashPhoto img={BLOG_IMAGES[post.slug]} w={1200} h={630} aspect="aspect-[16/9]" className="mb-8" />

        <article className="prose-none space-y-5">
          {post.body.map((para, i) => (
            <p key={i} className="text-[15px] leading-[1.8] text-[var(--text-secondary)]">{para}</p>
          ))}
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          {post.internalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-navy underline underline-offset-4 hover:text-gold-dark">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-[var(--surface)] rounded-xl p-8 text-center">
          <p className="font-serif text-xl text-navy mb-2">Ready to talk it through?</p>
          <p className="text-sm text-[var(--text-secondary)] mb-5">{BRAND} · {BROKERAGE} · {DRE}</p>
          <LeadFormLink type="buy">
            <Button variant="primary" size="lg">Contact Shiva</Button>
          </LeadFormLink>
        </div>

        <div className="mt-6 text-center">
          <GenerateSocialContentButton post={post} />
        </div>
      </div>
    </main>
  )
}
