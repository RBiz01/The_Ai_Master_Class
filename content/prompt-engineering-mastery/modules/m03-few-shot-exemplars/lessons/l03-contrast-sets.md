# Lesson 3.3 — Contrast sets and near-miss examples

**Module:** Few-shot & exemplars that stick  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Add contrast sets and near-miss exemplars that teach boundaries—what looks almost right but fails the Acme Ops policy or format.

## Teaching

### Why positive-only sets drift

If every example is a perfect customer apology with a credit, the model may **always** offer credit—even when policy says apology-only. Contrast teaches the fence.

### Contrast set = good vs bad (or A vs B)

```text
EXAMPLE (good) — delay with allowed credit → include offer + calm apology
EXAMPLE (near-miss / do not imitate) — same delay but invents Friday 2pm ETA → fails HARD: no invented dates
```

Label near-misses clearly: `NEAR-MISS (do not imitate)` or `BAD EXAMPLE — what went wrong: …`

### Near-miss catalog (Acme Ops)

| Near-miss | What’s wrong | Teach instead |
|-----------|--------------|---------------|
| Invented ETA | Speculates beyond paste | Say what’s known; ask clarifying question |
| Essay wrapper around JSON | Format drift | ONLY JSON |
| Blame the vendor in customer voice | Tone/brand break | Accountable, no blame |
| Credit when policy is apology-only | Policy miss | Match offer to policy flag |
| BLOCKER on billing noise | Severity miss | BLOCKER only for go-live threats |

### How many?

- 2 good exemplars covering main patterns  
- 1 near-miss for your most expensive failure  
- Add a second near-miss only if two failure modes both burn retries

### Talk-over narration

*(Beat 1)*  
“Contrast is how you teach the fence. Without a near-miss, ‘almost right’ keeps sneaking through.”

*(Beat 2)*  
“Label bad examples so the model doesn’t treat them as gold. Say what failed in one line.”

*(Beat 3)*  
“In the drill, you’ll pair a good exemplar with a near-miss and name the failure.”

## Worked micro-example

**Good**

Customer delay; policy allows credit → JSON with offer, no invented ETA.

**Near-miss**

Same input → warm essay promising “arrives Friday for sure.”  
**Wrong because:** invented ETA + format drift + over-promise.

## Practice

Open `l03-interactive.html` and build a contrast pair.

## Takeaway

**Good shows the target. Near-miss shows the cliff.** Label both or you teach the cliff by accident.
