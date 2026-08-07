/**
 * Digital Developers — central site configuration.
 * Mirrors the live v12 site exactly: branding, contacts, palette, links.
 */

export const SITE = {
  name: 'Digital Developers',
  tagline: 'Your Vision, Our Code.',
  description:
    'Digital Developers — Your Vision, Our Code. We build beautiful websites, web applications, e-commerce platforms, and AI-powered solutions for businesses worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'en',
} as const;

export const CONTACT = {
  email: 'ri590590590@gmail.com',
  phoneDisplay: '0371 0753644',
  phoneIntl: '+92 371 0753644',
  phoneTel: 'tel:+923710753644',
  whatsappNumber: '923710753644',
  whatsappLink: 'https://wa.me/923710753644',
  whatsappStartProject:
    'https://wa.me/923710753644?text=Hi%20Digital%20Developers!%20I%20would%20like%20to%20start%20a%20project.',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Lahore+Punjab+Pakistan',
  address: 'Lahore, Punjab, Pakistan',
  responseTime: 'within 2 hours during business hours (Mon–Sat, 9am–8pm PKT)',
} as const;

/** Build a wa.me link with a prefilled message. */
export function waLink(text: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const PALETTE = {
  bg: '#0a0a0a',
  bg2: '#111214',
  bg3: '#1a1c1e',
  amber: '#FFB300',
  amber2: '#FFA53C',
  amber3: '#FFC46B',
  text: '#F5F3EE',
  text2: '#c9c5bd',
  muted: '#9a968f',
} as const;

/** Local image paths (hosted under /public). */
export const IMAGES = {
  logo: '/images/logo.jpg',
  logoNav: '/images/logo-nav.jpg',
  logoFooter: '/images/logo-footer.jpg',
  favicon: '/images/favicon.jpg',
  services: {
    business: '/images/svc-business.jpg',
    landing: '/images/svc-landing.jpg',
    corporate: '/images/svc-corporate.jpg',
    portfolio: '/images/svc-portfolio.jpg',
    ecommerce: '/images/svc-ecommerce.jpg',
    webapp: '/images/svc-webapp.jpg',
    react: '/images/svc-react.jpg',
    nextjs: '/images/svc-nextjs.jpg',
    redesign: '/images/svc-redesign.jpg',
    seo: '/images/svc-seo.jpg',
    maintenance: '/images/svc-maintenance.jpg',
    hosting: '/images/svc-hosting.jpg',
    ai: '/images/svc-ai.jpg',
    api: '/images/svc-api.jpg',
    dashboard: '/images/svc-dashboard.jpg',
  },
} as const;
