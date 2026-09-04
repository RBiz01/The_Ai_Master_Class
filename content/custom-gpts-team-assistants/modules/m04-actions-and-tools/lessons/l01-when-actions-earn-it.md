# Lesson 4.1 — When actions earn their complexity

**Module:** Actions & tools (without the chaos)  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Add actions only when the assistant must read or write live systems—and keep draft-only otherwise.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l01-interactive.html` and follow its Instructions until you hit the success state (this locks in: When actions earn their complexity).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Add actions only when the assistant must read or write live systems—and keep draft-only otherwise.* and `l01-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Most team assistants should stay draft-only. Actions add auth, failure modes, and blast radius.

### Beat 2

Earn it: lookup ticket status, fetch a status page, create a draft ticket for human submit.

### Beat 3

Do not earn it: auto-send email, auto-refund, delete records.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Wire send_email and delete_ticket on day one.

**After**

> v1: no actions. v2: read-only get_ticket. v3: create_draft_ticket with human submit.

## Practice

Open `l01-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
