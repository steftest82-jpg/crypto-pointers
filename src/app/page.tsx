import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import AuthorCard from '@/components/AuthorCard';
import NewsletterSection from '@/components/NewsletterSection';
import CategoryTabs from '@/components/CategoryTabs';

export const metadata: Metadata = {
  title: 'Crypto Pointers — Your Trusted Crypto Magazine',
  description:
    'Bold crypto analysis, investing guides, honest reviews, and breaking news. The crypto magazine built for investors who demand more than hype.',
  alternates: {
    canonical: '/',
  },
};

const featuredPost = {
  slug: 'bitcoin-surges-past-100k',
  title: 'Bitcoin Surges Past $100K: What It Means for Your Portfolio',
  excerpt:
    'Bitcoin has shattered the $100,000 barrier for the first time in history. We break down the catalysts behind this historic move, what institutional players are doing, and exactly how you should position your portfolio right now to capture upside while managing risk.',
  coverImage:
    'http://img.b2bpic.net/premium-photo/vibrant-illustration-businessman-celebrating-success-with-dynamic-colors-expressive-movements_34926-7829.jpg',
  category: 'Crypto News',
  categorySlug: 'crypto-news',
  author: 'Yosef Kamel',
  publishedAt: '2024-12-15',
  readingTime: '7 min read',
};

const latestPosts = [
  {
    slug: 'beginners-guide-crypto-investing-2025',
    title: "The Complete Beginner's Guide to Cryptocurrency Investing in 2025",
    excerpt:
      'New to crypto? This comprehensive guide walks you through everything from setting up your first wallet to building a diversified portfolio that matches your risk tolerance.',
    coverImage:
      'http://img.b2bpic.net/free-photo/study-halls-biology-digital-illustrations_456031-75.jpg',
    category: 'Crypto Guides',
    categorySlug: 'crypto-guides',
    author: 'Yosef Kamel',
    publishedAt: '2024-12-10',
    readingTime: '12 min read',
  },
  {
    slug: 'ethereum-vs-solana-2025',
    title:
      'Ethereum vs Solana: Which Blockchain Deserves Your Investment in 2025?',
    excerpt:
      'The battle between Ethereum and Solana intensifies. We compare fees, speed, ecosystem maturity, and investment potential to help you decide where to allocate capital.',
    coverImage:
      'http://img.b2bpic.net/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg',
    category: 'Crypto Reviews',
    categorySlug: 'crypto-reviews',
    author: 'Yosef Kamel',
    publishedAt: '2024-12-05',
    readingTime: '9 min read',
  },
  {
    slug: 'top-5-crypto-wallets-reviewed',
    title:
      'Top 5 Crypto Wallets Reviewed: Security, Ease of Use & Features Compared',
    excerpt:
      'Your crypto is only as safe as your wallet. We tested and reviewed the top 5 crypto wallets of 2025, ranking them on security, user experience, and supported assets.',
    coverImage:
      'http://img.b2bpic.net/free-photo/blurred-hotel-reception_1203-89.jpg',
    category: 'Crypto Reviews',
    categorySlug: 'crypto-reviews',
    author: 'Yosef Kamel',
    publishedAt: '2024-11-28',
    readingTime: '8 min read',
  },
  {
    slug: 'defi-yield-farming-explained',
    title:
      'DeFi Yield Farming Explained: How to Earn Passive Income with Crypto',
    excerpt:
      'Yield farming can generate substantial passive income, but the risks are real. This guide explains how DeFi yield farming works, the best strategies, and how to avoid common traps.',
    coverImage:
      'http://img.b2bpic.net/premium-photo/lizard-sweater-contemplating-sunset_1150025-79783.jpg',
    category: 'Crypto Guides',
    categorySlug: 'crypto-guides',
    author: 'Yosef Kamel',
    publishedAt: '2024-11-20',
    readingTime: '10 min read',
  },
  {
    slug: 'sec-approves-spot-ethereum-etf',
    title:
      'Breaking: SEC Approves Spot Ethereum ETF — A New Era for Crypto Markets',
    excerpt:
      'The SEC has officially approved spot Ethereum ETFs, opening the floodgates for institutional capital. Here is what this landmark decision means for ETH price and the broader market.',
    coverImage:
      'http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg',
    category: 'Crypto News',
    categorySlug: 'crypto-news',
    author: 'Yosef Kamel',
    publishedAt: '2024-11-15',
    readingTime: '6 min read',
  },
  {
    slug: 'crypto-portfolio-allocation-strategy',
    title:
      'How to Build a Bulletproof Crypto Portfolio: The 2025 Allocation Strategy',
    excerpt:
      'Stop guessing and start allocating with intention. Our data-driven crypto portfolio strategy balances growth, stability, and risk management for serious investors.',
    coverImage:
      'http://img.b2bpic.net/free-photo/study-halls-biology-digital-illustrations_456031-75.jpg',
    category: 'Crypto Investing',
    categorySlug: 'crypto-investing',
    author: 'Yosef Kamel',
    publishedAt: '2024-11-10',
    readingTime: '11 min read',
  },
];

const trendingTopics = [
  { label: 'Bitcoin ETF', href: '/blog' },
  { label: 'Solana DeFi', href: '/blog' },
  { label: 'Layer 2 Scaling', href: '/blog' },
  { label: 'Meme Coins', href: '/blog' },
  { label: 'Crypto Tax 2025', href: '/blog' },
  { label: 'Staking Rewards', href: '/blog' },
];

export default function HomePage() {
  const formattedFeaturedDate = new Date(
    featuredPost.publishedAt
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* ================================================================
          HERO — Featured Post
          ================================================================ */}
      <section className="relative bg-gradient-hero overflow-hidden">
        {/* Decorative blurred orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px]" />
        </div>

        <div className="relative z-10 container-wide">
          {/* Top bar: Trending */}
          <div className="pt-6 pb-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                Trending
              </span>
            </span>
            {trendingTopics.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="flex-shrink-0 px-3 py-1 text-xs font-semibold text-white/60 hover:text-accent rounded-full border border-white/10 hover:border-accent/30 transition-all duration-200"
              >
                {topic.label}
              </Link>
            ))}
          </div>

          {/* Featured Post Card */}
          <div className="pb-20 md:pb-28 pt-8 md:pt-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block"
              aria-label={`Read featured article: ${featuredPost.title}`}
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Side */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest rounded-full bg-primary text-white shadow-glow-primary">
                      Featured
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-white/10 text-accent border border-accent/20">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5 group-hover:text-accent transition-colors duration-300 text-balance">
                    {featuredPost.title}
                  </h1>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed mb-7 max-w-xl line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-accent/30 flex-shrink-0">
                      <Image
                        src="http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg"
                        alt="Yosef Kamel"
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-accent">
                        {featuredPost.author}
                      </span>
                      <span className="text-white/30" aria-hidden="true">
                        &middot;
                      </span>
                      <time
                        dateTime={featuredPost.publishedAt}
                        className="text-white/50"
                      >
                        {formattedFeaturedDate}
                      </time>
                      <span className="text-white/30" aria-hidden="true">
                        &middot;
                      </span>
                      <span className="text-white/50">
                        {featuredPost.readingTime}
                      </span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <span className="btn-accent text-sm gap-2">
                      Read Full Analysis
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Image Side */}
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden shadow-elevated group-hover:shadow-glow-primary transition-shadow duration-500">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Gradient fade to bg */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ================================================================
          CATEGORY TABS
          ================================================================ */}
      <section className="container-wide -mt-6 relative z-20">
        <CategoryTabs />
      </section>

      {/* ================================================================
          LATEST POSTS GRID
          ================================================================ */}
      <section className="container-wide section-padding">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-2">
              Fresh Off the Press
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              Latest <span className="gradient-text">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200"
          >
            View all posts
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/blog" className="btn-outline gap-2">
            Explore the Full Archive
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ================================================================
          STATS BAR
          ================================================================ */}
      <section className="bg-gradient-cta" aria-label="Platform statistics">
        <div className="container-wide py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Monthly Readers' },
              { value: '200+', label: 'In-Depth Articles' },
              { value: '4.9★', label: 'Reader Rating' },
              { value: '12', label: 'Crypto Categories' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY CRYPTO POINTERS + AUTHOR
          ================================================================ */}
      <section className="container-wide section-padding">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Why Us */}
          <div className="lg:col-span-3">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-2">
              Why Crypto Pointers
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-6">
              The Crypto Magazine That
              <br />
              <span className="gradient-text">Cuts Through the Noise</span>
            </h2>
            <p className="text-text/70 leading-relaxed mb-8 max-w-2xl">
              The crypto information landscape is broken. Too many sites chase clicks
              with sensational headlines. Too few take the time to explain what
              actually matters for your portfolio. We built Crypto Pointers to be the
              antidote — a magazine that combines bold analysis with genuine
              educational value.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'No-Nonsense Analysis',
                  description:
                    'Evidence-based market analysis. No moon-boy predictions — just data, logic, and actionable insight.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: 'Deep-Dive Guides',
                  description:
                    'From beginner basics to advanced DeFi strategies — comprehensive guides that genuinely teach.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ),
                  title: 'Honest Reviews',
                  description:
                    'We never accept payment for positive reviews. Our recommendations are based solely on merit.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Breaking Speed',
                  description:
                    'In crypto, timing matters. We deliver breaking news fast — but never at the expense of accuracy.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="card p-5 card-hover group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-primary mb-4 group-hover:from-primary/20 group-hover:to-accent/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-text mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Author Card */}
          <div className="lg:col-span-2">
            <AuthorCard />
          </div>
        </div>
      </section>

      {/* ================================================================
          NEWSLETTER CTA
          ================================================================ */}
      <section className="container-wide pb-20 md:pb-28">
        <NewsletterSection />
      </section>
    </>
  );
}
