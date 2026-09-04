# Lesson 1.1 — RAG vs fine-tuning vs long context

**Module:** What RAG actually does  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Choose the right grounding strategy—RAG, fine-tuning, or long context—for an Acme Ops handbook question.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

At Acme Ops, someone asks: “What’s the P1 escalation window for portal go-live?” The model might invent a number if it never saw the handbook.

### Beat 2

Long context pastes the whole PDF—works until it doesn’t (cost, noise, size). Fine-tuning embeds habits, not fresh policy. RAG fetches the right pages at ask time.

### Beat 3

Rule of thumb: changing facts → RAG. Changing style/skills → fine-tune. Tiny stable corpus that always fits → long context is fine.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, someone asks: “What’s the P1 escalation window for portal go-live?” The model might invent a number if it never saw the handboo”

*(Beat 2)*  
“Long context pastes the whole PDF—works until it doesn’t (cost, noise, size). Fine-tuning embeds habits, not fresh policy. RAG fetches the r”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Just fine-tune on the whole Acme Ops handbook so the model “knows” it.

**After**

> Index the handbook with RAG. Retrieve escalation policy passages for each question. Fine-tune later only if tone/skill gaps remain after grounding works.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**RAG vs fine-tuning vs long context** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
