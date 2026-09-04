# Lesson 3.3 — Cross-validation intuition (no math)

**Module:** Train / validate / test without the jargon trap  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Describe k-fold and when time-series forbids it.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### Rotating holdouts

**k-fold** splits data into k slices and takes turns holding one out. Good when data is scarce and rows are exchangeable.

### When not to

Time-ordered ops data: do not train on tomorrow to predict yesterday. Prefer time-based splits.

### Talk-over narration

*(Beat 1)* Cross-validation is musical chairs for holdouts.
*(Beat 2)* It reduces bad luck from one split — not magic accuracy.
*(Beat 3)* Time-series? Respect the arrow of time.

## Worked micro-example

**Before**

> Vague take on: Cross-validation intuition (no math)

**After**

> Clear, actionable take that meets the objective: Describe k-fold and when time-series forbids it.

## Practice

Open `l03-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Northstar Studio** / **Acme Ops** workflow before Monday.
