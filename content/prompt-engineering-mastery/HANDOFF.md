# HANDOFF — Prompt Engineering Mastery

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/prompt-engineering-mastery/`  
Course id: `prompt-engineering-mastery`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and the Module 6 starter library.
2. **Full course content is ready for publish** — still **scripts-only for MP4s** (no final recordings in this package).
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
- This package provides **talk-over scripts + shot lists only** (course intro, module intros, example demos). Record/replace sample MP4s later; keep posters/gradients in the meantime.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML (dark theme, success criteria)  
- [x] `assets/diagram-clear-prompt.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] Course `assets/intro-video-script.md`  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-roles-constraints-formats.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  

### Module 3
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-exemplar-anatomy.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  

### Module 4
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-decompose-flow.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  

### Module 5
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-eval-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  

### Module 6
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-library-taxonomy.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `assets/starter-library.md` (Monday-morning kit stub)

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- No real PII, NSFW, or sensitive materials  

## Blockers

- Real MP4 trailers not in this package (scripts only; samples on live site).  
- No GitHub push performed from this workspace package.
