# Lesson 6.4 — Versioning, handoff, and governance

**Module:** Prompt libraries for real workflows  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Apply light governance: version bumps, handoff notes, retirement rules, and a hard list of **what never to paste** into prompts or libraries.

## Teaching

### Versioning

| Bump | When |
|------|------|
| **vX.Y+1** | Patch (constraint, format tweak) |
| **v(X+1).0** | Behavior change (new policy, new output shape) |
| **Retire** | Workflow dead or unsafe |

Changelog one-liners live on the card: `v1.2 — blocked invented ETAs`.

### Handoff block

```text
HANDOFF:
- Owner: learner@example.com
- Eval: rubric-customer-json + golden-delay-v1
- Last scored: 2026-09-01
- Known gaps: …
```

### Never paste (governance)

- Real customer PII / secrets / API keys  
- Live credentials or private URLs with tokens  
- Unredacted employee performance notes  
- Anything your policy marks confidential

Use fictional stand-ins in examples (`learner@example.com`, `AO-1042`).

### Capstone: Monday-morning kit

Ship ≥3 library cards (email, status, research) + versions + owners. That’s the course close.

### Talk-over narration

*(Beat 1)*  
“Governance is boring until someone pastes a secret. Keep the never-paste list short and sacred.”

*(Beat 2)*  
“Handoff means the next owner can re-score without asking you on Slack.”

*(Beat 3)*  
“In the interactive, you’ll version a card and flag governance misses.”

## Worked micro-example

**Fail:** Library body includes a real API key.  
**Pass:** Redacted; never-paste list on the governance card; version bumped after policy change.

## Practice

Complete `l04-interactive.html`: version + governance drill (capstone check).

## Takeaway

**Version · handoff · never-paste.** Your Monday kit is a product—treat it like one.
