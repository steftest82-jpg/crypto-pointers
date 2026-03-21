import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

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
  ]

  const categories = [
    {
      slug: 'crypto-news',
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      slug: 'crypto-guides',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      slug: 'crypto-investing',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      slug: 'crypto-reviews',
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: category.changeFrequency,
    priority: category.priority,
  }))

  return [...staticPages, ...categoryPages]
}
