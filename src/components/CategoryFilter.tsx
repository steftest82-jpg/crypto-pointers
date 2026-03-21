"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

const categories = [
  { slug: 'all', label: 'All Posts', href: '/blog' },
  { slug: 'crypto-news', label: 'News', href: '/category/crypto-news' },
  { slug: 'crypto-guides', label: 'Guides', href: '/category/crypto-guides' },
  { slug: 'crypto-investing', label: 'Investing', href: '/category/crypto-investing' },
  { slug: 'crypto-reviews', label: 'Reviews', href: '/category/crypto-reviews' },
];

interface CategoryFilterProps {
  activeCategory?: string;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ activeCategory }) => {
  const pathname = usePathname();
  const active = activeCategory || (pathname === '/blog' ? 'all' : '');

  return (
    <div className="flex flex-wrap gap-2" role="navigation" aria-label="Category filter">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={cat.href}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
            active === cat.slug
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-white text-text/70 hover:bg-accent/30 hover:text-secondary shadow-sm'
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
