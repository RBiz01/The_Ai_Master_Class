# Fuzzy Chainsaw Academy — AI Course Storefront

Polished **digital AI learning courses** marketplace — pure static HTML/CSS/JS on **GitHub Pages**.

**Live:** https://rbiz01.github.io/fuzzy-chainsaw/

Formerly a 3D printable model shop (and before that, browser games). The product is now **courses only** — prompting, workplace AI, generative media, agents, ML intuition, and founder strategy.

## Features

- **Homepage** — animated hero, mobile-friendly course slideshow, social proof
- **Course catalog** — category chips, search, sort
- **Course detail** — HTML5 trailer, stars + reviews, curriculum, enroll CTA
- **Cart** — mock enrollment checkout (Stripe Payment Link placeholder)
- **Welcome discount** — first-visit email modal unlocks **10%** (localStorage; Formspree TODO)
- **Free stack** — no paid APIs, fonts, or video hosts required

## Preview locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Prefer a local server — some browsers block `fetch()` of JSON via `file://`.

## GitHub Pages

Settings → Pages: deploy from **`main`** / **root**. After push, wait for the build, then verify:

- `/` · `/courses.html` · `/course.html?id=prompt-engineering-mastery` · `/data/courses.json`

## Add / edit courses

Edit **`data/courses.json`**. See **`BIBLE.md`** for required fields, review rules, video conventions, and the live verification checklist.

## Email signup (10% off)

Set `EMAIL_FORM_ENDPOINT` in `js/app.js` to Formspree (or similar). Until then, discount is granted locally.

## Stripe (placeholder)

Checkout is **mock**. Set `STRIPE_PAYMENT_LINK` in `js/app.js` when ready. Never commit secret keys.

## Layout

```
├── index.html courses.html course.html cart.html
├── css/styles.css
├── js/app.js home.js courses.js course.js cart.js
├── data/courses.json
├── BIBLE.md README.md SUMMARY.md
└── catalog.html / product.html  (legacy redirects → courses)
```

## License note

Course copy and UI are project placeholders. Sample trailer MP4s are hotlinked from Google’s public sample bucket for demo playback only — replace with your own trailers for production.
