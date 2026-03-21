import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist or has been moved. Browse our latest crypto articles and guides.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-wide py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
          <span className="text-4xl font-extrabold text-primary">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-text/55 leading-relaxed mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
          Try one of the links below to get back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/blog" className="btn-outline">
            Browse Articles
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: '/category/crypto-news', label: 'Crypto News' },
            { href: '/category/crypto-guides', label: 'Guides' },
            { href: '/category/crypto-investing', label: 'Investing' },
            { href: '/category/crypto-reviews', label: 'Reviews' },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="card p-4 text-center card-hover"
            >
              <span className="text-sm font-semibold text-primary">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
