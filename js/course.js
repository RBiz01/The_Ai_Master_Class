/**
 * Course detail — trailer video, reviews, curriculum, enroll
 */
(async function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const root = document.getElementById('course-detail');

  if (!id) {
    if (root) root.innerHTML = '<p class="muted">Missing course id. <a href="courses.html">Browse courses</a></p>';
    return;
  }

  let data;
  try {
    data = await FC.loadCourses();
  } catch (err) {
    if (root) root.innerHTML = '<p class="muted">Could not load course.</p>';
    return;
  }

  const course = FC.getCourse(data, id);
  if (!course) {
    if (root) root.innerHTML = `<p class="muted">Course not found. <a href="courses.html">Browse courses</a></p>`;
    return;
  }

  document.title = `${course.title} · The Ai Master Class`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', course.tagline);

  const p = FC.priceFor(course);
  const priceHTML = p.discounted
    ? `<span class="was">${FC.formatMoney(p.base)}</span> ${FC.formatMoney(p.final)}`
    : (course.compareAtPrice
        ? `<span class="was">${FC.formatMoney(course.compareAtPrice)}</span> ${FC.formatMoney(p.final)}`
        : FC.formatMoney(p.final));

  const cats = Array.isArray(course.category) ? course.category : [course.category];
  const [g1, g2] = course.gradient || ['#7c5cff', '#00e5c0'];

  const video = course.video || {};
  const posterPath = (video.poster && video.poster !== 'gradient')
    ? video.poster
    : (course.image || '');
  const posterUrl = posterPath ? FC.assetUrl(posterPath) : '';
  const posterAttr = posterUrl ? ` poster="${FC.escapeHtml(posterUrl)}"` : '';

  const coverBlock = course.image
    ? `<div class="course-cover reveal">
        <img src="${FC.escapeHtml(FC.assetUrl(course.image))}" alt="${FC.escapeHtml(course.title)} cover" loading="lazy" />
      </div>`
    : '';

  const videoBlock = video.src
    ? `<div class="trailer" style="--g1:${g1};--g2:${g2}">
        <div class="trailer-frame">
          <video controls playsinline preload="metadata"${posterAttr} class="trailer-video">
            <source src="${FC.escapeHtml(video.src)}" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <button type="button" class="trailer-play" aria-label="Play trailer">
            <span class="play-glow"></span>
            <span class="play-icon">▶</span>
          </button>
        </div>
        <p class="trailer-caption">Course trailer · ${FC.escapeHtml(course.duration)} · ${course.lessons} lessons</p>
      </div>`
    : video.youtubeId
      ? `<div class="trailer" style="--g1:${g1};--g2:${g2}">
          <div class="trailer-frame ratio-16x9">
            <iframe title="Course trailer" src="https://www.youtube-nocookie.com/embed/${FC.escapeHtml(video.youtubeId)}?rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy"></iframe>
          </div>
        </div>`
      : '';

  const curriculum = (course.curriculum || [])
    .map((title, i) => `<li class="curr-item reveal"><span class="curr-num">${String(i + 1).padStart(2, '0')}</span><span>${FC.escapeHtml(title)}</span></li>`)
    .join('');

  const reviews = (course.reviews || [])
    .map(
      (r) => `<article class="review-card reveal">
      <div class="review-head">
        <strong>${FC.escapeHtml(r.name)}</strong>
        ${FC.starsHTML(r.stars)}
        <time datetime="${FC.escapeHtml(r.date)}">${FC.escapeHtml(r.date)}</time>
      </div>
      <p>${FC.escapeHtml(r.text)}</p>
    </article>`
    )
    .join('');

  const contentPath = course.contentPath || (course.hasContent ? `content/${course.id}/` : '');
  const learnHref = contentPath ? FC.assetUrl(contentPath.replace(/\/?$/, '/') + 'index.html') : '';
  const learnCTA = learnHref
    ? `<a class="btn btn-primary btn-lg" href="${FC.escapeHtml(learnHref)}">Start learning</a>
       <a class="btn btn-secondary btn-lg" href="${FC.escapeHtml(learnHref)}">Open curriculum</a>`
    : '';

  root.innerHTML = `
<nav class="breadcrumb"><a href="courses.html">Courses</a> / <span>${FC.escapeHtml(course.title)}</span></nav>
<div class="course-hero-grid">
  <div class="course-media-col">
    ${coverBlock}
    ${videoBlock}
  </div>
  <div class="course-buy-panel reveal">
    <div class="eyebrow">${cats.map(FC.escapeHtml).join(' · ')}</div>
    <h1>${FC.escapeHtml(course.title)}</h1>
    <p class="lead">${FC.escapeHtml(course.tagline)}</p>
    <div class="course-rating lg">
      ${FC.starsHTML(course.rating)}
      <span class="rating-num">${course.rating.toFixed(1)}</span>
      <span class="rating-count">${course.reviewCount} reviews</span>
    </div>
    <ul class="course-facts">
      <li><strong>${FC.escapeHtml(course.level)}</strong> level</li>
      <li><strong>${FC.escapeHtml(course.duration)}</strong></li>
      <li><strong>${course.lessons}</strong> lessons</li>
      <li><strong>Lifetime</strong> digital access</li>
    </ul>
    <div class="buy-price">${priceHTML}</div>
    <div class="buy-actions">
      ${learnCTA}
      <button type="button" class="btn btn-primary btn-lg" data-add="${FC.escapeHtml(course.id)}">Add to cart</button>
      <button type="button" class="btn btn-secondary btn-lg" id="buy-now">Enroll now</button>
    </div>
    <p class="fineprint">Mock checkout · Stripe TODO · Instant enrollment placeholder</p>
  </div>
</div>

<section class="section-block reveal">
  <h2>About this course</h2>
  <p class="prose">${FC.escapeHtml(course.description)}</p>
</section>

<section class="section-block">
  <h2>Curriculum</h2>
  ${learnHref ? `<p class="curriculum-cta"><a class="btn btn-primary" href="${FC.escapeHtml(learnHref)}">Open full curriculum &amp; lessons</a></p>` : ''}
  <ol class="curriculum">${curriculum}</ol>
</section>

<section class="section-block">
  <h2>Student reviews</h2>
  <div class="reviews-grid">${reviews}</div>
</section>
`;

  const videoEl = root.querySelector('.trailer-video');
  const playBtn = root.querySelector('.trailer-play');
  if (videoEl && playBtn) {
    const hideOverlay = () => playBtn.classList.add('is-hidden');
    playBtn.addEventListener('click', () => {
      videoEl.play();
      hideOverlay();
    });
    videoEl.addEventListener('play', hideOverlay);
    videoEl.addEventListener('pause', () => {
      if (videoEl.currentTime < 0.3) playBtn.classList.remove('is-hidden');
    });
  }

  document.getElementById('buy-now')?.addEventListener('click', () => {
    FC.addToCart(course.id, 1);
    location.href = FC.siteRoot() + 'cart.html';
  });

  FC.initReveal();
})();
