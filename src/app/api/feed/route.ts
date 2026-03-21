import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllPosts } from '@/lib/keystatic';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';

  const feed = new RSS({
    title: 'Crypto Pointers — Your Trusted Source of Crypto Information',
    description:
      'Bold crypto analysis, investing guides, honest reviews, and breaking news. The crypto magazine for investors who demand more than hype.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/api/feed`,
    image_url: `${siteUrl}/favicon.ico`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    copyright: `© ${new Date().getFullYear()} Crypto Pointers. All rights reserved.`,
    ttl: 60,
    custom_namespaces: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    categories: [
      'Cryptocurrency',
      'Bitcoin',
      'Ethereum',
      'DeFi',
      'Blockchain',
      'Investing',
      'Web3',
    ],
  });

  const posts = getAllPosts();

  for (const post of posts) {
    const { frontmatter, content } = post;
    const postUrl = `${siteUrl}/blog/${frontmatter.slug}`;

    feed.item({
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: postUrl,
      guid: postUrl,
      categories: frontmatter.categories,
      author: frontmatter.author,
      date: new Date(frontmatter.publishedAt),
      enclosure: frontmatter.coverImage
        ? {
            url: frontmatter.coverImage,
            type: 'image/jpeg',
          }
        : undefined,
      custom_elements: [
        { 'content:encoded': content },
        { 'dc:creator': frontmatter.author },
      ],
    });
  }

  const xml = feed.xml({ indent: '  ' });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
