/**
 * Homepage — hero slideshow, featured courses, social proof
 */
(async function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  try {
    const data = await FC.loadCourses();
    const courses = data.courses || [];
    const featured = courses.filter((c) => c.featured).concat(courses).filter((c, i, a) => a.findIndex((x) => x.id === c.id) === i).slice(0, 6);

    const countEl = document.querySelector('[data-course-count]');
    if (countEl) countEl.textContent = String(courses.length);

    const grid = document.getElementById('featured-grid');
    if (grid) {
      grid.innerHTML = featured.slice(0, 6).map((c) => FC.courseCardHTML(c)).join('');
      FC.initReveal();
    }

    initSlideshow(featured);
  } catch (err) {
    console.error(err);
    const grid = document.getElementById('featured-grid');
    if (grid) grid.innerHTML = '<p class="muted">Could not load courses.</p>';
  }

  function initSlideshow(courses) {
    const root = document.getElementById('hero-slideshow');
    if (!root || !courses.length) return;

    const track = root.querySelector('[data-slides]');
    const titleEl = root.querySelector('[data-slide-title]');
    const taglineEl = root.querySelector('[data-slide-tagline]');
    const priceEl = root.querySelector('[data-slide-price]');
    const linkEl = root.querySelector('[data-slide-link]');
    const dotsEl = root.querySelector('[data-slide-dots]');
    const prevBtn = root.querySelector('[data-slide-prev]');
    const nextBtn = root.querySelector('[data-slide-next]');
    const chips = document.querySelector('[data-now-chips]');
    const strip = document.getElementById('now-showing-strip');

    let index = 0;
    let timer = null;
    const INTERVAL = 5200;

    track.innerHTML = courses
      .map((c, i) => {
        const [g1, g2] = c.gradient || ['#7c5cff', '#00e5c0'];
        const img = c.image ? FC.assetUrl(c.image) : '';
        const photo = img
          ? `<img class="hero-slide-photo" src="${FC.escapeHtml(img)}" alt="" loading="eager" decoding="async" />`
          : '<div class="hero-slide-glow"></div>';
        return `<div class="hero-slide${i === 0 ? ' is-active' : ''}${img ? ' has-photo' : ''}" data-i="${i}" style="--g1:${g1};--g2:${g2}">
          ${photo}
          <div class="hero-slide-content">
            <span class="hero-slide-level">${FC.escapeHtml(c.level)}</span>
            <span class="hero-slide-dur">${FC.escapeHtml(c.duration)} · ${c.lessons} lessons</span>
          </div>
        </div>`;
      })
      .join('');

    dotsEl.innerHTML = courses
      .map((_, i) => `<button type="button" class="hero-dot${i === 0 ? ' is-active' : ''}" role="tab" aria-label="Slide ${i + 1}" data-dot="${i}"></button>`)
      .join('');

    if (chips && strip) {
      strip.hidden = false;
      chips.innerHTML = courses
        .map((c, i) => `<button type="button" class="now-chip${i === 0 ? ' is-active' : ''}" data-chip="${i}">${FC.escapeHtml(c.title)}</button>`)
        .join('');
    }

    function go(n) {
      index = (n + courses.length) % courses.length;
      track.querySelectorAll('.hero-slide').forEach((el, i) => el.classList.toggle('is-active', i === index));
      dotsEl.querySelectorAll('.hero-dot').forEach((el, i) => el.classList.toggle('is-active', i === index));
      if (chips) chips.querySelectorAll('.now-chip').forEach((el, i) => el.classList.toggle('is-active', i === index));

      const c = courses[index];
      const href = FC.siteRoot() + 'course.html?id=' + encodeURIComponent(c.id);
      titleEl.textContent = c.title;
      titleEl.href = href;
      taglineEl.textContent = c.tagline + (c.duration ? ` · ${c.duration} · ${c.lessons} lessons` : '');
      priceEl.innerHTML = FC.priceRowHTML(c, { compact: true });
      linkEl.href = href;
      linkEl.textContent = 'View free course';
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    function start() {
      stop();
      if (reduced || courses.length < 2) return;
      timer = setInterval(next, INTERVAL);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    prevBtn?.addEventListener('click', () => { prev(); start(); });
    nextBtn?.addEventListener('click', () => { next(); start(); });
    dotsEl.addEventListener('click', (e) => {
      const d = e.target.closest('[data-dot]');
      if (!d) return;
      go(+d.dataset.dot);
      start();
    });
    chips?.addEventListener('click', (e) => {
      const d = e.target.closest('[data-chip]');
      if (!d) return;
      go(+d.dataset.chip);
      start();
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    let touchX = null;
    root.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].screenX; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); start(); }
      touchX = null;
    }, { passive: true });

    go(0);
    start();
  }
})();
