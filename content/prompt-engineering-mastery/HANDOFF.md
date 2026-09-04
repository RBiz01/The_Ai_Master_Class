# HANDOFF — Prompt Engineering Mastery

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/prompt-engineering-mastery/`  
Course id: `prompt-engineering-mastery`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and the Module 6 starter library.
2. **Full course content is ready for publish** — **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

Mirror this package under a future content directory, for example:

```text
content/prompt-engineering-mastery/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/m01-foundations-of-clear-instruction/
    MODULE.md
    lessons/*.md
    lessons/*-interactive.html
    assets/diagram-clear-prompt.svg
    assets/*-video-script.md
  modules/m02-roles-constraints-output-formats/
    …
  modules/m03-few-shot-exemplars/
    …
  modules/m04-chain-of-thought-decomposition/
    MODULE.md
    lessons/*.md
    lessons/*-interactive.html
    assets/diagram-decompose-flow.svg
    assets/*-video-script.md
  modules/m05-evaluation-rubrics-iteration/
    …
    assets/diagram-eval-loop.svg
  modules/m06-prompt-libraries-workflows/
    …
    assets/diagram-library-taxonomy.svg
    assets/starter-library.md
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Catalog metadata (aligned)

Live `courses.json` already lists:

- `duration`: **"6 hours"**
- `lessons`: **24**
- `curriculum`: 6 module titles matching this package

**No shrink needed.** Pacing here is **~1 hour per curriculum module** × 6 ≈ 6 hours. Keep catalog duration/lessons as-is; mark all 24 lessons available for completion tracking.

## Trailers & video assets

- Course detail page currently uses a **sample MP4** (`video.src` in `courses.json`, Google gtv sample bucket) until real trailers replace it.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` (+ `scripts/themes_m02_m06.py`) renders Pillow frames → ffmpeg. Used because **Grok text-to-video was rate-limited**; prompts remain in `assets/videos/PROMPTS.md` for optional future T2V.
- CLI: `--all-m01` … `--all-m06`, `--all-remaining` (m02–m06), `--all`.
- Course/module intro trailers still scripts-only.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML (dark theme, success criteria)  
- [x] `assets/diagram-clear-prompt.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] Course `assets/intro-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  
- [x] `scripts/make_lesson_video.py` (reusable generator)  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-roles-constraints-formats.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 3
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-exemplar-anatomy.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 4
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-decompose-flow.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 5
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-eval-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 6
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-library-taxonomy.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `assets/starter-library.md` (Monday-morning kit stub)  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- No real PII, NSFW, or sensitive materials  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only; samples on live site). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg motion-graphics (Grok T2V rate-limited).  
- No GitHub push performed from this workspace package.

## Republish note

- Lessons now include a learner-facing `## What to do` section (after Learning objective); republish lesson pages so learners see it.
