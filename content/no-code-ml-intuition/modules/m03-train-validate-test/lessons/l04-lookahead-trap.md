# Lesson 3.4 — Avoiding the look-ahead trap

**Module:** Train / validate / test without the jargon trap  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Prevent future features from leaking into past predictions.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Avoiding the look-ahead trap).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Prevent future features from leaking into past predictions.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Future leaking into the past

Using resolution time to predict SLA breach — when resolution is only known after close — is look-ahead.

### Guardrails

- List features available at prediction time T
- Ban anything after T
- Train only on weeks before the target week
- Watch rolling features carefully

### Talk-over narration

*(Beat 1)* If you would not know it at decision time, it is not a feature.
*(Beat 2)* Look-ahead is leakage wearing a calendar.
*(Beat 3)* Draw the timeline; cut the future off.

## Worked micro-example

**Before**

> Vague take on: Avoiding the look-ahead trap

**After**

> Clear, actionable take that meets the objective: Prevent future features from leaking into past predictions.

## Practice

Open `l04-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Northstar Studio** / **Acme Ops** workflow before Monday.
