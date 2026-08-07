'use client';

import { useEffect, useRef } from 'react';

/**
 * SiteEffects — ports the v12 main IIFE (preloader, navbar scroll state,
 * ripple sparks, reveals, counters, portfolio filter, testimonial carousel,
 * FAQ accordion, contact form → WhatsApp + Supabase, newsletter, card tilt,
 * active nav indicator, custom cursor, Three.js background + GSAP scroll
 * choreography) into a React client component. Runs once on mount.
 */
export default function SiteEffects() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const w = window as any;

    const abortIfUnavailable = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return true;
      }
      return false;
    };

    if (abortIfUnavailable()) return;

    /* ---------- PRELOADER ---------- */
    (function () {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const preloader = document.getElementById('preloader');
      if (!preloader) return;
      if (reduced) {
        preloader.style.display = 'none';
        return;
      }
      const fill = document.getElementById('preloader-fill');
      let progress = 0;
      const timer = setInterval(() => {
        progress = Math.min(1, progress + Math.random() * 0.22);
        if (fill) fill.style.width = progress * 100 + '%';
        if (progress >= 1) {
          clearInterval(timer);
          setTimeout(() => {
            preloader.classList.add('done');
            setTimeout(() => (preloader.style.display = 'none'), 520);
            document.body.style.overflow = '';
          }, 220);
        }
      }, 110);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (preloader.style.display !== 'none') {
          preloader.classList.add('done');
          setTimeout(() => (preloader.style.display = 'none'), 520);
          document.body.style.overflow = '';
        }
      }, 3200);
    })();

    /* ---------- NAVBAR + MOBILE MENU + BACK TOP + PROGRESS ---------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const backTop = document.getElementById('back-top');
    const progressBar = document.getElementById('scroll-progress');

    if (navbar && backTop && progressBar) {
      window.addEventListener(
        'scroll',
        () => {
          navbar.classList.toggle('scrolled', window.scrollY > 20);
          backTop.classList.toggle('show', window.scrollY > 420);
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const p = max > 0 ? window.scrollY / max : 0;
          progressBar.style.transform = 'scaleX(' + p + ')';
        },
        { passive: true }
      );
    }
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
      });
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
    if (backTop) {
      backTop.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      );
    }

    /* ---------- RIPPLE + SPARKS ---------- */
    function spawnSparks(el: HTMLElement, x: number, y: number) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        const size = 3 + Math.random() * 4;
        s.style.cssText =
          'position:absolute;width:' + size + 'px;height:' + size + 'px;border-radius:50%;' +
          'background:' + (Math.random() > 0.5 ? '#FFB300' : '#FFC46B') + ';pointer-events:none;' +
          'left:' + (x - rect.left) + 'px;top:' + (y - rect.top) + 'px;z-index:5;' +
          'box-shadow:0 0 8px rgba(255,179,0,.8);' +
          'transform:translate(' + (Math.random() * 40 - 20) + 'px,' + (Math.random() * 40 - 10) + 'px) scale(1);' +
          'opacity:1;transition:all .5s cubic-bezier(.4,0,.2,1);';
        el.appendChild(s);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            s.style.transform = 'translate(' + (Math.random() * 60 - 30) + 'px,' + (Math.random() * 60 + 10) + 'px) scale(.1)';
            s.style.opacity = '0';
          });
        });
        setTimeout(() => s.remove(), 520);
      }
    }
    document.querySelectorAll<HTMLElement>('.btn, .form-submit, .filter-btn, .newsletter-btn').forEach((btn) => {
      btn.addEventListener('click', (e: MouseEvent) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.className = 'ripple';
        ripple.style.cssText =
          'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size / 2) + 'px;top:' + (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 680);
        spawnSparks(btn as HTMLElement, e.clientX, e.clientY);
      });
    });

    /* ---------- REVEALS ---------- */
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-3d, .process-step').forEach((el) =>
      revealObs.observe(el)
    );

    const stagObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cards = Array.prototype.slice.call(entry.target.children);
          cards.forEach((card: HTMLElement, i: number) => {
            card.style.transition = 'opacity .7s cubic-bezier(.4,0,.2,1) ' + i * 0.06 + 's, transform .7s cubic-bezier(.4,0,.2,1) ' + i * 0.06 + 's';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) rotateX(6deg)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'none';
            }, 40);
          });
          stagObs.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.services-grid, .features-grid, .tech-grid, .portfolio-grid').forEach((el) =>
      stagObs.observe(el)
    );

    const headObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            headObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('.section-header h2.section-title').forEach((h) => {
      const wrap = document.createElement('span');
      wrap.className = 'heading-reveal heading-glow';
      const inner = document.createElement('span');
      inner.className = 'heading-inner';
      inner.innerHTML = (h as HTMLElement).innerHTML;
      wrap.appendChild(inner);
      (h as HTMLElement).innerHTML = '';
      (h as HTMLElement).appendChild(wrap);
      headObs.observe(wrap);
    });

    const procObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            procObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.process-wrap').forEach((el) => procObs.observe(el));

    /* process active-step highlight */
    (function () {
      const wrap = document.querySelector('.process-wrap');
      if (!wrap) return;
      const steps = Array.prototype.slice.call(wrap.querySelectorAll('.process-step'));
      let activeIdx = -1;
      let ticking = false;
      function updateActive() {
        ticking = false;
        const center = window.innerHeight * 0.55;
        let best = -1;
        let bestDist = Infinity;
        steps.forEach((step: HTMLElement, i: number) => {
          const r = step.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        if (best !== activeIdx) {
          if (activeIdx >= 0 && steps[activeIdx]) steps[activeIdx].classList.remove('active');
          activeIdx = best;
          if (steps[activeIdx]) steps[activeIdx].classList.add('active');
        }
      }
      window.addEventListener(
        'scroll',
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateActive);
          }
        },
        { passive: true }
      );
      updateActive();
    })();

    /* ---------- COUNTERS ---------- */
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0', 10);
          const duration = 1800;
          let start: number | null = null;
          function tick(ts: number) {
            if (!start) start = ts;
            const p = Math.min(1, (ts - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else {
              el.textContent = String(target);
              const statNum = el.closest('.stat-num');
              if (statNum) statNum.classList.add('stat-popped');
            }
          }
          requestAnimationFrame(tick);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.counter').forEach((el) => counterObs.observe(el));

    /* ---------- PORTFOLIO FILTER ---------- */
    const filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
    const portfolioCards = Array.prototype.slice.call(document.querySelectorAll('.portfolio-card'));
    filterBtns.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b: HTMLElement) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioCards.forEach((card: HTMLElement) => {
          const show = filter === 'all' || card.dataset.category === filter;
          if (show) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(.95)';
            setTimeout(() => {
              if (!show) card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    /* ---------- TESTIMONIALS CAROUSEL ---------- */
    // Testimonials are driven by the React carousel in Testimonials.tsx for
    // simpler state management, swipe support, and dynamic slide counts.

    /* ---------- FAQ ACCORDION ---------- */
    document.querySelectorAll('.faq-question').forEach((question) => {
      question.addEventListener('click', () => {
        const item = question.parentElement as HTMLElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    /* ---------- CONTACT FORM → WHATSAPP + SUPABASE ---------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
        const companyEl = document.getElementById('company') as HTMLInputElement;
        const company = companyEl ? companyEl.value.trim() : '';
        const ptSel = document.getElementById('project-type') as HTMLSelectElement;
        const ptype = ptSel && ptSel.selectedIndex > 0 ? ptSel.options[ptSel.selectedIndex].text : '';
        const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!name || !emailOk || !message) {
          alert('Please fill in all required fields (name, valid email, and project details).');
          return;
        }
        const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        if (submitBtn) submitBtn.disabled = true;
        // Validated + rate-limited server route: saves to Supabase (contact_submissions)
        // and returns the prefilled wa.me URL. Falls back to a client-built URL if the
        // request fails, so WhatsApp contact never breaks even if the API is down.
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, company, projectType: ptype, message }),
        })
          .then((res) => res.json())
          .then((data) => {
            const waUrl = data && data.waUrl
              ? data.waUrl
              : 'https://wa.me/923710753644?text=' + encodeURIComponent(
                  'New Consultation Request\n\nName: ' + name + '\nEmail: ' + email +
                  (phone ? '\nPhone: ' + phone : '') + (company ? '\nCompany: ' + company : '') +
                  (ptype ? '\nProject Type: ' + ptype : '') + '\nDetails: ' + message
                );
            window.open(waUrl, '_blank', 'noopener');
          })
          .catch((err) => {
            console.warn('[contact] submit failed, falling back to direct WhatsApp link:', err);
            const waUrl = 'https://wa.me/923710753644?text=' + encodeURIComponent(
              'New Consultation Request\n\nName: ' + name + '\nEmail: ' + email +
              (phone ? '\nPhone: ' + phone : '') + (company ? '\nCompany: ' + company : '') +
              (ptype ? '\nProject Type: ' + ptype : '') + '\nDetails: ' + message
            );
            window.open(waUrl, '_blank', 'noopener');
          })
          .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
            const formInner = document.getElementById('contact-form-inner');
            const success = document.getElementById('form-success');
            if (formInner) formInner.style.display = 'none';
            if (success) success.classList.add('show');
          });
      });
    }

    /* ---------- NEWSLETTER ---------- */
    const newsBtn = document.querySelector('.newsletter-btn') as HTMLElement | null;
    const newsInput = document.querySelector('.newsletter-input') as HTMLInputElement | null;
    if (newsBtn && newsInput) {
      newsBtn.addEventListener('click', () => {
        if (newsInput.value.includes('@')) {
          newsBtn.textContent = '✓ Subscribed!';
          newsBtn.style.background = '#FFC46B';
          newsInput.value = '';
          setTimeout(() => {
            newsBtn.textContent = 'Subscribe';
            newsBtn.style.background = '';
          }, 3000);
        }
      });
    }

    /* ---------- CARD TILT + CURSOR LIGHT ---------- */
    const coarse = window.matchMedia('(hover:none), (pointer:coarse)').matches;
    document.querySelectorAll('.service-card, .feature-card, .tech-card, .portfolio-card').forEach((card) => {
      const el = card as HTMLElement;
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
      if (coarse) return;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
        if (el.classList.contains('service-card') || el.classList.contains('portfolio-card')) {
          const rx = (0.5 - py) * 7;
          const ry = (px - 0.5) * 9;
          el.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-6px)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (el.classList.contains('service-card') || el.classList.contains('portfolio-card')) {
          el.style.transform = '';
        }
      });
    });

    /* ---------- ACTIVE NAV ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => navObs.observe(s));

    /* ---------- CUSTOM CURSOR ---------- */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    if (cursorDot && cursorRing) {
      cursorDot.style.display = 'block';
      cursorRing.style.display = 'block';
    }
    const dotLerp = 0.7, ringLerp = 0.32;
    const hasCursor = !coarse && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function spawnCursorSparks(x: number, y: number) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      for (let i = 0; i < 7; i++) {
        const s = document.createElement('span');
        s.className = 'cursor-spark';
        const ang = (Math.PI * 2 * i) / 7 + Math.random() * 0.6;
        const dist = 22 + Math.random() * 26;
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
        document.body.appendChild(s);
        (function (el) {
          setTimeout(() => el.remove(), 380);
        })(s);
      }
    }
    document.addEventListener(
      'mousemove',
      (e) => {
        mx = e.clientX;
        my = e.clientY;
      },
      { passive: true }
    );

    if (hasCursor) {
      let lastT = performance.now();
      let ringScale = 1;
      let targetRingScale = 1;
      (function cursorLoop(now: number) {
        const dt = Math.min((now - lastT) / 16.667, 3);
        lastT = now;
        const fDot = 1 - Math.pow(1 - dotLerp, dt);
        const fRing = 1 - Math.pow(1 - ringLerp, dt);
        let magX = 0, magY = 0;
        const hit = document.elementFromPoint(mx, my);
        if (hit) {
          const magEl = (hit as HTMLElement).closest('a, button, .filter-btn, input, textarea, select, .faq-question, .service-card, .project-card');
          if (magEl) {
            const r = magEl.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const dxm = cx - mx, dym = cy - my;
            const d = Math.sqrt(dxm * dxm + dym * dym);
            if (d < 140 && d > 0.01) {
              const pull = (1 - d / 140) * 10;
              magX = (dxm / d) * pull;
              magY = (dym / d) * pull;
            }
          }
        }
        const tx = mx + magX, ty = my + magY;
        rx += (tx - rx) * fRing;
        ry += (ty - ry) * fRing;
        ringScale += (targetRingScale - ringScale) * 0.12;
        if (cursorDot) cursorDot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
        if (cursorRing) cursorRing.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%) scale(' + ringScale.toFixed(3) + ')';
        requestAnimationFrame(cursorLoop);
      })(lastT);
      document.querySelectorAll('a, button, .filter-btn, input, textarea, select, .faq-question, .service-card, .project-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const tag = el.tagName;
          if (cursorRing) {
            if (tag === 'BUTTON' || el.classList.contains('btn')) cursorRing.classList.add('btn');
            else if (tag === 'A') cursorRing.classList.add('link');
            else cursorRing.classList.add('hover');
          }
          targetRingScale = 1.45;
          if (cursorDot) cursorDot.style.transform += ' scale(1.6)';
        });
        el.addEventListener('mouseleave', () => {
          if (cursorRing) cursorRing.classList.remove('btn', 'link', 'hover');
          targetRingScale = 1;
          if (cursorDot) cursorDot.style.transform = cursorDot.style.transform.replace(' scale(1.6)', '');
        });
      });
      document.addEventListener('click', (e) => {
        if (e.target && (e.target as HTMLElement).closest && (e.target as HTMLElement).closest('.wa-float')) return;
        spawnCursorSparks(e.clientX, e.clientY);
      });
    } else {
      if (cursorDot) cursorDot.style.display = 'none';
      if (cursorRing) cursorRing.style.display = 'none';
    }

    /* ---------- THREE.JS + GSAP ---------- */
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.getElementById('v8-canvas') as HTMLCanvasElement | null;
    let renderer: any, scene: any, camera: any, shardGroup: any, polyhedron: any;
    let crackLines: any, crackMat: any, particlePoints: any, pVel: any;
    let mouseNX = 0, mouseNY = 0, camBaseZ = 6.2, camNX = 0, camNY = 0;
    let isMobile = window.innerWidth <= 768;
    let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    let running = true;
    let amberGlow: any = null;

    function initThree() {
      if (!w.THREE || !canvas) return;
      const THREE = w.THREE;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch (err) {
        console.warn('WebGL unavailable, showing fallback gradient', err);
        const fb = document.querySelector('.v8-fallback') as HTMLElement | null;
        if (fb) fb.style.display = 'block';
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camBaseZ = isMobile ? 8.4 : isTablet ? 7.2 : 6.2;
      camera.position.set(0, 0.4, camBaseZ);
      camera.lookAt(0, 0, 0);

      const ambient = new THREE.AmbientLight(0x404050, 0.55);
      scene.add(ambient);
      const keyLight = new THREE.DirectionalLight(0xffb300, 1.6);
      keyLight.position.set(4, 5, 3);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0x667799, 0.5);
      fillLight.position.set(-4, -2, 2);
      scene.add(fillLight);
      amberGlow = new THREE.PointLight(0xffb300, 2.2, 14);
      amberGlow.position.set(1.5, 1.2, 2.5);
      scene.add(amberGlow);
      const warmBack = new THREE.PointLight(0xffa53c, 1.4, 12);
      warmBack.position.set(-1.6, -0.8, -2.4);
      scene.add(warmBack);

      const seg = isMobile ? 48 : 84;
      const planeGeo = new THREE.PlaneGeometry(46, 46, seg, seg);
      const shardMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.94, metalness: 0.18, flatShading: true });
      const shards = new THREE.Mesh(planeGeo, shardMat);
      shards.rotation.x = -Math.PI / 2;
      shards.position.y = -4.2;
      scene.add(shards);

      const edgeCount = isMobile ? 60 : 130;
      const crackPositions: number[] = [];
      function rng(seed: number) {
        let s = seed % 2147483647;
        if (s <= 0) s += 2147483646;
        return () => {
          s = (s * 16807) % 2147483647;
          return (s - 1) / 2147483646;
        };
      }
      const rnd = rng(42);
      for (let i = 0; i < edgeCount; i++) {
        const cx = (rnd() * 2 - 1) * 14;
        const cz = (rnd() * 2 - 1) * 14;
        const len = 1.5 + rnd() * 3.5;
        const ang = rnd() * Math.PI * 2;
        const segments = 3 + Math.floor(rnd() * 4);
        for (let s2 = 0; s2 < segments; s2++) {
          const t0 = s2 / segments, t1 = (s2 + 1) / segments;
          const wob = 0.4;
          crackPositions.push(cx + Math.cos(ang) * len * t0 + (rnd() - 0.5) * wob, -4.18, cz + Math.sin(ang) * len * t0 + (rnd() - 0.5) * wob);
          crackPositions.push(cx + Math.cos(ang) * len * t1 + (rnd() - 0.5) * wob, -4.18, cz + Math.sin(ang) * len * t1 + (rnd() - 0.5) * wob);
        }
      }
      const crackGeo = new THREE.BufferGeometry();
      crackGeo.setAttribute('position', new THREE.Float32BufferAttribute(crackPositions, 3));
      crackMat = new THREE.LineBasicMaterial({ color: 0xffb300, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
      crackLines = new THREE.LineSegments(crackGeo, crackMat);
      crackLines.rotation.x = -Math.PI / 2;
      scene.add(crackLines);

      const pCount = isMobile ? 60 : isTablet ? 130 : 220;
      const pPos = new Float32Array(pCount * 3);
      pVel = new Float32Array(pCount);
      for (let pi = 0; pi < pCount; pi++) {
        pPos[pi * 3] = (rnd() * 2 - 1) * 16;
        pPos[pi * 3 + 1] = rnd() * 12 - 5;
        pPos[pi * 3 + 2] = (rnd() * 2 - 1) * 16;
        pVel[pi] = 0.3 + rnd() * 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xffb300,
        size: isMobile ? 0.045 : 0.06,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      particlePoints = new THREE.Points(pGeo, pMat);
      scene.add(particlePoints);

      const detail = isMobile ? 0 : 1;
      const polyGeo = new THREE.IcosahedronGeometry(1.55, detail);
      const vPos = polyGeo.attributes.position;
      for (let vi = 0; vi < vPos.count; vi++) {
        const vx = vPos.getX(vi), vy = vPos.getY(vi), vz = vPos.getZ(vi);
        const len = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const noise = 0.92 + rnd() * 0.16;
        vPos.setXYZ(vi, (vx / len) * 1.55 * noise, (vy / len) * 1.55 * noise, (vz / len) * 1.55 * noise);
      }
      polyGeo.computeVertexNormals();
      const polyMat = new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.88, metalness: 0.32, flatShading: true, transparent: true, opacity: 0.97 });
      polyhedron = new THREE.Mesh(polyGeo, polyMat);
      polyhedron.position.set(0, 0, 0);
      scene.add(polyhedron);

      const polyEdges = new THREE.EdgesGeometry(polyGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xffa53c, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
      const edgeLines = new THREE.LineSegments(polyEdges, edgeMat);
      polyhedron.add(edgeLines);

      const innerGlow = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.62, 0),
        new THREE.MeshBasicMaterial({ color: 0xffb300, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      polyhedron.add(innerGlow);

      /* GSAP scroll choreography */
      if (w.gsap && w.ScrollTrigger && !reducedMotion) {
        w.gsap.registerPlugin(w.ScrollTrigger);
        const tl = w.gsap.timeline({
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 },
        });
        tl.to(polyhedron.position, { y: 0.35, ease: 'power2.inOut', duration: 0.2 }, 0)
          .to(polyhedron.rotation, { y: Math.PI * 1.4, ease: 'power2.inOut', duration: 0.9 }, 0)
          .to(camera.position, { z: camBaseZ - 1.6, y: 0.9, ease: 'power2.inOut', duration: 0.25 }, 0)
          .to(camera.position, { z: camBaseZ - 2.8, x: -1.1, y: 1.3, ease: 'power2.inOut', duration: 0.18 }, 0.22)
          .to(polyhedron.rotation, { x: 0.7, ease: 'power2.inOut', duration: 0.18 }, 0.22)
          .to(camera.position, { x: 2.4, y: 0.7, z: camBaseZ - 2.2, ease: 'power2.inOut', duration: 0.22 }, 0.45)
          .to(polyhedron.rotation, { y: Math.PI * 2.6, x: -0.5, ease: 'power2.inOut', duration: 0.22 }, 0.45)
          .to(camera.position, { y: 2.6, z: camBaseZ - 3.4, x: 0, ease: 'power2.inOut', duration: 0.18 }, 0.62)
          .to(polyhedron.rotation, { y: Math.PI * 3.2, x: 0.35, ease: 'power2.inOut', duration: 0.18 }, 0.62)
          .to(camera.position, { z: camBaseZ + 1.4, y: 0.4, x: 0.5, ease: 'power2.inOut', duration: 0.2 }, 0.82)
          .to(camera.position, { z: camBaseZ, y: 0.4, x: 0, ease: 'power2.inOut', duration: 0.2 }, 1);
        w.gsap.to(shards.position, { y: -3.4, ease: 'power1.inOut', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
        w.gsap.to(crackLines.position, { y: 0.5, ease: 'power1.inOut', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
        w.gsap.to(particlePoints.position, { y: 1.6, ease: 'power1.inOut', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
      }

      document.addEventListener(
        'mousemove',
        (e) => {
          mouseNX = (e.clientX / window.innerWidth) * 2 - 1;
          mouseNY = (e.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true }
      );

      let resizeTimer: any;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          isMobile = window.innerWidth <= 768;
          isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
          camBaseZ = isMobile ? 8.4 : isTablet ? 7.2 : 6.2;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }, 160);
      });

      const clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        if (!running || !renderer || !scene || !camera) return;
        if (document.hidden) return;
        const t = clock.getElapsedTime();
        if (polyhedron) {
          const breathe = 1 + Math.sin(t * 0.7) * 0.02;
          polyhedron.scale.set(breathe, breathe, breathe);
          polyhedron.rotation.z = Math.sin(t * 0.18) * 0.035;
        }
        if (crackMat) crackMat.opacity = 0.4 + Math.sin(t * 1.6) * 0.18;
        if (particlePoints) {
          const pp = particlePoints.geometry.attributes.position;
          for (let i = 0; i < pp.count; i++) {
            let y = pp.getY(i) + pVel[i] * 0.004;
            if (y > 6) y = -5;
            pp.setY(i, y);
          }
          pp.needsUpdate = true;
          particlePoints.rotation.y = t * 0.012;
        }
        camNX += (mouseNX - camNX) * 0.04;
        camNY += (mouseNY - camNY) * 0.04;
        if (!reducedMotion) camera.lookAt(camNX * 0.45, 0.1 - camNY * 0.3, 0);
        else camera.lookAt(0, 0.1, 0);
        if (amberGlow) {
          amberGlow.position.x = 1.5 + Math.sin(t * 0.5) * 0.8;
          amberGlow.position.z = 2.5 + Math.cos(t * 0.4) * 0.6;
        }
        renderer.render(scene, camera);
      }
      animate();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) running = false;
      else running = true;
    });

    function waitForThree() {
      if (w.THREE) initThree();
      else setTimeout(waitForThree, 120);
    }
    if (w.THREE) initThree();
    else waitForThree();

  }, []);

  return null;
}