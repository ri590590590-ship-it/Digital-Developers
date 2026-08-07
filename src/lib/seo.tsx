import type { Metadata } from 'next';
import { SITE, CONTACT } from '@/config/site';

export const SITE_URL = SITE.url;
export const LOGO_IMAGE = `${SITE.url}/images/logo-nav.jpg`;

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
}

/** Build Next.js Metadata (title, description, canonical, OG, Twitter). */
export function buildMetadata(meta: PageMeta): Metadata {
  const url = `${SITE_URL}${meta.path}`;
  const image = meta.image || LOGO_IMAGE;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: SITE.name,
      type: meta.type || 'website',
      images: [{ url: image, width: 1280, height: 1024 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

/** JSON-LD <script> component — render with dangerouslySetInnerHTML. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite schema for the homepage. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    description:
      'Premium web development agency in Lahore, Pakistan. We build websites, web applications, e-commerce platforms, and AI-powered solutions.',
    email: CONTACT.email,
    telephone: CONTACT.phoneIntl,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    sameAs: [CONTACT.whatsappLink],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE_URL,
  };
}

/** Service schema for service detail pages. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
      email: CONTACT.email,
      telephone: CONTACT.phoneIntl,
    },
    areaServed: 'PK',
  };
}

/** BlogPosting schema for blog posts. */
export function blogPostSchema(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: {
      '@type': 'Organization',
      name: opts.author || 'Digital Developers',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_IMAGE },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
  };
}

/** Blog listing schema. */
export function blogSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    url,
    description:
      'Practical articles on web design, development, e-commerce and SEO by Digital Developers.',
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_IMAGE },
    },
  };
}
