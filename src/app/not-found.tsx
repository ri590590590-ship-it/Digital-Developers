import Link from 'next/link';
import SiteChrome from '@/components/SiteChrome';

/**
 * Global 404 — matte-black + amber themed, keeps the full site chrome
 * (navbar, footer, WhatsApp float, cursor) so a bad URL never looks broken.
 */
export default function NotFound() {
  return (
    <SiteChrome>
      <main id="main" className="notfound-wrap">
        <section className="container" style={{ textAlign: 'center', padding: '9rem 1.5rem 7rem' }}>
          <div className="badge">404 — Page Not Found</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.1, margin: '1.25rem 0 1rem' }}>
            This page <span className="gradient-text">doesn&apos;t exist</span>
          </h1>
          <p className="lead" style={{ maxWidth: 560, margin: '0 auto 2rem' }}>
            The link you followed may be broken, or the page may have moved.
            Head back to the homepage or browse our services.
          </p>
          <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">Back to Home</Link>
            <Link href="/services/business-website" className="btn admin-link">Explore Services</Link>
            <a
              href="https://wa.me/923710753644?text=Hi%20Digital%20Developers!%20I%20hit%20a%20broken%20link%20on%20your%20website."
              className="btn btn-green"
              target="_blank"
              rel="noopener"
            >
              Report via WhatsApp
            </a>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
