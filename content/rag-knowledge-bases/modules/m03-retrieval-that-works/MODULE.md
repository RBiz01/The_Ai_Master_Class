# Module 3 — Retrieval that finds the right passages

**Slug:** `m03-retrieval-that-works`  
**Course:** RAG & Knowledge Bases for Operators  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Make retrieval find the right handbook passages using embeddings, keyword/hybrid search, top-k, filters, reranking, and query rewriting operators can run.

## Why this module ships here

Beautiful answers on wrong passages are still wrong. Module 3 is where trust is won or lost.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-retrieval-stack.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-embeddings-similarity.md` | Embeddings & similarity search (operator view) | `l01-interactive.html` |
| 2 | `lessons/l02-keyword-vector-hybrid.md` | Keyword vs vector vs hybrid | `l02-interactive.html` |
| 3 | `lessons/l03-topk-filters-rerank.md` | Top-k, filters, and reranking | `l03-interactive.html` |
| 4 | `lessons/l04-query-rewriting.md` | Query rewriting for operators | `l04-interactive.html` |

## Assets

- `assets/diagram-retrieval-stack.svg` — Query → hybrid retrieve → filter → rerank → top-k
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — compare keyword vs vector vs hybrid on an Acme Ops escalation query (~6 min)

## Success criteria for the learner

- Can explain embeddings at operator level
- Can decide when hybrid beats pure vector
- Can set top-k and metadata filters with intent
- Can rewrite a vague operator question for retrieval

## Next module

`m04-citations-grounded-answers` — next module.
