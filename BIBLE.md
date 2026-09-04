# The Ai Master Class — Operating Bible

This is the source of truth for how the site evolves. Read it before adding pages, courses, or integrations.

**Repo:** https://github.com/RBiz01/The_Ai_Master_Class  
**Live:** https://rbiz01.github.io/The_Ai_Master_Class/

## Mission

**The Ai Master Class** sells **digital AI learning courses only**.

We are not a 3D model shop, printable marketplace, STL/OBJ host, decor catalog, or game arcade. Do **not** reintroduce those products, UX patterns, or **Fuzzy Chainsaw** branding.

## Brand voice & visual direction

- **Name spelling:** **The Ai Master Class** (user spelling — keep “Ai”, not “AI”, in the product name).
- **Voice:** confident, practical, modern — “ships Monday morning,” not hype-bro or academic fog.
- **Visual:** dark, polished, premium edtech. Gradient orbs, soft glass, tasteful motion, course cover photos.
- **Not:** neon gaming, skeuomorphic 3D printers, marketplace clutter.
- **Fonts:** DM Sans + Space Grotesk (Google Fonts, free).
- **Stack:** static HTML/CSS/JS on GitHub Pages. No paid APIs required. Mock checkout OK.

## Site map & file layout

```
├── index.html           Cinematic homepage + course slideshow
├── courses.html         Browse / filter / search
├── course.html?id=      Detail: cover, trailer, reviews, curriculum, enroll
├── cart.html            Cart + mock enrollment checkout
├── catalog.html         Redirect → courses.html (legacy)
├── product.html         Redirect → courses.html (legacy)
├── 404.html             Brand-themed not found
├── css/styles.css
├── js/
│   ├── app.js           Shared: load courses, cart, discount, cards
│   ├── home.js          Hero slideshow + featured grid
│   ├── courses.js       Catalog filters
│   ├── course.js        Detail page
│   └── cart.js          Checkout
├── data/courses.json    Single source of course truth
├── content/index.html  Directory of published curricula
├── images/courses/      Cover images (`<id>.png`)
├── learn.html?id=       Curriculum router → content/<id>/ when published
├── content/<course-id>/ Published lesson packages (see below)
├── BIBLE.md             This file
├── README.md
└── SUMMARY.md
```

## How to add / edit a course

Edit **`data/courses.json`** (plus a cover file under `images/courses/`).

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
| `image` | relative path, e.g. `images/courses/<id>.png` — **required** for cards/hero |
| `curriculum[]` | 4–8 module titles |
| `gradient` | `[color1, color2]` fallback when no image |

After editing:

1. Validate JSON (`python3 -m json.tool data/courses.json`).
2. Confirm unique ids.
3. Confirm every review `stars` ∈ {4, 5}.
4. Confirm every course has a playable `video.src` or `video.youtubeId`.
5. Confirm every course has `image` and the file exists under `images/courses/`.
6. Spot-check `course.html?id=<id>` locally (and on Pages after deploy).

Add new category strings to the top-level `categories` array when needed.

## Review rules

- Default to **4★ or 5★** to entice — never 1–3 on listed reviews.
- Keep copy **believable**: specific workflows, mild caveats OK (“wish X were longer”).
- Avoid absurd claims (“made $1M overnight”).
- `rating` should roughly match the review set; `reviewCount` can be higher than `reviews.length` (sampled display).

## Video + image conventions

### Video trailers

- Prefer **HTML5** `<video controls playsinline>` with a hotlinkable free MP4 (`video.src`).
  - Reliable samples: Google gtv-videos-bucket sample clips.
- Alternative (consistent site-wide): YouTube privacy-enhanced embeds via `youtube-nocookie.com` + `video.youtubeId`.
- Every detail page must show a **playable** trailer with a glow play overlay when using HTML5.
- Do **not** require paid video hosting (no Mux/Vimeo Pro requirement).
- Set `video.poster` to the course cover path (same as `image`) when available; `"gradient"` is a legacy fallback only.

### Course images

- Store covers at **`images/courses/<id>.png`** (or `.jpg`).
- Set `image` (and usually `video.poster`) to that relative path in `data/courses.json`.
- Cards / hero slideshow use the photo when `course.image` exists; otherwise gradient art.
- Keep **Featured** badge on the **left**, **level** badge on the **right**.
- Course **front/detail page shows the trailer video only** (no separate cover image block). Cover still used for cards, hero slideshow, and video `poster`.
- Prefer 16:10-ish crops; keep file sizes reasonable for GitHub Pages.


## Course content packages (`content/<course-id>/`)

Course Building handoffs land as a **full mirror** under `content/<course-id>/`. Catalog metadata stays in `data/courses.json`; lesson bodies live in the content tree.

### Layout

```
content/<course-id>/
  COURSE.md              Course overview (from builders)
  HANDOFF.md             Publish instructions from Course Building
  MANIFEST.json          File inventory + module status
  outline.json           Learner outline (modules → lessons → paths)
  index.html             Dark-theme curriculum hub (Start learning)
  assets/                Course-level scripts / cover source
  modules/<module-slug>/
    MODULE.md
    lessons/<lesson>.md          Source markdown
    lessons/<lesson>.html        Rendered lesson page (Pages)
    lessons/<lXX>-interactive.html  Practice (static HTML)
    assets/*.svg                 Diagrams
    assets/*-video-script.md     Talk-over scripts (no MP4s required)
```

### How Course Building handoffs publish

1. Copy the package from `/workspace/courses/<course-id>/` → `content/<course-id>/` (full mirror).
2. Copy the cover into `images/courses/<course-id>.png`; keep `courses.json` `image` + `video.poster` on that path.
3. Generate `outline.json` + lesson HTML hub (`index.html`) if not already present.
4. Set on the course object in `data/courses.json`:
   - `hasContent`: `true`
   - `contentPath`: `"content/<course-id>/"`
5. Do **not** change `duration` / `lessons` unless Course Building explicitly resizes the catalog.
6. Keep sample trailer MP4s until real recordings exist (scripts-only is OK).
7. Commit + push `main` (no force). Wait for Pages `built`.

### Learner URLs

| Surface | URL |
|---------|-----|
| Curriculum hub | `content/<course-id>/index.html` |
| Router | `learn.html?id=<course-id>` → redirects to hub when `hasContent` |
| Lesson | `content/<course-id>/modules/<module>/lessons/<lesson>.html` |
| Practice | `…/lessons/<lXX>-interactive.html` |
| Course detail CTA | `course.html?id=<course-id>` shows **Start learning / Open curriculum** when `contentPath` or `hasContent` is set |

Relative asset paths must resolve under **`/The_Ai_Master_Class/`**.

### Content verification (add to live checklist)

```bash
BASE=https://rbiz01.github.io/The_Ai_Master_Class
CID=prompt-engineering-mastery
curl -sI "$BASE/content/$CID/index.html" | head -1
curl -sI "$BASE/content/$CID/outline.json" | head -1
# sample lesson + interactive (paths from outline.json)
curl -sI "$BASE/learn.html?id=$CID" | head -1
curl -s "$BASE/data/courses.json" | python3 -c "import sys,json; c=[x for x in json.load(sys.stdin)['courses'] if x['id']=='$CID'][0]; assert c.get('hasContent') and c.get('contentPath'); assert c['duration']=='6 hours' and c['lessons']==24"
```


### Published curricula

- `prompt-engineering-mastery` — live under `content/prompt-engineering-mastery/`
- `ai-for-work` — live under `content/ai-for-work/` (6 hours / 24 lessons)
- `ai-agents-automation` — live under `content/ai-agents-automation/` (10 hours / 32 lessons)
- `generative-media` — live under `content/generative-media/` (8 hours / 28 lessons)
- `no-code-ml-intuition` — live under `content/no-code-ml-intuition/` (6 hours / 24 lessons)
- `ai-strategy-creators` — live under `content/ai-strategy-creators/` (6 hours / 18 lessons)

## Deploy / GitHub Pages

- Source: branch `main`, folder `/ (root)`.
- No build step. Push to `main`; wait for Pages.
- Relative asset paths must work under **`/The_Ai_Master_Class/`**.
- `FC.siteRoot()` resolves the Pages base from the `js/app.js` script path — do not hardcode absolute roots in fetch/asset URLs.

### Stripe / email TODOs

- `STRIPE_PAYMENT_LINK` and `EMAIL_FORM_ENDPOINT` in `js/app.js`.
- Mock enrollment is intentional until Stripe + LMS delivery exist.
- Never commit secret keys.
- Signup `source` string: `the-ai-master-class-welcome-discount`.

## Verification checklist (before calling it “live”)

```bash
BASE=https://rbiz01.github.io/The_Ai_Master_Class
curl -sI "$BASE/" | head -1                    # 200
curl -sI "$BASE/courses.html" | head -1        # 200
curl -sI "$BASE/course.html?id=prompt-engineering-mastery" | head -1
curl -sI "$BASE/images/courses/prompt-engineering-mastery.png" | head -1
curl -s "$BASE/data/courses.json" | python3 -m json.tool >/dev/null
curl -s "$BASE/" | grep -q "The Ai Master Class"
! curl -s "$BASE/" | grep -qi "Fuzzy Chainsaw"
curl -s "$BASE/BIBLE.md" | grep -q "github.com/RBiz01/The_Ai_Master_Class"
curl -sI "$BASE/content/prompt-engineering-mastery/index.html" | head -1   # 200 when published
curl -sI "$BASE/learn.html?id=prompt-engineering-mastery" | head -1

# Parse: N courses, unique ids, reviews 4–5 only, each has video + image
# For courses with hasContent: contentPath hub returns 200; duration/lessons unchanged
```

Also:

- [ ] Homepage course count matches `courses.length`
- [ ] No nav/footer links to STL / Decor / lumen-spire / product shop UX
- [ ] Legacy `product.html` / `catalog.html` redirect to courses
- [ ] Mobile: hero slideshow usable (swipe / dots / buttons)
- [ ] `prefers-reduced-motion` does not break layout
- [ ] No Fuzzy Chainsaw branding anywhere in HTML/JS/docs

## What NOT to do

- Do **not** reintroduce a 3D model shop, STL downloads as the product, Decor catalogs, or product redirects for old models as primary UX.
- Do **not** reintroduce **Fuzzy Chainsaw** / Fuzzy Chainsaw Academy branding.
- Do **not** duplicate course `id`s.
- Do **not** add paid font/CDN/API requirements without an explicit decision.
- Do **not** force-push `main`.
- Do **not** claim “live” without the curl/JSON checklist above.
- Do **not** store Stripe secret keys in the repo.

## Cart & discount

- Cart keyed by course id in `localStorage` (`fc_cart`).
- Digital enrollment: quantity stays 1 per course.
- First-visit modal → 10% welcome discount (`fc_discount`) — wording for courses / The Ai Master Class.

---

When in doubt: **AI courses only, The Ai Master Class branding, static Pages under `/The_Ai_Master_Class/`, honest mock checkout, believable 4–5★ social proof, playable trailers + course cover images.**
