# Module 2 example video — Live: fuzzy rewrite → JSON + tone lock

**Length:** ~5–8 minutes  
**Scene:** Screen capture + talk-over  
**Cast:** Instructor (VO) · fictional Acme Ops scenario  
**Safety:** No real PII — use `learner@example.com`, order `AO-1042`, vendor “Northwind Parts”

---

## Setup (show on screen)

**Fuzzy prompt**

```text
You are a brilliant helper. Make this customer thing nicer and structured somehow.
```

**Facts (fictional)**

```text
Customer: learner@example.com
Order: AO-1042
Issue: Shipment delayed; earliest delivery window unclear
Offer allowed: 10% courtesy credit on next invoice
Owner for follow-up: Acme Ops Support
```

---

## Talk-over + demo beats

### Beat 1 — Fail it live (0:00–1:00)
Run the fuzzy prompt. Show a warm essay with no JSON and a vague “we’ll get back to you ASAP.” VO: “Nicer isn’t a format. ASAP isn’t a next step.”

### Beat 2 — Add a real role (1:00–2:00)
Replace costume with:

```text
ROLE: Acme Ops Support editor.
Optimize for: calm accountability and one clear next step.
Refuse: emoji, slang, invented ETAs, blame.
```

### Beat 3 — Hard vs soft + priority (2:00–3:15)
Type:

```text
HARD: ≤90 words in the customer_message; include order AO-1042; no invented delivery date; offer 10% courtesy credit on next invoice; ask one clarifying question about preferred delivery window.
SOFT: Warm but not chatty; short sentences.
PRIORITY: Accuracy of facts over warmth if they conflict.
```

### Beat 4 — Parseable JSON + tone lock (3:15–5:30)
Add format:

```text
FORMAT: Return ONLY valid JSON:
{
  "customer_message": string,
  "internal_note": string,
  "offer_applied": "10% courtesy credit on next invoice",
  "needs_human_review": boolean
}
AUDIENCE: learner@example.com (customer) for customer_message; internal_note is for Acme Ops only.
TONE: Calm, professional, accountable.
```

Run once. Validate keys mentally. Highlight that `customer_message` stays under voice rules while `internal_note` can be blunt.

### Beat 5 — Close (5:30–6:30)
Split screen: fuzzy vs JSON contract. CTA: “Pause and do Lesson 3’s interactive—write your own parseable format block.”

---

## On-screen bullets

- Role changes decisions, not costume  
- Hard / Soft / Priority  
- JSON schema + empty-state thinking  
- Audience + tone locks on the customer field  

---

## B-roll / UI callouts

- Strike-through on “brilliant helper.”  
- Zoom on JSON keys.  
- Checkmark animation when output parses.
