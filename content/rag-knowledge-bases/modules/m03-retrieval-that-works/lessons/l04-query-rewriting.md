# Lesson 3.4 — Query rewriting for operators

**Module:** Retrieval that finds the right passages  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Rewrite vague operator questions into retrieval-friendly queries without changing intent.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Operators type shorthand: ‘p1 window??’ Rewrite to include entity + doc intent.

### Beat 2

Multi-query: expand one ask into 2–3 retrieval queries, then fuse hits.

### Beat 3

Never rewrite into a different policy. Acme Ops: keep ‘portal go-live’ in the query if the user said it.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Operators type shorthand: ‘p1 window??’ Rewrite to include entity + doc intent.”

*(Beat 2)*  
“Multi-query: expand one ask into 2–3 retrieval queries, then fuse hits.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> p1 window??

**After**

> Acme Ops handbook: What is the P1 escalation time window for portal go-live incidents?

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Query rewriting for operators** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
