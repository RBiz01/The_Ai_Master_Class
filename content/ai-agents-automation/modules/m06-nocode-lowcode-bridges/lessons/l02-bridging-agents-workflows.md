# Lesson 6.2 — Bridging agents to workflow tools

**Module:** No-code and low-code automation bridges  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Design a bridge: workflow calls agent HTTP, agent returns structured JSON.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Contract: input schema, output schema, idempotency key.

### Beat 2

Keep secrets in the workflow vault; agent gets scoped tokens.

### Beat 3

Return machine-readable fields the workflow can branch on.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Contract: input schema, output schema, idempotency key.…”

*(Beat 2)*  
“Keep secrets in the workflow vault; agent gets scoped tokens.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Paste free text into the next Zap step.

**After**

> {"action":"draft_ready","risk":"L2","needs_approval":true}

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Bridging agents to workflow tools** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
