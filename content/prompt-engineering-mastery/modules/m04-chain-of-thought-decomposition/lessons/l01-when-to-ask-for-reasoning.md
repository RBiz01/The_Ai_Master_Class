# Lesson 4.1 — When to ask for reasoning (and when not to)

**Module:** Chain-of-thought and decomposition  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Decide when asking the model to show reasoning improves accuracy—and when it wastes tokens, slows paste-ready work, or invents a confident-sounding chain that is still wrong.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### Reasoning is a tool, not a personality

| Ask for reasoning when… | Skip visible reasoning when… |
|--------------------------|------------------------------|
| Multi-hop logic or trade-offs | Pure format transforms |
| Policy gates (credit vs apology) | Schema already pins the answer |
| Math, counts, or dependencies | Tone-only rewrite with clear constraints |
| You need an audit trail for a human | Customer-facing text must stay clean |

Forced “think step by step” on every email is a failure mode: longer outputs, leaked scratchpads, and fake rigor.

### Failure modes of forced CoT

1. **Ceremony** — five paragraphs of “First I will…” before a one-line answer.  
2. **Invented premises** — the chain invents facts to stay coherent.  
3. **Leakage** — scratchpad language lands in the customer paste.  
4. **False confidence** — a tidy chain that still picks the wrong policy.

### Decision rule for Acme Ops

```text
IF judgment + dependencies → ask for a short plan (then final only)
IF transform + schema → zero ceremony, output format only
IF customer-facing → never show the scratchpad in the deliverable
```

### Talk-over narration

*(Beat 1)*  
“Chain-of-thought is optional scaffolding. Use it when the task can fail quietly without it.”

*(Beat 2)*  
“At Acme Ops, launch checklists and severity calls earn a plan. ‘Rewrite this status in five bullets’ usually does not.”

*(Beat 3)*  
“In the drill, you’ll classify tasks—and flag when forced CoT would hurt.”

## Worked micro-example

**Skip CoT**

> GOAL: Markdown table ID | Owner | Status from the paste. FORMAT: table only.

**Ask for a short plan**

> GOAL: Decide credit vs apology for AO-1042, then draft the customer JSON. First list 3 decision criteria in a scratchpad, then output JSON only under FINAL.

## Practice

Open `l01-interactive.html` and classify when reasoning earns its keep.

## Takeaway

**Reasoning on demand—not by default.** If the answer must ship clean, keep the chain off the final paste.
