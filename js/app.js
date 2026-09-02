/**
 * Fuzzy Chainsaw — shared app utilities
 * Cart, discount, products loader, UI helpers
 */

const FC = (() => {
  const CART_KEY = 'fc_cart';
  const DISCOUNT_KEY = 'fc_discount';
  const EMAIL_KEY = 'fc_email';
  const VISITED_KEY = 'fc_visited';
  const DISCOUNT_RATE = 0.10;

  // TODO: Replace with your Formspree endpoint, e.g. https://formspree.io/f/xxxxxxxx
  // or Netlify Forms (add data-netlify="true" on the form).
  const EMAIL_FORM_ENDPOINT = 'https://formspree.io/f/TODO_REPLACE_ME';

  // TODO: Replace with real Stripe Payment Link or Checkout Session URL.
  // Example Payment Link: https://buy.stripe.com/test_xxxxx
  // Or use Stripe Checkout via a serverless function — see README.
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/TODO_REPLACE_ME';
  // Optional env-style placeholders for future build tooling:
  // const STRIPE_PUBLISHABLE_KEY = 'pk_test_TODO';
  // const STRIPE_PRICE_MAP = { /* productId: 'price_xxx' */ };

  let productsCache = null;

  async function loadProducts() {
    if (productsCache) return productsCache;
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('Failed to load products');
    productsCache = await res.json();
    return productsCache;
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

  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty });
    saveCart(cart);
    toast('Added to cart');
  }

  function setQty(productId, qty) {
    let cart = getCart();
    if (qty <= 0) cart = cart.filter((i) => i.id !== productId);
    else {
      const item = cart.find((i) => i.id === productId);
      if (item) item.qty = qty;
    }
    saveCart(cart);
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((i) => i.id !== productId));
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

  function priceFor(product) {
    const base = product.price;
    if (hasDiscount()) {
      return { base, final: +(base * (1 - DISCOUNT_RATE)).toFixed(2), discounted: true };
    }
    return { base, final: base, discounted: false };
  }

  function formatMoney(n) {
    return '$' + Number(n).toFixed(2);
  }

  function placeholderSVG(product, w = 800, h = 600) {
    const [c1, c2] = product.gradient || ['#7c5cff', '#00e5c0'];
    const label = (product.name || 'Model').replace(/[<>&"]/g, '');
    const initials = label.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    return `<svg class="placeholder-art" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g-${product.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="grid-${product.id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g-${product.id})"/>
  <rect width="100%" height="100%" fill="url(#grid-${product.id})"/>
  <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.18}" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <polygon points="${w * 0.5},${h * 0.28} ${w * 0.62},${h * 0.5} ${w * 0.38},${h * 0.5}" fill="rgba(255,255,255,0.55)"/>
  <text x="50%" y="${h * 0.78}" text-anchor="middle" fill="rgba(255,255,255,0.95)" font-family="system-ui,sans-serif" font-size="${Math.max(18, w / 22)}" font-weight="700">${escapeXml(label)}</text>
  <text x="50%" y="${h * 0.86}" text-anchor="middle" fill="rgba(255,255,255,0.65)" font-family="system-ui,sans-serif" font-size="${Math.max(12, w / 40)}">${escapeXml(product.category || '')} · 3D Printable</text>
</svg>`;
  }


  function productArtHTML(product, w = 800, h = 600) {
    const src = (product.images && product.images.hero) || product.image;
    if (src) {
      const label = escapeXml(product.name || 'Model');
      return `<img class="product-photo" src="${escapeXml(src)}" alt="${label}" width="${w}" height="${h}" loading="lazy" />`;
    }
    return placeholderSVG(product, w, h);
  }

  function escapeXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function productCardHTML(product) {
    const p = priceFor(product);
    const priceHTML = p.discounted
      ? `<span class="was">${formatMoney(p.base)}</span>${formatMoney(p.final)}`
      : formatMoney(p.final);
    const saleBadge = p.discounted ? '<span class="badge badge-sale">10% off</span>' : '';
    const feat = product.featured ? '<span class="badge badge-feat">Featured</span>' : '';
    return `
<article class="product-card">
  <a href="product.html?id=${encodeURIComponent(product.id)}" class="product-thumb">
    ${feat}
    ${productArtHTML(product)}
  </a>
  <div class="product-body">
    <div class="product-cat">${escapeXml(product.category)}</div>
    <h3><a href="product.html?id=${encodeURIComponent(product.id)}">${escapeXml(product.name)}</a></h3>
    <p class="product-tagline">${escapeXml(product.tagline)}</p>
    <div class="product-meta">
      <div class="price">${priceHTML}</div>
      ${saleBadge}
      <button type="button" class="btn btn-secondary" data-add="${escapeXml(product.id)}" style="padding:0.45rem 0.85rem;font-size:0.85rem">Add</button>
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

  function initSignupModal() {
    const backdrop = document.getElementById('signup-modal');
    if (!backdrop) return;

    if (shouldShowSignupModal()) {
      setTimeout(() => backdrop.classList.add('open'), 800);
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

        // Attempt Formspree/placeholder POST — fails silently if TODO endpoint
        try {
          // TODO: Wire real Formspree / Netlify Forms endpoint
          if (!EMAIL_FORM_ENDPOINT.includes('TODO')) {
            await fetch(EMAIL_FORM_ENDPOINT, {
              method: 'POST',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, source: 'fuzzy-chainsaw-welcome-discount' }),
            });
          } else {
            console.info('[TODO] Email signup captured locally. Set EMAIL_FORM_ENDPOINT in js/app.js', email);
          }
        } catch (err) {
          console.warn('Email endpoint unavailable; discount still granted locally.', err);
        }

        grantDiscount(email);
        close();
        toast('Welcome! 10% off unlocked');
        // Refresh prices on current page if cards already rendered
        document.dispatchEvent(new CustomEvent('fc:discount'));
        // Soft reload product prices by re-rendering if page hooks listen
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
    <h2 id="signup-title">Welcome to Fuzzy Chainsaw</h2>
    <p>Join the list for printable drops &amp; get <strong>10% off</strong> your first digital download. Instant — no spam.</p>
    <!--
      TODO: Wire Formspree: set action to https://formspree.io/f/YOUR_ID and method="POST"
      TODO: Or Netlify Forms: add data-netlify="true" name="welcome-signup" and a hidden form-name input
    -->
    <form id="signup-form" action="${EMAIL_FORM_ENDPOINT}" method="POST">
      <label for="signup-email" style="display:block;font-size:0.8rem;color:var(--text-muted);margin-bottom:0.3rem">Email</label>
      <input id="signup-email" name="email" type="email" required placeholder="you@example.com"
        style="width:100%;padding:0.7rem 0.9rem;margin-bottom:1rem;border-radius:10px;border:1px solid var(--border-strong);background:var(--bg-elevated);color:var(--text);outline:none" />
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  return {
    loadProducts,
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
    placeholderSVG,
    productArtHTML,
    productCardHTML,
    toast,
    DISCOUNT_RATE,
    STRIPE_PAYMENT_LINK,
    EMAIL_FORM_ENDPOINT,
  };
})();
