# Module 2 — Tools, functions, and API wiring

**Slug:** `m02-tools-functions-api`  
**Course:** AI Agents & Automation Bootcamp  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Design tool schemas models can call reliably, wire APIs with timeouts and auth placeholders, and route the right tool at the right time.

## Why this module ships here

Agents are only as good as their tools. Bad schemas and unbounded APIs cause silent failures.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-tool-wiring.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-tool-schemas-models-call.md` | Tool schemas models can call | `l01-interactive.html` |
| 2 | `lessons/l02-function-calling-patterns.md` | Function-calling patterns | `l02-interactive.html` |
| 3 | `lessons/l03-wiring-apis-safely.md` | Wiring APIs safely | `l03-interactive.html` |
| 4 | `lessons/l04-tool-selection-routing.md` | Tool selection and routing | `l04-interactive.html` |

## Assets

- `assets/diagram-tool-wiring.svg` — Tool schema → model call → API adapter
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — Wire get_ticket + search_kb for Acme Ops with safe defaults. (~6 min)

## Success criteria for the learner

- Can write a clear tool schema with params and errors
- Can describe function-calling turn structure
- Can list safe wiring defaults (timeout, retry, auth stub)
- Can explain tool routing heuristics

## Next module

`m03-planning-memory-state` — next module.
