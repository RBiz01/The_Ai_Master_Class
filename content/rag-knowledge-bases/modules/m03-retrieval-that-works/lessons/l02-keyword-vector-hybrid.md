# Lesson 3.2 — Keyword vs vector vs hybrid

**Module:** Retrieval that finds the right passages  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Choose keyword, vector, or hybrid retrieval for IDs, jargon, and paraphrased ops questions.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Keyword (BM25) nails IDs, SKUs, exact titles: ‘AO-1042’, ‘SOP-ESC-01’.

### Beat 2

Vector shines on paraphrases: ‘how fast must we escalate a portal outage?’

### Beat 3

Hybrid + light fusion is the Acme Ops default for handbooks with codes and prose.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Keyword (BM25) nails IDs, SKUs, exact titles: ‘AO-1042’, ‘SOP-ESC-01’.”

*(Beat 2)*  
“Vector shines on paraphrases: ‘how fast must we escalate a portal outage?’”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Use only vector search for every handbook query.

**After**

> Hybrid: BM25 for SOP IDs + vector for paraphrase; merge and dedupe before rerank.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Keyword vs vector vs hybrid** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
