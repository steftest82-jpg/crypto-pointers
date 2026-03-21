import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptopointers.com'
  ),
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
  ],
  authors: [{ name: 'Yosef Kamel', url: 'https://cryptopointers.com/about' }],
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
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
