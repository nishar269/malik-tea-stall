import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Malik Tea Stall | Premium Health Mixes & Tea Powders',
  description: 'Order fresh, natural health mix powders and tea online from Malik Tea Stall, Kalikiri. Badam Mix, Ragi Malt, Green Tea & more. No preservatives!',
  keywords: 'health mix, badam powder, ragi malt, green tea, ginger tea, kalikiri, natural products',
  authors: [{ name: 'Malik Tea Stall' }],
  openGraph: {
    title: 'Malik Tea Stall | Premium Health Mixes',
    description: 'Fresh, natural health mix powders from Kalikiri',
    type: 'website',
    locale: 'en_IN',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Malik Tea" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
