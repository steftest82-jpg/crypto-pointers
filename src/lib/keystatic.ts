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

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

function ensurePostsDir(): void {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function findPostFiles(): { filePath: string; slug: string }[] {
  const entries = fs.readdirSync(POSTS_DIR);
  const files: { filePath: string; slug: string }[] = [];

  for (const entry of entries) {
    const entryPath = path.join(POSTS_DIR, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      const indexMdx = path.join(entryPath, 'index.mdx');
      const indexMd = path.join(entryPath, 'index.md');
      if (fs.existsSync(indexMdx)) files.push({ filePath: indexMdx, slug: entry });
      else if (fs.existsSync(indexMd)) files.push({ filePath: indexMd, slug: entry });
    } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
      files.push({ filePath: entryPath, slug: entry.replace(/\.mdx?$/, '') });
    }
  }
  return files;
}

function parsePostFile(filePath: string, slug: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const frontmatter: PostFrontmatter = {
    title: (data.title as string) || '',
    slug: (data.slug as string) || slug,
    publishedAt: (data.publishedAt as string) || new Date().toISOString(),
    excerpt: (data.excerpt as string) || '',
    coverImage: (data.coverImage as string) || 'https://picsum.photos/seed/crypto/1200/630',
    author: (data.author as string) || 'Yosef Kamel',
    focusKeyword: (data.focusKeyword as string) || '',
    categories: Array.isArray(data.categories) ? (data.categories as string[]) : [],
    tableOfContents: Array.isArray(data.tableOfContents) ? (data.tableOfContents as TOCItem[]) : [],
    keyTakeaways: Array.isArray(data.keyTakeaways) ? (data.keyTakeaways as string[]) : [],
  };

  return { frontmatter, content };
}

// Fast frontmatter-only extraction (no gray-matter, no full content read)
function extractFrontmatterFast(filePath: string, slug: string): PostFrontmatter {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const fmEnd = raw.indexOf('\n---', 4);
  if (fmEnd === -1) return { title: slug, slug, publishedAt: '', excerpt: '', coverImage: '', author: 'Yosef Kamel', focusKeyword: '', categories: [], tableOfContents: [], keyTakeaways: [] };

  const fmBlock = raw.substring(4, fmEnd); // skip initial "---\n"
  const data: Record<string, string> = {};
  const arrays: Record<string, string[]> = {};
  let currentArrayKey = '';

  for (const line of fmBlock.split('\n')) {
    if (currentArrayKey && line.match(/^\s+-\s+/)) {
      arrays[currentArrayKey].push(line.replace(/^\s+-\s+/, '').replace(/^['"]|['"]$/g, '').trim());
      continue;
    }
    currentArrayKey = '';
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      const val = m[2].trim().replace(/^['"]|['"]$/g, '');
      if (val === '' || val === '[]') {
        currentArrayKey = m[1];
        arrays[currentArrayKey] = [];
      } else {
        data[m[1]] = val;
      }
    }
  }

  return {
    title: data.title || slug,
    slug: data.slug || slug,
    publishedAt: data.publishedAt || '',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    author: data.author || 'Yosef Kamel',
    focusKeyword: data.focusKeyword || '',
    categories: arrays.categories || [],
    tableOfContents: [],
    keyTakeaways: arrays.keyTakeaways || [],
  };
}

let _allPostsCache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (_allPostsCache) return _allPostsCache;
  ensurePostsDir();

  const files = findPostFiles();
  const posts = files.map(({ filePath, slug }) => parsePostFile(filePath, slug));

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  _allPostsCache = posts;
  return posts;
}

// Lightweight listing — reads only frontmatter, no content parsing
export function getAllPostsFrontmatter(): { frontmatter: PostFrontmatter; wordCount: number }[] {
  ensurePostsDir();
  const files = findPostFiles();
  const posts = files.map(({ filePath, slug }) => {
    const fm = extractFrontmatterFast(filePath, slug);
    // Rough word count from file size (avoids reading full content)
    const stat = fs.statSync(filePath);
    const wordCount = Math.round(stat.size / 6); // ~6 bytes per word avg
    return { frontmatter: fm, wordCount };
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
