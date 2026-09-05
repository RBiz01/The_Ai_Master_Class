# Module 2 — Text-to-video

**Slug:** `m02-text-to-video`  
**Course:** AI Video & Music Videos  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Generate one-shot T2V clips that match the brief, name camera moves, hold continuity across a four-clip set, and know when to regenerate instead of forcing a stitch.

## Why this module ships now

T2V is the motion engine. Module 2 teaches model-agnostic patterns (Grok Imagine is one path) so look lock and continuity survive tool switches.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-t2v-pipeline.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-one-shot-clips-that-match.md` | One-shot clips that match | `l01-interactive.html` |
| 2 | `lessons/l02-camera-moves-you-can-name.md` | Camera moves you can name | `l02-interactive.html` |
| 3 | `lessons/l03-continuity-across-four-clips.md` | Continuity across four clips | `l03-interactive.html` |
| 4 | `lessons/l04-when-to-regenerate.md` | When to regenerate | `l04-interactive.html` |

## Assets

- `assets/diagram-t2v-pipeline.svg` — Prompt → clip → continuity → regen gate
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — worked demo (~6 min)

## Success criteria for the learner

- Completes all four lesson interactives to success state  
- Can apply this module’s pattern on a Northstar Studio brief without vendor lock-in  
- Knows what to regenerate vs stitch vs export  

## Next module

`m03-presenter-narration`
