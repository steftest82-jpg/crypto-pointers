"use client";

import { useState } from 'react';
import type { FC } from 'react';

const NewsletterSection: FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[80px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-14 sm:px-10 md:px-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
              Free Weekly Newsletter
            </span>
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight tracking-tight mb-4 text-balance">
            Get the Alpha.
            <br />
            <span className="text-accent">Skip the Noise.</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/55 leading-relaxed mb-8 max-w-lg mx-auto">
            Join thousands of crypto-curious investors who get our top picks,
            market breakdowns, and actionable strategies delivered straight to
            their inbox. Free. No spam. Ever.
          </p>

          {/* Form or Success */}
          {submitted ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-accent/20 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">
                  You&apos;re in! Welcome to the Crypto Pointers community.
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  Check your inbox for a confirmation email.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  required
                  aria-label="Email address for newsletter subscription"
                />
              </div>
              <button
                type="submit"
                className="flex-shrink-0 px-7 py-3.5 bg-accent text-text font-bold rounded-xl text-sm hover:bg-accent/85 transition-all duration-200 shadow-lg hover:shadow-glow-accent active:scale-[0.98]"
              >
                Subscribe Free
              </button>
            </form>
          )}

          {/* Trust indicators */}
          {!submitted && (
            <div className="flex items-center justify-center gap-4 mt-5 text-[11px] text-white/30">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                No spam
              </span>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unsubscribe anytime
              </span>
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                5K+ readers
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
