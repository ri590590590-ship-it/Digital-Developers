import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildMetadata, JsonLd, blogPostSchema } from '@/lib/seo';
import { blogArticles } from '@/data/articles';
import { blogBySlug } from '@/data/blogs';
import BlogChrome from '@/components/BlogChrome';

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

/** Only the 6 real slugs exist — any other slug 404s (no phantom routes). */
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articleOr404(params.slug);
  const plain = strip(article.body);
  return buildMetadata({
    title: article.h1,
    description: plain.slice(0, 155) + '…',
    path: `/blog/${article.slug}`,
    type: 'article',
    image: article.heroImg,
  });
}

function articleOr404(slug: string) {
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  return article;
}

function strip(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = articleOr404(params.slug);
  const meta = blogBySlug(article.slug);
  const date = meta ? meta.date : article.meta[0]?.replace(/\D/g, '').trim() || '2026-01-01';
  const related = article.related.map((r) => articleOr404(r.href));

  return (
    <BlogChrome scope="post">
      <main id="main">
        <article>
          <header className="article-hero">
            <div className="container">
              <Link href="/blog" className="back-link">← Back to Blog</Link>
              <div><span className="post-badge">{article.badge}</span></div>
              <h1>{article.h1}</h1>
              <div className="article-meta">
                {article.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="hero-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.heroImg} alt={article.heroAlt} width={800} height={450} />
              </div>
            </div>
          </header>

          <div className="article-body container" dangerouslySetInnerHTML={{ __html: article.body }} />

          {article.cta && (
            <section className="cta-section container" aria-label="Contact us">
              <div className="cta-box">
                <h2>{article.cta.h2}</h2>
                <p>{article.cta.p}</p>
                <a
                  href={article.cta.href}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: '.98rem', padding: '14px 30px' }}
                >
                  {article.cta.btn}
                </a>
              </div>
            </section>
          )}
        </article>

        <section className="related container" aria-label="Related articles">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {related.map((r) => (
              <Link href={`/blog/${r.slug}`} className="related-card" key={r.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.heroImg} alt={r.heroAlt} loading="lazy" width={400} height={225} />
                <h3>{r.h1}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <JsonLd
        data={blogPostSchema({
          title: article.h1,
          description: strip(article.body).slice(0, 200),
          url: `${SITE.url}/blog/${article.slug}`,
          image: article.heroImg,
          datePublished: date,
        })}
      />
    </BlogChrome>
  );
}