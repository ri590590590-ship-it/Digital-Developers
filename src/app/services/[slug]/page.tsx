import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildMetadata, JsonLd, serviceSchema } from '@/lib/seo';
import { serviceDetails, serviceBySlug } from '@/data/services';
import SiteChrome from '@/components/SiteChrome';

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

/** Only the 15 real service slugs exist — any other slug 404s (no phantom routes). */
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const svc = getService(params.slug);
  return buildMetadata({
    title: svc.h1Plain,
    description: svc.lead.slice(0, 155),
    path: `/services/${svc.slug}`,
    image: svc.img,
  });
}

function getService(slug: string) {
  const svc = serviceBySlug(slug);
  if (!svc) notFound();
  return svc;
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = getService(params.slug);
  const related = svc.related
    .map((r) => serviceBySlug(r.href))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <SiteChrome>
      <main id="main">
        <div id="service-root">
          {/* HERO */}
          <section className="service-hero container">
            <div className="badge" dangerouslySetInnerHTML={{ __html: svc.badge }} />
            <h1 dangerouslySetInnerHTML={{ __html: svc.h1 }} />
            <p className="lead">{svc.lead}</p>
            <div className="hero-ctas">
              <a
                href={svc.heroCtaHref || 'https://wa.me/923710753644?text=Hi%20Digital%20Developers!%20I%20want%20to%20discuss%20a%20project.'}
                className="btn btn-primary"
                target="_blank"
                rel="noopener"
              >
                Start a Project
              </a>
              <Link href="/#portfolio" className="btn admin-link">View Our Work</Link>
            </div>
            <div className="hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={svc.img} alt={svc.alt} width={800} height={450} />
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="section container">
            <h2>Overview</h2>
            <p>{svc.overview}</p>
          </section>

          {/* INCLUDED + FEATURES */}
          <section className="section container">
            <div className="grid-2">
              <div className="card">
                <h3>What&apos;s Included</h3>
                <ul>
                  {svc.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="card">
                <h3>Key Features</h3>
                <ul>
                  {svc.features.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="section container">
            <h2>Our Process</h2>
            <ul className="process-list">
              {svc.process.map((p) => (
                <li key={p.num}>
                  <span className="step-num">{p.num}</span>
                  <div><strong>{p.text}</strong></div>
                </li>
              ))}
            </ul>
          </section>

          {/* WHY */}
          <section className="section container">
            <div className="card">
              <h3>Why Choose This Service</h3>
              <ul>
                {svc.why.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="section container">
            <h2>Frequently Asked Questions</h2>
            {svc.faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>

          {/* RELATED */}
          <section className="section container">
            <h2>Related Services</h2>
            <div className="related-grid">
              {related.map((r) => (
                <Link href={`/services/${r.slug}`} className="related-card" key={r.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.h1Plain} loading="lazy" width={800} height={450} />
                  <span>{r.h1Plain}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA BAND */}
          <section className="container">
            <div className="cta-band">
              <h2>Ready to Get Started?</h2>
              <p>Let&apos;s discuss your project — we typically respond within 2 hours.</p>
              <a
                href={svc.ctaHref}
                className="btn btn-primary"
                target="_blank"
                rel="noopener"
              >
                {svc.ctaBtn}
              </a>
            </div>
          </section>
        </div>
      </main>

      <JsonLd
        data={serviceSchema({
          name: svc.h1Plain,
          description: svc.lead,
          url: `${SITE.url}/services/${svc.slug}`,
          image: svc.img,
        })}
      />
    </SiteChrome>
  );
}