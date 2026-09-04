# Lesson 5.1 — Agent failure taxonomy

**Module:** Evaluation harnesses & failure modes  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Categorize failures: wrong tool, loop, hallucination-as-action, missed gate, cost blowup.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams want automation that doesn’t just chat—it **researches, decides, and acts**. This lesson locks the skill you’ll reuse all week.

### Beat 1

Separate model errors from tool/runtime errors from policy errors.

### Beat 2

Wrong-stop and skipped-approval are severity-critical.

### Beat 3

Tag each Acme Ops incident with a failure class for trends.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Separate model errors from tool/runtime errors from policy errors.…”

*(Beat 2)*  
“Wrong-stop and skipped-approval are severity-critical.…”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops scenario without guessing.”

## Worked micro-example

**Before**

> It felt off.

**After**

> Class: skipped_approval; tool: send_email; severity: Sev1.

## Practice

Open `l01-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Agent failure taxonomy** — practice it on Acme Ops before you touch production systems. No real API keys; placeholders only.
