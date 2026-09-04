# Lesson 1.3 — Single-agent vs multi-agent

**Module:** Agent mental models & architectures  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Decide when one agent with tools beats a multi-agent graph—and what coordination costs you pay.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Single agent: one brain, many tools. Simpler state, easier eval, lower latency.

### Beat 2

Multi-agent: specialist roles (researcher, writer, reviewer) with handoffs. Useful when skills conflict or parallel work helps.

### Beat 3

Acme Ops rule of thumb: start single-agent; split only when one prompt cannot hold conflicting skills or you need parallel research.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Single agent: one brain, many tools. Simpler state, easier eval, lower latency.…”

*(Beat 2)*  
“Multi-agent: specialist roles (researcher, writer, reviewer) with handoffs. Useful when skills conflict or parallel work…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Spin up 8 agents for every task.

**After**

> One triage agent with search + ticket tools. Add a reviewer agent only for external customer emails.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Single-agent vs multi-agent** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
