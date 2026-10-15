import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'JB Timber Tech Solutions — Premium Plywood Manufacturer',
    template: '%s | JB Timber Tech Solutions',
  },
  description:
    'Factory-direct plywood manufacturer for wholesale distributors across Tamil Nadu and Kerala. Premium, ISI-grade panels built for performance and luxury.',
  keywords: ['plywood manufacturer', 'wholesale plywood', 'ISI plywood', 'Tamil Nadu', 'Kerala', 'Gurjan plywood', 'shuttering ply'],
  openGraph: {
    title: 'JB Timber Tech Solutions Pvt Ltd',
    description: 'Engineered for Strength. Rooted in Luxury. Factory-direct plywood for wholesale distributors.',
    type: 'website',
    locale: 'en_IN',
  },
  icons: {
    icon: '/jb_golden_tree.svg',
    shortcut: '/jb_golden_tree.svg',
    apple: '/jb_golden_tree.svg',
  },
};

import { SITE } from '@/data/site';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    description:
      'Factory-direct plywood manufacturer for wholesale distributors across Tamil Nadu and Kerala.',
    telephone: SITE.phone,
    email: SITE.email,
    slogan: SITE.tagline,
    areaServed: ['Tamil Nadu', 'Kerala', 'India'],
    address: {
      '@type': 'PostalAddress',
      addressRegion: SITE.region,
      addressCountry: 'IN',
    },
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
