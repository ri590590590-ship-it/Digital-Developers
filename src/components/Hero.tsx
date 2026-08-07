import { CONTACT } from '@/config/site';

/**
 * Hero section — exact v12 markup (content mirrors the live site).
 */
export default function Hero() {
  return (
    <section id="hero" aria-label="Hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-brand">
              <div className="hero-brand-dot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </div>
              Digital Developers · Premium Web Agency
            </div>
            <p className="hero-tagline">Your Vision, Our Code.</p>
            <h1 className="hero-headline">
              Building Digital<br />
              Experiences That<br />
              <span className="gradient-text">Help Businesses Grow.</span>
            </h1>
            <p className="hero-desc">
              We design and develop beautiful websites, web applications, e-commerce platforms, business systems and AI-powered solutions that are fast, scalable, responsive and built for long-term success.
            </p>
            <div className="hero-actions">
              <a
                href={CONTACT.whatsappStartProject}
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '16px 32px' }}
                target="_blank"
                rel="noopener"
              >
                Start Your Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
              <a href="#portfolio" className="btn btn-outline" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                View Our Work
              </a>
            </div>
            <div className="hero-trust">
              <span className="trust-badge blue">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                Responsive
              </span>
              <span className="trust-badge green">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                SEO Friendly
              </span>
              <span className="trust-badge orange">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Fast Loading
              </span>
              <span className="trust-badge purple">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><circle cx="18" cy="6" r="3" /></svg>
                AI Powered
              </span>
              <span className="trust-badge cyan">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Modern UI
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-mockup-wrap">
              <div className="hero-float-card hfc-analytics">
                <div className="hfc-analytics-title">Monthly Revenue</div>
                <div className="hfc-analytics-num">$48,200</div>
                <div className="hfc-analytics-sub">↑ 24.5% this month</div>
                <div className="hfc-sparkline">
                  <span style={{ height: '40%' }}></span>
                  <span style={{ height: '60%' }}></span>
                  <span style={{ height: '45%' }}></span>
                  <span style={{ height: '80%' }}></span>
                  <span style={{ height: '65%' }}></span>
                  <span style={{ height: '90%' }}></span>
                  <span style={{ height: '75%' }}></span>
                  <span style={{ height: '100%' }}></span>
                </div>
              </div>

              <div className="hero-macbook">
                <div className="macbook-bar">
                  <div className="macbook-dot red"></div>
                  <div className="macbook-dot yellow"></div>
                  <div className="macbook-dot green"></div>
                  <div className="macbook-url">digitaldevelopers.io</div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
                  alt="Premium website mockup on MacBook"
                  loading="eager"
                />
              </div>

              <div className="hero-float-card hfc-feedback">
                <div className="hfc-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Client" />
                </div>
                <div>
                  <div className="hfc-stars">★★★★★</div>
                  <div className="hfc-feedback-text">Absolutely stunning work!</div>
                  <div className="hfc-feedback-sub">Sarah M. · CEO, TechVentures</div>
                </div>
              </div>

              <div className="hero-float-card hfc-mobile">
                <div className="hfc-mobile-screen">
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&q=80" alt="Mobile preview" />
                </div>
              </div>

              <div className="hero-float-card hfc-tech">
                <div className="hfc-tech-title">Built With</div>
                <div className="hfc-tech-stack">
                  <div className="hfc-tech-icon" style={{ background: '#61DAFB', color: '#000', fontSize: '.55rem' }}>Re</div>
                  <div className="hfc-tech-icon" style={{ background: '#000' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z" /></svg>
                  </div>
                  <div className="hfc-tech-icon" style={{ background: '#38BDF8', fontSize: '.5rem' }}>TW</div>
                  <div className="hfc-tech-icon" style={{ background: '#68A063', fontSize: '.55rem' }}>No</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-hint-line"></div>
      </div>
    </section>
  );
}
