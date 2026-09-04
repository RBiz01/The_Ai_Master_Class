# Lesson 1.1 — Chat vs custom assistant vs agent

**Module:** Anatomy of a custom assistant  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Choose chat, a custom assistant, or a tool-using agent for an Acme Ops workflow—and explain the tradeoffs.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

At Acme Ops, 'help with vendor emails' can mean a one-off chat, a reusable Vendor Triage assistant, or an agent that writes tickets.

### Beat 2

Chat is ephemeral. Custom assistants package instructions + knowledge + light actions for many teammates. Agents pursue goals with looping tools.

### Beat 3

Rule of thumb: if the expertise should survive the tab close and be shared, build an assistant. If the path needs many tools and loops, consider an agent.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Just keep pasting the same long prompt into chat every Monday.

**After**

> Ship Acme Ops Vendor Triage GPT: fixed instructions, policy PDF in knowledge, no write actions. Teammates open it; they don't re-prompt.

## Practice

Open `l01-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
