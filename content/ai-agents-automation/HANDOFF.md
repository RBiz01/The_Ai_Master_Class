# HANDOFF — AI Agents & Automation Bootcamp

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-agents-automation/`  
Course id: `ai-agents-automation`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–8 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **Full course content is ready for publish** — **All 32 lesson MP4 theme clips** are present (`modules/m01–m08/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/ai-agents-automation/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/m01-mental-models-architectures/
    MODULE.md
    lessons/*.md
    lessons/*-interactive.html
    assets/diagram-agent-loop.svg
    assets/*-video-script.md
  modules/m02-tools-functions-api/
    …
  modules/m03-planning-memory-state/
    …
  modules/m04-human-in-the-loop/
    …
  modules/m05-eval-failure-modes/
    …
  modules/m06-nocode-lowcode-bridges/
    …
  modules/m07-capstone-ship-agent/
    …
  modules/m08-ops-cost-monitoring/
    …
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Catalog metadata (aligned)

Live `courses.json` should list:

- `duration`: **"10 hours"** (catalog); pacing in-package ≈ **8 hours** (~1 h × 8 modules)
- `lessons`: **32**
- `curriculum`: 8 module titles matching this package

Keep catalog duration/lessons as-is; mark all 32 lessons available for completion tracking.

## Trailers & video assets

- Course detail page may use a **sample MP4** until real trailers replace it.
- **All 32 lesson theme videos present (m01–m08)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames → ffmpeg. **No Grok** text-to-video. Accents `#06b6d4` / `#6366f1`.
- CLI: `--all-m01` … `--all-m08`, `--all`.
- Course/module intro trailers still scripts-only.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-agent-loop.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-tool-wiring.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 3
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-memory-state.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 4
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-hitl-gates.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 5
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-eval-harness.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 6
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-nocode-bridge.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 7
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-capstone-pipeline.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

### Module 8
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-ops-cost.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (theme clips; Pillow+ffmpeg)  

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- No real PII, NSFW, real API keys, or sensitive materials  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only; samples on live site). **All 32 lesson theme clips (m01–m08) are present** via Pillow+ffmpeg motion-graphics (no Grok T2V).  
- No GitHub push performed from this workspace package.
