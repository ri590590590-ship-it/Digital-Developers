import type { MetadataRoute } from 'next';

/**
 * robots.txt — allow all + sitemap reference (also served at /robots.txt).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml`,
  };
}
