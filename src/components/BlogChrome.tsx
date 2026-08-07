'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { CONTACT, IMAGES } from '@/config/site';
import WhatsAppFloat from './WhatsAppFloat';

/**
 * Blog chrome — light wrapper used by /blog and /blog/[slug]:
 * blog navbar + mobile menu + hamburger logic + footer + WhatsApp float.
 * No 3D canvas / preloader / cursor (matches v12 blog pages).
 */
export default function BlogChrome({ children, scope = 'blog' }: { children: ReactNode; scope?: 'blog' | 'post' }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (hamburger && mobileMenu) {
      const toggle = () => {
        const open = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
      };
      hamburger.addEventListener('click', toggle);
      mobileMenu.querySelectorAll('a').forEach((link) =>
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        })
      );
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id={scope === 'post' ? 'post-root' : 'blog-root'}>
      <header className="navbar" id="navbar">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Digital Developers home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.logo} alt="Digital Developers logo" className="brand-logo" width={1280} height={1024} />
          </Link>
          <ul className="nav-links" role="list">
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#portfolio">Portfolio</Link></li>
            <li><Link href="/#process">Process</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/blog" className="active">Blog</Link></li>
          </ul>
          <div className="nav-cta">
            <Link href="/admin" className="btn admin-link">Admin</Link>
            <a
              href={CONTACT.whatsappStartProject}
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Start Project
            </a>
          </div>
          <button className="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div className="mobile-menu" id="mobile-menu">
        <Link href="/#services">Services</Link>
        <Link href="/#portfolio">Portfolio</Link>
        <Link href="/#process">Process</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/admin">Admin</Link>
      </div>

      {children}

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.logo} alt="Digital Developers logo" className="brand-logo" width={1280} height={1024} />
              </Link>
              <p>Premium web development agency in Lahore, Pakistan. We craft luxury websites, web apps and digital experiences that drive results.</p>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Explore</div>
              <ul>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/#portfolio">Portfolio</Link></li>
                <li><Link href="/#process">Process</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Blog</div>
              <ul>
                <li><Link href="/blog/high-converting-business-website">Business Websites</Link></li>
                <li><Link href="/blog/nextjs-vs-react-2026">Next.js vs React</Link></li>
                <li><Link href="/blog/seo-guide-pakistan">SEO in Pakistan</Link></li>
                <li><Link href="/blog/cost-of-website-pakistan">Website Costs</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Digital Developers. All rights reserved.</span>
            <span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{' '}
              <a href={CONTACT.phoneTel}>{CONTACT.phoneIntl}</a> ·{' '}
              <a href={CONTACT.mapsLink} target="_blank" rel="noopener">{CONTACT.address}</a>
            </span>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}