# Lesson 3.1 — Embeddings & similarity search (operator view)

**Module:** Retrieval that finds the right passages  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Explain embeddings as meaning-coordinates and similarity search as ‘nearest handbook neighbors’—without math theater.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

An embedding is a list of numbers that places text near similar meanings. Queries and chunks share the same space.

### Beat 2

Similarity search returns nearest neighbors—not ‘truth.’ Close ≠ correct policy.

### Beat 3

Acme Ops: ‘P1 escalation window’ should land near the escalation section, not the vacation policy.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“An embedding is a list of numbers that places text near similar meanings. Queries and chunks share the same space.”

*(Beat 2)*  
“Similarity search returns nearest neighbors—not ‘truth.’ Close ≠ correct policy.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Similarity search finds the truth automatically.

**After**

> Similarity finds nearby passages; humans + evals decide if those passages answer the question.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Embeddings & similarity search (operator view)** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
