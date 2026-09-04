# Lesson 6.4 — Governance for citizen automation

**Module:** No-code and low-code automation bridges  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Set guardrails: owners, reviews, allowlisted apps, kill switches.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Every automation has an owner and expiry review.

### Beat 2

Allowlist connectors; ban unrestricted HTTP to unknown hosts.

### Beat 3

Kill switch and audit log required before production.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Every automation has an owner and expiry review.…”

*(Beat 2)*  
“Allowlist connectors; ban unrestricted HTTP to unknown hosts.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Anyone can Zap production Stripe.

**After**

> Catalog + owner + L2 review + kill switch for Acme Ops Zaps.

## Practice

Open `l04-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Governance for citizen automation** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
