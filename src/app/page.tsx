import type { Metadata } from 'next';
import { SITE, CONTACT } from '@/config/site';
import { buildMetadata, JsonLd, organizationSchema, websiteSchema } from '@/lib/seo';
import SiteChrome from '@/components/SiteChrome';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Tech from '@/components/Tech';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';

export const metadata: Metadata = buildMetadata({
  title: `${SITE.name} — Your Vision, Our Code.`,
  description:
    'Premium web agency in Lahore, Pakistan. We build websites, web applications, e-commerce platforms, business systems and AI-powered solutions that are fast, scalable and built to grow your business.',
  path: '/',
});

export default function HomePage() {
  return (
    <SiteChrome>
      <main id="main-content">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Portfolio />
        <Tech />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${SITE.name}`,
            url: `${SITE.url}/#contact`,
            email: CONTACT.email,
            telephone: CONTACT.phoneIntl,
          }),
        }}
      />
    </SiteChrome>
  );
}
