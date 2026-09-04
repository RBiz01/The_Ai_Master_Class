# Lesson 4.1 — When to pause for humans

**Module:** Human-in-the-loop & approvals  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Identify irreversible, ambiguous, or high-blast-radius moments that require a pause.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Pause on external writes, money movement, legal language, and low confidence.

### Beat 2

Don't pause on pure research reads—keep humans for decisions.

### Beat 3

Acme Ops: pause before customer email send and before refund tools.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Pause on external writes, money movement, legal language, and low confidence.…”

*(Beat 2)*  
“Don't pause on pure research reads—keep humans for decisions.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Auto-send every draft.

**After**

> Draft freely; pause on send_email and issue_refund.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**When to pause for humans** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
