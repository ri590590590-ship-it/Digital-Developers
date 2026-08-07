import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import SiteEffects from './SiteEffects';

/**
 * Main site chrome: preloader + scroll progress + cursor + 3D canvas
 * (exact v12 index markup) + navbar + content + footer + WhatsApp float.
 * The heavy interactive logic lives in SiteEffects (client).
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Preloader */}
      <div id="preloader" role="status" aria-label="Loading">
        <div id="preloader-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        </div>
        <div id="preloader-title">Digital Developers</div>
        <div id="preloader-bar"><div id="preloader-fill"></div></div>
      </div>

      <div id="scroll-progress" aria-hidden="true"></div>

      {/* 3D canvas background */}
      <canvas id="v8-canvas" aria-hidden="true"></canvas>
      <div className="v8-fallback" aria-hidden="true"></div>

      {/* Custom cursor */}
      <div className="cursor-ring" id="cursor-ring" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursor-dot" aria-hidden="true"></div>

      <Navbar />
      {children}
      <Footer />

      <button id="back-top" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
      </button>

      <WhatsAppFloat />
      <SiteEffects />
    </>
  );
}
