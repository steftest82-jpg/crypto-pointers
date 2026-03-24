import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Get in Touch with Crypto Pointers',
  description:
    'Have a question, partnership inquiry, or feedback for Crypto Pointers? Reach out and we will get back to you within 24 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact — Crypto Pointers',
    description:
      'Questions, feedback, or partnership inquiries — we would love to hear from you.',
    type: 'website',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';
const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contact Crypto Pointers',
      url: `${siteUrl}/contact`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      description: 'Reach out to Crypto Pointers for questions, partnerships, or feedback.',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Crypto Pointers',
      url: siteUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@cryptopointers.com',
        contactType: 'customer support',
        availableLanguage: 'English',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      {/* ── Page Header ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-text/[0.04] via-bg to-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="container-wide relative z-10 pt-12 md:pt-16 pb-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text/40">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="font-semibold text-text/60">Contact</li>
            </ol>
          </nav>

          <div className="max-w-2xl text-center mx-auto">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4 text-balance">
              We&apos;d Love to{' '}
              <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="text-lg text-text/55 leading-relaxed">
              Questions, feedback, partnership inquiries, or guest post pitches —
              drop us a message and we&apos;ll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Sidebar ─────────────────────────────── */}
      <section className="container-wide section-padding">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Form */}
          <div className="card-elevated p-6 md:p-8">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-text">Email Us Directly</h3>
              </div>
              <a
                href="mailto:info@cryptopointers.com"
                className="text-sm text-primary hover:text-secondary transition-colors duration-200 font-medium break-all"
              >
                info@cryptopointers.com
              </a>
            </div>

            {/* Response Time Card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-text">Response Time</h3>
              </div>
              <p className="text-sm text-text/55 leading-relaxed">
                We typically respond within <strong className="text-text">24 hours</strong> on
                business days. For urgent inquiries, include &quot;URGENT&quot; in
                the subject line.
              </p>
            </div>

            {/* Write for Us CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-cta p-6 text-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent blur-2xl" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">
                  Write for Us?
                </h3>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  We are always looking for talented crypto writers.
                  Pitch your ideas!
                </p>
                <a
                  href="mailto:info@cryptopointers.com?subject=Guest%20Post%20Pitch"
                  className="inline-flex items-center justify-center w-full py-2.5 bg-accent text-text font-bold rounded-xl text-sm hover:bg-accent/80 transition-all duration-200"
                >
                  Send a Pitch
                </a>
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="card p-5">
              <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-primary mb-3">
                Common Questions
              </h3>
              <ul className="space-y-3">
                {[
                  'Do you accept sponsored content?',
                  'Can I republish your articles?',
                  'Do you offer advertising?',
                  'How do I report a factual error?',
                ].map((question) => (
                  <li key={question} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-text/55">{question}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-text/35">
                Send us a message and we&apos;ll answer any of these.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
