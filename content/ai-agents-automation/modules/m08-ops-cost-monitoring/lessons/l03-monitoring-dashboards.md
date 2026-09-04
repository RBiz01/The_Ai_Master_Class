# Lesson 8.3 — Monitoring dashboards

**Module:** Ops, cost control, and monitoring  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Define golden signals: success, latency, approvals, errors, cost.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Alert on skipped_approval, error spikes, cost anomalies.

### Beat 2

SLOs: brief ready < 3m p95; approval lag < 15m.

### Beat 3

Classroom demos use fictional metrics only.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Alert on skipped_approval, error spikes, cost anomalies.…”

*(Beat 2)*  
“SLOs: brief ready < 3m p95; approval lag < 15m.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Wait for user complaints.

**After**

> Alerts: Sev1 skipped gate; Sev2 cost >2× baseline.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Monitoring dashboards** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
