# Lesson 4.4 — Debugging flaky actions

**Module:** Actions & tools (without the chaos)  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Diagnose timeouts, auth stubs, and schema mismatches with a short checklist—without blaming the model first.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Checklist: auth valid? schema match? timeout? empty required field? rate limit?

### Beat 2

Log the action name, args, and error class (fictional). Keep secrets out of logs.

### Beat 3

If the action fails, the assistant should say so and offer a manual path—not invent success.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Pretend the ticket was created when the API timed out.

**After**

> Report: get_ticket timed out after 8s. Offer paste-in ticket fields for manual triage.

## Practice

Open `l04-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
