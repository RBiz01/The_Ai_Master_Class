# Lesson 2.1 — Tool schemas models can call

**Module:** Tools, functions, and API wiring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Write JSON-style tool definitions with name, description, parameters, and failure semantics.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Models call tools by name + arguments. Descriptions are prompts—be specific.

### Beat 2

Parameters need types, required fields, and enums where helpful.

### Beat 3

Document side effects and error strings so the agent can recover.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Models call tools by name + arguments. Descriptions are prompts—be specific.…”

*(Beat 2)*  
“Parameters need types, required fields, and enums where helpful.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> {"name": "doStuff", "params": {}}

**After**

> get_ticket(ticket_id: string) → {status, severity, customer}; errors: not_found, rate_limited.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Tool schemas models can call** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
