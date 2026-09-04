# Lesson 4.3 — Confirmations, dry-runs & blast radius

**Module:** Actions & tools (without the chaos)  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Gate write actions with dry-run previews and explicit human confirmation; document blast radius.

## What to do

1. Watch the **Lesson video** once for the visual hook.
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Confirmations, dry-runs & blast radius).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Gate write actions with dry-run previews and explicit human confirmation; document blast radius.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Dry-run: show what would happen. Confirm: human says yes. Then execute.

### Beat 2

Blast radius: who/what can this touch? Limit to one ticket, one draft, one channel.

### Beat 3

Acme Ops: create_draft_ticket always shows title + severity + body before submit.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Action runs immediately on any user message that sounds urgent.

**After**

> Always preview draft ticket. Require typed CONFIRM. Cap: 1 draft per turn. No delete tools.

## Practice

Open `l03-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
