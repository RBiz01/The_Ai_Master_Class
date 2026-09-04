# Lesson 2.3 — Cleaning & metadata that retrieval needs

**Module:** Chunking & document prep  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Clean junk and attach metadata (title, section, version, audience) so filters and citations work.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, teams need answers grounded in the handbook—not confident guesses. This lesson locks a skill you’ll reuse all week.

### Beat 1

Strip headers/footers, repeated TOC noise, and watermark garbage before embedding.

### Beat 2

Metadata wins: doc_id, section, version date, audience (ops vs exec), confidentiality.

### Beat 3

Acme Ops: tag ‘approved handbook v2026.08’ separately from ‘draft SOP — do not cite’.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“Strip headers/footers, repeated TOC noise, and watermark garbage before embedding.”

*(Beat 2)*  
“Metadata wins: doc_id, section, version date, audience (ops vs exec), confidentiality.”

*(Beat 3)*  
“You’re done with this lesson when you can apply this on an Acme Ops handbook scenario without guessing.”

## Worked micro-example

**Before**

> Embed raw PDF text dumps with page numbers glued into every sentence.

**After**

> Clean body text; metadata: {doc:'handbook', section:'escalation', version:'2026.08', status:'approved'}.

## Practice

Open `l03-interactive.html` and complete the drill until the checker lights green.

## Takeaway

**Cleaning & metadata that retrieval needs** — practice it on the fictional Acme Ops handbook before you touch production docs. No real secrets or PII.
