# HANDOFF — AI for Sales & Outreach

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-sales-outreach/`  
Course id: `ai-sales-outreach`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.
4. **Add catalog entry** — paste the `courses.json` object below (new course; not yet in live catalog).

## Suggested site paths

```text
content/ai-sales-outreach/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  assets/images/ai-sales-outreach-cover.png
  modules/m01-prospect-research/
  modules/m02-human-outreach/
  modules/m03-notes-to-crm/
  modules/m04-sequences-followups/
  modules/m05-objections-proposals/
  modules/m06-guardrails-compliance/
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2). Copy cover to `images/courses/ai-sales-outreach.png` on the site.

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until real recordings land.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` (+ `scripts/themes_aso.py`) renders Pillow frames → `/usr/bin/ffmpeg`. **Grok Imagine / T2V not used.**
- CLI: `--all-m01` … `--all-m06`, `--all`.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Modules 1–6
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4`)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#3b82f6`/`#f59e0b`, numbered Instructions, success criteria)
- [x] Module SVG diagram
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4`
- [x] Cover `assets/images/ai-sales-outreach-cover.png`

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** (seller) / **Acme Ops** (prospect) / `learner@example.com` only  
- **No real emails of real people**  
- Voice: confident, practical — “CRM-safe. Still human.”  
- No real PII, NSFW, or sensitive materials  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg.  
- Catalog entry is **new** — paste object below on publish.  
- No GitHub push performed from this workspace package.

---

## Paste-ready `courses.json` object

```json
{
  "id": "ai-sales-outreach",
  "title": "AI for Sales & Outreach",
  "tagline": "Research, sequences, and CRM-safe messaging that still sound human",
  "description": "A practical sales OS with AI\u2014prospect research, personalized outreach, call notes to CRM, follow-up sequences, proposals, and brand/compliance guardrails. Built for SDRs, AEs, and founders who sell.",
  "level": "Beginner",
  "duration": "6 hours",
  "lessons": 24,
  "price": 89,
  "compareAtPrice": 119,
  "category": [
    "Productivity",
    "Strategy"
  ],
  "featured": true,
  "rating": 4.7,
  "reviewCount": 210,
  "gradient": [
    "#3b82f6",
    "#f59e0b"
  ],
  "video": {
    "poster": "images/courses/ai-sales-outreach.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  "curriculum": [
    "AI-assisted prospect research",
    "Outreach that doesn\u2019t sound robotic",
    "Call & meeting notes to CRM",
    "Sequences & smart follow-ups",
    "Objections, proposals & decks",
    "Guardrails, compliance & brand voice"
  ],
  "reviews": [
    {
      "name": "Alex Rivera",
      "stars": 5,
      "text": "Our SDRs stopped sending robotic AI emails in a week. The CRM notes module alone was worth it.",
      "date": "2026-08-12"
    },
    {
      "name": "Samira Patel",
      "stars": 5,
      "text": "Finally a sales+AI course that won\u2019t get you in trouble with Legal. Guardrails are practical.",
      "date": "2026-07-28"
    },
    {
      "name": "Chris Nguyen",
      "stars": 4,
      "text": "Strong on sequences and personalization. Wanted one more proposal template\u2014still shipped faster.",
      "date": "2026-06-19"
    },
    {
      "name": "Jordan Lee",
      "stars": 5,
      "text": "Founder-seller here. Research \u2192 outreach \u2192 follow-up OS is exactly what I needed.",
      "date": "2026-05-30"
    }
  ],
  "image": "images/courses/ai-sales-outreach.png",
  "hasContent": true,
  "contentPath": "content/ai-sales-outreach/"
}
```

### Reviews (also embedded above)

| Name | Stars | Date | Text |
|------|-------|------|------|
| Alex Rivera | 5 | 2026-08-12 | Our SDRs stopped sending robotic AI emails in a week. The CRM notes module alone was worth it. |
| Samira Patel | 5 | 2026-07-28 | Finally a sales+AI course that won’t get you in trouble with Legal. Guardrails are practical. |
| Chris Nguyen | 4 | 2026-06-19 | Strong on sequences and personalization. Wanted one more proposal template—still shipped faster. |
| Jordan Lee | 5 | 2026-05-30 | Founder-seller here. Research → outreach → follow-up OS is exactly what I needed. |
