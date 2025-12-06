import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DistroHQ - Effortless Content for the Ambitious',
  description: 'We replace your fragmented freelancer network with a unified, aesthetic-driven content supply chain. Professional content production for SaaS, productivity tools, and ambitious brands.',
  keywords: ['content production', 'SaaS content', 'video production', 'content marketing', 'social media content', 'LinkedIn carousels', 'product trailers'],
  authors: [{ name: 'DistroHQ' }],
  creator: 'DistroHQ',
  publisher: 'DistroHQ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://distrohq.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DistroHQ - Effortless Content for the Ambitious',
    description: 'We replace your fragmented freelancer network with a unified, aesthetic-driven content supply chain.',
    url: 'https://distrohq.com',
    siteName: 'DistroHQ',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DistroHQ - Content Production Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DistroHQ - Effortless Content for the Ambitious',
    description: 'We replace your fragmented freelancer network with a unified, aesthetic-driven content supply chain.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

