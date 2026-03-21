# Crypto Pointers — Your Trusted Source of Crypto Information

A bold, modern crypto magazine built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS 3**, and **Keystatic CMS**.

## Features

- **Stunning Homepage** — Featured post hero with trending topics, latest posts grid, category tabs, stats bar, author spotlight, and newsletter CTA
- **Blog Engine** — MDX-powered posts with rich frontmatter (key takeaways, focus keywords, categories, reading time)
- **Keystatic CMS** — Local-first CMS for managing blog content at `/keystatic`
- **SEO Optimized** — Full metadata, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, and robots.txt
- **RSS Feed** — Auto-generated RSS feed at `/api/rss`
- **Responsive Design** — Mobile-first with beautiful layouts at every breakpoint
- **Accessible** — WCAG 2.1 AA compliant with skip-to-content, ARIA labels, focus states, keyboard navigation
- **Google Analytics** — Ready to go with `NEXT_PUBLIC_GA_ID` environment variable
- **Performance** — Optimized images via `next/image`, lazy loading, Core Web Vitals ready

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS 3 | Styling |
| Keystatic CMS | Content management |
| MDX | Rich content authoring |
| next-sitemap | SEO sitemap generation |
| RSS | RSS feed generation |

## Getting Started

### Prerequisites

- **Node.js 18+** installed
- **npm**, **yarn**, or **pnpm** package manager

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd crypto-pointers

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start the development server
npm run dev
```

The site will be available at **http://localhost:3000**.

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required: Your production site URL
NEXT_PUBLIC_SITE_URL=https://cryptopointers.com

# Optional: Google Analytics Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Managing Content

1. Start the dev server: `npm run dev`
2. Visit **http://localhost:3000/keystatic** to open the CMS admin
3. Create, edit, and publish blog posts using the visual editor
4. Posts are saved as MDX files in `src/content/posts/`

### Building for Production

```bash
# Build the site
npm run build

# Start the production server
npm start
```

The `postbuild` script automatically generates `sitemap.xml` and `robots.txt`.

## Project Structure

```
crypto-pointers/
├── keystatic.config.ts          # Keystatic CMS configuration
├── next.config.mjs              # Next.js configuration
├── next-sitemap.config.js       # Sitemap configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, metadata, GA)
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles + Tailwind
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual blog post
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Category listing
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── contact/
│   │   │   └── page.tsx         # Contact page
│   │   ├── api/
│   │   │   ├── rss/route.ts     # RSS feed endpoint
│   │   │   └── keystatic/
│   │   │       └── [...params]/route.ts
│   │   └── keystatic/
│   │       └── [[...params]]/page.tsx
│   ├── components/
│   │   ├── Header.tsx           # Site header with nav
│   │   ├── Footer.tsx           # Site footer
│   │   ├── PostCard.tsx         # Blog post card (3 variants)
│   │   ├── AuthorCard.tsx       # Author bio (3 variants)
│   │   ├── CategoryTabs.tsx     # Category filter tabs
│   │   └── NewsletterSection.tsx # Newsletter CTA
│   ├── content/
│   │   └── posts/               # MDX blog posts (managed by Keystatic)
│   └── lib/
│       └── posts.ts             # Post utilities
└── public/
    └── favicon.ico
```

## Color Palette

| Color | Hex | Usage |
|---|---|---|
| Primary | `#D97706` | CTAs, links, accents |
| Secondary | `#B45309` | Hover states, secondary text |
| Accent | `#FCD34D` | Highlights, badges, featured elements |
| Background | `#FFFBEB` | Page background |
| Text | `#451A03` | Body text, headings |

## Typography

- **Primary Font:** Fira Sans (Humanist sans-serif)
- **Code Font:** Fira Code (Monospace)
- Both loaded via Google Fonts in `globals.css`

## Deployment

This project is ready to deploy on **Vercel**:

1. Push to GitHub
2. Import into Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

Alternatively, build and deploy to any Node.js hosting platform.

## License

© 2024 Crypto Pointers. All rights reserved.

---

**Built with conviction. Not financial advice. Always do your own research.**
