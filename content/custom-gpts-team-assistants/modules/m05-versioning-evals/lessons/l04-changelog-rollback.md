# Lesson 5.4 — Changelog & rollback playbooks

**Module:** Versioning, evals & iteration  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Document how to roll back to the last good version within minutes when production assistants misbehave.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Keep last-good instructions and knowledge list in a private doc.

### Beat 2

Rollback steps: restore instructions → restore knowledge set → announce in team channel → file incident note.

### Beat 3

Acme Ops: owner-on-call can roll back without waiting for a weekly meeting.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Nobody remembers the old prompt; team suffers for days.

**After**

> Rollback doc with v1.2 snapshot + 4 steps + announce template to #acme-ops-ai.

## Practice

Open `l04-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
