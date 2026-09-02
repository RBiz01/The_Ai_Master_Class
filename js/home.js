(async () => {
  const INTERVAL_MS = 4500;
  const MAX_SLIDES = 8;

  const grid = document.getElementById('featured-grid');
  const root = document.getElementById('hero-slideshow');

  function hasRealArt(p) {
    return Boolean((p.images && p.images.hero) || p.image);
  }

  /** Prefer real photos, then featured, then the rest — always include photo products. */
  function pickSlideshowProducts(products) {
    const withArt = products.filter(hasRealArt);
    const featuredRest = products.filter((p) => p.featured && !hasRealArt(p));
    const rest = products.filter((p) => !p.featured && !hasRealArt(p));
    const ordered = [...withArt, ...featuredRest, ...rest];
    const seen = new Set();
    const out = [];
    for (const p of ordered) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      out.push(p);
      if (out.length >= MAX_SLIDES) break;
    }
    // Ensure Lumen Spire + Spira Bloom stay in rotation when present
    for (const id of ['lumen-spire', 'spira-bloom']) {
      if (out.some((p) => p.id === id)) continue;
      const hit = products.find((p) => p.id === id);
      if (hit) {
        if (out.length >= MAX_SLIDES) out.pop();
        out.unshift(hit);
      }
    }
    return out;
  }

  function buildSlideshow(products) {
    if (!root || !products.length) return;

    const track = root.querySelector('[data-slides]');
    const dotsEl = root.querySelector('[data-slide-dots]');
    const titleEl = root.querySelector('[data-slide-title]');
    const tagEl = root.querySelector('[data-slide-tagline]');
    const priceEl = root.querySelector('[data-slide-price]');
    const linkEl = root.querySelector('[data-slide-link]');
    const prevBtn = root.querySelector('[data-slide-prev]');
    const nextBtn = root.querySelector('[data-slide-next]');
    const strip = document.getElementById('now-showing-strip');
    const chips = strip && strip.querySelector('[data-now-chips]');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function escapeText(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    track.innerHTML = products
      .map((p, i) => {
        const href = `${FC.siteRoot()}product.html?id=${encodeURIComponent(p.id)}`;
        return `<a class="hero-slide${i === 0 ? ' is-active' : ''}" href="${href}" data-index="${i}" aria-hidden="${i === 0 ? 'false' : 'true'}">${FC.productArtHTML(p, 900, 900)}</a>`;
      })
      .join('');

    dotsEl.innerHTML = products
      .map(
        (p, i) =>
          `<button type="button" class="hero-slideshow-dot${i === 0 ? ' is-active' : ''}" role="tab" aria-label="Show ${String(p.name).replace(/"/g, '')}" aria-selected="${i === 0 ? 'true' : 'false'}" data-dot="${i}"></button>`
      )
      .join('');

    if (strip && chips) {
      strip.hidden = false;
      chips.innerHTML = products
        .map((p, i) => {
          const href = `${FC.siteRoot()}product.html?id=${encodeURIComponent(p.id)}`;
          return `<a class="now-showing-chip${i === 0 ? ' is-active' : ''}" href="${href}" data-chip="${i}">${escapeText(p.name)}</a>`;
        })
        .join('');
    }

    let index = 0;
    let timer = null;
    let paused = reduceMotion;

    function syncMeta(i) {
      const p = products[i];
      const href = `${FC.siteRoot()}product.html?id=${encodeURIComponent(p.id)}`;
      const pricing = FC.priceFor(p);
      titleEl.textContent = p.name;
      titleEl.href = href;
      tagEl.textContent = p.tagline || '';
      priceEl.innerHTML = pricing.discounted
        ? `<span class="was">${FC.formatMoney(pricing.base)}</span>${FC.formatMoney(pricing.final)}`
        : FC.formatMoney(pricing.final);
      linkEl.href = href;
      root.setAttribute('aria-label', `Featured products — ${p.name}`);
    }

    function go(i, { user } = {}) {
      const slides = track.querySelectorAll('.hero-slide');
      const dots = dotsEl.querySelectorAll('.hero-slideshow-dot');
      const n = products.length;
      index = ((i % n) + n) % n;
      slides.forEach((el, j) => {
        const on = j === index;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((el, j) => {
        const on = j === index;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (chips) {
        chips.querySelectorAll('.now-showing-chip').forEach((el, j) => {
          el.classList.toggle('is-active', j === index);
        });
      }
      syncMeta(index);
      if (user) restart();
    }

    function next() {
      go(index + 1);
    }
    function prev() {
      go(index - 1, { user: true });
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (paused || reduceMotion || products.length < 2) return;
      timer = setInterval(next, INTERVAL_MS);
    }

    function restart() {
      stop();
      start();
    }

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      go(index - 1, { user: true });
    });
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      go(index + 1, { user: true });
    });
    dotsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dot]');
      if (!btn) return;
      go(Number(btn.getAttribute('data-dot')), { user: true });
    });

    root.addEventListener('mouseenter', () => {
      paused = true;
      stop();
    });
    root.addEventListener('mouseleave', () => {
      if (!reduceMotion) {
        paused = false;
        start();
      }
    });
    root.addEventListener('focusin', () => {
      paused = true;
      stop();
    });
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget) && !reduceMotion) {
        paused = false;
        start();
      }
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1, { user: true });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + 1, { user: true });
      }
    });
    if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '0');

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (!paused) start();
    });

    syncMeta(0);
    start();
  }

  try {
    const data = await FC.loadProducts();
    const products = data.products || [];

    if (grid) {
      const featured = products.filter((p) => p.featured).slice(0, 4);
      grid.innerHTML = featured.map((p) => FC.productCardHTML(p)).join('');
    }

    buildSlideshow(pickSlideshowProducts(products));
  } catch (e) {
    if (grid) grid.innerHTML = '<div class="empty-state">Could not load products.</div>';
    console.error(e);
  }
})();
