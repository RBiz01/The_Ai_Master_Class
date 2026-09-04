# Lesson 6.1 — Cataloging prompts your team will reuse

**Module:** Prompt libraries for real workflows  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Design a personal (or Acme Ops team) prompt library card so winners are findable, owned, and versioned—not lost in chat history.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### Library card fields (minimum)

| Field | Why |
|-------|-----|
| **Name** | `ops.customer-delay-json` — searchable |
| **Version** | `v1.2` — changelog lives nearby |
| **Owner** | `learner@example.com` — who maintains |
| **When to use** | One sentence trigger |
| **When NOT to use** | Avoid misuse |
| **Body** | The prompt (GCCF + extras) |
| **Eval hooks** | Link to rubric / golden set ids |

### Naming that ships

```text
{domain}.{job}-{format}
ops.customer-delay-json
ops.launch-blurb-internal
research.competitor-synth-bullets
```

Avoid `final_FINAL_v3_really`. Versions are a field, not a filename scream.

### What belongs in the library

Prompts you reuse weekly, with a rubric or golden set. One-off jokes and temporary hacks stay out—or get a `scratch/` tag with a kill date.

### Talk-over narration

*(Beat 1)*  
“A library is not a junk drawer. Cards have owners and when-to-use lines.”

*(Beat 2)*  
“If a teammate can’t find it in ten seconds, it doesn’t exist on Monday.”

*(Beat 3)*  
“In the drill, you’ll file one Acme Ops card with the required fields.”

## Worked micro-example

**Bad:** “that good email prompt from Tuesday.”  
**Good:** `ops.customer-delay-json` v1.2 · owner learner@example.com · when: warehouse-confirmed slip · body + eval hooks.

## Practice

Open `l01-interactive.html` and file a library card.

## Takeaway

**Name · version · owner · when-to-use.** Catalog like you mean to ship.
