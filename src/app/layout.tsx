import type { Metadata } from 'next';
import { Fira_Sans, Fira_Code } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fira-sans',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-fira-code',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Crypto Pointers — Your Trusted Source of Crypto Information',
    template: '%s | Crypto Pointers',
  },
  description:
    'Crypto Pointers is the bold crypto magazine for investors who demand more than hype. Get no-nonsense market analysis, investing guides, honest reviews, and breaking crypto news — all designed to help you navigate the digital economy with confidence.',
  keywords: [
    'crypto magazine',
    'cryptocurrency news',
    'crypto investing',
    'crypto guides',
    'crypto reviews',
    'bitcoin news',
    'ethereum analysis',
    'DeFi strategies',
    'Web3',
    'blockchain technology',
    'crypto portfolio',
    'altcoin analysis',
    'crypto tax',
    'NFT guide',
    'staking rewards',
  ],
  authors: [{ name: 'Yosef Kamel', url: `${SITE_URL}/about` }],
  creator: 'Crypto Pointers',
  publisher: 'Crypto Pointers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Crypto Pointers',
    title: 'Crypto Pointers — Your Trusted Source of Crypto Information',
    description:
      'Bold crypto analysis, investing guides, honest reviews, and breaking news. Navigate the digital economy with confidence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Crypto Pointers — Your Trusted Source of Crypto Information',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Pointers — Your Trusted Source of Crypto Information',
    description:
      'Bold crypto analysis, investing guides, honest reviews, and breaking news.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

// Global JSON-LD schemas — Organization + WebSite + SearchAction
const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Crypto Pointers',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
        width: 512,
        height: 512,
      },
      description: 'Bold crypto analysis, investing guides, honest reviews, and breaking news for the modern crypto investor.',
      foundingDate: '2024',
      sameAs: [
        'https://x.com/cryptopointers',
        'https://youtube.com/@cryptopointers',
        'https://linkedin.com/company/cryptopointers',
        'https://t.me/cryptopointers',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@cryptopointers.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Crypto Pointers',
      description: 'Your trusted crypto magazine — bold analysis, guides, reviews, and breaking news.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#author`,
      name: 'Yosef Kamel',
      url: `${SITE_URL}/about`,
      jobTitle: 'Lead Crypto Analyst',
      description: 'Seasoned crypto analyst and founding voice behind Crypto Pointers. Specializes in Bitcoin, Ethereum, DeFi, and market analysis.',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`scroll-smooth ${firaSans.variable} ${firaCode.variable}`}>
      <head>
        {/* Preconnect for image performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
