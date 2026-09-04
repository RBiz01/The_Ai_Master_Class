# Module 5 — Evaluating RAG quality

**Slug:** `m05-evaluating-rag-quality`  
**Course:** RAG & Knowledge Bases for Operators  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Replace vibes with faithfulness, relevance, and answer-quality checks; build a golden set; spot hallucinations; iterate without thrash.

## Why this module ships here

Shipping without eval is how handbooks get ‘quietly wrong’ for a month. Module 5 installs the brakes.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-rag-eval-loop.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-faithfulness-relevance-quality.md` | Faithfulness, relevance, and answer quality | `l01-interactive.html` |
| 2 | `lessons/l02-golden-qa-set.md` | Building a golden Q&A set from the handbook | `l02-interactive.html` |
| 3 | `lessons/l03-hallucinations-missed-retrieval.md` | Spotting hallucinations and missed retrieval | `l03-interactive.html` |
| 4 | `lessons/l04-iteration-without-thrash.md` | Iteration loops that don’t thrash | `l04-interactive.html` |

## Assets

- `assets/diagram-rag-eval-loop.svg` — Golden set → retrieve → answer → score → iterate
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — score three Acme Ops answers for faithfulness and relevance (~6 min)

## Success criteria for the learner

- Can define faithfulness vs relevance
- Can draft a tiny golden Q&A set
- Can spot hallucinated claims vs missed retrieval
- Can run an iteration loop with one change at a time

## Next module

`m06-shipping-knowledge-assistant` — next module.
