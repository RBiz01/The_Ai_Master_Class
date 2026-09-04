# Lesson 3.1 — Zero-shot vs few-shot: when to invest

**Module:** Few-shot & exemplars that stick  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Decide when a clear GCCF + role + format prompt is enough (zero-shot), and when investing in exemplars pays off for Acme Ops workflows.

## Teaching

### Definitions that ship

| Mode | What you give | Best when |
|------|---------------|-----------|
| **Zero-shot** | Instructions only (GCCF, role, constraints, format) | Task is common; success is easy to describe; format is rigid |
| **Few-shot** | Instructions + 1–5 input→output examples | Tone is subtle; edge cases matter; “almost right” is expensive |

Few-shot is not “more prompt for sport.” It’s **paid teaching** when words alone underspecify the pattern.

### Invest in exemplars when…

1. **Tone is the product** — customer replies, exec notes, brand voice.  
2. **Boundary cases confuse the model** — BLOCKER vs WATCH, refund vs credit.  
3. **Format is sticky but judgment varies** — same JSON keys, different severity calls.  
4. **You’ve rewritten the instruction three times** and still get drift.

### Stay zero-shot when…

1. The ask is a straight transform (summarize → 5 bullets with named headers).  
2. A schema + hard constraints already pin the output.  
3. Examples would mostly repeat the instruction without new signal.  
4. You’re in a tight token budget and quality of one golden example isn’t ready yet—fix GCCF first.

### Cost / benefit sketch

```text
Zero-shot cost: low tokens, fast to write
Few-shot cost: tokens + curation time
Payoff: fewer retries, less tone drift, shared team pattern
```

If retries already cost more than writing two good examples, invest.

### Talk-over narration

*(Beat 1)*  
“Zero-shot is the default. Few-shot is a deliberate spend when description fails and demonstration works.”

*(Beat 2)*  
“At Acme Ops, severity labeling and customer tone usually earn exemplars. Pure ‘five bullets under Risk/Action’ often doesn’t.”

*(Beat 3)*  
“In the drill, you’ll classify tasks as zero-shot or few-shot—and justify the spend.”

## Worked micro-example

**Zero-shot enough**

> GOAL: Table of open tickets with columns ID | Owner | Status. CONTEXT: paste below. FORMAT: markdown table only.

**Few-shot earns it**

> Same facts, but teach when a delay is a customer apology vs a credit offer vs an internal-only note—tone and policy boundaries.

## Practice

Open `l01-interactive.html` and classify Acme Ops tasks.

## Takeaway

**Describe when you can. Demonstrate when you must.** Exemplars are a budget line, not a personality trait.
