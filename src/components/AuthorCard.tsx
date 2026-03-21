import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface AuthorCardProps {
  variant?: 'full' | 'compact' | 'inline';
}

const AuthorCard: FC<AuthorCardProps> = ({ variant = 'full' }) => {
  const authorImage =
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&crop=face';

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
          <Image
            src={authorImage}
            alt="Yosef Kamel — Lead Author at Crypto Pointers"
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-text leading-tight">
            Yosef Kamel
          </p>
          <p className="text-[11px] text-text/50 leading-tight">
            Crypto Analyst
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-accent/30 flex-shrink-0">
            <Image
              src={authorImage}
              alt="Yosef Kamel — Lead Author at Crypto Pointers"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-text">Yosef Kamel</h3>
            <p className="text-xs font-semibold text-primary">Lead Crypto Analyst</p>
            <p className="text-xs text-text/50 mt-0.5">
              Cutting through the noise since 2019
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className="card-elevated p-6 md:p-8 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Label */}
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-primary mb-5">
          Meet the Author
        </span>

        {/* Photo + Name */}
        <div className="flex items-start gap-5 mb-5">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-accent/20 flex-shrink-0 shadow-soft">
            <Image
              src={authorImage}
              alt="Yosef Kamel — Lead Author and Crypto Analyst at Crypto Pointers"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-text">
              Yosef Kamel
            </h3>
            <p className="text-sm font-semibold text-primary mt-0.5">
              Lead Author & Crypto Analyst
            </p>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text/50">
                <svg
                  className="w-3.5 h-3.5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                200+ Articles
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text/50">
                <svg
                  className="w-3.5 h-3.5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Since 2019
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-text/65 leading-relaxed mb-5">
          Yosef Kamel is a seasoned crypto analyst and the founding voice behind
          Crypto Pointers. With deep roots in blockchain technology and
          decentralised finance, Yosef cuts through the noise to deliver bold,
          evidence-based insights that help readers navigate the fast-moving
          world of cryptocurrency.
        </p>
        <p className="text-sm text-text/65 leading-relaxed mb-6">
          His mission: empower every investor — from curious beginner to
          battle-tested trader — with the knowledge to make confident, informed
          decisions in the digital economy.
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'Bitcoin',
            'Ethereum',
            'DeFi',
            'Market Analysis',
            'Portfolio Strategy',
            'Web3',
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-semibold text-secondary bg-accent/15 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors duration-200"
        >
          Read Full Bio
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
