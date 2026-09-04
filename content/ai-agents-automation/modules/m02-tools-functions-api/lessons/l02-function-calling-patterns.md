# Lesson 2.2 — Function-calling patterns

**Module:** Tools, functions, and API wiring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Trace a function-calling turn: user → model tool call → tool result → final answer.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

The model proposes a call; your runtime executes; you return observations.

### Beat 2

Parallel tool calls help for independent reads; serialize writes.

### Beat 3

Always echo tool results into the next model turn with clear labels.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“The model proposes a call; your runtime executes; you return observations.…”

*(Beat 2)*  
“Parallel tool calls help for independent reads; serialize writes.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Hope the model 'knows' the ticket status.

**After**

> Model calls get_ticket('AO-1042') → runtime returns JSON → model drafts standup line.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Function-calling patterns** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
