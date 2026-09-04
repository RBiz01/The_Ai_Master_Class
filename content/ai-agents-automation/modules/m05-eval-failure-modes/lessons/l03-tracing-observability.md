# Lesson 5.3 — Tracing and observability

**Module:** Evaluation harnesses & failure modes  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Specify trace spans: LLM, tool, approval, cost, latency.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Every tool call gets span id, args hash, latency, status.

### Beat 2

Redact secrets; keep fictional Acme Ops ids only in demos.

### Beat 3

Dashboards: success rate, approval lag, $/run, loop count.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Every tool call gets span id, args hash, latency, status.…”

*(Beat 2)*  
“Redact secrets; keep fictional Acme Ops ids only in demos.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> Print statements in prod.

**After**

> Structured trace with run_id, spans, token_cost, gate_events.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Tracing and observability** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
