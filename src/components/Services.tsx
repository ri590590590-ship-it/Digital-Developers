import Link from 'next/link';
import { services } from '@/data/services';
import SectionHeader from './SectionHeader';

/**
 * Services section — 15 cards (exact v12 markup, Learn More → /services/<slug>).
 */
export default function Services() {
  return (
    <section id="services" className="section section-alt" aria-label="Services">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
          }
          label="Our Services"
          title={<>Everything You Need to <span className="gradient-text">Succeed Online</span></>}
          subtitle="From stunning websites to powerful web applications — we deliver end-to-end digital solutions tailored to your business goals."
        />
        <div className="services-grid stagger-3d">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} loading="lazy" width={800} height={450} />
                <div className="service-img-overlay"></div>
              </div>
              <div className="service-body">
                <div className="service-icon" dangerouslySetInnerHTML={{ __html: s.icon }} />
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <Link href={`/services/${s.href}`} className="service-link">
                  Learn More{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
