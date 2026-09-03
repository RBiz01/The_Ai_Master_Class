/**
 * Courses browse — filter, search, sort
 */
(async function () {
  const grid = document.getElementById('courses-grid');
  const chips = document.getElementById('category-chips');
  const search = document.getElementById('course-search');
  const sort = document.getElementById('course-sort');
  const empty = document.getElementById('courses-empty');
  const countEl = document.getElementById('results-count');

  let data = null;
  let activeCat = new URLSearchParams(location.search).get('cat') || 'All';

  try {
    data = await FC.loadCourses();
  } catch (err) {
    if (grid) grid.innerHTML = '<p class="muted">Could not load courses.</p>';
    return;
  }

  const categories = ['All', ...(data.categories || [])];

  function renderChips() {
    if (!chips) return;
    chips.innerHTML = categories
      .map((c) => `<button type="button" class="chip${c === activeCat ? ' active' : ''}" data-cat="${FC.escapeHtml(c)}">${FC.escapeHtml(c)}</button>`)
      .join('');
  }

  function matches(course, q, cat) {
    if (cat && cat !== 'All') {
      const cats = Array.isArray(course.category) ? course.category : [course.category];
      if (!cats.includes(cat)) return false;
    }
    if (!q) return true;
    const hay = [course.title, course.tagline, course.description, course.level, ...(course.category || [])]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  }

  function sortCourses(list, mode) {
    const arr = list.slice();
    switch (mode) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'rating':
        return arr.sort((a, b) => b.rating - a.rating);
      case 'title':
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }
  }

  function render() {
    const q = (search?.value || '').trim().toLowerCase();
    const mode = sort?.value || 'featured';
    let list = (data.courses || []).filter((c) => matches(c, q, activeCat));
    list = sortCourses(list, mode);
    if (countEl) countEl.textContent = `${list.length} course${list.length === 1 ? '' : 's'}`;
    if (empty) empty.hidden = list.length > 0;
    if (grid) {
      grid.innerHTML = list.map((c) => FC.courseCardHTML(c)).join('');
      FC.initReveal();
    }
  }

  chips?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    renderChips();
    render();
    const url = new URL(location.href);
    if (activeCat === 'All') url.searchParams.delete('cat');
    else url.searchParams.set('cat', activeCat);
    history.replaceState(null, '', url);
  });

  search?.addEventListener('input', () => render());
  sort?.addEventListener('change', () => render());

  renderChips();
  render();
})();
