# Module 4 — Actions & tools (without the chaos)

**Slug:** `m04-actions-and-tools`  
**Course:** Custom GPTs & Team Assistants  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Add light actions only when they earn complexity—safe schemas, confirmations, dry-runs, and debuggable failures—without turning the assistant into an unsupervised agent.

## Why this module ships here

Actions are where assistants become dangerous or magical. Module 4 keeps them light, reviewable, and model-agnostic.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-action-safety.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-when-actions-earn-it.md` | When actions earn their complexity | `l01-interactive.html` |
| 2 | `lessons/l02-safe-action-schemas.md` | Designing safe action schemas | `l02-interactive.html` |
| 3 | `lessons/l03-confirmations-dry-runs.md` | Confirmations, dry-runs & blast radius | `l03-interactive.html` |
| 4 | `lessons/l04-debugging-flaky-actions.md` | Debugging flaky actions | `l04-interactive.html` |

## Assets

- `assets/diagram-action-safety.svg` — Safe action loop
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — worked Acme Ops demo (~6 min)

## Success criteria for the learner

- Can decide when actions are worth it vs prompt-only
- Can sketch a minimal safe action schema for Acme Ops
- Can require confirmations and dry-runs for write paths
- Can debug a flaky action without rewriting the whole assistant

## Next module

`m05-versioning-evals`
