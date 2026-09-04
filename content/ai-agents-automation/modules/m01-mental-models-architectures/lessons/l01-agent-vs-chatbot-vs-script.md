# Lesson 1.1 — Agent vs chatbot vs script

**Module:** Agent mental models & architectures  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Distinguish chatbots, scripts, and agents—and pick the right shape for an Acme Ops ops task.

## What to do

1. Watch the **Lesson video** once for the visual hook.
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l01-interactive.html` and follow its Instructions until you hit the success state (this locks in: Agent vs chatbot vs script).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Distinguish chatbots, scripts, and agents—and pick the right shape for an Acme Ops ops task.* and `l01-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

At Acme Ops, 'help with vendor risk' can mean a chat answer, a fixed script, or an agent that researches, decides, and acts.

### Beat 2

Chatbots answer. Scripts execute fixed steps. Agents pursue a goal with tools, memory, and looping until done or blocked.

### Beat 3

Use an agent when the path is uncertain, tools are needed, and stopping conditions matter. Use a script when steps are known. Use chat when you only need text.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, 'help with vendor risk' can mean a chat answer, a fixed script, or an agent that researches, decides, and a…”

*(Beat 2)*  
“Chatbots answer. Scripts execute fixed steps. Agents pursue a goal with tools, memory, and looping until done or blocked…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Talk to me about vendor risk for the portal go-live.

**After**

> Goal: produce a vendor-risk brief for Acme Ops standup. Tools: search tickets, fetch vendor status page. Stop when 5 risks are ranked or approval is needed to email a vendor.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Agent vs chatbot vs script** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
