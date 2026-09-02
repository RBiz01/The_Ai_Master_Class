(async () => {
  const listEl = document.getElementById('cart-list');
  const summaryEl = document.getElementById('cart-summary');
  const successEl = document.getElementById('checkout-success');
  if (!listEl || !summaryEl) return;

  let data;
  try {
    data = await FC.loadProducts();
  } catch (e) {
    listEl.innerHTML = '<div class="empty-state">Could not load products.</div>';
    return;
  }

  const byId = Object.fromEntries(data.products.map((p) => [p.id, p]));

  function lineItems() {
    return FC.getCart()
      .map((item) => {
        const product = byId[item.id];
        if (!product) return null;
        const pricing = FC.priceFor(product);
        return { ...item, product, pricing, lineTotal: +(pricing.final * item.qty).toFixed(2) };
      })
      .filter(Boolean);
  }

  function totals() {
    const items = lineItems();
    const subtotalBase = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const discount = +(subtotalBase - subtotal).toFixed(2);
    return { items, subtotalBase: +subtotalBase.toFixed(2), subtotal: +subtotal.toFixed(2), discount };
  }

  function render() {
    if (successEl && successEl.style.display === 'block') return;

    const { items, subtotalBase, subtotal, discount } = totals();

    if (!items.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <p>Your cart is empty.</p>
          <p><a class="btn btn-primary" href="catalog.html" style="margin-top:1rem">Browse catalog</a></p>
        </div>`;
      summaryEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = items
      .map(
        (i) => `
      <div class="cart-item" data-id="${i.id}">
        <a class="cart-item-thumb" href="product.html?id=${encodeURIComponent(i.id)}">${FC.placeholderSVG(i.product, 200, 200)}</a>
        <div>
          <h3><a href="product.html?id=${encodeURIComponent(i.id)}">${i.product.name}</a></h3>
          <div class="muted">${i.product.category} · ${FC.formatMoney(i.pricing.final)} each</div>
          <div class="qty-control" style="margin-top:0.5rem">
            <button type="button" data-dec="${i.id}">−</button>
            <span>${i.qty}</span>
            <button type="button" data-inc="${i.id}">+</button>
          </div>
        </div>
        <div class="cart-item-actions">
          <strong>${FC.formatMoney(i.lineTotal)}</strong>
          <button type="button" class="remove-btn" data-remove="${i.id}">Remove</button>
        </div>
      </div>`
      )
      .join('');

    const discountPill = FC.hasDiscount()
      ? `<div class="discount-pill">✓ Welcome discount applied (−${Math.round(FC.DISCOUNT_RATE * 100)}%)</div>`
      : `<p style="font-size:0.85rem;color:var(--text-muted);margin:0 0 1rem">Sign up on first visit for 10% off.</p>`;

    summaryEl.innerHTML = `
      <div class="summary-card">
        <h2>Checkout</h2>
        ${discountPill}
        <div class="summary-row"><span>Subtotal</span><span>${FC.formatMoney(subtotalBase)}</span></div>
        ${
          discount > 0
            ? `<div class="summary-row"><span>Discount</span><span>−${FC.formatMoney(discount)}</span></div>`
            : ''
        }
        <div class="summary-row total"><span>Total</span><span>${FC.formatMoney(subtotal)}</span></div>

        <div class="checkout-note">
          <strong>Mock checkout</strong> — no real payment is charged.<br/>
          <!-- TODO: Replace mock flow with Stripe Payment Link / Checkout -->
          <!-- STRIPE_PAYMENT_LINK placeholder: ${FC.STRIPE_PAYMENT_LINK} -->
          <!-- Suggested: window.location = STRIPE_PAYMENT_LINK + '?prefilled_email=' + encodeURIComponent(email) -->
          <!-- Or create Checkout Session via serverless; use pk_test_ / sk_test_ env vars — never commit secrets -->
        </div>

        <form class="checkout-form" id="checkout-form">
          <label for="co-email">Email for downloads</label>
          <input id="co-email" name="email" type="email" required value="${FC.getEmail()}" placeholder="you@example.com" />
          <label for="co-name">Name</label>
          <input id="co-name" name="name" type="text" required placeholder="Alex Maker" />
          <button type="submit" class="btn btn-accent btn-block">Complete purchase</button>
          <button type="button" class="btn btn-secondary btn-block" id="stripe-placeholder" style="margin-top:0.5rem">
            Pay with Stripe (placeholder)
          </button>
        </form>
      </div>`;

    document.getElementById('checkout-form').onsubmit = (e) => {
      e.preventDefault();
      completePurchase(new FormData(e.target));
    };
    document.getElementById('stripe-placeholder').onclick = () => {
      // TODO: window.location.href = FC.STRIPE_PAYMENT_LINK;
      FC.toast('Stripe Payment Link not configured — using mock checkout');
      console.info('[TODO] Set STRIPE_PAYMENT_LINK in js/app.js', FC.STRIPE_PAYMENT_LINK);
    };
  }

  function completePurchase(fd) {
    const { items, subtotal } = totals();
    if (!items.length) return;

    // Persist a mock order receipt
    const order = {
      id: 'FC-' + Date.now().toString(36).toUpperCase(),
      email: fd.get('email'),
      name: fd.get('name'),
      total: subtotal,
      items: items.map((i) => ({ id: i.id, name: i.product.name, qty: i.qty })),
      at: new Date().toISOString(),
      mock: true,
    };
    localStorage.setItem('fc_last_order', JSON.stringify(order));
    FC.clearCart();

    listEl.style.display = 'none';
    summaryEl.style.display = 'none';
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) pageHero.style.display = 'none';

    successEl.style.display = 'block';
    successEl.innerHTML = `
      <div class="check">✓</div>
      <h2 style="font-family:var(--font-display);margin:0 0 0.5rem">You're all set</h2>
      <p style="color:var(--text-muted);margin:0">Order <strong>${order.id}</strong> · ${FC.formatMoney(order.total)}</p>
      <p style="color:var(--text-muted);font-size:0.9rem">Downloads ready (placeholder files). Replace with real STL packs after Stripe is wired.</p>
      <div class="download-list">
        ${items
          .map(
            (i) => `
          <a href="downloads/sample-pack.zip" download="${i.product.id}-pack.zip">
            <span>${i.product.name}.zip</span>
            <span style="color:var(--accent-2)">Download</span>
          </a>
          <a href="downloads/sample-model.stl" download="${i.product.id}.stl">
            <span>${i.product.name}.stl</span>
            <span style="color:var(--accent-2)">Download</span>
          </a>`
          )
          .join('')}
      </div>
      <a class="btn btn-primary" href="catalog.html">Keep browsing</a>
    `;
  }

  listEl.addEventListener('click', (e) => {
    const rem = e.target.closest('[data-remove]');
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    if (rem) FC.removeFromCart(rem.getAttribute('data-remove'));
    if (inc) {
      const id = inc.getAttribute('data-inc');
      const item = FC.getCart().find((c) => c.id === id);
      if (item) FC.setQty(id, item.qty + 1);
    }
    if (dec) {
      const id = dec.getAttribute('data-dec');
      const item = FC.getCart().find((c) => c.id === id);
      if (item) FC.setQty(id, item.qty - 1);
    }
    if (rem || inc || dec) render();
  });

  render();
})();
