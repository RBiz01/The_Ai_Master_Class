# Lesson 3.2 — Writing exemplars that teach the pattern

**Module:** Few-shot & exemplars that stick  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-exemplar-anatomy.svg`

---

## Learning objective

Write positive few-shot exemplars that teach **structure, tone, and decision rules**—not one-off trivia from a single lucky paste.

## Teaching

### Anatomy of an exemplar (see diagram)

1. **Label** — `EXAMPLE 1 (good)`  
2. **Input** — short, realistic, same distribution as Monday’s paste  
3. **Output** — the gold answer in the exact target format  
4. **Optional note** — one line on *why* this output is correct (helps humans; models use it too)

```text
EXAMPLE 1 (good)
INPUT: Customer learner@example.com asks where order AO-1042 is. Warehouse confirms 2-day slip. Policy allows 10% courtesy credit.
OUTPUT:
{
  "customer_message": "Hi — thanks for checking on order AO-1042. ...",
  "offer_applied": "10% courtesy credit on next invoice",
  "needs_human_review": false
}
WHY: Acknowledges first, states known delay without inventing ETA, applies allowed offer, calm tone.
```

### Rules for exemplars that generalize

| Do | Don’t |
|----|-------|
| Match the production FORMAT exactly | Show a prose essay when you need JSON |
| Vary surface facts (IDs, names) keep the rule | Copy the same paragraph twice |
| Keep inputs short enough to scan | Paste 2,000-word novels as “examples” |
| Teach the decision (credit vs apology) | Encode accidental jokes from last Tuesday |

### Two strong beats usually beat five weak ones

Exemplar #1: happy path.  
Exemplar #2: common edge (missing ETA, policy limit, BLOCKER).  
Stop until a contrast/near-miss is needed (Lesson 3).

### Talk-over narration

*(Beat 1)*  
“An exemplar is a teaching artifact. Input and output must look like production—or you’re teaching the wrong class.”

*(Beat 2)*  
“Open the anatomy diagram: label, input, output, why. If any piece is missing, the model invents the pattern.”

*(Beat 3)*  
“In the interactive, you’ll assemble one gold exemplar for an Acme Ops reply.”

## Worked micro-example

**Weak exemplar**

> Example: Be nice. “We’re sorry for the inconvenience.”

**Strong exemplar**

Shows full JSON (or full email), includes order ID, applies the real policy lever, ends with a next step—same shape as the FORMAT block.

## Practice

Complete `l02-interactive.html`: build one gold exemplar with label, input, output, why.

## Takeaway

**Exemplars teach the pattern you want repeated.** Match format. Vary facts. Name the decision.
