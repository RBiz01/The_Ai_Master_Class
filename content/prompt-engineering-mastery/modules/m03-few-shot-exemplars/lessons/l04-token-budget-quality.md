# Lesson 3.4 — Token budget and exemplar quality

**Module:** Few-shot & exemplars that stick  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Trim and rank exemplars so quality beats quantity—fit the pattern into a realistic token budget without deleting the teaching signal.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Tokens are rent

Every exemplar competes with: system instructions, the live paste, and the model’s answer. Bloated few-shot sets starve the actual job.

### Quality beats quantity

| Prefer | Over |
|--------|------|
| 2 sharp, diverse golds + 1 near-miss | 6 near-duplicates |
| Short inputs that still trigger the decision | Full email threads in every example |
| Outputs in final FORMAT only | Exemplars in a different shape “for readability” |
| One WHY line | Paragraph essays about your feelings |

### Trimming ritual (5 minutes)

1. **List the decisions** exemplars must teach (tone, severity, offer policy).  
2. **Keep one exemplar per decision** unless a second edge is mandatory.  
3. **Delete duplicates** that only change names/IDs without new rules.  
4. **Shorten inputs** to the facts that drive the decision.  
5. **Rehearse:** if a teammate can’t see the pattern in 30 seconds, rewrite—not lengthen.

### Budget heuristics (practical)

- Customer-reply kits: often **2 good + 1 near-miss**.  
- Severity labeling: **1 good BLOCKER, 1 good WATCH, 1 near-miss mislabel**.  
- If you’re past ~3–4 exemplars, you probably need better labels—not more samples.

### Talk-over narration

*(Beat 1)*  
“More examples aren’t free. They rent space from Monday’s paste.”

*(Beat 2)*  
“Rank by teaching power. Cut clones. Keep the near-miss that prevents your costliest failure.”

*(Beat 3)*  
“In the interactive, you’ll cut a bloated set down to a lean, high-signal pack.”

## Worked micro-example

**Bloated:** 5 customer apologies that all offer 10% credit with tiny name changes.  
**Lean:** 1 credit-path gold, 1 apology-only gold, 1 near-miss inventing an ETA.

## Practice

Complete `l04-interactive.html`: select which exemplars to keep and justify the cut.

## Module 3 wrap

You can choose zero vs few-shot, write gold exemplars, add contrast, and budget tokens. Next module: **chain-of-thought and decomposition** when the work itself is multi-step.
