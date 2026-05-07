// Path: src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SEO, RESTAURANT } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import PeviChat from '@/components/ui/PeviChat';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#CC1414',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.baseUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${RESTAURANT.name}`,
  },
  description: SEO.defaultDescription,
  keywords: SEO.keywords,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SEO.baseUrl,
    siteName: RESTAURANT.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${RESTAURANT.name} Semarang`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Restaurant
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT.name,
    image: `${SEO.baseUrl}/web_logo.png`,
    description: SEO.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Gemah Tengah No.38',
      addressLocality: 'Semarang',
      addressRegion: 'Jawa Tengah',
      postalCode: '50246',
      addressCountry: 'ID',
    },
    telephone: `+${RESTAURANT.whatsapp}`,
    url: SEO.baseUrl,
    servesCuisine: 'Indonesian',
    priceRange: 'Rp',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [RESTAURANT.instagram, RESTAURANT.gofood],
  };

  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased text-gray-900 bg-[#F5F0E8]/30">
        <Navbar />
        <main className="flex-1 flex flex-col pt-[72px]">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <PeviChat />
      </body>
    </html>
  );
}
