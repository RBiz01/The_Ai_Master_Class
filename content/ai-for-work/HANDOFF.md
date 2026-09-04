# HANDOFF — AI for Work: ChatGPT & Claude

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-for-work/`  
Course id: `ai-for-work`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Catalog metadata — UPDATE ON PUBLISH

Live catalog may still say:

- `duration`: **"5 hours"**
- `lessons`: **20**

**Pacing rule for this package:** **~1 hour per curriculum module** × **6 modules** ≈ **6 hours** / **24 lessons**.

**Action for site bot:** update `courses.json` (and any UI copy) to **6 hours** and **24 lessons** when publishing `ai-for-work`. Keep gradient `#3b82f6` → `#8b5cf6` and product spelling **The Ai Master Class**.

## Suggested site paths

```text
content/ai-for-work/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/m01-ai-desk-setup/
  modules/m02-writing-that-sounds-like-you/
  modules/m03-research-synthesis/
  modules/m04-meetings-notes-actions/
  modules/m05-spreadsheets-tables/
  modules/m06-privacy-policy-playbooks/
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until real recordings land.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` (+ `scripts/themes_afw.py`) renders Pillow frames → `/usr/bin/ffmpeg`. **Grok Imagine / T2V deferred** (not used).
- CLI: `--all-m01` … `--all-m06`, `--all`.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Modules 1–6
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4`)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#3b82f6`/`#8b5cf6`, numbered Instructions, success criteria)
- [x] Module SVG diagram
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4`

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- ChatGPT vs Claude comparisons OK; no real secrets  
- No real PII, NSFW, or sensitive materials  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg.  
- Catalog duration/lesson count may be stale (5h/20) — **update to 6h/24 on publish**.  
- No GitHub push performed from this workspace package.
