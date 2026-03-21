import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import type { Post } from '@/lib/keystatic';
import { formatDate, estimateReadingTime } from '@/lib/keystatic';

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts: FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-2">
            Keep Reading
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight">
            Related <span className="gradient-text">Articles</span>
          </h2>
        </div>
        <Link
          href="/blog"
          className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200"
        >
          View all
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

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
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.frontmatter.categories.slice(0, 2).map((cat) => (
                      <span key={cat} className="category-badge text-[10px]">{cat}</span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-text leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-text/50 leading-relaxed line-clamp-2 flex-1">
                    {post.frontmatter.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-accent/15">
                    <span className="text-xs font-semibold text-secondary">
                      {post.frontmatter.author}
                    </span>
                    <time dateTime={post.frontmatter.publishedAt} className="text-[11px] text-text/35">
                      {dateStr}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
