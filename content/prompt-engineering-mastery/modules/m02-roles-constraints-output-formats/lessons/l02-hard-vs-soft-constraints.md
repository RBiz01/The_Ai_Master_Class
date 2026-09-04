# Lesson 2.2 — Hard vs soft constraints

**Module:** Roles, constraints, and output formats  
**Duration:** ~8–10 min teaching + ~4 min interactive  
**Interactive:** `l02-interactive.html`  
**Diagram:** `../assets/diagram-roles-constraints-formats.svg`

---

## Learning objective

Separate **hard** constraints (must / must-not) from **soft** preferences (nice-to-have), and set an explicit priority when they collide.

## What to do

1. Cue up the **Lesson video** and watch it once before you dig into the text.
2. Read **Teaching** carefully — especially the worked example you can reuse Monday.
3. Open `l02-interactive.html` and follow its Instructions until you hit the success state (this locks in: Hard vs soft constraints).
4. Apply the idea once in your words (sticky note or note app is fine).
5. **You’re done when:** you can explain — in plain language — *Separate **hard** constraints (must / must-not) from **soft** preferences (nice-to-have), and set an explicit priority when they collide.* and `l02-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l02-video.mp4)

**Video:** `assets/l02-video.mp4` — example/theme clip for this lesson.

## Teaching

### Two buckets

| Hard (non-negotiable) | Soft (preference) |
|-----------------------|-------------------|
| Must include ticket IDs from the paste | Prefer shorter sentences |
| Must not invent vendors | Prefer active voice |
| Max 5 bullets | Prefer starting with the biggest risk |
| Label blockers with the word BLOCKER | Prefer friendly tone if space allows |

Models treat every sentence like a rule unless you say otherwise. Soft preferences written like hard laws create silent conflicts.

### Label them in the prompt

```text
HARD CONSTRAINTS:
- Max 5 bullets
- No speculation beyond the emails
- Mark go-live threats with BLOCKER
- Preserve ticket IDs and dates exactly

SOFT PREFERENCES:
- Lead with the highest-severity item when possible
- Prefer plain words over jargon
```

### Priority line (conflict breaker)

When two hard constraints might fight, name the winner:

```text
PRIORITY: If content won’t fit in 5 bullets, keep all BLOCKERs and drop WATCH items.
```

### Diagram link

Open `diagram-roles-constraints-formats.svg`: Role sits on top; **Hard** fences the output; **Soft** nudges style; **Format** packages the result. Soft never cuts the fence.

### Common Acme Ops collisions

| Collision | Fix |
|-----------|-----|
| “Be brief” + “cover everything” | Priority: brief; top 3 only |
| “Be thorough” + “no speculation” | Thorough *within* the paste only |
| “Friendly” + “escalate firmly” | Soft: friendly; Hard: must include next step + owner |

### Talk-over narration

*(Beat 1)*  
“Hard means break-the-build if violated. Soft means ‘when you have room.’”

*(Beat 2)*  
“If you don’t label them, the model invents its own priority—and invents differently tomorrow.”

*(Beat 3)*  
“In the interactive, you’ll sort mixed constraints into Hard, Soft, and Priority.”

## Worked micro-example

**Messy**

> Keep it short but cover every vendor in depth, be warm, never speculate, use BLOCKER, maybe a joke if it fits.

**Sorted**

```text
HARD: ≤5 bullets; no speculation; use BLOCKER for go-live threats; no jokes in standup digests.
SOFT: Warm phrasing if it doesn’t add words; prefer plain language.
PRIORITY: BLOCKERs over completeness.
```

## Practice

Complete `l02-interactive.html`: classify and write a priority line.

## Takeaway

**Hard fences. Soft nudges. Priority breaks ties.** Label all three or accept random tradeoffs.
