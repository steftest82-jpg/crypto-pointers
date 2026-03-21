"use client";

import { useState } from 'react';
import type { FC } from 'react';

const NewsletterSignup: FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-text to-secondary p-8 md:p-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Get the Alpha. Skip the Noise.
        </h2>
        <p className="text-white/70 mb-6 leading-relaxed">
          Join thousands of crypto-curious investors who get our top picks, market breakdowns, and
          actionable strategies delivered straight to their inbox. Free. No spam. Ever.
        </p>
        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold">You&apos;re in! Welcome to the Crypto Pointers community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-text font-bold rounded-xl text-sm hover:bg-accent/80 transition-all duration-200 shadow-lg hover:shadow-accent/20"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
