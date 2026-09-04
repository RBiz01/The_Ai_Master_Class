# Lesson 3.4 — Context windows and compression

**Module:** Planning, memory, and state  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Compress traces while preserving goals, constraints, and open decisions.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Context windows and compression).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Compress traces while preserving goals, constraints, and open decisions.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Summarize tool results; keep raw only for the last step.

### Beat 2

Never drop stop conditions or approval requirements in summaries.

### Beat 3

Budget tokens: goal + plan + last N observations + retrieval hits.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Summarize tool results; keep raw only for the last step.…”

*(Beat 2)*  
“Never drop stop conditions or approval requirements in summaries.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Append every tool JSON forever.

**After**

> Rolling summary of research + last tool payload + approval gate still open.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Context windows and compression** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
