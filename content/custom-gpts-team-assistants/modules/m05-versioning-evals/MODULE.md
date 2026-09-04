# Module 5 — Versioning, evals & iteration

**Slug:** `m05-versioning-evals`  
**Course:** Custom GPTs & Team Assistants  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Treat assistants like products: version labels, tiny golden sets, regression when instructions change, and rollback playbooks.

## Why this module ships here

Without evals, every 'quick tweak' breaks someone else's workflow. Module 5 makes iteration safe.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-assistant-eval-loop.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-versioning-like-products.md` | Versioning assistants like products | `l01-interactive.html` |
| 2 | `lessons/l02-tiny-golden-set.md` | Tiny golden sets for assistants | `l02-interactive.html` |
| 3 | `lessons/l03-regression-on-change.md` | Regression when instructions change | `l03-interactive.html` |
| 4 | `lessons/l04-changelog-rollback.md` | Changelog & rollback playbooks | `l04-interactive.html` |

## Assets

- `assets/diagram-assistant-eval-loop.svg` — Assistant eval & version loop
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — worked Acme Ops demo (~6 min)

## Success criteria for the learner

- Can version an Acme Ops assistant with changelog notes
- Can build a tiny golden set of prompts + expected traits
- Can run a regression pass after instruction edits
- Can roll back using a documented playbook

## Next module

`m06-team-rollout-governance`
