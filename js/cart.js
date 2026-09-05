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
          <p>Browse the academy and open any free course.</p>
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
          <div class="cart-price">${FC.priceRowHTML(course, { compact: true, donate: true })}</div>
        </article>`;
      })
      .join('');

    const subtotal = items.reduce((s, i) => s + i.unit, 0);
    const listTotal = items.reduce((s, i) => s + i.base, 0);
    const saved = +(listTotal - subtotal).toFixed(2);

    summaryEl.innerHTML = `
      <div class="summary-card">
        <h2>Your free courses</h2>
        <div class="summary-row"><span>Subtotal</span><span><span class="was">${FC.formatMoney(listTotal)}</span></span></div>
        <div class="summary-row total"><span>Total</span><span class="price-free">FREE</span></div>
        <p class="hint success-text">All courses are free. Optional donations keep new lessons coming.</p>
        <button type="button" class="btn btn-primary btn-block" id="mock-checkout">Start learning</button>
        <a class="btn btn-donate btn-block" id="donate-link" href="${FC.DONATE_PAYMENT_LINK}" target="_blank" rel="noopener" data-donate>Donate</a>
        <p class="fineprint">No payment required. Donate link is a placeholder until wired in <code>js/app.js</code>.</p>
      </div>`;

    document.getElementById('mock-checkout')?.addEventListener('click', completeMock);
    const donate = document.getElementById('donate-link');
    if (donate && (FC.DONATE_PAYMENT_LINK || '').includes('TODO')) {
      donate.addEventListener('click', (e) => {
        e.preventDefault();
        FC.toast('Donate link coming soon — courses are free meanwhile');
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
        <h2>You're in — free access</h2>
        <p>Placeholder access for: <strong>${names.map(FC.escapeHtml).join(', ')}</strong></p>
        <p class="fineprint">Courses are free. Optional donate supports new lessons.</p>
        <a class="btn btn-primary" href="courses.html">Browse more courses</a>
      </div>`;
    FC.toast('Ready — start learning');
  }

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    FC.removeFromCart(btn.dataset.remove);
    render();
  });

  render();
})();
