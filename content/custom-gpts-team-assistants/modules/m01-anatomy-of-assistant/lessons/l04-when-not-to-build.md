# Lesson 1.4 — When NOT to build a custom assistant

**Module:** Anatomy of a custom assistant  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Spot anti-patterns: one-off tasks, secrets in knowledge, unbounded write actions, and assistants that should be docs or scripts.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: When NOT to build a custom assistant).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Spot anti-patterns: one-off tasks, secrets in knowledge, unbounded write actions, and assistants that should be docs or scripts.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

If you will use it once, stay in chat. If the steps are fixed and structured, use a checklist or script.

### Beat 2

Never upload secrets, real customer PII, or live credentials into knowledge packs.

### Beat 3

If the job needs irreversible writes without human review, you are building risk—not leverage.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Assistant that auto-refunds angry customers and stores real card PANs in knowledge.

**After**

> Draft-only Refund Coach with fictional policy PDF; human approves refunds over $50; no PANs in files.

## Practice

Open `l04-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
