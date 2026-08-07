import { portfolioProjects, portfolioFilters } from '@/data/portfolio';
import SectionHeader from './SectionHeader';

/**
 * Portfolio — 15 projects + 8 filter buttons (exact v12 markup).
 * Filtering is handled by SiteEffects (client) via data-category.
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className="section" aria-label="Portfolio">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
          }
          label="Our Work"
          title={<>Projects That <span className="gradient-text">Speak for Themselves</span></>}
          subtitle="A curated selection of our finest work — each project a testament to our commitment to quality, creativity, and results."
        />
        <div className="portfolio-filters">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              className={'filter-btn' + (f === 'all' ? ' active' : '')}
              data-filter={f}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="portfolio-grid" id="portfolio-grid">
          {portfolioProjects.map((p) => (
            <div className="portfolio-card" data-category={p.cat} key={p.title}>
              <div className="portfolio-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.alt} loading="lazy" />
                <div className="portfolio-overlay">
                  <span className="btn-coming">Demo</span>
                  <a href="#contact" className="btn btn-ghost" style={{ fontSize: '.8rem', padding: '8px 16px' }}>View Details</a>
                </div>
              </div>
              <div className="portfolio-info">
                <div className="portfolio-cat">{p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</div>
                <h3 className="portfolio-title">{p.title}</h3>
                <p className="portfolio-desc">{p.desc}</p>
                <div className="portfolio-tags">
                  {p.tags.map((t) => (
                    <span className="portfolio-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="portfolio-meta">
                  {p.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
