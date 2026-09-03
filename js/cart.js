/**
 * Cart + mock checkout for course enrollment
 */
(async function () {
  const listEl = document.getElementById('cart-list');
  const summaryEl = document.getElementById('cart-summary');
  const successEl = document.getElementById('checkout-success');

  let data;
  try {
    data = await FC.loadCourses();
  } catch (err) {
    if (listEl) listEl.innerHTML = '<p class="muted">Could not load courses.</p>';
    return;
  }

  function lineItems() {
    return FC.getCart()
      .map((item) => {
        const course = FC.getCourse(data, item.id);
        if (!course) return null;
        const p = FC.priceFor(course);
        return { course, qty: 1, unit: p.final, base: p.base, discounted: p.discounted };
      })
      .filter(Boolean);
  }

  function render() {
    const items = lineItems();
    if (!items.length) {
      listEl.innerHTML = `
        <div class="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Browse the academy and enroll in a course.</p>
          <a class="btn btn-primary" href="courses.html">Browse courses</a>
        </div>`;
      summaryEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = items
      .map(({ course, unit, discounted, base }) => {
        const [g1, g2] = course.gradient || ['#7c5cff', '#00e5c0'];
        return `<article class="cart-item">
          <div class="cart-thumb" style="background:linear-gradient(135deg,${g1},${g2})"></div>
          <div class="cart-info">
            <h3><a href="course.html?id=${encodeURIComponent(course.id)}">${FC.escapeHtml(course.title)}</a></h3>
            <p>${FC.escapeHtml(course.level)} · ${FC.escapeHtml(course.duration)} · Digital access</p>
            <button type="button" class="linkish" data-remove="${FC.escapeHtml(course.id)}">Remove</button>
          </div>
          <div class="cart-price">${discounted ? `<span class="was">${FC.formatMoney(base)}</span> ` : ''}${FC.formatMoney(unit)}</div>
        </article>`;
      })
      .join('');

    const subtotal = items.reduce((s, i) => s + i.unit, 0);
    const listTotal = items.reduce((s, i) => s + i.base, 0);
    const saved = +(listTotal - subtotal).toFixed(2);

    summaryEl.innerHTML = `
      <div class="summary-card">
        <h2>Enrollment summary</h2>
        <div class="summary-row"><span>Subtotal</span><span>${FC.formatMoney(subtotal)}</span></div>
        ${saved > 0 ? `<div class="summary-row accent"><span>Welcome discount (10%)</span><span>−${FC.formatMoney(saved)}</span></div>` : ''}
        ${!FC.hasDiscount() ? `<p class="hint">First-visit email signup unlocks <strong>10% off</strong>.</p>` : `<p class="hint success-text">Welcome discount applied.</p>`}
        <div class="summary-row total"><span>Total</span><span>${FC.formatMoney(subtotal)}</span></div>
        <button type="button" class="btn btn-primary btn-block" id="mock-checkout">Complete enrollment</button>
        <a class="btn btn-secondary btn-block" id="stripe-link" href="${FC.STRIPE_PAYMENT_LINK}" target="_blank" rel="noopener">Pay with Stripe (TODO)</a>
        <p class="fineprint">Mock checkout only — no real charges. Wire <code>STRIPE_PAYMENT_LINK</code> in <code>js/app.js</code>.</p>
      </div>`;

    document.getElementById('mock-checkout')?.addEventListener('click', completeMock);
    const stripe = document.getElementById('stripe-link');
    if (stripe && FC.STRIPE_PAYMENT_LINK.includes('TODO')) {
      stripe.addEventListener('click', (e) => {
        e.preventDefault();
        FC.toast('TODO: set STRIPE_PAYMENT_LINK in js/app.js');
      });
    }
  }

  function completeMock() {
    const items = lineItems();
    if (!items.length) return;
    const names = items.map((i) => i.course.title);
    FC.clearCart();
    listEl.innerHTML = '';
    summaryEl.innerHTML = '';
    successEl.style.display = 'block';
    successEl.innerHTML = `
      <div class="success-inner">
        <div class="success-icon">✓</div>
        <h2>You're enrolled (mock)</h2>
        <p>Placeholder access for: <strong>${names.map(FC.escapeHtml).join(', ')}</strong></p>
        <p class="fineprint">TODO: deliver real LMS access / magic-link email after Stripe webhook.</p>
        <a class="btn btn-primary" href="courses.html">Browse more courses</a>
      </div>`;
    FC.toast('Enrollment complete (mock)');
  }

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    FC.removeFromCart(btn.dataset.remove);
    render();
  });

  render();
})();
