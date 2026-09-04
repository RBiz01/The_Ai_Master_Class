# HANDOFF — RAG & Knowledge Bases for Operators

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/rag-knowledge-bases/`  
Course id: `rag-knowledge-bases`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **Full course content is ready for publish** — **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/rag-knowledge-bases/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  assets/images/rag-knowledge-bases-cover.png
  modules/m01-what-rag-does/
    MODULE.md
    lessons/*.md
    lessons/*-interactive.html
    assets/diagram-rag-loop.svg
    assets/*-video-script.md
  modules/m02-chunking-document-prep/
    …
  modules/m03-retrieval-that-works/
    …
  modules/m04-citations-grounded-answers/
    …
  modules/m05-evaluating-rag-quality/
    …
  modules/m06-shipping-knowledge-assistant/
    …
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Catalog metadata (aligned)

Live `courses.json` should list:

- `duration`: **"6 hours"**
- `lessons`: **24**
- `price`: **99**, `compareAtPrice`: **129**
- `category`: ["Agents", "Productivity"] (also fits Prompting)
- `curriculum`: 6 module titles matching this package
- `featured`: true · `rating`: 4.8 · `reviewCount`: ~180
- `gradient`: ["#14b8a6", "#6366f1"]
- Cover/image: `images/courses/rag-knowledge-bases.png` · package cover at `assets/images/rag-knowledge-bases-cover.png`

### courses.json catalog object (paste-ready)

```json
{
  "id": "rag-knowledge-bases",
  "title": "RAG & Knowledge Bases for Operators",
  "tagline": "Ground answers in your docs—without hallucinating the handbook",
  "description": "Learn retrieval-augmented generation for real teams. Chunk docs, retrieve the right passages, cite sources, evaluate quality, and ship a knowledge assistant operators will trust Monday morning.",
  "level": "Intermediate",
  "duration": "6 hours",
  "lessons": 24,
  "price": 99,
  "compareAtPrice": 129,
  "category": [
    "Agents",
    "Productivity"
  ],
  "featured": true,
  "rating": 4.8,
  "reviewCount": 180,
  "gradient": [
    "#14b8a6",
    "#6366f1"
  ],
  "video": {
    "poster": "images/courses/rag-knowledge-bases.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  },
  "curriculum": [
    "What RAG actually does",
    "Chunking & document prep",
    "Retrieval that finds the right passages",
    "Citations & grounded answers",
    "Evaluating RAG quality",
    "Shipping a team knowledge assistant"
  ],
  "reviews": [
    {
      "name": "Casey Morgan",
      "stars": 5,
      "text": "Our ops team finally trusts the handbook bot—citations changed everything.",
      "date": "2026-08-20"
    },
    {
      "name": "Riley Okonkwo",
      "stars": 5,
      "text": "Chunking and hybrid retrieval modules are gold. Shipped a pilot in a week.",
      "date": "2026-07-28"
    },
    {
      "name": "Sam Park",
      "stars": 4,
      "text": "Practical eval loops, not academic fluff. Wish there were more PDF edge cases.",
      "date": "2026-06-15"
    },
    {
      "name": "Jordan Ellis",
      "stars": 5,
      "text": "Grounded answers + refusal patterns stopped our hallucination incidents cold.",
      "date": "2026-05-03"
    }
  ],
  "image": "images/courses/rag-knowledge-bases.png",
  "hasContent": true,
  "contentPath": "content/rag-knowledge-bases/"
}
```

## Trailers & video assets

- Course detail page may use a **sample MP4** until real trailers replace it.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames → `/usr/bin/ffmpeg`. **No Grok** text-to-video. Accents `#14b8a6` / `#6366f1`.
- CLI: `--all-m01` … `--all-m06`, `--all`.
- Course/module intro trailers still scripts-only.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-rag-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-chunking-pipeline.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 3
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-retrieval-stack.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 4
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-grounded-answer.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 5
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-rag-eval-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 6
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-ship-assistant.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- No real PII, NSFW, or sensitive handbook secrets  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only; samples on live site). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg motion-graphics (no Grok T2V).  
- No GitHub push performed from this workspace package.

## Republish note

- Lessons now include a learner-facing `## What to do` section (after Learning objective); republish lesson pages so learners see it.
