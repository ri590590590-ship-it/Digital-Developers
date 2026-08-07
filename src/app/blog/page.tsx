import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import { buildMetadata, JsonLd, blogSchema } from '@/lib/seo';
import BlogChrome from '@/components/BlogChrome';
import BlogListing from '@/components/BlogListing';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Practical, no-fluff articles on web design, development, e-commerce and SEO — written by the team at Digital Developers.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <BlogChrome>
      <BlogListing />
      <JsonLd data={blogSchema(`${SITE.url}/blog`)} />
    </BlogChrome>
  );
}
