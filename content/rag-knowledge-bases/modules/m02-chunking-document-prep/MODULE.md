# Module 2 — Chunking & document prep

**Slug:** `m02-chunking-document-prep`  
**Course:** RAG & Knowledge Bases for Operators  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

Teach operators how to turn messy handbooks into retrieval-ready chunks: size, overlap, boundaries, cleaning, and metadata that make Monday answers findable.

## Why this module ships here

Retrieval quality is usually a document problem disguised as a model problem. Bad chunks guarantee wrong passages.

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `diagram-chunking-pipeline.svg` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
| 1 | `lessons/l01-what-a-chunk-is.md` | What a chunk is (and isn’t) | `l01-interactive.html` |
| 2 | `lessons/l02-size-overlap-boundaries.md` | Chunk size, overlap, and boundaries | `l02-interactive.html` |
| 3 | `lessons/l03-cleaning-metadata.md` | Cleaning & metadata that retrieval needs | `l03-interactive.html` |
| 4 | `lessons/l04-tables-pdfs-messy-docs.md` | Tables, PDFs, and messy ops docs | `l04-interactive.html` |

## Assets

- `assets/diagram-chunking-pipeline.svg` — Clean → chunk → enrich → index pipeline
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — chunk an Acme Ops escalation chapter three ways and compare retrieval (~6 min)

## Success criteria for the learner

- Can define a chunk vs a page vs a document
- Can choose size/overlap with a reason
- Can list metadata fields that help filters
- Can flag tables/PDF traps before indexing

## Next module

`m03-retrieval-that-works` — next module.
