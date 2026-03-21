import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';

interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  readingTime: string;
}

interface PostCardProps {
  post: PostData;
  featured?: boolean;
  horizontal?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  post,
  featured = false,
  horizontal = false,
}) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // ── FEATURED variant ────────────────────────────────────────────
  if (featured) {
    return (
      <article className="group relative">
        <Link
          href={`/blog/${post.slug}`}
          className="block card overflow-hidden card-hover"
          aria-label={`Read: ${post.title}`}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[380px] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-primary text-white">
                  Featured
                </span>
                <Link
                  href={`/category/${post.categorySlug}`}
                  className="category-badge"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.category}
                </Link>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] font-extrabold text-text leading-tight mb-3 group-hover:text-primary transition-colors duration-200 text-balance">
                {post.title}
              </h2>

              <p className="text-sm text-text/60 leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 text-xs text-text/50 mt-auto">
                <span className="font-semibold text-secondary">
                  {post.author}
                </span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                <span aria-hidden="true">&middot;</span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // ── HORIZONTAL variant ──────────────────────────────────────────
  if (horizontal) {
    return (
      <article className="group">
        <Link
          href={`/blog/${post.slug}`}
          className="flex gap-4 items-start card p-3 card-hover"
          aria-label={`Read: ${post.title}`}
        >
          <div className="relative w-28 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="128px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/category/${post.categorySlug}`}
              className="category-badge text-[10px] mb-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {post.category}
            </Link>
            <h3 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-text/45">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // ── DEFAULT (vertical card) variant ──────────────────────────────
  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="block card overflow-hidden card-hover h-full"
        aria-label={`Read: ${post.title}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-card" />

          {/* Reading Time Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white bg-text/60 backdrop-blur-sm rounded-full">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          {/* Category */}
          <div className="mb-3">
            <span
              className="category-badge"
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-text leading-snug mb-2.5 group-hover:text-primary transition-colors duration-200 line-clamp-2 text-balance">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-text/55 leading-relaxed mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-accent/15">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-accent/20 flex-shrink-0">
                <Image
                  src="http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg"
                  alt={post.author}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="text-xs font-semibold text-secondary">
                {post.author}
              </span>
            </div>
            <time
              dateTime={post.publishedAt}
              className="text-[11px] text-text/40 font-medium"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
