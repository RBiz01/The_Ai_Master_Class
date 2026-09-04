# Lesson 2.4 — Tool selection and routing

**Module:** Tools, functions, and API wiring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Route among search, ticket, and notify tools without thrashing.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Tool selection and routing).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Route among search, ticket, and notify tools without thrashing.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Prefer the narrowest tool that answers the subgoal.

### Beat 2

Cap tool calls per run; log selection reasons for eval.

### Beat 3

Acme Ops: search docs before opening tickets; never notify before draft approval.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Prefer the narrowest tool that answers the subgoal.…”

*(Beat 2)*  
“Cap tool calls per run; log selection reasons for eval.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Call every tool every turn.

**After**

> If need status → get_ticket; if need policy → search_kb; if need human → request_approval.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Tool selection and routing** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
