import type { MetadataRoute } from 'next'
import { SITE_URL } from '../lib/constants'
import { BLOG_POSTS } from '../lib/blog'
import { NEIGHBORHOODS } from '../lib/neighborhoods'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/properties', '/blog', '/about', '/newsletter'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const neighborhoodRoutes = NEIGHBORHOODS.map((n) => ({
    url: `${SITE_URL}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...neighborhoodRoutes]
}
