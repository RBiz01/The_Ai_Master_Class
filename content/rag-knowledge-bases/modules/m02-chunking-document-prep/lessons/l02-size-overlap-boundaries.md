# Lesson 2.2 — Chunk size, overlap, and boundaries

**Module:** Chunking & document prep  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Tune size and overlap so related sentences aren’t orphaned across chunk edges.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Start around 400–800 tokens for ops handbooks; adjust after eval, not vibes.

### Beat 2

Overlap (e.g. 10–15%) helps bridge edges so a policy sentence isn’t cut from its exception.

### Beat 3

Heading-aware splitters beat fixed windows for Acme Ops SOPs with nested steps.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Start around 400–800 tokens for ops handbooks; adjust after eval, not vibes.”

*(Beat 2)*  
“Overlap (e.g. 10–15%) helps bridge edges so a policy sentence isn’t cut from its exception.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> One giant chunk per PDF page with zero overlap.

**After**

> Heading-aware 600-token chunks, 80-token overlap, preserve parent heading path ‘Escalation > P1’.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Chunk size, overlap, and boundaries** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
