import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';
import { serviceDetails } from '@/data/services';
import { blogArticles } from '@/data/articles';

/**
 * Dynamic sitemap — index + 15 services + blog listing + 6 posts.
 * (Next.js generates /sitemap.xml automatically.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date().toISOString();

  const serviceEntries = serviceDetails.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogEntries = blogArticles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...serviceEntries,
    ...blogEntries,
  ];
}
