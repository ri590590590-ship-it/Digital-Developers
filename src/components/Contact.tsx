import { CONTACT } from '@/config/site';
import SectionHeader from './SectionHeader';

/**
 * Contact — info panel + form (exact v12 markup).
 * Form submit → WhatsApp prefill + Supabase insert (via SiteEffects).
 */
export default function Contact() {
  return (
    <section id="contact" className="section section-alt" aria-label="Contact">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          }
          label="Contact Us"
          title={<>Let&apos;s Build Something <span className="gradient-text">Amazing Together</span></>}
          subtitle="Have a project in mind? Get in touch and let's make it happen. We reply within 2 hours during business hours."
        />
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-title">Start a Conversation</div>
            <div className="contact-info-sub">We'd love to hear about your project. Tell us about your goals and we'll get back to you with a plan.</div>
            <div className="contact-list">
              <a className="contact-item" href={`mailto:${CONTACT.email}`}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{CONTACT.email}</div>
                </div>
              </a>
              <a className="contact-item" href={CONTACT.phoneTel}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{CONTACT.phoneDisplay}</div>
                </div>
              </a>
              <a className="contact-item" href={CONTACT.whatsappLink} target="_blank" rel="noopener">
                <div className="contact-icon wa">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <div className="contact-value">{CONTACT.phoneIntl}</div>
                </div>
              </a>
              <a className="contact-item" href={CONTACT.mapsLink} target="_blank" rel="noopener">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">{CONTACT.address}</div>
                </div>
              </a>
            </div>
            <div className="contact-cta">
              <a href={CONTACT.whatsappStartProject} className="btn btn-primary" target="_blank" rel="noopener">
                Book a Free Consultation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form id="contact-form" className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" placeholder="john@company.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+92 300 1234567" />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" placeholder="Company (optional)" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project-type">Project Type</label>
                <select id="project-type" name="project-type">
                  <option value="">Select a project type</option>
                  <option>Business Website</option>
                  <option>Web Application</option>
                  <option>E-Commerce Store</option>
                  <option>React / Next.js Development</option>
                  <option>Website Redesign</option>
                  <option>SEO Optimization</option>
                  <option>AI Integration</option>
                  <option>API Development</option>
                  <option>Dashboard Systems</option>
                  <option>Other / Not Sure</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell us about your project, goals, timeline, budget..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary form-submit" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </form>
            <div id="form-success" className="form-success" role="status">
              <div className="form-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div className="form-success-title">Message Sent!</div>
              <div className="form-success-text">Thanks for reaching out! We've opened WhatsApp so you can send your details — we'll get back to you within 2 hours.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
