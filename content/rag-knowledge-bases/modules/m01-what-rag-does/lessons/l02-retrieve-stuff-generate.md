# Lesson 1.2 — The retrieve → stuff → generate loop

**Module:** What RAG actually does  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Map any knowledge-assistant turn onto retrieve → stuff → generate and name what can fail at each step.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Retrieve: embed (or keyword-search) the query, pull top-k passages from the Acme Ops handbook index.

### Beat 2

Stuff: place those passages into the prompt with clear boundaries and source IDs—don’t bury them in mush.

### Beat 3

Generate: answer only from retrieved evidence; cite; refuse if evidence is missing. Failures: bad retrieval, lost passages, invented claims.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Retrieve: embed (or keyword-search) the query, pull top-k passages from the Acme Ops handbook index.”

*(Beat 2)*  
“Stuff: place those passages into the prompt with clear boundaries and source IDs—don’t bury them in mush.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Ask the model the handbook question and hope it remembers training data.

**After**

> Query → retrieve 4 handbook chunks (IDs H-12, H-18) → stuff into prompt with ‘use only these sources’ → generate answer + citations.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**The retrieve → stuff → generate loop** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
