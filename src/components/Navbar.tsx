import Link from 'next/link';
import { CONTACT, IMAGES } from '@/config/site';

/**
 * Site-wide navbar — mirrors the live v12 index navbar exactly:
 * brand logo, desktop links, Admin button, Start Project CTA, hamburger.
 */
export default function Navbar() {
  return (
    <>
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link href="/#hero" className="nav-logo" aria-label="Digital Developers Home">
            <img
              src={IMAGES.logoNav}
              alt="Digital Developers logo"
              className="nav-logo-img"
              width={179}
              height={160}
            />
          </Link>
          <ul className="nav-links" role="list">
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#why-us">Why Us</Link></li>
            <li><Link href="/#portfolio">Portfolio</Link></li>
            <li><Link href="/#process">Process</Link></li>
            <li><Link href="/#testimonials">Reviews</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <div className="nav-cta">
            <Link href="/admin" className="btn btn-ghost admin-link">Admin</Link>
            <Link href="/#portfolio" className="btn btn-ghost">View Work</Link>
            <a
              href={CONTACT.whatsappStartProject}
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Start Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
          <button className="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <Link href="/#services" className="mobile-link">Services</Link>
        <Link href="/#why-us" className="mobile-link">Why Us</Link>
        <Link href="/#portfolio" className="mobile-link">Portfolio</Link>
        <Link href="/#process" className="mobile-link">Process</Link>
        <Link href="/#testimonials" className="mobile-link">Reviews</Link>
        <Link href="/blog" className="mobile-link">Blog</Link>
        <Link href="/#contact" className="mobile-link">Contact</Link>
        <Link href="/admin" className="mobile-link">Admin</Link>
        <a
          href={CONTACT.whatsappStartProject}
          className="btn btn-primary"
          style={{ marginTop: 14, justifyContent: 'center' }}
          target="_blank"
          rel="noopener"
        >
          Start Your Project
        </a>
      </div>
    </>
  );
}
