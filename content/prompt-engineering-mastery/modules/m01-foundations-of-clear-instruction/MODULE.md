# Module 1 — Foundations of clear instruction

**Slug:** `m01-foundations-of-clear-instruction`  
**Course:** Prompt Engineering Mastery  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Give learners a durable mental model for writing clear prompts: state the **goal**, supply the **context** the model can’t see, set **constraints**, and name the **format**. Practice spotting vague asks and rewriting them until outputs stop wandering.

## Why this module ships first

Every later technique—roles, few-shot, chain-of-thought—fails if the base instruction is mushy. Module 1 is the operating system; the rest are apps.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-clear-prompt.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-what-makes-a-prompt-clear.md` | What makes a prompt clear | `l01-interactive.html` |
| 2 | `lessons/l02-the-goal-context-constraints-frame.md` | The Goal · Context · Constraints · Format frame | `l02-interactive.html` |
| 3 | `lessons/l03-specificity-without-overfitting.md` | Specificity without overfitting | `l03-interactive.html` |
| 4 | `lessons/l04-common-failure-modes.md` | Common failure modes | `l04-interactive.html` |

## Assets

- `assets/diagram-clear-prompt.svg` — labeled Goal / Context / Constraints / Format diagram
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — live rewrite of a bad email-summary prompt (~6 min)

## Success criteria for the learner

- Can explain why vague prompts produce inconsistent answers  
- Can rewrite a fuzzy request into Goal · Context · Constraints · Format  
- Can dial specificity up without locking the model into brittle one-off wording  
- Can name the top failure modes (missing goal, hidden context, conflicting constraints, format drift)

## Next module

`m02-roles-constraints-output-formats` — roles, hard constraints, and parseable outputs.
