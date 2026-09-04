# Module 1 — What RAG actually does

**Slug:** `m01-what-rag-does`  
**Course:** RAG & Knowledge Bases for Operators  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Give learners a durable mental model for retrieval-augmented generation: retrieve relevant passages, stuff them into context, generate grounded answers—and know when RAG beats fine-tuning or raw long context.

## Why this module ships here

Teams jump into vector DBs without knowing what problem RAG solves. Module 1 is the operating system; chunking and retrieval are apps.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-rag-loop.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-rag-vs-finetune-vs-context.md` | RAG vs fine-tuning vs long context | `l01-interactive.html` |
| 2 | `lessons/l02-retrieve-stuff-generate.md` | The retrieve → stuff → generate loop | `l02-interactive.html` |
| 3 | `lessons/l03-when-rag-is-wrong.md` | When RAG is the wrong tool | `l03-interactive.html` |
| 4 | `lessons/l04-acme-ops-handbook-scenario.md` | Acme Ops handbook scenario | `l04-interactive.html` |

## Assets

- `assets/diagram-rag-loop.svg` — Retrieve → Stuff → Generate loop
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — live walkthrough of an Acme Ops handbook Q&A with vs without retrieval (~6 min)

## Success criteria for the learner

- Can explain RAG in one sentence operators understand
- Can sketch retrieve → stuff → generate for an Acme Ops question
- Can choose RAG vs fine-tune vs long context for a scenario
- Can name when RAG is the wrong tool

## Next module

`m02-chunking-document-prep` — next module.
