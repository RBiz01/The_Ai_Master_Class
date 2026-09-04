# Lesson 5.2 — Building a tiny golden set

**Module:** Evaluation, rubrics, and iteration  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-eval-loop.svg`

---

## Learning objective

Build a pocket eval set—**happy path, edge, and cliff**—so you can re-check a prompt in five minutes after any change.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Building a tiny golden set).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Build a pocket eval set—**happy path, edge, and cliff**—so you can re-check a prompt in five minutes after any change.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Tiny beats huge

Three to five fixed cases beat a spreadsheet you’ll never open. Each case needs: input paste, expected properties, and which rubric criteria it stresses.

```text
CASE: credit-path-happy
INPUT: … AO-1042 slip confirmed …
EXPECT: offer_applied includes credit; no ETA; JSON only
STRESSES: policy · format · facts
```

### The three flavors

| Flavor | Purpose |
|--------|---------|
| **Happy** | Confirms the common path still works |
| **Edge** | Missing ETA, unconfirmed delay, review flag |
| **Cliff** | Temptation to invent dates or wrong offer |

### Eval loop (see diagram)

Score → Patch one thing → Re-run golden set → Ship or patch again. Never change five knobs at once.

### Talk-over narration

*(Beat 1)*  
“A golden set is your regression suite for prompts. Tiny and ruthless.”

*(Beat 2)*  
“Open the eval-loop diagram: score, patch, re-run, decide. That’s the whole sport.”

*(Beat 3)*  
“In the interactive, you’ll file three cases for Acme Ops replies.”

## Worked micro-example

Happy: confirmed slip → credit JSON.  
Edge: unconfirmed delay → apology + review.  
Cliff: model invents Friday → must fail Facts.

## Practice

Complete `l02-interactive.html`: define happy, edge, and cliff cases.

## Takeaway

**Three honest cases beat fifty dusty ones.** Happy · edge · cliff.
