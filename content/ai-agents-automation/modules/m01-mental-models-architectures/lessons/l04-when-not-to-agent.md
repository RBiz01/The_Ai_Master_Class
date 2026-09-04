# Lesson 1.4 — When not to use an agent

**Module:** Agent mental models & architectures  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Recognize anti-patterns: agents for deterministic jobs, unbounded loops, and missing approval gates.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

If the steps are fixed and inputs are structured, a workflow or script is cheaper and safer.

### Beat 2

Agents without budgets (steps, dollars, tool calls) become cost and reliability risks.

### Beat 3

Never give write/delete tools without human-in-the-loop for irreversible actions.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“If the steps are fixed and inputs are structured, a workflow or script is cheaper and safer.…”

*(Beat 2)*  
“Agents without budgets (steps, dollars, tool calls) become cost and reliability risks.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Agent that auto-refunds any angry email.

**After**

> Scripted refund rules for known SKUs; agent drafts reply; human approves refunds over $50.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**When not to use an agent** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
