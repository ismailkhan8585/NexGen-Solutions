import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'NexGen Solutions — Digital Agency & Tech Company',
    template: '%s | NexGen Solutions',
  },
  description:
    'Award-winning digital agency building world-class websites, mobile apps, and software solutions. Serving clients in 10+ countries worldwide.',
  metadataBase: new URL('https://nexgensolutions.agency'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://nexgensolutions.agency',
    siteName: 'NexGen Solutions',
    title: 'NexGen Solutions — Building Tomorrow\'s Digital World. Today.',
    description:
      'Award-winning digital agency building world-class websites, mobile apps, and software solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGen Solutions — Digital Agency',
    description:
      'Award-winning digital agency building world-class websites, mobile apps, and software solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
