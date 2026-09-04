# Lesson 8.4 — Incident response for agents

**Module:** Ops, cost control, and monitoring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Follow a playbook: kill switch, freeze writes, bisect traces, patch, regress.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Incident response for agents).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Follow a playbook: kill switch, freeze writes, bisect traces, patch, regress.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Kill switch first for Sev1 autonomous writes.

### Beat 2

Preserve traces; communicate status to Acme Ops stakeholders.

### Beat 3

Close with regression case and postmortem blameless notes.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Kill switch first for Sev1 autonomous writes.…”

*(Beat 2)*  
“Preserve traces; communicate status to Acme Ops stakeholders.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Hotfix prod prompts live with no record.

**After**

> Kill → freeze L2/L3 → bisect → patch → regress R-42 → reopen.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Incident response for agents** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
