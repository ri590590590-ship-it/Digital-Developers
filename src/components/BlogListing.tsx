'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { blogPosts, blogCategories } from '@/data/blogs';

const PAGE_SIZE = 4;

/**
 * Blog listing — client page: category chips + live search + responsive
 * grid + load-more + empty state. Mirrors the v12 blog/index.html exactly.
 */
export default function BlogListing() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const okCat = cat === 'all' || p.cat === cat;
      const q = query.trim().toLowerCase();
      const okQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [cat, query]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [cat, query]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <main id="main">
      {/* HERO */}
      <section className="blog-hero" aria-label="Blog header">
        <div className="container">
          <span className="eyebrow">Insights &amp; Guides</span>
          <h1>Ideas that help you <em>build, grow &amp; win online</em></h1>
          <p>Practical, no-fluff articles on web design, development, e-commerce and SEO — written by the team at Digital Developers.</p>
        </div>
      </section>

      {/* FILTERS + SEARCH */}
      <div className="controls" aria-label="Blog filters">
        <div className="chips" role="group" aria-label="Filter by category">
          {blogCategories.map((c) => (
            <button
              key={c}
              className={'chip' + (cat === c.toLowerCase() ? ' active' : '')}
              data-cat={c.toLowerCase()}
              onClick={() => setCat(c.toLowerCase())}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="search"
            className="search-input"
            id="blog-search"
            placeholder="Search articles..."
            aria-label="Search blog posts"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* POSTS */}
      <section className="posts" aria-label="Blog posts">
        <div className="posts-grid" id="posts-grid" ref={gridRef}>
          {shown.map((p) => (
            <article className="post-card" data-cat={p.cat} data-title={p.title} data-excerpt={p.excerpt} key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="post-thumb" aria-label={`Read: ${p.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.alt} loading="lazy" width={800} height={450} />
                <span className="post-badge">{p.cat}</span>
              </Link>
              <div className="post-body">
                <div className="post-meta"><span>{p.date}</span><span>· {p.read}</span></div>
                <Link href={`/blog/${p.slug}`}>
                  <h2 className="post-title">{p.title}</h2>
                </Link>
                <p className="post-excerpt">{p.excerpt}</p>
                <Link href={`/blog/${p.slug}`} className="post-link">
                  Read Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state" id="empty-state" role="status">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
            <h2>No articles found</h2>
            <p>We couldn&apos;t find any posts matching your search. Try a different keyword or category.</p>
          </div>
        )}

        {hasMore && (
          <div className="load-more-wrap">
            <button className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more articles
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section" aria-label="Contact us">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to build something great?</h2>
            <p>Let&apos;s turn your idea into a stunning, high-performing website. Get a free consultation today.</p>
            <a href="https://wa.me/923710753644?text=Hi%20Digital%20Developers!%20I%20read%20your%20blog%20and%20want%20to%20discuss%20my%20website." className="btn btn-primary" target="_blank" rel="noopener">
              Start a Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
