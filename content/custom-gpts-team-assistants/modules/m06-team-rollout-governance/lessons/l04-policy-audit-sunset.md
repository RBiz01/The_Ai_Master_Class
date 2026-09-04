# Lesson 6.4 — Policy, audit & sunset

**Module:** Team rollout & governance  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

State what is allowed, how you audit, and when to sunset or merge assistants.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Policy: no secrets in knowledge, no write actions without HITL, team share requires owner.

### Beat 2

Audit: quarterly list of assistants, owners, last eval date, sharing scope.

### Beat 3

Sunset: merge duplicates, archive unused, announce retirement date.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Forty near-duplicate helpers; nobody knows which is current.

**After**

> Registry of 6 official Acme Ops assistants; sunset rule: <5 uses/month for 60 days → archive.

## Practice

Open `l04-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
