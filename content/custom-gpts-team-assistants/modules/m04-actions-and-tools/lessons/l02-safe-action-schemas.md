# Lesson 4.2 — Designing safe action schemas

**Module:** Actions & tools (without the chaos)  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Define minimal JSON-like schemas with required fields, enums, and timeouts—fictional Acme Ops APIs only.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Small schemas beat kitchen-sink tools. Required fields force clarity.

### Beat 2

Use enums for severity and status. Add timeout and idempotency notes in the description.

### Beat 3

Model-agnostic: same schema thinking applies to GPT Actions, tool use, or Gemini function declarations.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> tool do_stuff(payload: any)

**After**

> get_ticket(ticket_id: string) → {id, status, severity, summary}. Timeout 8s. Read-only.

## Practice

Open `l02-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
