# Lesson 7.3 — Add HITL and evals

**Module:** Capstone: ship a reliable agent  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Wire approval gates and at least 5 golden eval cases before demo.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

No ship without L2 gate on outbound and a harness green run.

### Beat 2

Include one negative case that must not send.

### Beat 3

Record traces for the demo walkthrough.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“No ship without L2 gate on outbound and a harness green run.…”

*(Beat 2)*  
“Include one negative case that must not send.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Demo with fingers crossed.

**After**

> 5 goldens + R-neg-send; harness green; approval card linked.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Add HITL and evals** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
