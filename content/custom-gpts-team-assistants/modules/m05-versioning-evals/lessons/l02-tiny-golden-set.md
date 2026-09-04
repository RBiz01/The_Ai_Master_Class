# Lesson 5.2 — Tiny golden sets for assistants

**Module:** Versioning, evals & iteration  
**Duration:** ~6–8 min teaching + ~4–8 min interactive  
**Interactive:** `l02-interactive.html`

---

## Learning objective

Build 8–15 prompts with expected traits (must include / must refuse) covering happy path and edges.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Beat 1

Golden set ≠ giant benchmark. Ten sharp cases beat 200 vague ones.

### Beat 2

Include: normal triage, missing info, out-of-scope, P1 escalate, citation check.

### Beat 3

Score with a rubric: correctness, refusal, format, tone—not vibes.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“At Acme Ops, assistants only work when teammates trust them. This lesson locks that trust.”

*(Beat 2)*  
“Stay model-agnostic: the same pattern applies whether you ship a Custom GPT, a Project, or a Gem.”

*(Beat 3)*  
“You’re done when you can apply this on a fictional Acme Ops workflow without guessing.”

## Worked micro-example

**Before**

> Click around until it 'feels better'.

**After**

> 12 cases in a sheet: input, must_include, must_refuse, pass/fail. Run before every publish.

## Practice

Open `l02-interactive.html` and complete the drill until success criteria turn green.

## Takeaway

Apply this lesson on a fictional **Acme Ops** assistant before Monday—then version what you ship.
