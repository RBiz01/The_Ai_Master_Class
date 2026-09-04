# Lesson 5.4 — Model-agnostic eval habits

**Module:** Evaluation, rubrics, and iteration  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Decide when to change the **prompt** versus the **process**—and keep rubrics/golden sets portable across ChatGPT, Claude, Gemini, or whatever Acme Ops uses next quarter.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Prompt vs process

| Change the prompt when… | Change the process when… |
|--------------------------|---------------------------|
| Same model fails the same criterion | You need a human gate (legal, refunds) |
| Format/facts/policy can be stated | Task spans tools (sheet → chat → email) |
| A patch fixes the golden set | Latency/cost needs caching or batching |
| Exemplars clarify judgment | Decomposition into multiple steps is clearer |

### Model-agnostic kit

Store: rubric card · golden set · prompt version · changelog.  
Do **not** store: UI screenshots of one vendor, temperature folklore as gospel, or “works on my model” without cases.

### Cheap eval habits

1. Spot-check 3 golden cases after every prompt edit.  
2. Weekly: one live Acme Ops paste scored on the rubric.  
3. Retire cases that no longer match the workflow.

### Talk-over narration

*(Beat 1)*  
“Tools churn. Rubrics and golden sets shouldn’t. Keep the kit portable.”

*(Beat 2)*  
“Sometimes the prompt is fine—the process needs a human review gate. Say that out loud.”

*(Beat 3)*  
“In the interactive, you’ll choose prompt vs process for four Acme Ops scenarios.”

## Worked micro-example

**Prompt fix:** JSON keys missing → tighten FORMAT.  
**Process fix:** Refunds over $50 always need human review → checklist step outside the model.

## Practice

Complete `l04-interactive.html`: prompt vs process calls.

## Takeaway

**Portable eval beats vendor folklore.** Patch the prompt—or change the process—on purpose.
