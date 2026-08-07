import { stats } from '@/data/stats';

/**
 * Statistics — 4 animated counters (exact v12 markup; animation via SiteEffects).
 */
export default function Stats() {
  return (
    <section id="stats" className="section stats-section" aria-label="Our statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item reveal" key={s.label}>
              <div className="stat-icon" dangerouslySetInnerHTML={{ __html: s.icon }} />
              <div className="stat-num">
                <span className="counter" data-target={s.target}>0</span>
                <span className="stat-plus">+</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
