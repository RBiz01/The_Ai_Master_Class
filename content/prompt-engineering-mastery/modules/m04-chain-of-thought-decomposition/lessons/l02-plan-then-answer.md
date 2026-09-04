# Lesson 4.2 — Plan-then-answer patterns

**Module:** Chain-of-thought and decomposition  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-decompose-flow.svg`

---

## Learning objective

Write prompts that separate a short **scratchpad / plan** from a clean **FINAL** answer so teammates can paste without scrubbing.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Scratchpad vs final answer

| Lane | Purpose | What belongs |
|------|---------|--------------|
| **SCRATCHPAD / PLAN** | Think, rank, catch gaps | Bullets, risks, open questions |
| **FINAL** | Ship | Exact FORMAT only—no “I think…” |

Never mix the lanes. Instruct: “Put reasoning under SCRATCHPAD. Put the deliverable under FINAL. Do not put scratchpad text in FINAL.”

### Pattern that ships

```text
GOAL: …
CONTEXT: …
CONSTRAINTS: …
FORMAT: …

PROCESS:
1) Under ## SCRATCHPAD write a 3–5 bullet plan (private).
2) Under ## FINAL output only the deliverable in the FORMAT above.
3) Do not reference the scratchpad in FINAL.
```

### Plan length budget

- **3–5 bullets** for most ops work.  
- Longer plans belong in a **decomposition** (Lesson 3), not one mega-prompt.

### Talk-over narration

*(Beat 1)*  
“Plan-then-answer is the adult version of chain-of-thought: think briefly, ship clean.”

*(Beat 2)*  
“Open the decompose-flow diagram—messy ask becomes plan, then sub-tasks, then FINAL.”

*(Beat 3)*  
“In the interactive, you’ll write a plan-then-answer shell for an Acme Ops launch note.”

## Worked micro-example

**Leaky**

> Think step by step and write the customer email.

**Locked**

> SCRATCHPAD: 3 bullets on policy + risk. FINAL: customer email only, ≤120 words, no invented ETA.

## Practice

Complete `l02-interactive.html`: build a plan-then-answer prompt with both lanes labeled.

## Takeaway

**Scratchpads think. FINAL ships.** Label both—or the paste becomes a diary.
