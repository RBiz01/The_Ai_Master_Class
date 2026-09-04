# Lesson 4.3 — Decomposing multi-step work

**Module:** Chain-of-thought and decomposition  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Break a messy multi-step Acme Ops ask into ordered sub-prompts with clear handoffs—so each step has one goal and one format.

## What to do

1. Watch the **Lesson video** once for the visual hook.
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Decomposing multi-step work).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Break a messy multi-step Acme Ops ask into ordered sub-prompts with clear handoffs—so each step has one goal and one format.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — example/theme clip for this lesson.

## Teaching

### When one prompt is too fat

Symptoms: mixed audiences, mixed formats, more than three decision gates, or “also include…” piles. Split.

### Decomposition patterns

| Pattern | Use when | Shape |
|---------|----------|-------|
| **Pipeline** | Output of A feeds B | Extract → Decide → Draft |
| **Fan-out** | Parallel lanes | Risks · Owners · Comms separately |
| **Gate** | Policy must pass first | Check policy → only then draft |

### Sub-prompt card (reuse every time)

```text
SUB-TASK n: <verb + object>
INPUT FROM: <prior step or paste>
GOAL: …
FORMAT: …
DONE WHEN: <one sentence success>
```

### Anti-patterns

- One prompt that plans, decides credit, drafts customer + exec + Slack.  
- Sub-tasks with overlapping formats.  
- No “done when” → endless regen.

### Talk-over narration

*(Beat 1)*  
“Decomposition is project management for prompts. One job per call.”

*(Beat 2)*  
“Acme Ops launch checklists love pipelines: inventory risks → assign owners → draft the Monday note.”

*(Beat 3)*  
“In the drill, you’ll order three sub-tasks for a messy launch ask.”

## Worked micro-example

**Fat ask**

> “Figure out launch readiness, who owns what, and write the all-hands blurb.”

**Decomposed**

1. Extract blockers/watch items → table.  
2. Propose owners → Owner | Action | Due.  
3. Draft all-hands blurb from the approved table → ≤100 words.

## Practice

Open `l03-interactive.html` and order a three-step pipeline.

## Takeaway

**One goal, one format, one done-when per sub-task.** Fat prompts fail quietly.
