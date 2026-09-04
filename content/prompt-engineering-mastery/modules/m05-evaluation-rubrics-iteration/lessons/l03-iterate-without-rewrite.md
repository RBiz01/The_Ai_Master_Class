# Lesson 5.3 — Iterate without rewriting from scratch

**Module:** Evaluation, rubrics, and iteration  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Patch failing prompts surgically—change one lever at a time—so you don’t thrash into a blank page every time a score dips.

## Teaching

### Thrash looks like

- Rewriting the whole prompt after one bad sample  
- Changing role + format + exemplars + CoT in one go  
- No record of what you tried

### Surgical patch order

1. Read rubric fails (which criteria?).  
2. Patch the **smallest** instruction that addresses those fails.  
3. Re-run the **same** golden set.  
4. Keep a one-line changelog: `v1.2 — added no-invented-ETA hard constraint`.

### Patch menu

| Fail | First patch |
|------|-------------|
| Format | Strengthen FORMAT + “no prose wrapper” |
| Facts | Hard constraint: only use CONTEXT facts |
| Policy | Add policy bullets or one exemplar |
| Tone | Tone lock / audience line — not a new persona essay |

### Talk-over narration

*(Beat 1)*  
“Iteration without thrash means one lever per round. Science, not superstition.”

*(Beat 2)*  
“If Facts fail, don’t rewrite the role. Add the no-invented-dates constraint and re-score.”

*(Beat 3)*  
“In the drill, you’ll choose the right patch for a scored failure.”

## Worked micro-example

**Fail:** Invented Friday.  
**Wrong:** New 400-word prompt.  
**Right:** Add `Never invent dates not in CONTEXT.` → re-run cliff case.

## Practice

Open `l03-interactive.html` and pick surgical patches.

## Takeaway

**One lever · same golden set · changelog.** That’s iteration that ships.
