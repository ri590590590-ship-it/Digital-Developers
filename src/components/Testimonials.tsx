'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { testimonials } from '@/data/testimonials';
import SectionHeader from './SectionHeader';

const GAP = 24;

/**
 * Testimonials — responsive carousel with autoplay, manual controls, swipe support, and dynamic slides.
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setReducedMotion(media.matches);
    updateReducedMotion();
    media.addEventListener('change', updateReducedMotion);
    return () => media.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setVisibleCount(width >= 1100 ? 3 : width >= 700 ? 2 : 1);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    const updateMetrics = () => {
      if (!trackRef.current) return;
      const containerWidth = trackRef.current.clientWidth;
      const width = Math.max(280, (containerWidth - GAP * (visibleCount - 1)) / visibleCount);
      setSlideWidth(width);
    };

    updateMetrics();
    const resizeObserver = new ResizeObserver(updateMetrics);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    return () => resizeObserver.disconnect();
  }, [visibleCount]);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const slidesCount = Math.max(1, maxIndex + 1);

  useEffect(() => {
    setActiveIndex((current) => (current > maxIndex ? maxIndex : current));
  }, [maxIndex]);

  useEffect(() => {
    if (reducedMotion || slidesCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [maxIndex, reducedMotion, slidesCount]);

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    startX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (delta > 48) goTo(activeIndex - 1);
    if (delta < -48) goTo(activeIndex + 1);
    startX.current = null;
  };

  return (
    <section id="testimonials" className="section section-alt" aria-label="Testimonials">
      <div className="container">
        <SectionHeader
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
          }
          label="Client Reviews"
          title={<>What Our <span className="gradient-text">Clients Say</span></>}
          subtitle="Real feedback from real clients — the relationships we build are as important as the products we deliver."
        />
        <div className="testimonials-wrap" id="carousel">
          <div
            className="testimonials-track"
            id="testimonials-track"
            ref={trackRef}
            style={{ transform: `translateX(-${activeIndex * (slideWidth + GAP)}px)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((t) => (
              <div className="testimonial-slide" key={`${t.name}-${t.company}`} style={{ width: slideWidth ? `${slideWidth}px` : undefined }}>
                <article className="testimonial-card">
                  <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                  <p className="testimonial-text">“{t.text}”</p>
                  <div className="testimonial-author">
                    <img className="testimonial-avatar" src={t.avatar} alt={t.alt} loading="lazy" />
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-company">{t.company}</div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="carousel-controls carousel-nav" role="tablist" aria-label="Carousel navigation">
            <button type="button" className="carousel-btn" aria-label="Previous testimonial" onClick={() => goTo(activeIndex - 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="carousel-dots" id="carousel-dots">
              {Array.from({ length: slidesCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`carousel-dot${index === activeIndex ? ' active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button type="button" className="carousel-btn" aria-label="Next testimonial" onClick={() => goTo(activeIndex + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
