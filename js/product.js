(async () => {
  const root = document.getElementById('product-root');
  if (!root) return;

  const KNOWN_PAGES = new Set([
    'index.html',
    'product.html',
    'catalog.html',
    'cart.html',
    '404.html',
    'products',
    'fuzzy-chainsaw',
    'css',
    'js',
    'data',
    'images',
    'downloads',
  ]);

  function idFromPath() {
    const parts = location.pathname.split('/').filter(Boolean);
    if (!parts.length) return null;
    let last = parts[parts.length - 1];
    if (last === 'index.html' && parts.length >= 2) last = parts[parts.length - 2];
    if (!last || KNOWN_PAGES.has(last) || /\.html?$/i.test(last)) return null;
    return last;
  }

  const id = new URLSearchParams(location.search).get('id') || idFromPath();
  const catalogHref = `${FC.siteRoot()}catalog.html`;
  if (!id) {
    root.innerHTML = `<div class="empty-state container">No product selected. Open a model from the <a href="${catalogHref}">catalog</a>, or use a link with <code>?id=…</code>.</div>`;
    return;
  }

  let product;
  try {
    const data = await FC.loadProducts();
    product = data.products.find((p) => p.id === id);
  } catch (e) {
    root.innerHTML = `<div class="empty-state container">Failed to load product data. <a href="${catalogHref}">Back to catalog</a></div>`;
    return;
  }
  if (!product) {
    root.innerHTML = `<div class="empty-state container">Product “${id}” not found. <a href="${catalogHref}">Browse catalog</a></div>`;
    return;
  }

  document.title = `${product.name} · Fuzzy Chainsaw`;
  let qty = 1;
  const p = FC.priceFor(product);
  const priceHTML = p.discounted
    ? `<span class="was">${FC.formatMoney(p.base)}</span>${FC.formatMoney(p.final)}`
    : FC.formatMoney(p.final);

  const heroRaw = (product.images && product.images.hero) || product.image;
  const altRaw = product.images && product.images.alt;
  const hero = heroRaw ? FC.assetUrl(heroRaw) : null;
  const alt = altRaw ? FC.assetUrl(altRaw) : null;

  root.innerHTML = `
<div class="container product-detail">
  <div class="detail-gallery">
    ${(() => {
      if (!hero) return FC.placeholderSVG(product, 900, 900);
      const thumbs = alt
        ? `<div class="gallery-thumbs">
            <button type="button" class="gallery-thumb is-active" data-gallery-src="${hero}" aria-label="Show main photo">
              <img class="product-photo" src="${hero}" alt="${product.name}" />
            </button>
            <button type="button" class="gallery-thumb" data-gallery-src="${alt}" aria-label="Show alternate photo">
              <img class="product-photo" src="${alt}" alt="${product.name} alternate" />
            </button>
          </div>`
        : '';
      return `<div class="gallery-main"><img class="product-photo" id="gallery-main-img" src="${hero}" alt="${product.name}" /></div>${thumbs}`;
    })()}
  </div>
  <div class="detail-info">
    <div class="product-cat">${product.category}</div>
    <h1>${product.name}</h1>
    <div class="price" style="font-size:1.5rem;margin-bottom:0.5rem">${priceHTML}${
      p.discounted ? ' <span class="badge badge-sale">10% off</span>' : ''
    }</div>
    <p class="detail-desc">${product.description}</p>
    <dl class="spec-grid">
      <div class="spec"><dt>Formats</dt><dd>${(product.fileFormats || []).join(', ')}</dd></div>
      <div class="spec"><dt>Print time</dt><dd>${product.printTime || '—'}</dd></div>
      <div class="spec"><dt>Poly count</dt><dd>${product.polyCount || '—'}</dd></div>
      <div class="spec"><dt>License</dt><dd>Personal use*</dd></div>
    </dl>
    <div class="tag-list">${(product.tags || []).map((t) => `<span class="tag">#${t}</span>`).join('')}</div>
    <div class="qty-row">
      <span style="color:var(--text-muted);font-size:0.9rem">Qty</span>
      <div class="qty-control">
        <button type="button" id="qty-minus" aria-label="Decrease">−</button>
        <span id="qty-val">1</span>
        <button type="button" id="qty-plus" aria-label="Increase">+</button>
      </div>
    </div>
    <div class="buy-row">
      <button type="button" class="btn btn-primary" id="add-cart">Add to cart</button>
      <button type="button" class="btn btn-accent" id="buy-now">Buy now</button>
      <button type="button" class="btn btn-3d" id="view-3d" aria-label="Open 3D view">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l9 5v8l-9 5-9-5V8l9-5z"/><path d="M12 12l9-5"/><path d="M12 12v10"/><path d="M12 12L3 7"/></svg>
        3D View
      </button>
    </div>
    <p style="margin-top:1rem;font-size:0.8rem;color:var(--text-muted)">* Placeholder license — replace with your commercial terms. Digital download after checkout.</p>
  </div>
</div>`;


  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) {
    document.querySelectorAll('[data-gallery-src]').forEach((btn) => {
      btn.addEventListener('click', () => {
        mainImg.src = btn.getAttribute('data-gallery-src');
        document.querySelectorAll('.gallery-thumb').forEach((t) => t.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  }

  const syncQty = () => { document.getElementById('qty-val').textContent = String(qty); };
  document.getElementById('qty-minus').onclick = () => { qty = Math.max(1, qty - 1); syncQty(); };
  document.getElementById('qty-plus').onclick = () => { qty = Math.min(99, qty + 1); syncQty(); };
  document.getElementById('add-cart').onclick = () => FC.addToCart(product.id, qty);
  document.getElementById('buy-now').onclick = () => {
    FC.addToCart(product.id, qty);
    location.href = FC.siteRoot() + 'cart.html';
  };

  const view3dBtn = document.getElementById('view-3d');
  let modelUrl = null;
  if (product.downloads && (product.downloads.stl || product.downloads.obj)) {
    modelUrl = FC.assetUrl(product.downloads.stl || product.downloads.obj);
  }

  if (!modelUrl) {
    view3dBtn.addEventListener('click', () => FC.toast('3D preview coming soon'));
  } else {
    view3dBtn.addEventListener('click', () => {
      const open = () => {
        if (window.FCViewer && typeof FCViewer.open === 'function') {
          FCViewer.open(modelUrl, { name: product.name });
        } else {
          FC.toast('3D viewer loading…');
        }
      };
      if (window.FCViewer && typeof FCViewer.open === 'function') open();
      else {
        let n = 0;
        const t = setInterval(() => {
          n += 1;
          if (window.FCViewer && typeof FCViewer.open === 'function') {
            clearInterval(t);
            open();
          } else if (n > 40) {
            clearInterval(t);
            FC.toast('3D viewer unavailable');
          }
        }, 50);
      }
    });
  }
})();
