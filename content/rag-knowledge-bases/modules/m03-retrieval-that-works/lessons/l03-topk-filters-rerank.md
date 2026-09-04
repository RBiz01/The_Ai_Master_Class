# Lesson 3.3 — Top-k, filters, and reranking

**Module:** Retrieval that finds the right passages  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Set top-k, apply metadata filters, and use reranking so the stuffed context isn’t noise.

## What to do

1. Watch the **Lesson video** once for the visual hook.
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Top-k, filters, and reranking).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Set top-k, apply metadata filters, and use reranking so the stuffed context isn’t noise.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Top-k too low misses evidence; too high floods the prompt. Start 4–8 for handbook Q&A.

### Beat 2

Filters: version=approved, audience=ops, section=escalation—cut wrong neighborhoods.

### Beat 3

Rerankers reorder candidates by query relevance before stuffing.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Top-k too low misses evidence; too high floods the prompt. Start 4–8 for handbook Q&A.”

*(Beat 2)*  
“Filters: version=approved, audience=ops, section=escalation—cut wrong neighborhoods.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Stuff top-50 chunks into every prompt.

**After**

> Filter approved ops docs → retrieve 20 → rerank to top 6 → stuff with IDs.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Top-k, filters, and reranking** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
