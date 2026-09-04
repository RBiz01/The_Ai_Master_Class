# Lesson 6.2 — Email, notes, and status update kits

**Module:** Prompt libraries for real workflows  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-library-taxonomy.svg`

---

## Learning objective

Assemble three reusable kits—**customer email**, **meeting notes**, and **status update**—using GCCF, tone locks, and formats that paste clean.

## Teaching

### Kit pattern

Every kit is a library card with a thin GCCF skeleton and placeholders:

```text
GOAL: …
CONTEXT: {{paste}}
CONSTRAINTS: …
FORMAT: …
```

### Three Acme Ops starters

| Kit | Format lock | Hard constraints |
|-----|-------------|------------------|
| **Customer email** | Short email body | No invented ETA; policy offers only |
| **Meeting notes** | Decisions · Owners · Open questions | No new facts not said in transcript |
| **Status update** | ## Done / ## Next / ## Risks | BLOCKER label rule; ≤150 words |

### Taxonomy (see diagram)

Folders: `email/` · `notes/` · `status/` · `research/` · `_governance/`. Cards live in folders; versions live on cards.

### Talk-over narration

*(Beat 1)*  
“These three kits cover eighty percent of Monday ops paste work.”

*(Beat 2)*  
“Open the taxonomy diagram—same card shape, different FORMAT locks.”

*(Beat 3)*  
“In the interactive, you’ll complete placeholders for all three kits.”

## Worked micro-example

Status kit CONSTRAINTS: “Label BLOCKER only if customer-impacting and no owner yet.” FORMAT: three headers only.

## Practice

Complete `l02-interactive.html`: fill the three-kit skeleton.

## Takeaway

**Same card shape · different locks.** Email, notes, status—ready to paste.
