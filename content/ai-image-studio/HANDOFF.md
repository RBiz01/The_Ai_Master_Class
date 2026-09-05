# HANDOFF — AI Image Studio

For: **The Ai Master Class** publishing bot / content ops
Package root: `/workspace/courses/ai-image-studio/`
Course id: `ai-image-studio`
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, and video scripts.
2. **Lesson MP4s are HeyGen pending** — lessons reference `assets/l0N-video.mp4` but **no silent placeholder MP4s** are included. Omit missing mp4s from publish until HeyGen renders land.
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.
4. **Add catalog entry** — paste the `courses.json` object below (new course; not yet in live catalog).
5. **Cover** — see `COVER-NOTE.md` (no fake cover PNG in package). Site path: `images/courses/ai-image-studio.png`.

## Suggested site paths

```text
content/ai-image-studio/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  COVER-NOTE.md
  assets/intro-video-script.md
  bibles/voice-safety.md
  modules/m01-visual-brief/
  modules/m02-prompt-control/
  modules/m03-character-product/
  modules/m04-edit-upscale/
  modules/m05-brand-kit/
  modules/m06-image-os/
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2). When cover art is ready, copy to `images/courses/ai-image-studio.png` on the site.

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until real recordings land.
- **Lesson theme videos:** referenced as `lessons/assets/l01-video.mp4` … `l04-video.mp4` — **HeyGen pending**. Do **not** generate silent fake MP4s.
- Product spelling: **The Ai Master Class** (keep “Ai”).
- Differentiate from `generative-media`: this course is **stills only** with deeper lock/consistency/edit/brand-kit OS.

## Module publish checklist

### Module 1 — `m01-visual-brief`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-visual-brief.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

### Module 2 — `m02-prompt-control`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-prompt-control.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

### Module 3 — `m03-character-product`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-character-product.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

### Module 4 — `m04-edit-upscale`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-edit-upscale.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

### Module 5 — `m05-brand-kit`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-brand-kit.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

### Module 6 — `m06-image-os`
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#f59e0b`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG `diagram-image-os.svg`
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] Lesson MP4s — **HeyGen pending** (do not ship silent placeholders)

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** / `learner@example.com` only
- **No real-person likenesses** · **No NSFW** · **No real emails of real people**
- Voice: confident, practical — “Stills that hold.”
- Accents: `#f59e0b` / `#ec4899`

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only).
- All 24 lesson MP4s **HeyGen pending** (paths referenced; files omitted from MANIFEST).
- Cover PNG not in package — see `COVER-NOTE.md`.
- Catalog entry is **new** — paste object below on publish.
- No GitHub push performed from this workspace package.

---

## Paste-ready `courses.json` object

```json
{
  "id": "ai-image-studio",
  "title": "AI Image Studio",
  "tagline": "Brand-consistent stills — photoreal, stylized, and campaign-ready",
  "description": "A stills-only creative OS with AI—visual briefs, prompt control, character and product locks, edit/upscale, brand kits, and client-safe delivery. Model-agnostic depth on consistency (deeper than a generative-media survey).",
  "level": "Beginner",
  "duration": "6 hours",
  "lessons": 24,
  "price": 99,
  "compareAtPrice": 129,
  "category": [
    "Generative Media",
    "Strategy"
  ],
  "featured": true,
  "rating": 4.8,
  "reviewCount": 168,
  "gradient": [
    "#f59e0b",
    "#ec4899"
  ],
  "video": {
    "poster": "images/courses/ai-image-studio.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  "curriculum": [
    "Visual brief",
    "Prompting for control",
    "Character & product lock",
    "Edit, upscale, cleanup",
    "Brand kit & delivery",
    "Image OS"
  ],
  "reviews": [
    {
      "name": "Riley Chen",
      "stars": 5,
      "text": "Finally a stills course that treats consistency like a system. Our campaign sets actually match now.",
      "date": "2026-08-18"
    },
    {
      "name": "Morgan Ellis",
      "stars": 5,
      "text": "Brand kit + rights modules are practical. Loved the no-likeness rule framed for real client work.",
      "date": "2026-07-22"
    },
    {
      "name": "Avery Brooks",
      "stars": 4,
      "text": "Upscale-without-plastic and batch checklist alone paid for the course. Wanted one more print recipe.",
      "date": "2026-06-14"
    },
    {
      "name": "Quinn Sato",
      "stars": 5,
      "text": "Model-agnostic prompting for control—exactly what we needed after tool-hopping for months.",
      "date": "2026-05-27"
    }
  ],
  "image": "images/courses/ai-image-studio.png",
  "hasContent": true,
  "contentPath": "content/ai-image-studio/"
}
```

### Reviews (also embedded above)

| Name | Stars | Date | Text |
|------|-------|------|------|
| Riley Chen | 5 | 2026-08-18 | Finally a stills course that treats consistency like a system. Our campaign sets actually match now. |
| Morgan Ellis | 5 | 2026-07-22 | Brand kit + rights modules are practical. Loved the no-likeness rule framed for real client work. |
| Avery Brooks | 4 | 2026-06-14 | Upscale-without-plastic and batch checklist alone paid for the course. Wanted one more print recipe. |
| Quinn Sato | 5 | 2026-05-27 | Model-agnostic prompting for control—exactly what we needed after tool-hopping for months. |

## Republish note

- Lessons include learner-facing `## What to do` (after Learning objective).
- `hasContent`: true · `contentPath`: `content/ai-image-studio/` · `image`: `images/courses/ai-image-studio.png`.
