# Lesson 4.3 — Escalation paths

**Module:** Human-in-the-loop & approvals  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Define who gets the next ping when an approval times out or confidence drops.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Escalation paths).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Define who gets the next ping when an approval times out or confidence drops.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Primary reviewer → backup → on-call lead with SLAs.

### Beat 2

Escalation payloads include goal, draft, risk tier, and why paused.

### Beat 3

Timeouts should fail closed for L2/L3.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Primary reviewer → backup → on-call lead with SLAs.…”

*(Beat 2)*  
“Escalation payloads include goal, draft, risk tier, and why paused.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Wait forever in limbo.

**After**

> 15m → backup reviewer; 45m → on-call; never auto-send L2.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Escalation paths** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
