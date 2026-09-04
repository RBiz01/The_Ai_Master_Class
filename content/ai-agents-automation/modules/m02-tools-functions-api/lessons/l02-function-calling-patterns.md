# Lesson 2.2 — Function-calling patterns

**Module:** Tools, functions, and API wiring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Trace a function-calling turn: user → model tool call → tool result → final answer.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Function-calling patterns).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Trace a function-calling turn: user → model tool call → tool result → final answer.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

The model proposes a call; your runtime executes; you return observations.

### Beat 2

Parallel tool calls help for independent reads; serialize writes.

### Beat 3

Always echo tool results into the next model turn with clear labels.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“The model proposes a call; your runtime executes; you return observations.…”

*(Beat 2)*  
“Parallel tool calls help for independent reads; serialize writes.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Hope the model 'knows' the ticket status.

**After**

> Model calls get_ticket('AO-1042') → runtime returns JSON → model drafts standup line.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Function-calling patterns** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
