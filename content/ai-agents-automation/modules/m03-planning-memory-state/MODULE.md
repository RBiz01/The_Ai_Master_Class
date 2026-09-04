# Module 3 — Planning, memory, and state

**Slug:** `m03-planning-memory-state`  
**Course:** AI Agents & Automation Bootcamp  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Choose planning strategies, design short- and long-term memory, and keep run state explicit so agents resume safely.

## Why this module ships here

Without planning and memory discipline, agents loop, forget constraints, or burn context.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-memory-state.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-planning-strategies.md` | Planning strategies | `l01-interactive.html` |
| 2 | `lessons/l02-short-vs-long-memory.md` | Short-term vs long-term memory | `l02-interactive.html` |
| 3 | `lessons/l03-state-machines-runs.md` | State machines for agent runs | `l03-interactive.html` |
| 4 | `lessons/l04-context-compression.md` | Context windows and compression | `l04-interactive.html` |

## Assets

- `assets/diagram-memory-state.svg` — Working memory · episodic · state machine
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — Design state + memory for Acme Ops triage agent. (~6 min)

## Success criteria for the learner

- Can contrast ReAct vs plan-then-execute
- Can separate working vs long-term memory
- Can sketch a run state machine
- Can compress context without losing stop conditions

## Next module

`m04-human-in-the-loop` — next module.
