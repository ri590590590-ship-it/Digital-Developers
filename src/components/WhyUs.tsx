import { features } from '@/data/features';
import SectionHeader from './SectionHeader';

/**
 * Why Choose Us — 12 feature cards (exact v12 markup).
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="section" aria-label="Why Choose Us">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          }
          label="Why Choose Us"
          title={<>Built for <span className="gradient-text">Excellence</span>, Delivered with Care</>}
          subtitle="We combine technical expertise with creative vision to deliver digital products that exceed expectations and drive measurable results."
        />
        <div className="features-grid stagger-3d">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
