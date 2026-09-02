(async () => {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  try {
    const data = await FC.loadProducts();
    const featured = data.products.filter((p) => p.featured).slice(0, 4);
    grid.innerHTML = featured.map((p) => FC.productCardHTML(p)).join('');
  } catch (e) {
    grid.innerHTML = '<div class="empty-state">Could not load products.</div>';
    console.error(e);
  }
})();
