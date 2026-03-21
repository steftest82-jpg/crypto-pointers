import type { MetadataRoute } from 'next'
import { getAllPostsFrontmatter } from '@/lib/keystatic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const posts = getAllPostsFrontmatter()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  const categories: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/category/crypto-news`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/category/crypto-guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/category/crypto-investing`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/category/crypto-reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
  ]

  const articlePages: MetadataRoute.Sitemap = posts.map((post, i) => ({
    url: `${BASE_URL}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt || now),
    changeFrequency: 'monthly' as const,
    priority: i < 10 ? 0.8 : 0.7, // Recent articles get higher priority
    // Note: Next.js MetadataRoute.Sitemap doesn't support image extensions natively
    // but the URLs are crawlable from the pages themselves
  }))

  return [...staticPages, ...categories, ...articlePages]
}
