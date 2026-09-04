# Lesson 2.1 — Role prompting that actually helps

**Module:** Roles, constraints, and output formats  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Write a role line that improves judgment or style for the task—without wasting tokens on theatrical personas that don’t change the answer.

## What to do

1. Watch the **Lesson video** once; pause only if a beat truly clicks for your role.
2. Work through **Teaching** and the worked example until you could explain it out loud.
3. Open `l01-interactive.html` and follow its Instructions until you hit the success state (this locks in: Role prompting that actually helps).
4. Jot one reusable line in your own words — something you’d actually use at work.
5. **You’re done when:** you can explain — in plain language — *Write a role line that improves judgment or style for the task—without wasting tokens on theatrical personas that don’t change the answer.* and `l01-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, someone pastes:

> “You are a world-class genius ninja rockstar ops wizard with 40 years of experience…”

…then asks for a five-bullet standup digest. The costume didn’t help. The digest still wanders.

**Roles help when they change decisions.** They fail when they only change the costume.

### When a role earns its keep

| Helps | Usually wastes tokens |
|-------|------------------------|
| Expertise the task needs (incident commander, AP analyst) | “World-class genius” with no domain |
| Perspective (skeptical reviewer, new-hire reader) | Celebrity impersonations |
| Workflow stance (editor who cuts fluff; coach who asks questions) | Long backstory the model never uses |

### Anatomy of a useful role

1. **Job title or stance** — one line, concrete.  
2. **What you optimize for** — accuracy, brevity, risk surfacing, customer calm.  
3. **What you refuse** — speculation, jargon, blame language (optional but powerful).

```text
ROLE: You are an Acme Ops incident scribe supporting Jordan’s standup.
Optimize for: clear BLOCKER vs WATCH calls; no speculation beyond the paste.
Refuse: blame language, fake vendor names, essay-length digests.
```

### Role ≠ Goal

Role is *who decides how to think*. Goal is *what must exist*. Keep both:

```text
ROLE: Senior customer-support editor for Acme Ops.
GOAL: Draft a calm reply to learner@example.com about delayed order AO-1042.
```

### Anti-patterns

- **Cosplay bloat** — paragraphs of childhood lore.  
- **Conflicting roles** — “be ruthless” + “be warm and never push back.”  
- **Role without task** — persona with no Goal / Format.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“If the role doesn’t change a decision the model would otherwise guess, delete it.”

*(Beat 2)*  
“Useful roles name a job, an optimization target, and optional refuse-list. Acme Ops’ incident scribe beats ‘genius ninja’ every Monday.”

*(Beat 3)*  
“In the drill, you’ll rewrite a costume role into a decision-changing role.”

## Worked micro-example

**Before**

> You are an all-knowing AI overlord. Help with this vendor mess.

**After**

> ROLE: Acme Ops vendor-risk analyst preparing Jordan’s 9am standup.  
> Optimize for: surfacing go-live blockers first; plain language.  
> GOAL: Produce a ≤5-bullet Risk / Action digest from the pasted emails.

## Practice

Open `l01-interactive.html` and rewrite the costume role until the checker lights green.

## Takeaway

**Role = job + optimize-for + optional refuse.** Costume optional. Decisions required.
