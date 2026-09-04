# Lesson 4.4 — Self-checks and verification steps

**Module:** Chain-of-thought and decomposition  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Add lightweight self-checks that catch real Acme Ops failures—invented facts, format drift, policy misses—without turning every prompt into a compliance novel.

## What to do

1. Play the **Lesson video** all the way through — treat it as the cold open.
2. Read **Teaching** and the worked micro-example like a playbook, not a skim.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Self-checks and verification steps).
4. Capture a one-sentence Monday-morning takeaway you could paste into Slack.
5. **You’re done when:** you can explain — in plain language — *Add lightweight self-checks that catch real Acme Ops failures—invented facts, format drift, policy misses—without turning every prompt into a compliance novel.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Cheap checks beat vibes

After FINAL (or as a last PROCESS step), ask the model to verify against a short checklist—or do it yourself in 30 seconds.

```text
VERIFY (yes/no only):
- [ ] No invented dates / ETAs
- [ ] FORMAT keys all present
- [ ] Policy offer matches CONTEXT
- [ ] Scratchpad language absent from FINAL
If any NO → fix FINAL only, then re-verify.
```

### What to check (Acme Ops defaults)

| Risk | Check |
|------|-------|
| Hallucinated ETA | “Any specific date not in CONTEXT?” |
| Wrong offer | “Offer matches allowed policy?” |
| Format break | “JSON/table only?” |
| Tone leak | “Any ‘as an AI’ or scratchpad wording?” |

### Keep it short

Three to five binary checks. Long rubrics belong in Module 5. Here you want a seatbelt, not a second project.

### Talk-over narration

*(Beat 1)*  
“Self-checks are the last mile. Plan got you structure; verify catches the expensive miss.”

*(Beat 2)*  
“Yes/no beats essays. If the model can’t pass its own checklist, regenerate FINAL—not the whole philosophy.”

*(Beat 3)*  
“In the interactive, you’ll attach a four-item verify block to a plan-then-answer prompt.”

## Worked micro-example

**Without check** — customer email invents “arrives Friday.”  
**With check** — VERIFY flags invented date → FINAL rewritten without a date.

## Practice

Complete `l04-interactive.html`: write a VERIFY block that catches Acme Ops cliffs.

## Takeaway

**Verify the cliffs you actually fall off.** Short, binary, attached to FINAL.
