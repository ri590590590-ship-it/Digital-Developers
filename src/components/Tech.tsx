import { technologies } from '@/data/tech';
import SectionHeader from './SectionHeader';

/**
 * Technology — cards with logo, name, category, and description.
 */
export default function Tech() {
  return (
    <section id="tech" className="section section-alt" aria-label="Tech Stack">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>
          }
          label="Tech Stack"
          title={<>Powered by <span className="gradient-text">Modern Technologies</span></>}
          subtitle="We use the latest, most powerful tools and frameworks to build fast, scalable, and maintainable digital products."
        />
        <div className="tech-grid">
          {technologies.map((t) => (
            <div className="tech-card" key={t.name}>
              <div className="tech-icon" dangerouslySetInnerHTML={{ __html: t.icon }} />
              <div className="tech-meta">
                <div className="tech-name">{t.name}</div>
                <div className="tech-category">{t.category}</div>
                <p className="tech-description">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
