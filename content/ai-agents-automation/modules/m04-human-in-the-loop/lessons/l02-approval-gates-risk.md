# Lesson 4.2 — Approval gates and risk tiers

**Module:** Human-in-the-loop & approvals  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Assign L0–L3 risk tiers and matching approval requirements.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

L0 read-only auto. L1 internal draft auto. L2 external message needs reviewer. L3 money/legal needs dual control.

### Beat 2

Encode tiers in tool metadata, not tribal knowledge.

### Beat 3

Log who approved what for audits.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“L0 read-only auto. L1 internal draft auto. L2 external message needs reviewer. L3 money/legal needs dual control.…”

*(Beat 2)*  
“Encode tiers in tool metadata, not tribal knowledge.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Everything needs a VP.

**After**

> search_kb=L0; draft_slack=L1; send_customer_email=L2; refund>50=L3.

## Practice

Open `l02-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Approval gates and risk tiers** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
