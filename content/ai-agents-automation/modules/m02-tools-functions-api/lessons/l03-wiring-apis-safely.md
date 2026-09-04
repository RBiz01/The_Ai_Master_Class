# Lesson 2.3 — Wiring APIs safely

**Module:** Tools, functions, and API wiring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Apply timeouts, retries with backoff, auth placeholders, and allowlists—no real secrets.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Wiring APIs safely).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Apply timeouts, retries with backoff, auth placeholders, and allowlists—no real secrets.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Use ACME_OPS_API_KEY=***REDACTED*** style placeholders only.

### Beat 2

Timeouts and max retries beat infinite hangs.

### Beat 3

Allowlist hosts and methods; deny raw shell by default.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Use ACME_OPS_API_KEY=***REDACTED*** style placeholders only.…”

*(Beat 2)*  
“Timeouts and max retries beat infinite hangs.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> fetch(url) with no timeout and a hardcoded key.

**After**

> adapter.get(path, timeout_ms=8000, retries=2, auth=env('ACME_OPS_API_KEY')).

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Wiring APIs safely** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
