import { processSteps } from '@/data/process';
import SectionHeader from './SectionHeader';

/**
 * Process — 7 premium timeline steps (exact v12 markup).
 */
export default function Process() {
  return (
    <section id="process" className="section section-alt" aria-label="Our Process">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          }
          label="Our Process"
          title={<>How We <span className="gradient-text">Bring Your Vision to Life</span></>}
          subtitle="A proven, structured process that ensures every project is delivered on time, on budget, and beyond expectations."
        />
        <div className="process-wrap reveal">
          <div className="process-line"><span className="process-line-fill"></span></div>
          <div className="process-steps">
            {processSteps.map((step) => (
              <div className="process-step" key={step.badge}>
                <div className="process-num" dangerouslySetInnerHTML={{ __html: step.num }} />
                <div className="process-step-card">
                  <div className="process-step-num">{step.badge}</div>
                  <div className="process-step-title">{step.title}</div>
                  <div className="process-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
