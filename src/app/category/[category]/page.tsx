import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getPostsByCategory,
  getAllCategories,
  formatDate,
  estimateReadingTime,
  CATEGORY_META,
} from '@/lib/keystatic';
import CategoryTabs from '@/components/CategoryTabs';
import NewsletterSection from '@/components/NewsletterSection';

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const meta = CATEGORY_META[params.category];
  if (!meta) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  return {
    title: `${meta.title} — Articles & Analysis`,
    description: meta.description,
    alternates: {
      canonical: `/category/${params.category}`,
    },
    openGraph: {
      title: `${meta.title} — Crypto Pointers`,
      description: meta.description,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const meta = CATEGORY_META[params.category];
  if (!meta) notFound();

  const posts = getPostsByCategory(params.category);
  const allCategories = getAllCategories();

  return (
    <>
      {/* ── Category Header ────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-text/[0.04] via-bg to-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 right-1/3 w-[450px] h-[450px] rounded-full bg-accent/10 blur-[120px]" />
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
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="font-semibold text-text/60">{meta.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" aria-hidden="true">{meta.icon}</span>
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary">
                Category
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4 text-balance">
              {meta.title}
            </h1>
            <p className="text-lg text-text/55 leading-relaxed max-w-2xl">
              {meta.description}
            </p>

            {/* Category stats */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-text/50">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="font-semibold">{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
              </div>
              {allCategories
                .filter((c) => c.slug !== params.category)
                .slice(0, 3)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="hidden sm:flex items-center gap-1.5 text-sm text-text/35 hover:text-primary transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {cat.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Tabs ──────────────────────────────────────── */}
      <section className="container-wide py-4 sticky top-16 md:top-[72px] z-30 bg-bg/95 backdrop-blur-md border-b border-accent/10">
        <CategoryTabs activeCategory={params.category} />
      </section>

      {/* ── Posts Grid ─────────────────────────────────────────── */}
      <section className="container-wide section-padding">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/15 flex items-center justify-center">
              <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
            </div>
            <p className="text-lg font-bold text-text/60 mb-2">
              No articles in {meta.title} yet
            </p>
            <p className="text-sm text-text/40 mb-6">
              We are working on new content. Check back soon or explore other categories.
            </p>
            <Link href="/blog" className="btn-outline text-sm">
              Browse All Articles
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
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
      </section>

      {/* ── Newsletter ─────────────────────────────────────────── */}
      <section className="container-wide pb-20 md:pb-28">
        <NewsletterSection />
      </section>
    </>
  );
}
