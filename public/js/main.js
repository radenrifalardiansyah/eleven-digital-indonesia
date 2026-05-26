/* ============================================================
   ELEVEN DIGITAL CREATIVE — main.js
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   1. LOADING SCREEN
   ──────────────────────────────────────────────────────────── */
(function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Hide loading screen after page load + animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
      // Trigger hero animations
      startHeroAnimations();
    }, 2200);
  });

  // Fallback: force hide after 4 seconds
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 4000);
})();

/* ────────────────────────────────────────────────────────────
   2. CUSTOM CURSOR
   ──────────────────────────────────────────────────────────── */
(function initCursor() {
  const dot     = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateOutline() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top  = outY + 'px';
    raf = requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .portfolio-item, .filter-btn, .slider-btn, .dot, input, textarea, select'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover-state'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover-state'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });
})();

/* ────────────────────────────────────────────────────────────
   3. NAVBAR — scroll behaviour + hamburger
   ──────────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!navbar) return;

  // Scroll: add .scrolled class
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link on scroll (IntersectionObserver per section)
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ────────────────────────────────────────────────────────────
   4. CANVAS PARTICLE SYSTEM (Hero background)
   ──────────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let particles = [];
  let mouseX = 0, mouseY = 0;
  const PARTICLE_COUNT = 120;
  const CONNECTION_DIST = 130;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r  = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      // White/light particles on blue hero background
      const hues = [210, 220, 0, 0, 0]; // mostly white, some light blue
      this.hue = hues[Math.floor(Math.random() * hues.length)];
      this.isWhite = Math.random() > 0.3;
    }

    update() {
      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const force = (80 - dist) / 80;
        this.vx += (dx / dist) * force * 0.6;
        this.vy += (dy / dist) * force * 0.6;
      }

      // Dampen velocity
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap edges
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.isWhite ? 'rgba(255,255,255,0.9)' : `hsl(${this.hue}, 100%, 85%)`;
      ctx.shadowColor = this.isWhite ? 'rgba(255,255,255,0.5)' : `hsl(${this.hue}, 100%, 80%)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = 'rgba(255,255,255,0.6)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }, { passive: true });

  resize();
  createParticles();
  animate();
})();

/* ────────────────────────────────────────────────────────────
   5. TYPING ANIMATION (Hero tagline)
   ──────────────────────────────────────────────────────────── */
(function initTyping() {
  const el    = document.getElementById('typingText');
  if (!el) return;

  const words = [
    'Digital',
    'Innovative',
    'Disruptive',
    'Transformative',
  ];

  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let pausing  = false;

  function type() {
    const current = words[wordIdx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = deleting ? 60 : 120;

    if (!deleting && charIdx === current.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx  = (wordIdx + 1) % words.length;
      delay    = 400;
    }

    setTimeout(type, delay);
  }

  // Start after load screen
  setTimeout(type, 2400);
})();

/* ────────────────────────────────────────────────────────────
   6. HERO ENTRANCE ANIMATIONS
   ──────────────────────────────────────────────────────────── */
function startHeroAnimations() {
  const heroItems = document.querySelectorAll('.animate-fade-up');
  heroItems.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 200);
  });
}

/* ────────────────────────────────────────────────────────────
   7. SCROLL REVEAL (IntersectionObserver)
   ──────────────────────────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

/* ────────────────────────────────────────────────────────────
   8. ANIMATED COUNTERS (Stats in Hero)
   ──────────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuad(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // Observe when hero stats section enters viewport
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  let counted = false;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(animateCounter);
    }
  }, { threshold: 0.5 });
  obs.observe(statsSection);
})();

/* ────────────────────────────────────────────────────────────
   9. SERVICE CARDS — 3D Tilt Effect
   ──────────────────────────────────────────────────────────── */
(function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  const MAX_TILT = 8; // degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * MAX_TILT;
      const tiltY  = -dx * MAX_TILT;

      card.style.transform    = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
      card.style.transition   = 'transform 0.1s ease, box-shadow 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
  });
})();

/* ────────────────────────────────────────────────────────────
   10. PORTFOLIO FILTER
   ──────────────────────────────────────────────────────────── */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

/* ────────────────────────────────────────────────────────────
   11. TESTIMONIAL SLIDER
   ──────────────────────────────────────────────────────────── */
(function initSlider() {
  const slides   = document.querySelectorAll('.testimonial-slide');
  const dots     = document.querySelectorAll('.dot');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  if (!slides.length) return;

  let current   = 0;
  let autoPlay;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoPlay() {
    autoPlay = setInterval(next, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAutoPlay(); });
  });

  // Touch / swipe support
  const wrapper = document.querySelector('.testimonials-wrapper');
  if (wrapper) {
    let startX = 0;
    wrapper.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    wrapper.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        resetAutoPlay();
      }
    }, { passive: true });
  }

  startAutoPlay();
})();

/* ────────────────────────────────────────────────────────────
   12. SATISFACTION BAR ANIMATION (Why Us section)
   ──────────────────────────────────────────────────────────── */
(function initSatisfactionBar() {
  const fill = document.querySelector('.satisfaction-fill');
  if (!fill) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      fill.classList.add('animate');
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  const card = document.querySelector('.main-card');
  if (card) obs.observe(card);
})();

/* ────────────────────────────────────────────────────────────
   13. CONTACT FORM → WhatsApp
   ──────────────────────────────────────────────────────────── */
(function initContactForm() {
  const form        = document.getElementById('contactForm');
  const previewBody = document.getElementById('msgPreviewBody');
  if (!form) return;

  const WA_NUMBER = '6287723499550';

  // Nama layanan yang ramah
  const serviceLabels = {
    'Web Development':    'Web Development',
    'Graphic Design':     'Graphic Design',
    'Mobile Applications':'Mobile Applications',
    'UI/UX Design':       'UI/UX Design',
    'Social Media':       'Social Media',
    'Digital Marketing':  'Digital Marketing',
  };

  function buildMessage() {
    const name    = (form.querySelector('#formName')?.value    || '').trim();
    const phone   = (form.querySelector('#formPhone')?.value   || '').trim();
    const service = (form.querySelector('#formService')?.value || '').trim();
    const message = (form.querySelector('#formMessage')?.value || '').trim();

    const serviceLabel = serviceLabels[service] || service;

    let msg = `Halo Eleven Digital Creative! 👋\n\n`;
    msg += `Saya ingin berkonsultasi mengenai layanan Anda.\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    if (name)         msg += `👤 Nama        : ${name}\n`;
    if (phone)        msg += `📱 No. HP      : ${phone}\n`;
    if (serviceLabel) msg += `🎯 Layanan     : ${serviceLabel}\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n\n`;
    if (message) {
      msg += `📝 Pesan:\n${message}\n\n`;
    }
    msg += `Mohon informasinya, terima kasih! 🙏`;
    return msg;
  }

  // Live preview saat user mengetik
  function updatePreview() {
    if (!previewBody) return;
    const msg = buildMessage();
    previewBody.textContent = msg;
  }

  ['#formName','#formPhone','#formService','#formMessage'].forEach(sel => {
    const el = form.querySelector(sel);
    if (el) el.addEventListener('input', updatePreview);
    if (el) el.addEventListener('change', updatePreview);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validasi field wajib
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderBottomColor = '#ef4444';
        field.addEventListener('input', () => {
          field.style.borderBottomColor = '';
        }, { once: true });
      }
    });
    if (!valid) {
      form.querySelector('[required]')?.focus();
      return;
    }

    const msg = buildMessage();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

/* ────────────────────────────────────────────────────────────
   14. SMOOTH SCROLL for anchor links
   ──────────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ────────────────────────────────────────────────────────────
   15. PARTICLE CURSOR TRAIL EFFECT
   ──────────────────────────────────────────────────────────── */
(function initCursorTrail() {
  // Skip on mobile
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const TRAIL_COUNT = 12;
  const trail = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i * 0.35}px;
      height: ${6 - i * 0.35}px;
      border-radius: 50%;
      background: rgba(79,195,247,${0.7 - i * 0.05});
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      will-change: left, top;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function updateTrail() {
    let x = mx, y = my;
    trail.forEach((t, i) => {
      t.x += (x - t.x) * (0.25 - i * 0.012);
      t.y += (y - t.y) * (0.25 - i * 0.012);
      t.el.style.left = t.x + 'px';
      t.el.style.top  = t.y + 'px';
      x = t.x;
      y = t.y;
    });
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
})();

/* ────────────────────────────────────────────────────────────
   16. PARALLAX on hero title (subtle)
   ──────────────────────────────────────────────────────────── */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity   = String(1 - y / (window.innerHeight * 0.85));
    }
  }, { passive: true });
})();

/* ────────────────────────────────────────────────────────────
   17. FLOATING CARDS subtle parallax
   ──────────────────────────────────────────────────────────── */
(function initFloatingCardParallax() {
  const cards = document.querySelectorAll('.floating-card');
  if (!cards.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    cards.forEach((card, i) => {
      const factor = (i + 1) * 8;
      card.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
})();

/* ────────────────────────────────────────────────────────────
   18. SECTION BACKGROUND GRADIENT SHIFT on scroll
   ──────────────────────────────────────────────────────────── */
(function initGradientShift() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollRatio = Math.min(window.scrollY / window.innerHeight, 1);
    const lightness   = Math.floor(scrollRatio * 10);
    hero.style.filter = `brightness(${1 - scrollRatio * 0.3})`;
  }, { passive: true });
})();

/* ────────────────────────────────────────────────────────────
   19. ACTIVE SECTION INDICATOR (progress bar at top)
   ──────────────────────────────────────────────────────────── */
(function initReadingProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #4fc3f7);
    z-index: 10001;
    width: 0%;
    transition: width 0.1s linear;
    will-change: width;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total   = document.body.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    bar.style.width = Math.min((current / total) * 100, 100) + '%';
  }, { passive: true });
})();

/* ────────────────────────────────────────────────────────────
   20. KEYBOARD ACCESSIBILITY for Slider
   ──────────────────────────────────────────────────────────── */
(function initSliderKeyboard() {
  const wrapper = document.querySelector('.testimonials-wrapper');
  if (!wrapper) return;

  wrapper.addEventListener('keydown', (e) => {
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (e.key === 'ArrowLeft'  && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
})();

/* ────────────────────────────────────────────────────────────
   21. FORM FLOATING LABEL for SELECT fix
   ──────────────────────────────────────────────────────────── */
(function fixSelectLabel() {
  const selects = document.querySelectorAll('.form-group select');
  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      if (sel.value) {
        sel.setAttribute('data-selected', 'true');
      } else {
        sel.removeAttribute('data-selected');
      }
    });
  });
})();

/* ────────────────────────────────────────────────────────────
   22. NAV LINK RIPPLE EFFECT
   ──────────────────────────────────────────────────────────── */
(function initNavRipple() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.4s linear;
        background: rgba(79,195,247,0.3);
        width: 60px;
        height: 60px;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);
    });
  });

  // Inject keyframes if not already present
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = '@keyframes rippleAnim { to { transform: scale(2); opacity: 0; } }';
    document.head.appendChild(style);
  }
})();

/* ────────────────────────────────────────────────────────────
   23. GLITCH TEXT EFFECT (logo on hover)
   ──────────────────────────────────────────────────────────── */
(function initLogoGlitch() {
  const logos = document.querySelectorAll('.logo-eleven');
  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'glitchAnim 0.4s ease';
      setTimeout(() => { logo.style.animation = ''; }, 400);
    });
  });

  if (!document.getElementById('glitchStyle')) {
    const style = document.createElement('style');
    style.id = 'glitchStyle';
    style.textContent = `
      @keyframes glitchAnim {
        0%   { text-shadow: none; }
        20%  { text-shadow: -2px 0 #4fc3f7, 2px 0 #764ba2; letter-spacing: 0.1em; }
        40%  { text-shadow: 2px 0 #667eea, -2px 0 #f5576c; }
        60%  { text-shadow: -1px 0 #4fc3f7, 1px 0 #764ba2; }
        80%  { text-shadow: 1px 0 #667eea, -1px 0 #f5576c; letter-spacing: 0.05em; }
        100% { text-shadow: none; letter-spacing: normal; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ────────────────────────────────────────────────────────────
   24. INTERSECTION OBSERVER for Why Us satisfaction bar
       (called again from CSS class approach too)
   ──────────────────────────────────────────────────────────── */
(function observeWhyUs() {
  const mainCard = document.querySelector('.main-card');
  if (!mainCard) return;

  const fill = mainCard.querySelector('.satisfaction-fill');
  if (!fill) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => { fill.style.width = '98%'; }, 300);
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  obs.observe(mainCard);
})();

/* ────────────────────────────────────────────────────────────
   25. BACK TO TOP BUTTON
   ──────────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ────────────────────────────────────────────────────────────
   26. MOBILE BOTTOM NAV — active state
   ──────────────────────────────────────────────────────────── */
(function initMobileBottomNav() {
  const items = document.querySelectorAll('.mob-nav-item');
  if (!items.length) return;

  // Smooth scroll on tap
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '60', 10);
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });

      // Close hamburger menu if open
      const ham = document.getElementById('hamburger');
      const menu = document.getElementById('navMenu');
      if (ham && menu && menu.classList.contains('open')) {
        ham.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Highlight active based on scroll
  const sections = ['home','services','portfolio','stories','contact'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        items.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ────────────────────────────────────────────────────────────
   28. READING PROGRESS BAR
   ──────────────────────────────────────────────────────────── */
(function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ────────────────────────────────────────────────────────────
   INIT LOG
   ──────────────────────────────────────────────────────────── */
console.log('%c ELEVEN digital ', 'background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; font-size: 1.2rem; font-weight: 900; padding: 8px 16px; border-radius: 4px;');
console.log('%c Premium Digital Agency — West Jakarta, Indonesia ', 'color: #4fc3f7; font-size: 0.85rem;');
