# Fuzzy Chainsaw Academy — Operating Bible

This is the source of truth for how the site evolves. Read it before adding pages, courses, or integrations.

## Mission

**Fuzzy Chainsaw Academy** sells **digital AI learning courses only**.

We are not a 3D model shop, printable marketplace, STL/OBJ host, decor catalog, or game arcade. Do not reintroduce those products or UX patterns.

## Brand voice & visual direction

- **Voice:** confident, practical, modern — “ships Monday morning,” not hype-bro or academic fog.
- **Visual:** dark, polished, premium edtech. Gradient orbs, soft glass, tasteful motion.
- **Not:** neon gaming, skeuomorphic 3D printers, marketplace clutter.
- **Fonts:** DM Sans + Space Grotesk (Google Fonts, free).
- **Stack:** static HTML/CSS/JS on GitHub Pages. No paid APIs required. Mock checkout OK.

## Site map & file layout

```
├── index.html           Cinematic homepage + course slideshow
├── courses.html         Browse / filter / search
├── course.html?id=      Detail: trailer, reviews, curriculum, enroll
├── cart.html            Cart + mock enrollment checkout
├── catalog.html         Redirect → courses.html (legacy)
├── product.html         Redirect → courses.html (legacy)
├── 404.html             Academy-themed not found
├── css/styles.css
├── js/
│   ├── app.js           Shared: load courses, cart, discount, cards
│   ├── home.js          Hero slideshow + featured grid
│   ├── courses.js       Catalog filters
│   ├── course.js        Detail page
│   └── cart.js          Checkout
├── data/courses.json    Single source of course truth
├── BIBLE.md             This file
├── README.md
└── SUMMARY.md
```

Live URL: `https://rbiz01.github.io/fuzzy-chainsaw/`

## How to add / edit a course

Edit **`data/courses.json`** only (plus optional UI copy elsewhere).

Each course object must include:

| Field | Notes |
|-------|--------|
| `id` | Unique kebab-case slug. **Never duplicate.** |
| `title`, `tagline`, `description` | Clear and enticing |
| `level` | `Beginner` \| `Intermediate` \| `Advanced` |
| `duration` | e.g. `"6 hours"` |
| `lessons` | integer |
| `price` | number (USD) |
| `compareAtPrice` | optional strikethrough |
| `category` | array of tags from top-level `categories` |
| `featured` | boolean (homepage carousel/grid) |
| `rating` | average **4.0–5.0** |
| `reviewCount` | integer |
| `reviews[]` | 3–5 items: `name`, `stars` (**4 or 5 only**), `text`, `date` |
| `video` | `{ poster, src }` and/or `{ youtubeId }` — **required** |
| `curriculum[]` | 4–8 module titles |
| `gradient` | `[color1, color2]` for cards / posters |

After editing:

1. Validate JSON (`python3 -m json.tool data/courses.json`).
2. Confirm unique ids.
3. Confirm every review `stars` ∈ {4, 5}.
4. Confirm every course has a playable `video.src` or `video.youtubeId`.
5. Spot-check `course.html?id=<id>` locally.

Add new category strings to the top-level `categories` array when needed.

## Review rules

- Default to **4★ or 5★** to entice — never 1–3 on listed reviews.
- Keep copy **believable**: specific workflows, mild caveats OK (“wish X were longer”).
- Avoid absurd claims (“made $1M overnight”).
- `rating` should roughly match the review set; `reviewCount` can be higher than `reviews.length` (sampled display).

## Video trailer conventions

- Prefer **HTML5** `<video controls playsinline>` with a hotlinkable free MP4 (`video.src`).
  - Reliable samples: Google gtv-videos-bucket sample clips.
- Alternative (consistent site-wide): YouTube privacy-enhanced embeds via `youtube-nocookie.com` + `video.youtubeId`.
- Every detail page must show a **playable** trailer with a glow play overlay when using HTML5.
- Do **not** require paid video hosting (no Mux/Vimeo Pro requirement).
- `poster: "gradient"` means use course gradient art; optional image path later.

## Deploy / GitHub Pages

- Source: branch `main`, folder `/ (root)`.
- No build step. Push to `main`; wait for Pages.
- Relative asset paths must work under `/fuzzy-chainsaw/`.
- `FC.siteRoot()` resolves the Pages base from `js/app.js` location.

### Stripe / email TODOs

- `STRIPE_PAYMENT_LINK` and `EMAIL_FORM_ENDPOINT` in `js/app.js`.
- Mock enrollment is intentional until Stripe + LMS delivery exist.
- Never commit secret keys.

## Verification checklist (before calling it “live”)

```bash
BASE=https://rbiz01.github.io/fuzzy-chainsaw
curl -sI "$BASE/" | head -1                    # 200
curl -sI "$BASE/courses.html" | head -1        # 200
curl -sI "$BASE/course.html?id=<first-id>" | head -1
curl -s "$BASE/data/courses.json" | python3 -m json.tool >/dev/null

# Parse: N courses, unique ids, reviews 4–5 only, each has video
```

Also:

- [ ] Homepage course count matches `courses.length`
- [ ] No nav/footer links to STL / Decor / lumen-spire / product shop UX
- [ ] Legacy `product.html` / `catalog.html` redirect to courses
- [ ] Mobile: hero slideshow usable (swipe / dots / buttons)
- [ ] `prefers-reduced-motion` does not break layout

## What NOT to do

- Do **not** reintroduce a 3D model shop, STL downloads as the product, Decor catalogs, or product redirects for old models as primary UX.
- Do **not** duplicate course `id`s.
- Do **not** add paid font/CDN/API requirements without an explicit decision.
- Do **not** force-push `main`.
- Do **not** claim “live” without the curl/JSON checklist above.
- Do **not** store Stripe secret keys in the repo.

## Cart & discount

- Cart keyed by course id in `localStorage` (`fc_cart`).
- Digital enrollment: quantity stays 1 per course.
- First-visit modal → 10% welcome discount (`fc_discount`) — reworded for courses.

---

When in doubt: **AI courses only, static Pages, honest mock checkout, believable 4–5★ social proof, playable trailers.**
