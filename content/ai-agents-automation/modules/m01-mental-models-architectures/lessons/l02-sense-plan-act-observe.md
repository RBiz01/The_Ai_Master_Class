# Lesson 1.2 — Sense · Plan · Act · Observe

**Module:** Agent mental models & architectures  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Map any agent run onto the Sense → Plan → Act → Observe loop and name the stop condition.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Sense · Plan · Act · Observe).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Map any agent run onto the Sense → Plan → Act → Observe loop and name the stop condition.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Sense: gather observations (tickets, APIs, user message). Plan: choose next step. Act: call a tool or produce output. Observe: update state from the result.

### Beat 2

Loops need a stop condition: success criteria, max steps, or human gate.

### Beat 3

Acme Ops portal go-live agent: sense open blockers → plan priority → act (create checklist item) → observe status change.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Sense: gather observations (tickets, APIs, user message). Plan: choose next step. Act: call a tool or produce output. Ob…”

*(Beat 2)*  
“Loops need a stop condition: success criteria, max steps, or human gate.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Just keep going until it looks done.

**After**

> Loop: Sense open P1s → Plan top risk → Act draft Slack → Observe draft quality. Stop after 3 cycles or when human approves send.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Sense · Plan · Act · Observe** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
