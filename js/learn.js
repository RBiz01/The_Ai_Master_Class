/**
 * Learn hub router — redirects to content/<id>/ when published.
 */
(async function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const root = document.getElementById('learn-root');

  if (!id) {
    if (root) {
      root.innerHTML = `<p class="muted">Pick a course to learn. <a href="courses.html">Browse courses</a></p>`;
    }
    return;
  }

  let data;
  try {
    data = await FC.loadCourses();
  } catch {
    if (root) root.innerHTML = '<p class="muted">Could not load courses.</p>';
    return;
  }

  const course = FC.getCourse(data, id);
  if (!course) {
    if (root) root.innerHTML = `<p class="muted">Course not found. <a href="courses.html">Browse courses</a></p>`;
    return;
  }

  const contentPath = course.contentPath || (course.hasContent ? `content/${course.id}/` : '');
  if (contentPath) {
    const href = FC.assetUrl(contentPath.replace(/\/?$/, '/') + 'index.html');
    location.replace(href);
    return;
  }

  document.title = `Learn · ${course.title} · The Ai Master Class`;
  if (root) {
    root.innerHTML = `
      <nav class="breadcrumb"><a href="courses.html">Courses</a> / <a href="course.html?id=${FC.escapeHtml(course.id)}">${FC.escapeHtml(course.title)}</a> / <span>Learn</span></nav>
      <h1>Curriculum coming soon</h1>
      <p class="prose">Lessons for <strong>${FC.escapeHtml(course.title)}</strong> are not published yet. You can still enroll from the course page.</p>
      <p><a class="btn btn-primary" href="course.html?id=${FC.escapeHtml(course.id)}">Back to course</a></p>
    `;
  }
})();
