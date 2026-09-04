# Lesson 1.2 — The Goal · Context · Constraints · Format frame

**Module:** Foundations of clear instruction  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-clear-prompt.svg`

---

## Learning objective

Apply the **Goal · Context · Constraints · Format (GCCF)** frame to any work prompt so the model has a complete brief.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The frame

Think of every prompt as a one-page brief:

| Slot | Question it answers | Example (Acme Ops) |
|------|---------------------|--------------------|
| **Goal** | What should exist when you’re done? | A standup-ready digest of vendor risk |
| **Context** | What does the model need that isn’t obvious? | Portal go-live Friday; ops lead is Jordan |
| **Constraints** | What must / must not happen? | No speculation; max 5 bullets; cite email subjects |
| **Format** | What shape should the answer take? | Markdown bullets under headers Risk / Action |

Open the diagram: **Goal** feeds **Context**; **Constraints** and **Format** fence the output. Skip a box and the fence has a hole.

### Why order matters

1. **Goal first** — without it, context becomes trivia.  
2. **Context second** — facts the model can’t see (dates, roles, systems).  
3. **Constraints third** — hard limits (length, tone, do-nots).  
4. **Format last** — packaging so humans (or tools) can consume it.

You can write them in any visual order, but mentally lock Goal before you decorate.

### Template you can reuse

```text
GOAL:
CONTEXT:
CONSTRAINTS:
FORMAT:
```

Fill every line. Empty lines are where randomness sneaks in.

### Full GCCF example

```text
GOAL: Produce a standup digest of vendor delays that threaten Friday’s portal go-live.
CONTEXT: Acme Ops; go-live Friday 9am CT; audience is the ops standup (Jordan facilitating); pasted emails cover the last 24 hours.
CONSTRAINTS: Max 5 bullets; no speculation beyond the emails; flag anything blocking go-live with the word BLOCKER.
FORMAT: Markdown with two headers — ## Risk and ## Action — bullets only under each.
```

### Talk-over narration

*(Beat 1)*  
“GCCF is your default keyboard habit. Goal. Context. Constraints. Format. Four lines, every time.”

*(Beat 2)*  
“Watch the diagram: Goal aims the shot. Context loads the facts. Constraints keep you honest. Format makes it shippable.”

*(Beat 3)*  
“In the interactive, you’ll label each line of a messy prompt. If you can tag it, you can fix it.”

## Practice

Complete `l02-interactive.html`: rebuild a messy Acme Ops ask into labeled GCCF slots.

## Takeaway

GCCF is the operating system for Modules 2–6. Memorize the four boxes; reuse the template until it’s muscle memory.
