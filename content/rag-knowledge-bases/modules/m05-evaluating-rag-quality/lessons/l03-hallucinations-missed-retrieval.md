# Lesson 5.3 — Spotting hallucinations and missed retrieval

**Module:** Evaluating RAG quality  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Diagnose whether a bad answer is invented content or a retrieval miss—and pick the right fix.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Hallucination: answer claims facts not in retrieved chunks → tighten grounding/refusal.

### Beat 2

Missed retrieval: right fact exists in corpus but wasn’t retrieved → fix chunking/query/hybrid.

### Beat 3

Both can co-occur. Trace: show retrieved IDs beside the answer every time.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Hallucination: answer claims facts not in retrieved chunks → tighten grounding/refusal.”

*(Beat 2)*  
“Missed retrieval: right fact exists in corpus but wasn’t retrieved → fix chunking/query/hybrid.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> The model is broken—wipe the index.

**After**

> Trace shows wrong section retrieved → hybrid + filter on ‘escalation’. Faithfulness OK on wrong docs is still a fail.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Spotting hallucinations and missed retrieval** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
