"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const categories = [
  { slug: 'crypto-news', label: 'News' },
  { slug: 'crypto-guides', label: 'Guides' },
  { slug: 'crypto-investing', label: 'Investing' },
  { slug: 'crypto-reviews', label: 'Reviews' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-accent/20 shadow-soft'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Crypto Pointers — Home"
            >
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-glow-primary transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-5 h-5 md:w-[22px] md:h-[22px] text-white"
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
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg md:text-xl font-extrabold tracking-tight">
                  <span className="text-text">Crypto</span>
                  <span className="text-primary">Pointers</span>
                </span>
                <span className="hidden md:block text-[10px] font-medium text-text/40 -mt-0.5 tracking-wide">
                  Your Trusted Crypto Magazine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                className="px-3.5 py-2 text-[13px] font-semibold text-text/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-3.5 py-2 text-[13px] font-semibold text-text/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/about"
                className="px-3.5 py-2 text-[13px] font-semibold text-text/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                About
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                aria-label="Toggle search"
              >
                <svg
                  className="w-5 h-5 text-text/60 group-hover:text-primary transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* RSS Feed */}
              <Link
                href="/api/rss"
                className="hidden md:flex p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                aria-label="RSS Feed"
              >
                <svg
                  className="w-5 h-5 text-text/60 group-hover:text-primary transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </Link>

              {/* CTA Button (Desktop) */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex btn-primary text-[13px] px-5 py-2.5"
              >
                Contact
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-text rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? 'top-[9px] rotate-45'
                        : 'top-[3px] rotate-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[9px] w-5 h-0.5 bg-text rounded-full transition-all duration-300 ${
                      mobileOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-text rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? 'top-[9px] -rotate-45'
                        : 'top-[15px] rotate-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              searchOpen ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search articles, guides, reviews..."
                className="input-field pl-11 pr-4"
                aria-label="Search articles"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-text/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <nav
          id="mobile-menu"
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-bg shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-accent/20">
            <span className="text-lg font-extrabold">
              <span className="text-text">Crypto</span>
              <span className="text-primary">Pointers</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl hover:bg-primary/5 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-text"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-5 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-64px)]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-text/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
            >
              Home
            </Link>

            <div className="pt-2 pb-1">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-text/30 mb-2">
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-text/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="divider my-4" />

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-text/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
            >
              About
            </Link>

            <div className="pt-4 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block btn-primary w-full text-center text-[15px]"
              >
                Contact
              </Link>
              <Link
                href="/api/rss"
                onClick={() => setMobileOpen(false)}
                className="block btn-ghost w-full text-center text-[15px] gap-2"
              >
                <svg
                  className="w-4 h-4 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                RSS Feed
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
