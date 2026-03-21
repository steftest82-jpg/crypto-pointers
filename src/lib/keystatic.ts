import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TOCItem {
  heading: string;
  anchor: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage: string;
  author: string;
  focusKeyword: string;
  categories: string[];
  tableOfContents: TOCItem[];
  keyTakeaways: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function ensurePostsDir(): void {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export function getAllPosts(): Post[] {
  ensurePostsDir();

  const fileNames = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const posts: Post[] = fileNames.map((fileName) => {
    const filePath = path.join(POSTS_DIR, fileName);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const frontmatter: PostFrontmatter = {
      title: (data.title as string) || '',
      slug:
        (data.slug as string) ||
        fileName.replace(/\.mdx?$/, ''),
      publishedAt: (data.publishedAt as string) || new Date().toISOString(),
      excerpt: (data.excerpt as string) || '',
      coverImage: (data.coverImage as string) || 'https://picsum.photos/seed/crypto/1200/630',
      author: (data.author as string) || 'Yosef Kamel',
      focusKeyword: (data.focusKeyword as string) || '',
      categories: Array.isArray(data.categories)
        ? (data.categories as string[])
        : [],
      tableOfContents: Array.isArray(data.tableOfContents)
        ? (data.tableOfContents as TOCItem[])
        : [],
      keyTakeaways: Array.isArray(data.keyTakeaways)
        ? (data.keyTakeaways as string[])
        : [],
    };

    return { frontmatter, content };
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) =>
    p.frontmatter.categories
      .map((c) => c.toLowerCase().replace(/\s+/g, '-'))
      .includes(category.toLowerCase().replace(/\s+/g, '-'))
  );
}

export function getAllCategories(): { slug: string; label: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    for (const cat of post.frontmatter.categories) {
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      const existing = categoryMap.get(slug);
      if (existing) {
        existing.count++;
      } else {
        categoryMap.set(slug, { label: cat, count: 1 });
      }
    }
  }

  return Array.from(categoryMap.entries()).map(([slug, { label, count }]) => ({
    slug,
    label,
    count,
  }));
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.frontmatter.slug !== currentSlug);

  const scored = all.map((post) => {
    let score = 0;
    for (const cat of post.frontmatter.categories) {
      if (current.frontmatter.categories.includes(cat)) {
        score += 2;
      }
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadingTime(content: string): number {
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 230));
}

export const CATEGORY_META: Record<string, { title: string; description: string; icon: string }> = {
  'crypto-news': {
    title: 'Crypto News',
    description: 'Stay ahead with the latest cryptocurrency news, regulatory updates, and market-moving events curated by our expert analysts.',
    icon: '⚡',
  },
  'crypto-guides': {
    title: 'Crypto Guides',
    description: 'Step-by-step cryptocurrency guides for beginners and advanced investors. Master wallets, DeFi, staking, and trading strategies.',
    icon: '📚',
  },
  'crypto-investing': {
    title: 'Crypto Investing',
    description: 'Data-driven crypto investing strategies, portfolio allocation tips, and market analysis to help you build wealth with confidence.',
    icon: '📈',
  },
  'crypto-reviews': {
    title: 'Crypto Reviews',
    description: 'Unbiased, in-depth reviews of crypto exchanges, wallets, protocols, and tools. We test everything so you do not have to.',
    icon: '⭐',
  },
};
