"use client";

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { slug: 'crypto-news', label: 'Crypto News' },
  { slug: 'crypto-guides', label: 'Crypto Guides' },
  { slug: 'crypto-investing', label: 'Crypto Investing' },
  { slug: 'crypto-reviews', label: 'Crypto Reviews' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'All Posts' },
  { href: '/glossary', label: 'Crypto Glossary' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    name: 'X (Twitter)',
    href: 'https://x.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-text text-bg/80" role="contentinfo">
      {/* Main Footer */}
      <div className="container-wide pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Crypto Pointers Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-text"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <span className="text-xl font-extrabold">
                <span className="text-bg">Crypto</span>
                <span className="text-accent">Pointers</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-bg/50 leading-relaxed max-w-sm">
              Your trusted source of crypto information. Bold market analysis,
              honest reviews, and actionable investing guides built for the
              crypto-curious investor ready to navigate the digital economy with
              confidence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-bg/5 border border-bg/10 flex items-center justify-center text-bg/50 hover:text-accent hover:bg-bg/10 hover:border-accent/30 transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-accent mb-5">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-bg/50 hover:text-accent transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-accent mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bg/50 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/api/rss"
                  className="text-sm text-bg/50 hover:text-accent transition-colors duration-200"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-accent mb-5">
              Get the Alpha
            </h3>
            <p className="text-sm text-bg/50 mb-4 leading-relaxed">
              Join thousands of crypto investors who get our top analysis,
              market breakdowns, and actionable strategies straight to their
              inbox every week. Free. No spam. Ever.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20">
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm font-semibold text-accent">
                  You&apos;re in! Welcome to the community.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 input-dark"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-5 py-3 bg-primary hover:bg-secondary text-white text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-glow-primary"
                  aria-label="Subscribe to newsletter"
                >
                  Join
                </button>
              </form>
            )}
            <p className="mt-3 text-[11px] text-bg/30">
              By subscribing you agree to our privacy policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-bg/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bg/30 text-center sm:text-left">
            &copy; {currentYear} Crypto Pointers. All rights reserved.
            Built with conviction.
          </p>
          <p className="text-xs text-bg/30 text-center sm:text-right">
            Educational content only. Not financial advice.
            Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
