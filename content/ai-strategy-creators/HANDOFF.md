# HANDOFF — AI Strategy for Creators & Founders

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-strategy-creators/`  
Course id: `ai-strategy-creators`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1-6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts.
2. **All 18 lesson MP4 theme clips** should be present under each module's `lessons/assets/l0N-video.mp4`.
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/ai-strategy-creators/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/...
```

## Catalog metadata

Catalog lists **6 hours / 18 lessons / 6 modules**. This package matches with **3 lessons × 6 = 18**, filling ~60 min/module with longer lessons + interactives. **No catalog change needed** for lesson count/duration.

## Trailers & video assets

- Course/module intro trailers are scripts-only until final render.
- Lesson theme videos: dark edtech motion-graphics MP4s at `lessons/assets/l0N-video.mp4` (854x480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames then ffmpeg. **No Grok** T2V used.
- Product spelling: **The Ai Master Class** (keep "Ai").

## Module publish checklist

### Module 1
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-opportunity-map.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 2
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-productize-workflow.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 3
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-pricing-proof.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 4
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-content-compound.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 5
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-team-of-one.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 6
- [x] `l01-l03` lesson markdown
- [x] `l01-l03` interactive HTML
- [x] `assets/diagram-moats-longgame.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l03-video.mp4` (theme clips; Pillow+ffmpeg)

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** / **Acme Ops** / `learner@example.com` only
- Voice: confident, practical — "ships Monday morning"
- No real PII, NSFW, or sensitive materials

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only).
- No GitHub push performed from this workspace package.
