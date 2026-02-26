/**
 * COACH LANDING PAGE — app.js
 * Logica interattiva: navbar, mobile menu, scroll reveal,
 * testimonial carousel, form validation
 */

'use strict';

/* =============================================
   1. NAVBAR — Scroll Effect + Active Link
   ============================================= */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effect
    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    };

    // Active link based on scroll position
    const updateActiveLink = () => {
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();


/* =============================================
   2. MOBILE MENU — Hamburger Toggle
   ============================================= */
(function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');
    let isOpen = false;

    const open = () => {
        isOpen = true;
        menu.classList.add('open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Chiudi menu');
        document.body.style.overflow = 'hidden';
        // Focus first link for a11y
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
    };

    const close = () => {
        isOpen = false;
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Apri menu');
        document.body.style.overflow = '';
        btn.focus();
    };

    btn.addEventListener('click', () => isOpen ? close() : open());

    // Close on link click
    mobileLinks.forEach(link => link.addEventListener('click', close));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) close();
    });

    // Close on outside click
    menu.addEventListener('click', (e) => {
        if (e.target === menu) close();
    });
})();


/* =============================================
   3. SMOOTH SCROLL — Internal Links
   ============================================= */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const offset = 80; // navbar height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* =============================================
   4. SCROLL REVEAL — Intersection Observer
   ============================================= */
(function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // trigger once
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    revealEls.forEach(el => {
        if (prefersReduced) {
            el.classList.add('visible'); // show immediately
        } else {
            observer.observe(el);
        }
    });
})();


/* =============================================
   5. TESTIMONIALS — Carousel Navigation
   ============================================= */
(function initTestimonialsCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('tNav-prev');
    const nextBtn = document.getElementById('tNav-next');

    if (!track || !prevBtn || !nextBtn) return;

    const CARD_WIDTH = 340 + 24; // card width + gap

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
    });

    // Keyboard navigation
    prevBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            track.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            track.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
        }
    });

    // Auto-scroll every 5 seconds (pause on hover/focus)
    let autoScroll;
    const startAuto = () => {
        autoScroll = setInterval(() => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScroll - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
            }
        }, 5000);
    };
    const stopAuto = () => clearInterval(autoScroll);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
        startAuto();
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
        track.addEventListener('focusin', stopAuto);
        track.addEventListener('focusout', startAuto);
    }
})();


/* =============================================
   6. CONTACT FORM — Validation + Submit
   ============================================= */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');

    if (!form) return;

    // Validation rules
    const rules = {
        'f-name': { required: true, minLen: 2, label: 'Nome' },
        'f-email': { required: true, email: true, label: 'Email' },
        'f-service': { required: true, label: 'Percorso di interesse' },
        'f-message': { required: true, minLen: 20, label: 'Messaggio' },
        'f-privacy': { required: true, checkbox: true, label: 'Privacy Policy' },
    };

    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const validateField = (id) => {
        const rule = rules[id];
        const el = document.getElementById(id);
        const errEl = document.getElementById(`${id}-error`);
        if (!el || !rule) return true;

        let error = '';
        const val = rule.checkbox ? undefined : el.value.trim();

        if (rule.required) {
            if (rule.checkbox && !el.checked) {
                error = 'Devi accettare la Privacy Policy per procedere.';
            } else if (!rule.checkbox && !val) {
                error = `Il campo "${rule.label}" è obbligatorio.`;
            }
        }

        if (!error && rule.email && val && !isValidEmail(val)) {
            error = 'Inserisci un indirizzo email valido.';
        }

        if (!error && rule.minLen && val && val.length < rule.minLen) {
            error = `Il campo "${rule.label}" deve contenere almeno ${rule.minLen} caratteri.`;
        }

        if (errEl) {
            errEl.textContent = error;
            errEl.style.display = error ? 'block' : 'none';
        }

        el.setAttribute('aria-invalid', error ? 'true' : 'false');

        // Visual feedback
        el.style.borderColor = error
            ? 'hsl(0,75%,50%)'
            : (val || el.checked) ? 'hsl(150,55%,45%)' : '';

        return !error;
    };

    // Live validation on blur
    Object.keys(rules).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('blur', () => validateField(id));
            el.addEventListener('input', () => {
                // clear error on input
                const errEl = document.getElementById(`${id}-error`);
                if (errEl && errEl.textContent) validateField(id);
            });
        }
    });

    // Form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const isValid = Object.keys(rules).map(id => validateField(id)).every(Boolean);

        if (!isValid) {
            // Focus first error
            const firstError = form.querySelector('[aria-invalid="true"]');
            if (firstError) firstError.focus();
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.textContent = 'Invio in corso…';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate API call (replace with real EmailJS / Formspree)
        await new Promise(resolve => setTimeout(resolve, 1200));

        /*
         * [PRODUZIONE] — Integrare con:
         *
         * Option A — Formspree:
         *   const data = new FormData(form);
         *   await fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: data, headers:{'Accept':'application/json'} });
         *
         * Option B — EmailJS:
         *   await emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
         */

        // Show success
        form.style.display = 'none';
        success.style.display = 'block';
        success.focus();

        // Google Analytics event (if GA is configured)
        if (typeof gtag === 'function') {
            gtag('event', 'form_submit', { event_category: 'contact', event_label: 'coach_contact' });
        }
    });
})();


/* =============================================
   7. FLOATING HERO CARDS — Parallax on Mouse
   ============================================= */
(function initFloatingCards() {
    const hero = document.getElementById('hero');
    const cards = document.querySelectorAll('.hero-floating-card');

    if (!hero || !cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return; // desktop only

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;

        cards.forEach((card, i) => {
            const factor = i === 0 ? 12 : -10;
            card.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        cards.forEach(card => { card.style.transform = ''; });
    });
})();


/* =============================================
   8. STATS COUNTER — Animated Numbers
   ============================================= */
(function initCounters() {
    const stats = document.querySelectorAll('.stat-num');
    if (!stats.length) return;

    const parse = (text) => {
        const match = text.match(/[\d,.]+/);
        return match ? parseFloat(match[0].replace(',', '.')) : 0;
    };

    const format = (el, num) => {
        const raw = el.getAttribute('data-target-text') || el.textContent;
        // Preserve suffix ('+', '%', etc.)
        return raw.replace(/[\d,.]+/, Math.round(num).toString());
    };

    const animateCounter = (el) => {
        const raw = el.textContent;
        el.setAttribute('data-target-text', raw);
        const target = parse(raw);
        const duration = 1500;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = format(el, eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
})();


/* =============================================
   9. SERVICE CARDS — Tilt Effect (desktop)
   ============================================= */
(function initTiltCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();


/* =============================================
   10. FOOTER YEAR — Auto-Update
   ============================================= */
(function updateYear() {
    const yearEls = document.querySelectorAll('.footer-bottom');
    const year = new Date().getFullYear();
    yearEls.forEach(el => {
        el.innerHTML = el.innerHTML.replace(/\d{4}/, year);
    });
})();


/* =============================================
   INIT LOG
   ============================================= */
console.log('%c🌸 Sofia Moretti Coach — MVP v1.0', 'color:#F472B6;font-weight:700;font-size:14px;');
console.log('%cAll modules loaded successfully.', 'color:#9CA3AF;font-size:12px;');
