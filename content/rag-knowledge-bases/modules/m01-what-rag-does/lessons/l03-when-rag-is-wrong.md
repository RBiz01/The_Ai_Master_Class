# Lesson 1.3 — When RAG is the wrong tool

**Module:** What RAG actually does  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Spot anti-patterns where RAG adds cost and risk without fixing the real problem.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

RAG won’t fix vague questions, missing source of truth, or policies that don’t exist in any doc.

### Beat 2

Don’t RAG for pure creative writing, one-off math on live numbers not in docs, or secrets that should never be indexed.

### Beat 3

Acme Ops anti-pattern: indexing Slack gossip + draft SOPs and calling it ‘the handbook.’ Garbage in, confident garbage out.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“RAG won’t fix vague questions, missing source of truth, or policies that don’t exist in any doc.”

*(Beat 2)*  
“Don’t RAG for pure creative writing, one-off math on live numbers not in docs, or secrets that should never be indexed.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Index every Slack channel and auto-answer HR questions from #random.

**After**

> Index only approved handbook + SOPs. For live ticket counts, call a ticket tool—not RAG. Keep drafts out of the production index.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**When RAG is the wrong tool** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
