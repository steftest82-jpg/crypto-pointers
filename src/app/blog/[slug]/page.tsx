import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  estimateReadingTime,
} from '@/lib/keystatic';
import AuthorCard from '@/components/AuthorCard';
import NewsletterSection from '@/components/NewsletterSection';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import KeyTakeaways from '@/components/KeyTakeaways';
import RelatedPosts from '@/components/RelatedPosts';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.focusKeyword
      ? [post.frontmatter.focusKeyword, ...post.frontmatter.categories]
      : post.frontmatter.categories,
    authors: [{ name: post.frontmatter.author }],
    alternates: {
      canonical: `/blog/${post.frontmatter.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url: `${siteUrl}/blog/${post.frontmatter.slug}`,
      publishedTime: post.frontmatter.publishedAt,
      authors: [post.frontmatter.author],
      images: [
        {
          url: post.frontmatter.coverImage,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
      tags: post.frontmatter.categories,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [post.frontmatter.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const relatedPosts = getRelatedPosts(frontmatter.slug, 3);
  const readingTime = estimateReadingTime(content);
  const publishDate = formatDate(frontmatter.publishedAt);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';
  const postUrl = `${siteUrl}/blog/${frontmatter.slug}`;

  const isNewsArticle = frontmatter.categories.some(c =>
    c.toLowerCase().includes('news')
  );
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;

  // Extract FAQ questions from content (h3 tags that end with ?)
  const faqMatches = content.match(/<h3[^>]*>([^<]*\?)<\/h3>\s*<p>([^<]*)<\/p>/g) || [];
  const faqItems = faqMatches.map(match => {
    const qMatch = match.match(/<h3[^>]*>([^<]*\?)<\/h3>/);
    const aMatch = match.match(/<p>([^<]*)<\/p>/);
    return {
      question: qMatch ? qMatch[1] : '',
      answer: aMatch ? aMatch[1] : '',
    };
  }).filter(f => f.question && f.answer);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isNewsArticle ? 'NewsArticle' : 'BlogPosting',
        '@id': postUrl,
        headline: frontmatter.title,
        description: frontmatter.excerpt,
        image: {
          '@type': 'ImageObject',
          url: frontmatter.coverImage,
          width: 1200,
          height: 630,
        },
        datePublished: frontmatter.publishedAt,
        dateModified: frontmatter.publishedAt,
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#author`,
          name: frontmatter.author,
          url: `${siteUrl}/about`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'Crypto Pointers',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/favicon.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        keywords: frontmatter.focusKeyword,
        articleSection: frontmatter.categories.join(', '),
        wordCount,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.article-content h2', '.article-content p:first-of-type'],
        },
      },
      // BreadcrumbList schema
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: frontmatter.title,
            item: postUrl,
          },
        ],
      },
      // FAQPage schema (if article has FAQ section)
      ...(faqItems.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqItems.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative">
        {/* Cover Image */}
        <div className="relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] w-full overflow-hidden">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/30 to-text/10" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container-wide pb-8 md:pb-12">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-xs text-white/50">
                  <li>
                    <Link href="/" className="hover:text-accent transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-accent transition-colors duration-200">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li className="font-semibold text-white/70 truncate max-w-[200px]">
                    {frontmatter.title}
                  </li>
                </ol>
              </nav>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/15 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-200 backdrop-blur-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl text-balance">
                {frontmatter.title}
              </h1>

              {/* Meta bar */}
              <div className="flex flex-wrap items-center gap-4 mt-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-bold text-accent">
                      {frontmatter.author.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <Link href="/about" className="text-sm font-semibold text-accent hover:text-white transition-colors duration-200">
                      {frontmatter.author}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-white/45">
                      <time dateTime={frontmatter.publishedAt}>{publishDate}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>

                {frontmatter.focusKeyword && (
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-white/10 text-white/60 backdrop-blur-sm">
                    <svg className="w-3 h-3 mr-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    {frontmatter.focusKeyword}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ─────────────────────────────────── */}
      <section className="container-wide py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12">
          {/* ── Article Column ─────────────────────────────────── */}
          <div className="min-w-0">
            {/* Key Takeaways */}
            {frontmatter.keyTakeaways.length > 0 && (
              <div className="mb-10">
                <KeyTakeaways takeaways={frontmatter.keyTakeaways} />
              </div>
            )}

            {/* Share Buttons (top) */}
            <div className="mb-8">
              <ShareButtons url={postUrl} title={frontmatter.title} />
            </div>

            {/* Article Body */}
            <article
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Divider */}
            <div className="divider-bold my-10" />

            {/* Share Buttons (bottom) */}
            <div className="mb-10">
              <ShareButtons url={postUrl} title={frontmatter.title} />
            </div>

            {/* Author Card */}
            <div className="mb-10">
              <AuthorCard />
            </div>
          </div>

          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {frontmatter.tableOfContents.length > 0 && (
                <TableOfContents items={frontmatter.tableOfContents} />
              )}

              {/* Sidebar Newsletter CTA */}
              <div className="card-elevated p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-extrabold text-text mb-1.5">Want More Alpha?</h3>
                <p className="text-xs text-text/50 leading-relaxed mb-4">
                  Join our free newsletter for weekly crypto insights delivered to your inbox.
                </p>
                <Link href="/contact" className="btn-primary text-sm w-full justify-center">
                  Subscribe Free
                </Link>
              </div>

              {/* Category Links */}
              <div className="card p-5">
                <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-primary mb-4">
                  Browse Categories
                </h3>
                <ul className="space-y-2.5">
                  {['Crypto News', 'Crypto Guides', 'Crypto Investing', 'Crypto Reviews'].map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-2.5 text-sm text-text/60 hover:text-primary font-medium transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related Posts ─────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-b from-bg via-accent/5 to-bg section-padding">
          <div className="container-wide">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section className="container-wide pb-20 md:pb-28">
        <NewsletterSection />
      </section>
    </>
  );
}
