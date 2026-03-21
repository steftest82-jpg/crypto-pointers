export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import AuthorCard from '@/components/AuthorCard';
import NewsletterSection from '@/components/NewsletterSection';
import { getAllPostsFrontmatter } from '@/lib/keystatic';

export const metadata: Metadata = {
  title: 'Crypto Pointers — Your Trusted Crypto Magazine',
  description:
    'Bold crypto analysis, investing guides, honest reviews, and breaking news. The crypto magazine built for investors who demand more than hype.',
  alternates: {
    canonical: '/',
  },
};

const categoryMeta: Record<string, { label: string; slug: string; tagline: string; icon: string }> = {
  'crypto-news': { label: 'Crypto News', slug: 'crypto-news', tagline: 'Breaking stories & market-moving updates', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  'crypto-guides': { label: 'Crypto Guides', slug: 'crypto-guides', tagline: 'Learn the fundamentals & advanced strategies', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  'crypto-investing': { label: 'Crypto Investing', slug: 'crypto-investing', tagline: 'Portfolio ideas & investment analysis', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  'crypto-reviews': { label: 'Crypto Reviews', slug: 'crypto-reviews', tagline: 'Honest takes on wallets, exchanges & tools', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
};

type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  readingTime: string;
};

function getHomepageData() {
  const allPosts = getAllPostsFrontmatter();

  const toPostCard = (post: typeof allPosts[number]): PostCardData => ({
    slug: post.frontmatter.slug,
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt,
    coverImage: post.frontmatter.coverImage,
    category: post.frontmatter.categories[0] || '',
    categorySlug: (post.frontmatter.categories[0] || '').toLowerCase().replace(/\s+/g, '-'),
    author: post.frontmatter.author,
    publishedAt: post.frontmatter.publishedAt,
    readingTime: `${Math.max(1, Math.ceil(post.wordCount / 230))} min read`,
  });

  const featured = toPostCard(allPosts[0]);

  const byCategory: Record<string, PostCardData[]> = {};
  for (const cat of Object.keys(categoryMeta)) {
    byCategory[cat] = [];
  }
  for (const post of allPosts.slice(1)) {
    const primary = post.frontmatter.categories[0];
    if (primary && byCategory[primary] && byCategory[primary].length < 5) {
      byCategory[primary].push(toPostCard(post));
    }
  }

  return { featured, byCategory };
}

const trendingTopics = [
  { label: 'Bitcoin ETF', href: '/category/crypto-news' },
  { label: 'Solana DeFi', href: '/category/crypto-guides' },
  { label: 'Layer 2 Scaling', href: '/category/crypto-guides' },
  { label: 'Meme Coins', href: '/category/crypto-news' },
  { label: 'Crypto Tax 2025', href: '/category/crypto-investing' },
  { label: 'Staking Rewards', href: '/category/crypto-investing' },
];

/* ─── Category Section Header ─── */
function SectionHeader({ meta }: { meta: typeof categoryMeta[string] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d={meta.icon} />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight">
            {meta.label}
          </h2>
          <p className="text-sm text-text/50 mt-0.5">{meta.tagline}</p>
        </div>
      </div>
      <Link
        href={`/category/${meta.slug}`}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200"
      >
        View all
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

/* ─── Layout A: Bento Grid — 1 large hero + 2 stacked side cards + 2 horizontal bottom ─── */
function LayoutBento({ posts, meta }: { posts: PostCardData[]; meta: typeof categoryMeta[string] }) {
  if (posts.length === 0) return null;
  const [hero, ...rest] = posts;
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2, 4);
  const fDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <section className="container-wide py-16 md:py-20">
      <SectionHeader meta={meta} />
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Hero card — spans 2 cols */}
        <Link href={`/blog/${hero.slug}`} className="lg:col-span-2 group relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-auto lg:min-h-[420px]">
          <Image src={hero.coverImage} alt={hero.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 66vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="category-badge mb-3 inline-block">{hero.category}</span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-accent transition-colors duration-300 text-balance">
              {hero.title}
            </h3>
            <p className="text-sm text-white/60 line-clamp-2 max-w-xl mb-3">{hero.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="font-semibold text-accent">{hero.author}</span>
              <span>&middot;</span>
              <time dateTime={hero.publishedAt}>{fDate(hero.publishedAt)}</time>
              <span>&middot;</span>
              <span>{hero.readingTime}</span>
            </div>
          </div>
        </Link>

        {/* Stacked side cards */}
        <div className="flex flex-col gap-5">
          {side.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[16/9] flex-1">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">{post.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-white/50">
                  <time dateTime={post.publishedAt}>{fDate(post.publishedAt)}</time>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom row — horizontal cards */}
      {bottom.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {bottom.map((post) => (
            <PostCard key={post.slug} post={post} horizontal />
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── Layout B: Editorial — 1 featured horizontal + 4 compact list ─── */
function LayoutEditorial({ posts, meta }: { posts: PostCardData[]; meta: typeof categoryMeta[string] }) {
  if (posts.length === 0) return null;
  const [hero, ...rest] = posts;
  const list = rest.slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-text/[0.03] to-transparent">
      <div className="container-wide py-16 md:py-20">
        <SectionHeader meta={meta} />
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Featured card */}
          <div className="lg:col-span-3">
            <PostCard post={hero} featured />
          </div>
          {/* Compact list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-text/30 mb-1">More in {meta.label}</div>
            {list.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 items-start p-3 rounded-xl hover:bg-white hover:shadow-soft transition-all duration-200">
                <span className="text-3xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors tabular-nums leading-none mt-0.5 flex-shrink-0">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-text/40">
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Layout C: Magazine Grid — 2 medium cards top + 3 small cards bottom ─── */
function LayoutMagazine({ posts, meta }: { posts: PostCardData[]; meta: typeof categoryMeta[string] }) {
  if (posts.length === 0) return null;
  const top = posts.slice(0, 2);
  const bottom = posts.slice(2, 5);

  return (
    <section className="container-wide py-16 md:py-20">
      <SectionHeader meta={meta} />
      {/* Top row — 2 equal cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {top.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {/* Bottom row — 3 compact cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        {bottom.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

/* ─── Layout D: Spotlight — full-width hero image with overlay + row of 4 horizontal ─── */
function LayoutSpotlight({ posts, meta }: { posts: PostCardData[]; meta: typeof categoryMeta[string] }) {
  if (posts.length === 0) return null;
  const [hero, ...rest] = posts;
  const row = rest.slice(0, 4);
  const fDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <section className="bg-gradient-to-b from-transparent via-text/[0.02] to-transparent">
      <div className="container-wide py-16 md:py-20">
        <SectionHeader meta={meta} />
        {/* Full-width hero */}
        <Link href={`/blog/${hero.slug}`} className="group block relative rounded-3xl overflow-hidden aspect-[21/9] mb-8">
          <Image src={hero.coverImage} alt={hero.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-end p-8 md:p-12 max-w-2xl">
            <span className="category-badge mb-4 inline-block w-fit">{hero.category}</span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3 group-hover:text-accent transition-colors duration-300 text-balance">{hero.title}</h3>
            <p className="text-sm text-white/50 line-clamp-2 mb-3 hidden sm:block">{hero.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="font-semibold text-accent">{hero.author}</span>
              <span>&middot;</span>
              <time dateTime={hero.publishedAt}>{fDate(hero.publishedAt)}</time>
            </div>
          </div>
        </Link>

        {/* Row of 4 horizontal cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {row.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { featured: featuredPost, byCategory } = getHomepageData();

  const formattedFeaturedDate = new Date(
    featuredPost.publishedAt
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const catKeys = Object.keys(categoryMeta);
  const layouts = [LayoutBento, LayoutEditorial, LayoutMagazine, LayoutSpotlight];

  return (
    <>
      {/* ================================================================
          HERO — Featured Post (full-screen immersive)
          ================================================================ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src={featuredPost.coverImage}
          alt={featuredPost.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00] via-[#1a0a00]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a00]/50 to-transparent" />

        {/* Trending bar — top */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container-wide">
            <div className="pt-4 pb-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  Trending
                </span>
              </span>
              {trendingTopics.map((topic) => (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="flex-shrink-0 px-3 py-1 text-xs font-semibold text-white/50 hover:text-accent rounded-full border border-white/10 hover:border-accent/30 backdrop-blur-sm transition-all duration-200"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hero content — bottom */}
        <div className="relative z-10 container-wide pb-16 md:pb-24 pt-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                Featured
              </span>
              <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-white/10 text-accent border border-accent/20 backdrop-blur-sm">
                {featuredPost.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-5 text-balance">
              {featuredPost.title}
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-2xl line-clamp-3">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-5">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-text font-bold rounded-xl text-sm hover:bg-accent/85 transition-all duration-200 shadow-lg hover:shadow-glow-accent active:scale-[0.98]"
              >
                Read Full Analysis
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <div className="hidden sm:flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-accent/30 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&crop=face"
                    alt="Yosef Kamel"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-accent block">{featuredPost.author}</span>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <time dateTime={featuredPost.publishedAt}>{formattedFeaturedDate}</time>
                    <span>&middot;</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ================================================================
          CATEGORY SECTIONS — Each with a unique layout
          ================================================================ */}
      {catKeys.map((catKey, i) => {
        const posts = byCategory[catKey]?.slice(0, 5) || [];
        if (posts.length === 0) return null;
        const meta = categoryMeta[catKey];
        const LayoutComponent = layouts[i % layouts.length];
        return <LayoutComponent key={catKey} posts={posts} meta={meta} />;
      })}

      {/* ================================================================
          STATS BAR
          ================================================================ */}
      <section className="relative overflow-hidden" aria-label="Platform statistics">
        <div className="absolute inset-0 bg-gradient-cta" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative container-wide py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '50K+', label: 'Monthly Readers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              { value: '100+', label: 'In-Depth Articles', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { value: '4.9', label: 'Reader Rating', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
              { value: '4', label: 'Expert Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight tabular-nums">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY CRYPTO POINTERS + AUTHOR
          ================================================================ */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Why Crypto Pointers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-6">
              The Crypto Magazine That
              <br />
              <span className="gradient-text">Cuts Through the Noise</span>
            </h2>
            <p className="text-text/60 leading-relaxed mb-10 max-w-2xl">
              Too many crypto sites chase clicks with sensational headlines. We built Crypto Pointers to be different — a magazine that combines bold analysis with genuine educational value.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'No-Nonsense Analysis', desc: 'Evidence-based market analysis. No moon-boy predictions — just data, logic, and actionable insight.' },
                { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Deep-Dive Guides', desc: 'From beginner basics to advanced DeFi strategies — comprehensive guides that genuinely teach.' },
                { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Honest Reviews', desc: 'We never accept payment for positive reviews. Our recommendations are based solely on merit.' },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Breaking Speed', desc: 'In crypto, timing matters. We deliver breaking news fast — but never at the expense of accuracy.' },
              ].map((f) => (
                <div key={f.title} className="group p-5 rounded-2xl border border-accent/10 hover:border-primary/20 hover:shadow-soft transition-all duration-300 bg-white/50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-primary mb-4 group-hover:from-primary/20 group-hover:to-accent/30 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-text mb-1.5">{f.title}</h3>
                  <p className="text-sm text-text/55 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:sticky lg:top-24">
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
