# Lesson 5.1 — Rubrics beat vibes

**Module:** Evaluation, rubrics, and iteration  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Write a short rubric (3–5 criteria) that catches **real** Acme Ops failures—not vague “sounds good” scores.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### Vibes vs criteria

| Vibes | Rubric |
|-------|--------|
| “Feels polished” | Criterion + pass/fail or 0–2 score |
| “I’d send it” | Named cliff: invented ETA = automatic fail |
| New opinion each run | Same card every Monday |

### Anatomy of a working rubric

1. **Criterion name** — Format integrity  
2. **What pass looks like** — All required keys; no prose wrapper  
3. **What fail looks like** — Missing key, invented field, essay before JSON  
4. **Weight (optional)** — Hard fail vs soft preference

### Acme Ops starter criteria

| Criterion | Hard fail if… |
|-----------|----------------|
| Factual grounding | Invents dates, owners, or offers not in CONTEXT |
| Format | Wrong shape (JSON vs table vs bullets) |
| Policy | Applies disallowed credit / skips required review |
| Tone / audience | Customer paste reads like internal scratchpad |

Keep to **four**. More criteria → scoring theater.

### Talk-over narration

*(Beat 1)*  
“If you can’t name the failure, you can’t stop it. Rubrics name the cliffs.”

*(Beat 2)*  
“Pass/fail beats poetic 1–10 scores for ops work. Save nuance for tone only.”

*(Beat 3)*  
“In the drill, you’ll score two outputs against a four-criterion card.”

## Worked micro-example

**Vibe score:** “B+ — pretty good.”  
**Rubric score:** Format pass · Facts fail (invented Friday) · Policy pass · Tone pass → **do not ship**.

## Practice

Open `l01-interactive.html` and score two Acme Ops outputs.

## Takeaway

**Name the cliff or you’ll keep falling off it.** Rubrics beat vibes every Monday.
