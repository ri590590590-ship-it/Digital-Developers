import { faqs } from '@/data/faq';
import SectionHeader from './SectionHeader';

/**
 * FAQ — accordion (exact v12 markup; logic via SiteEffects).
 */
export default function Faq() {
  return (
    <section id="faq" className="section" aria-label="FAQ">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          }
          label="FAQ"
          title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
          subtitle="Everything you need to know about working with us. Can't find your answer? Reach out — we're happy to help."
        />
        <div className="faq-grid">
          {faqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <button type="button" className="faq-question" aria-expanded="false">
                {f.q}
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </button>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
