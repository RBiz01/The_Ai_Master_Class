# Module 5 — Evaluation harnesses & failure modes

**Slug:** `m05-eval-failure-modes`  
**Course:** AI Agents & Automation Bootcamp  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Taxonomize agent failures, build cheap harnesses, trace runs, and keep a regression suite that catches breaks.

## Why this module ships here

Agents fail in new ways—tool thrash, wrong stops, silent wrong actions. Eval is how you ship.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-eval-harness.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-failure-taxonomy.md` | Agent failure taxonomy | `l01-interactive.html` |
| 2 | `lessons/l02-building-eval-harnesses.md` | Building eval harnesses | `l02-interactive.html` |
| 3 | `lessons/l03-tracing-observability.md` | Tracing and observability | `l03-interactive.html` |
| 4 | `lessons/l04-regression-suites.md` | Regression suites | `l04-interactive.html` |

## Assets

- `assets/diagram-eval-harness.svg` — Cases → harness → traces → regress
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — Add harness case for Acme Ops skipped-approval bug. (~6 min)

## Success criteria for the learner

- Can name top agent failure modes
- Can outline a minimal eval harness
- Can list must-have trace fields
- Can add a regression case from a bug

## Next module

`m06-nocode-lowcode-bridges` — next module.
