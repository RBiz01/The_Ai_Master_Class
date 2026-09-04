# Lesson 3.3 — State machines for agent runs

**Module:** Planning, memory, and state  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Model idle → running → awaiting_approval → done / failed states.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: State machines for agent runs).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Model idle → running → awaiting_approval → done / failed states.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Explicit states beat boolean spaghetti.

### Beat 2

Transitions on tool success, errors, timeouts, and human decisions.

### Beat 3

Persist state so a crash can resume without double-sending.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Explicit states beat boolean spaghetti.…”

*(Beat 2)*  
“Transitions on tool success, errors, timeouts, and human decisions.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Flags: started, maybeDone, oops.

**After**

> States: IDLE, RESEARCHING, DRAFTING, AWAITING_APPROVAL, SENT, FAILED.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**State machines for agent runs** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
