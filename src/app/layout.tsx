import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import { SITE } from '@/config/site';
import { SITE_URL, LOGO_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Your Vision, Our Code.`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  icons: { icon: '/images/favicon.jpg' },
  openGraph: {
    siteName: SITE.name,
    type: 'website',
    images: [{ url: LOGO_IMAGE, width: 1280, height: 1024 }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Same CDN libraries as the live v12 site — loaded via next/script so they
            no longer block first paint on every route. SiteEffects already polls
            for `window.THREE` / `window.gsap` before using them, so async loading
            here is safe and doesn't change behaviour. */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.0/three.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}