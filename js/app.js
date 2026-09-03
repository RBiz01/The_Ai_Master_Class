/**
 * Fuzzy Chainsaw Academy — shared utilities
 * Courses loader, cart, discount, UI helpers
 */
const FC = (() => {
  const CART_KEY = 'fc_cart';
  const DISCOUNT_KEY = 'fc_discount';
  const EMAIL_KEY = 'fc_email';
  const VISITED_KEY = 'fc_visited';
  const DISCOUNT_RATE = 0.10;

  // TODO: Replace with Formspree endpoint
  const EMAIL_FORM_ENDPOINT = 'https://formspree.io/f/TODO_REPLACE_ME';
  // TODO: Replace with real Stripe Payment Link
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/TODO_REPLACE_ME';

  let coursesCache = null;

  function siteRoot() {
    try {
      const scripts = document.querySelectorAll('script[src*="js/app.js"]');
      for (const s of scripts) {
        const src = s.getAttribute('src') || '';
        const abs = new URL(src, location.href);
        const idx = abs.pathname.lastIndexOf('/js/app.js');
        if (idx !== -1) return abs.pathname.slice(0, idx + 1);
      }
    } catch (_) { /* ignore */ }
    let path = location.pathname || '/';
    if (/\.html?$/i.test(path)) path = path.replace(/\/[^/]+$/, '/');
    else if (!path.endsWith('/')) path += '/';
    return path.endsWith('/') ? path : path + '/';
  }

  function assetUrl(rel) {
    if (!rel) return rel;
    if (/^(https?:|data:|\/)/i.test(rel)) return rel;
    return siteRoot() + String(rel).replace(/^\.\//, '');
  }

  async function loadCourses() {
    if (coursesCache) return coursesCache;
    const res = await fetch(siteRoot() + 'data/courses.json');
    if (!res.ok) throw new Error('Failed to load courses');
    coursesCache = await res.json();
    return coursesCache;
  }

  function getCourse(data, id) {
    return (data.courses || []).find((c) => c.id === id);
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function addToCart(courseId, qty = 1) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === courseId);
    if (existing) existing.qty = 1; // digital: one enrollment
    else cart.push({ id: courseId, qty: 1 });
    saveCart(cart);
    toast('Added to cart');
  }

  function setQty(courseId, qty) {
    let cart = getCart();
    if (qty <= 0) cart = cart.filter((i) => i.id !== courseId);
    else {
      const item = cart.find((i) => i.id === courseId);
      if (item) item.qty = 1;
    }
    saveCart(cart);
  }

  function removeFromCart(courseId) {
    saveCart(getCart().filter((i) => i.id !== courseId));
  }

  function clearCart() {
    saveCart([]);
  }

  function cartCount() {
    return getCart().reduce((n, i) => n + i.qty, 0);
  }

  function updateCartBadge() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(cartCount());
    });
  }

  function hasDiscount() {
    return localStorage.getItem(DISCOUNT_KEY) === '1';
  }

  function grantDiscount(email) {
    localStorage.setItem(DISCOUNT_KEY, '1');
    if (email) localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(VISITED_KEY, '1');
  }

  function getEmail() {
    return localStorage.getItem(EMAIL_KEY) || '';
  }

  function markVisited() {
    localStorage.setItem(VISITED_KEY, '1');
  }

  function shouldShowSignupModal() {
    return !localStorage.getItem(VISITED_KEY) && !hasDiscount();
  }

  function priceFor(course) {
    const base = course.price;
    if (hasDiscount()) {
      return { base, final: +(base * (1 - DISCOUNT_RATE)).toFixed(2), discounted: true };
    }
    return { base, final: base, discounted: false };
  }

  function formatMoney(n) {
    return '$' + Number(n).toFixed(2);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function starsHTML(rating, max = 5) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.4;
    let out = '<span class="stars" aria-label="' + rating + ' out of 5">';
    for (let i = 1; i <= max; i++) {
      if (i <= full) out += '<span class="star on">★</span>';
      else if (i === full + 1 && half) out += '<span class="star half">★</span>';
      else out += '<span class="star">★</span>';
    }
    out += '</span>';
    return out;
  }

  function courseArtHTML(course, w = 800, h = 450) {
    const [c1, c2] = course.gradient || ['#7c5cff', '#00e5c0'];
    const label = escapeHtml(course.title || 'Course');
    const level = escapeHtml(course.level || '');
    return `<div class="course-art" style="--g1:${c1};--g2:${c2}" role="img" aria-label="${label}">
  <div class="course-art-inner">
    <span class="course-art-level">${level}</span>
    <strong class="course-art-title">${label}</strong>
    <span class="course-art-meta">${escapeHtml(course.duration || '')} · ${course.lessons || 0} lessons</span>
  </div>
</div>`;
  }

  function courseCardHTML(course) {
    const p = priceFor(course);
    const priceHTML = p.discounted
      ? `<span class="was">${formatMoney(p.base)}</span>${formatMoney(p.final)}`
      : (course.compareAtPrice
          ? `<span class="was">${formatMoney(course.compareAtPrice)}</span>${formatMoney(p.final)}`
          : formatMoney(p.final));
    const saleBadge = p.discounted ? '<span class="badge badge-sale">10% off</span>' : '';
    const feat = course.featured ? '<span class="badge badge-feat">Featured</span>' : '';
    const href = `${siteRoot()}course.html?id=${encodeURIComponent(course.id)}`;
    const cats = Array.isArray(course.category) ? course.category.join(' · ') : (course.category || '');
    return `
<article class="course-card reveal">
  <a href="${href}" class="course-thumb">
    ${feat}
    ${courseArtHTML(course)}
  </a>
  <div class="course-body">
    <div class="course-cat">${escapeHtml(cats)}</div>
    <h3><a href="${href}">${escapeHtml(course.title)}</a></h3>
    <p class="course-tagline">${escapeHtml(course.tagline)}</p>
    <div class="course-rating">
      ${starsHTML(course.rating)}
      <span class="rating-num">${course.rating.toFixed(1)}</span>
      <span class="rating-count">(${course.reviewCount})</span>
    </div>
    <div class="course-meta">
      <div class="price">${priceHTML}</div>
      ${saleBadge}
      <button type="button" class="btn btn-secondary btn-sm" data-add="${escapeHtml(course.id)}">Enroll</button>
    </div>
  </div>
</article>`;
  }

  function toast(msg) {
    let el = document.getElementById('fc-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fc-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function initNav() {
    updateCartBadge();
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
      if (path === 'course.html' && href === 'courses.html') a.classList.add('active');
    });
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add]');
      if (btn) {
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'), 1);
      }
    });
  }

  function initReveal() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal');
    if (reduced) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function initSignupModal() {
    const backdrop = document.getElementById('signup-modal');
    if (!backdrop) return;

    if (shouldShowSignupModal()) {
      setTimeout(() => backdrop.classList.add('open'), 900);
    }

    const close = () => {
      backdrop.classList.remove('open');
      markVisited();
    };

    backdrop.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', close);
    });
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    const form = document.getElementById('signup-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (form.querySelector('[name="email"]') || {}).value || '';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast('Enter a valid email');
          return;
        }
        try {
          if (!EMAIL_FORM_ENDPOINT.includes('TODO')) {
            await fetch(EMAIL_FORM_ENDPOINT, {
              method: 'POST',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, source: 'fuzzy-chainsaw-welcome-discount' }),
            });
          } else {
            console.info('[TODO] Email signup captured locally. Set EMAIL_FORM_ENDPOINT', email);
          }
        } catch (err) {
          console.warn('Email endpoint unavailable; discount still granted locally.', err);
        }
        grantDiscount(email);
        close();
        toast('Welcome! 10% off unlocked');
        setTimeout(() => location.reload(), 600);
      });
    }
  }

  function renderSignupModalHTML() {
    return `
<div class="modal-backdrop" id="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title">
  <div class="modal">
    <button type="button" class="close-x" data-close-modal aria-label="Close">&times;</button>
    <div class="discount-badge-big">10% OFF</div>
    <h2 id="signup-title">Welcome to the Academy</h2>
    <p>Join for course drops &amp; get <strong>10% off</strong> your first enrollment. Instant — no spam.</p>
    <form id="signup-form" action="${EMAIL_FORM_ENDPOINT}" method="POST">
      <label for="signup-email" class="field-label">Email</label>
      <input id="signup-email" name="email" type="email" required placeholder="you@example.com" class="field-input" />
      <button type="submit" class="btn btn-primary btn-block">Unlock 10% off</button>
      <button type="button" class="btn btn-ghost btn-block" data-close-modal style="margin-top:0.4rem">No thanks</button>
    </form>
  </div>
</div>`;
  }

  function injectChrome() {
    if (!document.getElementById('signup-modal')) {
      document.body.insertAdjacentHTML('beforeend', renderSignupModalHTML());
    }
  }

  function boot() {
    injectChrome();
    initNav();
    initSignupModal();
    requestAnimationFrame(() => initReveal());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  return {
    siteRoot,
    assetUrl,
    loadCourses,
    getCourse,
    getCart,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    cartCount,
    updateCartBadge,
    hasDiscount,
    grantDiscount,
    getEmail,
    priceFor,
    formatMoney,
    escapeHtml,
    starsHTML,
    courseArtHTML,
    courseCardHTML,
    toast,
    initReveal,
    DISCOUNT_RATE,
    STRIPE_PAYMENT_LINK,
    EMAIL_FORM_ENDPOINT,
  };
})();
