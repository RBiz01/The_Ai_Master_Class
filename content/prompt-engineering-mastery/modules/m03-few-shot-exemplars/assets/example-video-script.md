# Module 3 example video — Craft 2 gold + 1 near-miss (Acme Ops replies)

**Length:** ~5–8 minutes  
**Scene:** Screen capture + talk-over  
**Cast:** Instructor (VO) · fictional Acme Ops Support  
**Safety:** `learner@example.com`, order `AO-1042`, no real PII

---

## Setup (show on screen)

**Task**

Customer delay replies in JSON with keys: `customer_message`, `offer_applied`, `needs_human_review`.

**Policy flags (fictional)**

- Credit allowed when warehouse confirms slip ≥1 day  
- Apology-only when delay unconfirmed  
- Never invent delivery dates

---

## Talk-over + demo beats

### Beat 1 — Why few-shot (0:00–1:00)
Show a zero-shot run that invents “arrives Friday” and wraps JSON in an essay. VO: “Format was specified. Judgment wasn’t demonstrated.”

### Beat 2 — Gold exemplar 1 · credit path (1:00–2:30)
Type live:

```text
EXAMPLE 1 (good) — credit path
INPUT: learner@example.com · AO-1042 · warehouse confirms 2-day slip · credit allowed
OUTPUT: { customer_message: "...AO-1042...", offer_applied: "10% courtesy credit on next invoice", needs_human_review: false }
WHY: Known delay, allowed offer, no invented ETA, calm tone.
```

### Beat 3 — Gold exemplar 2 · apology-only (2:30–4:00)
Second example where delay is unconfirmed → `offer_applied: "none"`, ask clarifying question, maybe `needs_human_review: true`. VO: “Same format, different decision. That’s why we need two golds—not five clones.”

### Beat 4 — Near-miss (4:00–5:30)
```text
NEAR-MISS (do not imitate)
INPUT: same as Example 1
OUTPUT: essay promising Friday delivery for sure + JSON afterthought
WRONG BECAUSE: invented ETA + format drift + over-promise
```

### Beat 5 — Budget trim + close (5:30–6:30)
Show a bloated fifth clone deleted. CTA: “Build your contrast pair in Lesson 3’s interactive.”

---

## On-screen bullets

- Zero-shot failed on judgment  
- 2 golds = two decisions  
- 1 near-miss = costliest cliff  
- Delete clones for tokens  

---

## B-roll / UI callouts

- Red strike on invented Friday ETA.  
- Zoom on WHY / WRONG BECAUSE lines.  
- Lean pack of three blocks highlighted.
