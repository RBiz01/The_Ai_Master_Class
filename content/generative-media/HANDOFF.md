# HANDOFF — Generative Media: Image & Video with AI

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/generative-media/`  
Course id: `generative-media`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–7 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **All 28 lesson MP4 theme clips** are present (`modules/m01–m07/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/generative-media/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/m01-visual-literacy/
  modules/m02-style-lighting-composition/
  modules/m03-character-brand-consistency/
  modules/m04-editing-upscaling-cleanup/
  modules/m05-shortform-video-pipelines/
  modules/m06-rights-ethics-delivery/
  modules/m07-portfolio-sprint/
```

## Catalog metadata (aligned)

- Catalog duration: **"8 hours"** · lessons: **28**
- Package pacing: **~1 hour × 7 modules ≈ 7 hours** (fits catalog buffer)
- Gradient: `#ec4899` → `#f59e0b`
- Product spelling: **The Ai Master Class** (keep “Ai”)

## Trailers & video assets

- **All 28 lesson theme videos** — dark edtech motion-graphics MP4s (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames → `/usr/bin/ffmpeg`. **No Grok Imagine.**
- CLI: `--all-m01` … `--all-m07`, `--all`.
- Course/module intro trailers remain scripts-only until VO.

## Module publish checklist

### Module 1
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-visual-brief.svg`  
- [x] `assets/module-intro-video-script.md`  
- [x] `assets/example-video-script.md`  
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4`  

### Module 2
- [x] `l01`–`l04` lesson markdown  
- [x] `l01`–`l04` interactive HTML  
- [x] `assets/diagram-style-light-comp.svg`  
- [x] video scripts + `l01`–`l04` MP4s  

### Module 3
- [x] lessons + interactives + `diagram-consistency-locks.svg` + scripts + MP4s  

### Module 4
- [x] lessons + interactives + `diagram-edit-upscale-flow.svg` + scripts + MP4s  

### Module 5
- [x] lessons + interactives + `diagram-shortform-pipeline.svg` + scripts + MP4s  

### Module 6
- [x] lessons + interactives + `diagram-rights-delivery.svg` + scripts + MP4s  

### Module 7
- [x] lessons + interactives + `diagram-portfolio-sprint.svg` + scripts + MP4s  

### Course-level
- [x] `COURSE.md`  
- [x] `MANIFEST.json`  
- [x] `HANDOFF.md`  
- [x] `assets/intro-video-script.md`  
- [x] `scripts/make_lesson_video.py`  

## Voice & safety reminders

- Fictional brand **Northstar Studio** only  
- No NSFW, no celebrity likenesses, no real client data

## Republish note

- Lessons now include a learner-facing `## What to do` section (after Learning objective); republish lesson pages so learners see it.
