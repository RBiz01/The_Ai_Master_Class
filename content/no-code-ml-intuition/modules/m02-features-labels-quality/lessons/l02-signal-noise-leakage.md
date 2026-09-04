# Lesson 2.2 — Signal, noise, and leakage

**Module:** Features, labels, and data quality  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Detect target leakage and noisy columns.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Three data personalities

1. **Signal** — helps.
2. **Noise** — random variation.
3. **Leakage** — includes the future answer or a proxy.

### Leakage red flags

- Outcome-encoding IDs
- Status = closed-won used to predict win
- Timestamps after the event
- Free text that restates the label

### Talk-over narration

*(Beat 1)* Leakage expires in production.
*(Beat 2)* Noise jitters; leakage lies.
*(Beat 3)* Too-good accuracy? Hunt leakage first.

## Worked micro-example

**Before**

> Vague take on: Signal, noise, and leakage

**After**

> Clear, actionable take that meets the objective: Detect target leakage and noisy columns.

## Practice

Open `l02-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Northstar Studio** / **Acme Ops** workflow before Monday.
