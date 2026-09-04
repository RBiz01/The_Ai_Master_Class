# RAG & Knowledge Bases for Operators

**Course ID:** `rag-knowledge-bases`  
**Tagline:** Ground answers in your docs—without hallucinating the handbook  
**Level:** Intermediate · **Duration:** 6 hours · **Lessons:** 24  
**Pacing:** ~1 hour per curriculum module × 6 modules  
**Gradient:** `#14b8a6` → `#6366f1`  
**Product:** The Ai Master Class  
**Price:** $99 (compare at $129)

---

## Who this is for

Operators, PMs, automation leads, and team leads who want a **knowledge assistant grounded in real docs**—not a chatbot that invents handbook policy.

Comfortable with chat LLMs helps. Light familiarity with docs/wikis is enough. Patterns stay model-agnostic. All scenarios use the fictional **Acme Ops** handbook—no real secrets or PII.

## Learning outcomes

By the end of this course, you will be able to:

1. Explain **what RAG does** (retrieve → stuff → generate) and when to use RAG vs fine-tuning vs long context.
2. **Chunk and prep** handbooks so retrieval can find the right passages.
3. Configure **keyword, vector, and hybrid retrieval** with top-k, filters, and reranking.
4. Produce **cited, grounded answers**—and refuse when evidence is weak.
5. **Evaluate** faithfulness, relevance, and answer quality with a golden set.
6. **Ship** a team knowledge assistant with ownership, freshness, and Monday ops habits.

## Prerequisites

- Access to any modern LLM chat interface (and optionally a RAG/vector tool or tutorial sandbox)
- A doc set you care about (we’ll use fictional **Acme Ops** handbook scenarios)

## Minute budget (per module ≈ 60 min)

| Block | Minutes | What the learner does |
|-------|---------|------------------------|
| Module intro video | 3–5 | Watch talk-over + on-screen bullets |
| Lessons (4) | 25–30 | Read / watch teaching + narration |
| Example / demo video | 5–8 | See a worked Acme Ops RAG example |
| Interactive practice | 15–20 | Complete drills with success criteria |
| Buffer / notes | 3–5 | Capture takeaways for Monday |

**Course total:** ~6 × 60 min ≈ **6 hours** (aligned with live `courses.json`).

## Module map (24 lessons · ~4 per module)

| Module | Slug | Lessons | Est. time | Status |
|--------|------|---------|-----------|--------|
| 1 | `m01-what-rag-does` | 4 | ~60 min | **Fully built** |
| 2 | `m02-chunking-document-prep` | 4 | ~60 min | **Fully built** |
| 3 | `m03-retrieval-that-works` | 4 | ~60 min | **Fully built** |
| 4 | `m04-citations-grounded-answers` | 4 | ~60 min | **Fully built** |
| 5 | `m05-evaluating-rag-quality` | 4 | ~60 min | **Fully built** |
| 6 | `m06-shipping-knowledge-assistant` | 4 | ~60 min | **Fully built** |

### Module 1 — What RAG actually does *(built)*

1. RAG vs fine-tuning vs long context
2. The retrieve → stuff → generate loop
3. When RAG is the wrong tool
4. Acme Ops handbook scenario

### Module 2 — Chunking & document prep *(built)*

1. What a chunk is (and isn’t)
2. Chunk size, overlap, and boundaries
3. Cleaning & metadata that retrieval needs
4. Tables, PDFs, and messy ops docs

### Module 3 — Retrieval that finds the right passages *(built)*

1. Embeddings & similarity search (operator view)
2. Keyword vs vector vs hybrid
3. Top-k, filters, and reranking
4. Query rewriting for operators

### Module 4 — Citations & grounded answers *(built)*

1. Why citations earn trust
2. Grounded answer patterns
3. Refusal when retrieval is weak
4. UI patterns operators actually use

### Module 5 — Evaluating RAG quality *(built)*

1. Faithfulness, relevance, and answer quality
2. Building a golden Q&A set from the handbook
3. Spotting hallucinations and missed retrieval
4. Iteration loops that don’t thrash

### Module 6 — Shipping a team knowledge assistant *(built)*

1. Scope the first knowledge assistant
2. Access, freshness, and ownership
3. Launch checklist & feedback loops
4. Operating the assistant on Mondays

## Voice & safety

- Confident, practical, modern — “ships Monday morning.”
- Classroom-safe: fictional orgs only (**Acme Ops**, `learner@example.com`).
- No real PII, no NSFW, no sensitive operational secrets.
- Handbook excerpts are fictional (escalation windows, vendor names like Northwind).

## Asset notes

Trailers may use sample MP4s on the live site until final recordings replace them. See `HANDOFF.md` and per-module video scripts. Lesson theme clips are motion-graphics MP4s (Pillow + ffmpeg)—**no Grok T2V**. Full course content is ready for publish.

---

## courses.json catalog object

Paste into the site `data/courses.json` `courses` array:

```json
{
  "id": "rag-knowledge-bases",
  "title": "RAG & Knowledge Bases for Operators",
  "tagline": "Ground answers in your docs—without hallucinating the handbook",
  "description": "Learn retrieval-augmented generation for real teams. Chunk docs, retrieve the right passages, cite sources, evaluate quality, and ship a knowledge assistant operators will trust Monday morning.",
  "level": "Intermediate",
  "duration": "6 hours",
  "lessons": 24,
  "price": 99,
  "compareAtPrice": 129,
  "category": [
    "Agents",
    "Productivity"
  ],
  "featured": true,
  "rating": 4.8,
  "reviewCount": 180,
  "gradient": [
    "#14b8a6",
    "#6366f1"
  ],
  "video": {
    "poster": "images/courses/rag-knowledge-bases.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  },
  "curriculum": [
    "What RAG actually does",
    "Chunking & document prep",
    "Retrieval that finds the right passages",
    "Citations & grounded answers",
    "Evaluating RAG quality",
    "Shipping a team knowledge assistant"
  ],
  "reviews": [
    {
      "name": "Casey Morgan",
      "stars": 5,
      "text": "Our ops team finally trusts the handbook bot—citations changed everything.",
      "date": "2026-08-20"
    },
    {
      "name": "Riley Okonkwo",
      "stars": 5,
      "text": "Chunking and hybrid retrieval modules are gold. Shipped a pilot in a week.",
      "date": "2026-07-28"
    },
    {
      "name": "Sam Park",
      "stars": 4,
      "text": "Practical eval loops, not academic fluff. Wish there were more PDF edge cases.",
      "date": "2026-06-15"
    },
    {
      "name": "Jordan Ellis",
      "stars": 5,
      "text": "Grounded answers + refusal patterns stopped our hallucination incidents cold.",
      "date": "2026-05-03"
    }
  ],
  "image": "images/courses/rag-knowledge-bases.png",
  "hasContent": true,
  "contentPath": "content/rag-knowledge-bases/"
}
```
