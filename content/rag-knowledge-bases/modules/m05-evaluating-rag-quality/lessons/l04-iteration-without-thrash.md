# Lesson 5.4 — Iteration loops that don’t thrash

**Module:** Evaluating RAG quality  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Change one retrieval or prompt variable at a time and re-score the golden set.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Thrash = changing chunk size, prompt, model, and top-k in one night.

### Beat 2

Loop: measure → hypothesize → one change → re-score → keep or revert.

### Beat 3

Acme Ops weekly: review thumbs-down, add 3 golden items, ship one fix.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Thrash = changing chunk size, prompt, model, and top-k in one night.”

*(Beat 2)*  
“Loop: measure → hypothesize → one change → re-score → keep or revert.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Rewrite the entire system prompt and re-embed everything daily.

**After**

> This week: only add BM25 hybrid. Re-score golden set. Keep if faithfulness/relevance rise.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Iteration loops that don’t thrash** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
