# Lesson 1.3 — Specificity without overfitting

**Module:** Foundations of clear instruction  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Raise specificity enough for reliable outputs—without writing a brittle prompt that only works for one paste, one day, or one model mood.

## Teaching

### The specificity dial

Too vague → the model improvises.  
Too overfitted → the prompt shatters when the input changes by 10%.

You want the **middle band**: specific about *decisions*, flexible about *incidental wording*.

### Overfitting looks like this

> Use exactly these seven adjectives, mention the blue banner on slide 3, start with the word Synergy, and mirror the comma placement in Jordan’s email from last Tuesday.

That prompt “works” once—then fails every other Tuesday. You’re encoding **accidents**, not **intent**.

### Specific-but-reusable looks like this

> Rewrite the update for executives: lead with the biggest risk, keep under 120 words, end with a single decision ask, professional tone. Preserve all dates and ticket IDs from the source.

Decisions locked. Accidents free.

### Three dials to turn up (safely)

1. **Audience & use** — who reads this, where it goes (standup, email, ticket).  
2. **Success checks** — length, required sections, forbidden moves.  
3. **Invariants** — what must survive (IDs, dates, names of systems)—not decorative phrasing.

### Three dials to leave alone

1. Synonym choice (“delay” vs “slip”) unless brand voice demands it.  
2. Exact sentence openings.  
3. One-off visual details the model can’t reliably see without description.

### Goldilocks table

| Too vague | Just right | Overfitted |
|-----------|------------|------------|
| Improve this | Tighten for execs; ≤120 words; lead with risk | Use the word “synergize” twice and rhyme the closer |
| List issues | List BLOCKER vs WATCH items from the paste | Number them 1–4 only if there are exactly four |
| Be formal | Professional, no slang, no emoji | Sound exactly like Jordan’s 2024 Q2 memo |

### Talk-over narration

*(Beat 1)*  
“Specificity is a dial, not a virtue contest. Crank decisions; leave accidents alone.”

*(Beat 2)*  
“If your prompt names a comma, you’ve overfitted. If it doesn’t name the audience, you’re still vague.”

*(Beat 3)*  
“In the drill, you’ll move a prompt from mushy to goldilocks—without turning it into a museum piece.”

## Practice

Open `l03-interactive.html` and tune the dial until the checker accepts a goldilocks rewrite.

## Takeaway

**Specific about decisions. Flexible about decoration.** That’s how prompts survive next Monday’s slightly different paste.
