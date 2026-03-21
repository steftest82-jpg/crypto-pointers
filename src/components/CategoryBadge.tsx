import Link from 'next/link';
import type { FC } from 'react';

const categoryLabels: Record<string, string> = {
  'crypto-news': 'Crypto News',
  'crypto-guides': 'Crypto Guides',
  'crypto-investing': 'Crypto Investing',
  'crypto-reviews': 'Crypto Reviews',
};

interface CategoryBadgeProps {
  category: string;
  linked?: boolean;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({ category, linked = false }) => {
  const label = categoryLabels[category] || category;

  if (linked) {
    return (
      <Link
        href={`/category/${category}`}
        className="category-badge"
      >
        {label}
      </Link>
    );
  }

  return (
    <span className="category-badge">
      {label}
    </span>
  );
};

export default CategoryBadge;
