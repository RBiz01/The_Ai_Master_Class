# HANDOFF — Custom GPTs & Team Assistants

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/custom-gpts-team-assistants/`  
Course id: `custom-gpts-team-assistants`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **Full course content is ready for publish** — **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/custom-gpts-team-assistants/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  assets/images/custom-gpts-team-assistants-cover.png
  modules/m01-anatomy-of-assistant/
    MODULE.md
    lessons/*.md
    lessons/*-interactive.html
    assets/diagram-assistant-anatomy.svg
    assets/*-video-script.md
  modules/m02-instructions-that-stick/
    …
  modules/m03-files-knowledge-boundaries/
    …
  modules/m04-actions-and-tools/
    …
  modules/m05-versioning-evals/
    …
  modules/m06-team-rollout-governance/
    …
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Catalog metadata (aligned)

- `duration`: **"6 hours"**
- `lessons`: **24**
- `price`: **99**, `compareAtPrice`: **129**
- `category`: ["Prompting", "Agents"]
- `featured`: true · `rating`: 4.8 · `reviewCount`: ~165
- `gradient`: `#a855f7` → `#06b6d4`
- `curriculum`: 6 module titles matching this package

## Paste-ready `courses.json` object

```json
{
  "id": "custom-gpts-team-assistants",
  "title": "Custom GPTs & Team Assistants",
  "tagline": "Design shareable assistants your team will actually use",
  "description": "Build custom assistants (GPTs and equivalents)—crystal instructions, files/knowledge boundaries, light actions, versioning, and rollout playbooks—so expertise scales without an engineering team.",
  "level": "Intermediate",
  "duration": "6 hours",
  "lessons": 24,
  "price": 99,
  "compareAtPrice": 129,
  "category": [
    "Prompting",
    "Agents"
  ],
  "featured": true,
  "rating": 4.8,
  "reviewCount": 165,
  "gradient": [
    "#a855f7",
    "#06b6d4"
  ],
  "video": {
    "poster": "images/courses/custom-gpts-team-assistants.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  "curriculum": [
    "Anatomy of a custom assistant",
    "Instructions that stick",
    "Files, knowledge & boundaries",
    "Actions & tools (without the chaos)",
    "Versioning, evals & iteration",
    "Team rollout & governance"
  ],
  "reviews": [
    {
      "name": "Casey Morgan",
      "stars": 5,
      "text": "We finally shipped Vendor Triage as a real team assistant—not another fragile prompt paste.",
      "date": "2026-08-19"
    },
    {
      "name": "Riley Santos",
      "stars": 5,
      "text": "The knowledge boundary module stopped our hallucinated SLA problem cold.",
      "date": "2026-07-28"
    },
    {
      "name": "Avery Quinn",
      "stars": 4,
      "text": "Practical and model-agnostic. Wanted even more on actions, but the safety framing is excellent.",
      "date": "2026-06-30"
    },
    {
      "name": "Morgan Lee",
      "stars": 5,
      "text": "Rollout playbooks + golden sets made our GPT library something people trust.",
      "date": "2026-05-22"
    }
  ],
  "image": "images/courses/custom-gpts-team-assistants.png",
  "hasContent": true,
  "contentPath": "content/custom-gpts-team-assistants/"
}
```

## Trailers & video assets

- Course detail page may use a **sample MP4** until real trailers replace them.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames → ffmpeg via `pem-venv`. **No Grok** text-to-video. Accents `#a855f7` / `#06b6d4`.
- CLI: `--all-m01` … `--all-m06`, `--all`.
- Course/module intro trailers still scripts-only.
- Product spelling: **The Ai Master Class** (keep “Ai”).
- Cover already present: `assets/images/custom-gpts-team-assistants-cover.png`

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-assistant-anatomy.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-instruction-layers.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 3
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-knowledge-boundaries.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 4
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-action-safety.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 5
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-assistant-eval-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 6
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-rollout-governance.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- No real PII, NSFW, real API keys, or sensitive materials  
- Model-agnostic patterns (Custom GPTs / Claude Projects / Gemini Gems style)

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only; samples on live site). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg motion-graphics (no Grok T2V).  
- No GitHub push performed from this workspace package.

## Republish note

- Lessons now include a learner-facing `## What to do` section (after Learning objective); republish lesson pages so learners see it.
