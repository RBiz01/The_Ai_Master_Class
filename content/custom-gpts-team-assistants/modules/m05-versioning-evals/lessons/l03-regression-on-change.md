# Lesson 5.3 — Regression when instructions change

**Module:** Versioning, evals & iteration  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Re-run the golden set after every instruction or knowledge change; quarantine failures before publish.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Any edit can break a starter path. Regression is the cost of sharing.

### Beat 2

If two cases fail, fix or roll back—do not 'ship and see'.

### Beat 3

Knowledge swaps need the same pass: new PDF can revive old conflicts.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Ship instruction edits mid-day with no checks.

**After**

> Checklist: run golden 12 → note fails → fix or revert → then publish to team.

## Practice

Open `l03-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
