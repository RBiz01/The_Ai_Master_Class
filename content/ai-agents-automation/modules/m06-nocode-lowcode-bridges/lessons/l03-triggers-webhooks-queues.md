# Lesson 6.3 — Triggers, webhooks, and queues

**Module:** No-code and low-code automation bridges  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Use webhooks and queues so agents don't lose work under load.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Triggers, webhooks, and queues).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Use webhooks and queues so agents don't lose work under load.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Webhook receives event → enqueue → worker runs agent → callback.

### Beat 2

Idempotency keys prevent double refunds.

### Beat 3

Backoff and DLQ for poison messages.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Webhook receives event → enqueue → worker runs agent → callback.…”

*(Beat 2)*  
“Idempotency keys prevent double refunds.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Sync HTTP that times out mid-agent.

**After**

> Enqueue ticket.created; agent worker; webhook callback to Make.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Triggers, webhooks, and queues** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
