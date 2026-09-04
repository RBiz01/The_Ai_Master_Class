# Module 1 example video — Live rewrite: bad email-summary prompt

**Length:** ~5–8 minutes  
**Scene:** Screen capture + talk-over  
**Cast:** Instructor (VO) · fictional Acme Ops scenario  
**Safety:** No real PII — use `learner@example.com`, order `AO-1042`, vendor “Northwind Parts”

---

## Setup (show on screen)

**Bad prompt**

```text
Summarize the emails.
```

**Paste (fictional inbox slice)**

```text
From: northwind@example.com
Subject: SSL cert delay
Body: Cert shipment slipped to Thursday. Earliest install Friday 2pm CT.

From: billing@example.com
Subject: Invoice AO-1042
Body: Reminder only — no action needed for go-live.

From: jordan@acmeops.example
Subject: Standup note
Body: Need vendor risks before 9am standup. Portal go-live Friday 9am CT.
```

---

## Talk-over + demo beats

### Beat 1 — Fail it live (0:00–1:00)
Paste the bad prompt + emails. Show two different model runs (or simulate two styles): one essay, one subject-line dump. VO: “Same paste, different shape. The prompt never decided.”

### Beat 2 — Diagnose (1:00–2:00)
On a sticky note overlay, mark missing **audience**, **scope**, **format**. VO: “We’re not mad at the model. We’re missing GCCF.”

### Beat 3 — Rebuild GCCF (2:00–4:30)
Type live:

```text
GOAL: Standup-ready digest of vendor items that could block Friday portal go-live.
CONTEXT: Acme Ops; Jordan facilitates standup; go-live Friday 9am CT; emails below are last 24h.
CONSTRAINTS: Max 5 bullets; no speculation; label go-live threats with BLOCKER; ignore pure billing noise unless it blocks launch.
FORMAT: Markdown — ## Risk and ## Action — bullets only.
```

Run once. Highlight BLOCKER on the SSL cert; billing marked as non-blocking or omitted.

### Beat 4 — Specificity check (4:30–6:00)
Show a bad “upgrade”: forcing exact adjectives and rhymes. Delete it. VO: “Decisions stay; decoration goes. That’s specificity without overfitting.”

### Beat 5 — Close (6:00–7:00)
Split screen: before/after. CTA: “Pause and do Lesson 2’s interactive with your own GCCF.”

---

## On-screen bullets

- Vague ask → model owns decisions  
- Fill Goal · Context · Constraints · Format  
- Mark BLOCKERs; drop noise  
- Don’t overfit wording  

---

## B-roll / UI callouts

- Cursor underline on “Summarize the emails.”  
- Zoom on FORMAT lines.  
- Success toast metaphor: consistent second run with same brief.
