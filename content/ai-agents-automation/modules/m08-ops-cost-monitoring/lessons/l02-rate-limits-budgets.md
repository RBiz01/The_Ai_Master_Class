# Lesson 8.2 — Rate limits and budgets

**Module:** Ops, cost control, and monitoring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Set per-run and per-day budgets that fail closed.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Rate limits and budgets).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Set per-run and per-day budgets that fail closed.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Max steps, max tool calls, max tokens, max $ per run.

### Beat 2

Soft warn at 70%; hard stop at 100%.

### Beat 3

Separate budgets for prod vs eval harness.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Max steps, max tool calls, max tokens, max $ per run.…”

*(Beat 2)*  
“Soft warn at 70%; hard stop at 100%.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Unlimited loops overnight.

**After**

> max_steps=12, max_$=0.50/run, daily_cap=$25 for Acme Ops.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Rate limits and budgets** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
