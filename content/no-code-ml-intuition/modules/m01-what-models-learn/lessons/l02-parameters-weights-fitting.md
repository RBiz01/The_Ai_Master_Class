# Lesson 1.2 — Parameters, weights, and fitting the curve

**Module:** What models actually learn  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Describe parameters as knobs training turns to reduce error.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Parameters, weights, and fitting the curve).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Describe parameters as knobs training turns to reduce error.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Knobs, not mysticism

Think of a model as a machine with thousands of **knobs** (parameters/weights). Training turns knobs to reduce mistakes on labeled examples.

### Fitting the curve

- Too few knobs -> underfit.
- Just enough -> follows the real shape.
- Too flexible + noisy labels -> overfit.

### Acme Ops micro-story

Acme Ops trains a delay predictor. Weights that once ignored 'carrier = regional' now matter because delays clustered there.

### Talk-over narration

*(Beat 1)* Parameters are knobs. Training is automated knob-turning.
*(Beat 2)* You choose data, labels, and when to stop — not hand-edited weights.
*(Beat 3)* Fitting reduces error on examples; it does not prove truth.

## Worked micro-example

**Before**

> Vague take on: Parameters, weights, and fitting the curve

**After**

> Clear, actionable take that meets the objective: Describe parameters as knobs training turns to reduce error.

## Practice

Open `l02-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Northstar Studio** / **Acme Ops** workflow before Monday.
