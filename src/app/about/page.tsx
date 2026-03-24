import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AuthorCard from '@/components/AuthorCard';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
  title: 'About — Meet the Team Behind Crypto Pointers',
  description:
    'Learn about Crypto Pointers, the crypto magazine founded to cut through the noise. Meet Yosef Kamel, our lead author and crypto analyst, and discover our mission to empower every crypto investor.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Crypto Pointers',
    description:
      'The crypto magazine that cuts through the noise. Meet our team and learn our mission.',
    type: 'website',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about`,
      name: 'About Crypto Pointers',
      url: `${siteUrl}/about`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      description: 'Learn about Crypto Pointers, the crypto magazine founded to cut through the noise.',
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#author`,
      name: 'Yosef Kamel',
      url: `${siteUrl}/about`,
      jobTitle: 'Lead Crypto Analyst & Founder',
      description: 'Seasoned crypto analyst and founding voice behind Crypto Pointers. Specializes in Bitcoin, Ethereum, DeFi, and on-chain market analysis.',
      knowsAbout: ['Bitcoin', 'Ethereum', 'DeFi', 'Cryptocurrency Investing', 'Blockchain Technology', 'Web3'],
      worksFor: { '@id': `${siteUrl}/#organization` },
      sameAs: [],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Crypto Pointers',
      url: siteUrl,
      foundingDate: '2024',
      description: 'Bold crypto analysis, investing guides, honest reviews, and breaking news for the modern crypto investor.',
      sameAs: [
        'https://x.com/cryptopointers',
        'https://youtube.com/@cryptopointers',
        'https://linkedin.com/company/cryptopointers',
      ],
    },
  ],
};

export default function AboutPage() {
  const expertiseAreas = [
    {
      icon: '₿',
      title: 'Bitcoin & Layer 1s',
      description:
        'Deep analysis of Bitcoin price action, mining economics, Lightning Network developments, and major Layer 1 protocols like Ethereum, Solana, and Avalanche.',
    },
    {
      icon: '🏦',
      title: 'DeFi & Yield Strategies',
      description:
        'Comprehensive coverage of decentralised finance protocols, yield farming opportunities, liquidity mining, lending platforms, and risk management in DeFi.',
    },
    {
      icon: '📊',
      title: 'Market Analysis',
      description:
        'Data-driven technical and fundamental analysis, on-chain metrics interpretation, whale tracking, and macro economic factors affecting crypto markets.',
    },
    {
      icon: '🔐',
      title: 'Security & Wallets',
      description:
        'Reviews and guides for hardware wallets, software wallets, custodial solutions, multi-signature setups, and best practices for securing your digital assets.',
    },
    {
      icon: '⚖️',
      title: 'Regulation & Compliance',
      description:
        'Breaking coverage of SEC decisions, global regulatory frameworks, tax implications, and institutional adoption milestones shaping the crypto landscape.',
    },
    {
      icon: '🌐',
      title: 'Web3 & Emerging Tech',
      description:
        'NFTs, DAOs, real-world asset tokenisation, AI x crypto intersections, Layer 2 scaling solutions, and next-generation blockchain innovations.',
    },
  ];

  const values = [
    {
      title: 'Evidence Over Hype',
      description:
        'Every claim is backed by data, on-chain metrics, or verifiable sources. We never publish unsubstantiated price predictions or promote tokens for payment.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Reader-First Integrity',
      description:
        'We do not accept payment for positive reviews. We do not run sponsored content disguised as editorial. Our readers\' trust is our most valuable asset.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Education That Empowers',
      description:
        'Our goal is to make you a better, more independent investor. Every guide is designed to give you the skills to evaluate projects and strategies on your own.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Speed With Accuracy',
      description:
        'In crypto, timing matters. We deliver breaking news fast — but never at the expense of fact-checking. Every article goes through editorial review before publication.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[100px]" />
        </div>

        <div className="relative z-10 container-wide py-20 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
              About Crypto Pointers
            </span>
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            The Crypto Magazine That{' '}
            <span className="text-accent">Cuts Through the Noise</span>
          </h1>

          <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
            Founded with a simple mission: give every crypto investor — from curious
            beginner to seasoned trader — the bold analysis, honest reviews, and
            actionable education they deserve. No hype. No paid promotions. Just
            substance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/blog" className="btn-accent text-sm">
              Read Our Latest
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/70 hover:text-accent transition-colors duration-200"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="h-20 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ── Our Story ──────────────────────────────────────────── */}
      <section className="container-wide section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-6">
              Why We <span className="gradient-text">Started</span>
            </h2>
            <div className="space-y-4 text-text/65 leading-relaxed">
              <p>
                The crypto information landscape is fundamentally broken. Too many sites chase clicks
                with sensational headlines and recycled press releases. Too few take the time to
                explain what actually matters for your portfolio. Too many promote tokens they hold
                without disclosure. The result? A toxic information environment where investors
                cannot tell genuine analysis from paid advertising.
              </p>
              <p>
                <strong className="text-text">Crypto Pointers was built to be the antidote.</strong> Every
                article we publish goes through rigorous fact-checking and editorial review. We do not
                accept payment for positive reviews. We do not shill tokens. We give you the
                information, context, and frameworks you need to make your own informed decisions.
              </p>
              <p>
                Whether you just bought your first Bitcoin or you are deep into yield farming
                on Layer 2 rollups, we write for you. Our content bridges the gap between
                beginner-friendly explanations and the advanced, data-driven market analysis
                that experienced traders demand.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
              <Image
                src="https://picsum.photos/seed/crypto-about/800/600"
                alt="The Crypto Pointers editorial team workspace — where bold analysis meets rigorous fact-checking"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-card p-4 md:p-5 border border-accent/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-text">200+</p>
                  <p className="text-[11px] text-text/45 font-medium">In-depth articles published</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ─────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              Our <span className="gradient-text">Core Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-bg rounded-2xl p-6 md:p-8 border border-accent/15 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-primary mb-5">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text/55 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Author ─────────────────────────────────────────────── */}
      <section className="container-wide section-padding">
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
            The Voice Behind the Magazine
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
            Meet <span className="gradient-text">Yosef Kamel</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <AuthorCard />
        </div>
      </section>

      {/* ── Expertise Areas ────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-bg via-accent/5 to-bg section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
              What We Cover
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              Our Areas of <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-text/50 mt-3 max-w-xl mx-auto">
              We go deep, not wide. These are the domains where Crypto Pointers delivers
              genuinely expert-level analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area) => (
              <div
                key={area.title}
                className="card p-6 card-hover group"
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {area.icon}
                </span>
                <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors duration-200">
                  {area.title}
                </h3>
                <p className="text-sm text-text/50 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="container-wide pb-20 md:pb-28">
        <NewsletterSection />
      </section>
    </>
  );
}
