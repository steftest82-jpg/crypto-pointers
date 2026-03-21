"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

const categories = [
  {
    slug: 'all',
    label: 'All Posts',
    href: '/blog',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    slug: 'crypto-news',
    label: 'News',
    href: '/category/crypto-news',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    slug: 'crypto-guides',
    label: 'Guides',
    href: '/category/crypto-guides',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    slug: 'crypto-investing',
    label: 'Investing',
    href: '/category/crypto-investing',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    slug: 'crypto-reviews',
    label: 'Reviews',
    href: '/category/crypto-reviews',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

interface CategoryTabsProps {
  activeCategory?: string;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ activeCategory }) => {
  const pathname = usePathname();

  const getActiveSlug = (): string => {
    if (activeCategory) return activeCategory;
    if (pathname === '/blog') return 'all';
    const match = pathname.match(/\/category\/([\w-]+)/);
    return match ? match[1] : 'all';
  };

  const active = getActiveSlug();

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2"
      role="tablist"
      aria-label="Filter posts by category"
    >
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={cat.href}
            role="tab"
            aria-selected={isActive}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-text/60 shadow-soft hover:text-primary hover:shadow-card hover:bg-white'
            }`}
          >
            <span className={isActive ? 'text-white/80' : 'text-text/40'}>
              {cat.icon}
            </span>
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
