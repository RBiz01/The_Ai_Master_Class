# Lesson 5.4 — Regression suites

**Module:** Evaluation harnesses & failure modes  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Turn each production bug into a locked regression case.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Regression suites).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Turn each production bug into a locked regression case.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Bug → minimal repro fixture → assert fix → keep forever.

### Beat 2

Prioritize Sev1 skipped gates and cost blowups.

### Beat 3

Gate merges on suite green.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Bug → minimal repro fixture → assert fix → keep forever.…”

*(Beat 2)*  
“Prioritize Sev1 skipped gates and cost blowups.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Fixed once, broke again next week.

**After**

> Case R-17: must request_approval before send_email.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Regression suites** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
