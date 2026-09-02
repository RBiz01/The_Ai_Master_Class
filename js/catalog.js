(async () => {
  const grid = document.getElementById('catalog-grid');
  const chips = document.getElementById('category-chips');
  const search = document.getElementById('catalog-search');
  const sort = document.getElementById('catalog-sort');
  const meta = document.getElementById('results-meta');
  if (!grid) return;

  let all = [];
  let category = 'All';
  let query = '';

  try {
    const data = await FC.loadProducts();
    all = data.products;
    const cats = ['All', ...(data.categories || [])];
    chips.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" class="chip${c === 'All' ? ' active' : ''}" data-cat="${c}">${c}</button>`
      )
      .join('');
  } catch (e) {
    grid.innerHTML = '<div class="empty-state">Could not load catalog.</div>';
    return;
  }

  function render() {
    let list = all.slice();
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    const s = sort ? sort.value : 'featured';
    if (s === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (s === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (s === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));

    if (meta) meta.textContent = `${list.length} design${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length
      ? list.map((p) => FC.productCardHTML(p)).join('')
      : '<div class="empty-state">No models match your filters.</div>';
  }

  chips.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    category = btn.getAttribute('data-cat');
    chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === btn));
    render();
  });
  if (search) search.addEventListener('input', () => { query = search.value.trim(); render(); });
  if (sort) sort.addEventListener('change', render);

  const params = new URLSearchParams(location.search);
  if (params.get('cat')) {
    category = params.get('cat');
    chips.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-cat') === category);
    });
  }
  render();
})();
