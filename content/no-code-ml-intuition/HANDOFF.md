# HANDOFF — No-Code Machine Learning Intuition

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/no-code-ml-intuition/`  
Course id: `no-code-ml-intuition`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1-6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts.
2. **All 24 lesson MP4 theme clips** should be present under each module's `lessons/assets/l0N-video.mp4`.
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Suggested site paths

```text
content/no-code-ml-intuition/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/...
```

## Catalog metadata

Catalog may list **7 hours / 22 lessons / 6 modules**. This package uses pacing **~1 hour/module → 6 hours** with **4 lessons × 6 = 24 lessons**. **Recommend updating catalog to 6h / 24 lessons** (preferred). Alternative: keep 22 by making two modules 3 lessons — not used here.

## Trailers & video assets

- Course/module intro trailers are scripts-only until final render.
- Lesson theme videos: dark edtech motion-graphics MP4s at `lessons/assets/l0N-video.mp4` (854x480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` renders Pillow frames then ffmpeg. **No Grok** T2V used.
- Product spelling: **The Ai Master Class** (keep "Ai").

## Module publish checklist

### Module 1
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-model-learns.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 2
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-features-labels.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 3
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-splits.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 4
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-embeddings.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 5
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-experiment-loop.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)
### Module 6
- [x] `l01-l04` lesson markdown
- [x] `l01-l04` interactive HTML
- [x] `assets/diagram-business-metrics.svg`
- [x] `assets/module-intro-video-script.md`
- [x] `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` ... `l04-video.mp4` (theme clips; Pillow+ffmpeg)

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** / **Acme Ops** / `learner@example.com` only
- Voice: confident, practical — "ships Monday morning"
- No real PII, NSFW, or sensitive materials

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only).
- No GitHub push performed from this workspace package.
