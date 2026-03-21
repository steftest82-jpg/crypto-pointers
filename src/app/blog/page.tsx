import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllCategories, formatDate, estimateReadingTime } from '@/lib/keystatic';
import CategoryTabs from '@/components/CategoryTabs';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
  title: 'Blog — All Crypto Articles, Guides & Analysis',
  description:
    'Browse every article on Crypto Pointers. From breaking crypto news and investing strategies to DeFi guides and wallet reviews — everything you need to navigate the digital economy.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Crypto Pointers',
    description:
      'All crypto articles, investing guides, honest reviews, and breaking news in one place.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {/* ── Page Header ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-text/[0.04] via-bg to-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="container-wide relative z-10 pt-12 md:pt-16 pb-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text/40">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="font-semibold text-text/60">Blog</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
              The Crypto Pointers Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-display font-extrabold text-text tracking-tight mb-4 text-balance">
              Every Article,{' '}
              <span className="gradient-text">All in One Place</span>
            </h1>
            <p className="text-lg text-text/55 leading-relaxed max-w-2xl">
              Dive into bold market analysis, no-nonsense investing guides, and honest
              crypto reviews. Filter by category or search for exactly what you need.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 text-text/50">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="font-semibold">{posts.length} articles</span>
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 text-text/40 hover:text-primary transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-medium">{cat.label}</span>
                <span className="text-xs text-text/30">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter Tabs ───────────────────────────────── */}
      <section className="container-wide py-4 sticky top-16 md:top-[72px] z-30 bg-bg/95 backdrop-blur-md border-b border-accent/10">
        <CategoryTabs />
      </section>

      {/* ── Featured Post (latest) ─────────────────────────────── */}
      {featuredPost && (
        <section className="container-wide pt-10 md:pt-14">
          <article className="group">
            <Link
              href={`/blog/${featuredPost.frontmatter.slug}`}
              className="block card overflow-hidden card-hover"
              aria-label={`Read featured article: ${featuredPost.frontmatter.title}`}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                  <Image
                    src={featuredPost.frontmatter.coverImage}
                    alt={featuredPost.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-primary text-white shadow-glow-primary">
                      Latest
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.frontmatter.categories.map((cat) => (
                      <span key={cat} className="category-badge">{cat}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-text leading-tight mb-3 group-hover:text-primary transition-colors duration-200 text-balance">
                    {featuredPost.frontmatter.title}
                  </h2>
                  <p className="text-sm text-text/55 leading-relaxed mb-5 line-clamp-3">
                    {featuredPost.frontmatter.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text/50 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {featuredPost.frontmatter.author.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-semibold text-secondary">{featuredPost.frontmatter.author}</span>
                    </div>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={featuredPost.frontmatter.publishedAt}>
                      {formatDate(featuredPost.frontmatter.publishedAt)}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{estimateReadingTime(featuredPost.content)} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        </section>
      )}

      {/* ── All Posts Grid ─────────────────────────────────────── */}
      <section className="container-wide section-padding">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text">
            All <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-sm text-text/40 font-medium">
            {remainingPosts.length} more article{remainingPosts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {remainingPosts.length === 0 && posts.length <= 1 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/15 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-text/60 mb-1">More content coming soon!</p>
            <p className="text-sm text-text/40">We are writing new articles every week. Subscribe to get notified.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => {
              const readTime = estimateReadingTime(post.content);
              const dateStr = formatDate(post.frontmatter.publishedAt);
              return (
                <article key={post.frontmatter.slug} className="group">
                  <Link
                    href={`/blog/${post.frontmatter.slug}`}
                    className="block card overflow-hidden card-hover h-full"
                    aria-label={`Read: ${post.frontmatter.title}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-card" />
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white bg-text/50 backdrop-blur-sm rounded-full">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {readTime} min
                        </span>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.frontmatter.categories.slice(0, 2).map((cat) => (
                          <span key={cat} className="category-badge text-[10px]">{cat}</span>
                        ))}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-text leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2 text-balance">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-sm text-text/50 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.frontmatter.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-accent/15 mt-auto">
                        <span className="text-xs font-semibold text-secondary">
                          {post.frontmatter.author}
                        </span>
                        <time dateTime={post.frontmatter.publishedAt} className="text-[11px] text-text/40 font-medium">
                          {dateStr}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination placeholder */}
        {posts.length > 10 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              disabled
              className="px-4 py-2 text-sm font-semibold text-text/30 bg-white rounded-xl shadow-soft cursor-not-allowed"
              aria-label="Previous page"
            >
              &larr; Previous
            </button>
            <span className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-xl shadow-glow-primary">
              1
            </span>
            <button
              className="px-4 py-2 text-sm font-semibold text-text/60 bg-white rounded-xl shadow-soft hover:shadow-card hover:text-primary transition-all duration-200"
              aria-label="Next page"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </section>

      {/* ── Newsletter CTA ─────────────────────────────────────── */}
      <section className="container-wide pb-20 md:pb-28">
        <NewsletterSection />
      </section>
    </>
  );
}
