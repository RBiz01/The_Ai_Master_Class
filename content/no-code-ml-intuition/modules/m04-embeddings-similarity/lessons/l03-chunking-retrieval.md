# Lesson 4.3 — Chunking and retrieval that works

**Module:** Embeddings & similarity search  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Chunk documents for usable retrieval.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### Chunking is product design

Too big returns novels. Too small returns orphan sentences.

### Practical defaults

- 300-800 tokens with slight overlap
- Keep headings with sections
- Store source path + chunk id
- Re-chunk when corpus style changes

### Talk-over narration

*(Beat 1)* Chunking decides what a neighbor is.
*(Beat 2)* Cite the chunk; do not hallucinate the binder.
*(Beat 3)* Vague answers? Fix chunks before the model.

## Worked micro-example

**Before**

> Vague take on: Chunking and retrieval that works

**After**

> Clear, actionable take that meets the objective: Chunk documents for usable retrieval.

## Practice

Open `l03-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Northstar Studio** / **Acme Ops** workflow before Monday.
