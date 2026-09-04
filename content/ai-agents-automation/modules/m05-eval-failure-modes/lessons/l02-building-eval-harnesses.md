# Lesson 5.2 — Building eval harnesses

**Module:** Evaluation harnesses & failure modes  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Build a tiny harness: fixtures, expected tool sequence, assertions, scorecard.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Start with 10–20 golden tasks, not a thousand.

### Beat 2

Assert on tools called, final state, and approval required flags.

### Beat 3

Run on every prompt/tool change before prod.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Start with 10–20 golden tasks, not a thousand.…”

*(Beat 2)*  
“Assert on tools called, final state, and approval required flags.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Manual vibe check on Friday.

**After**

> harness.run(case='vendor_triage_01') asserts tools+[approval].

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Building eval harnesses** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
