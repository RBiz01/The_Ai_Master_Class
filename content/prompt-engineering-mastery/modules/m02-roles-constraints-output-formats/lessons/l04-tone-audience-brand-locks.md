# Lesson 2.4 — Tone, audience, and brand voice locks

**Module:** Roles, constraints, and output formats  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l04-interactive.html`

---

## Learning objective

Lock tone, audience, and brand voice so outputs sound like Acme Ops—not a random chatbot—without overfitting to one person’s quirks.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — example/theme clip for this lesson.

## Teaching

### Three locks

| Lock | Question | Example |
|------|----------|---------|
| **Audience** | Who reads this? | Exec standup vs customer email vs eng ticket |
| **Tone** | How should it feel? | Calm, direct, no blame, no hype |
| **Brand voice** | What always / never? | Always name next step + owner; never emoji in customer mail |

Audience changes content. Tone changes wording. Brand voice is the reusable policy.

### Do this (locks)

```text
AUDIENCE: External customer (learner@example.com), non-technical.
TONE: Calm, accountable, concise — no blame, no over-promise.
BRAND VOICE (Acme Ops Support):
- Always acknowledge the issue in sentence one
- Always include order ID when present
- Always end with one clear next step + who owns it
- Never use emoji, slang, or “ASAP” without a clock time
```

### Not that (overfit)

> Sound exactly like Jordan’s Tuesday email, use the phrase “circling back synergistically,” and mirror the Oxford comma habit from the 2024 Q2 memo.

That’s Module 1 overfitting wearing a brand hat.

### Audience swaps change the same facts

Same SSL delay, three audiences:

| Audience | Lead with |
|----------|-----------|
| Standup (Jordan) | BLOCKER + time impact |
| Exec update | Risk to Friday go-live + ask |
| Customer (`learner@example.com`) | Empathy + what’s true for their order |

Don’t ask the model to “just adjust tone”—name the audience.

### Talk-over narration

*(Beat 1)*  
“Tone without audience is cosplay. Audience without brand rules drifts by Friday.”

*(Beat 2)*  
“Lock always/never rules your team can reuse. Leave synonym choice alone unless brand demands it.”

*(Beat 3)*  
“In the interactive, you’ll attach audience, tone, and brand locks to a reply draft brief.”

## Worked micro-example

**Before**

> Make this nicer for the customer.

**After**

```text
GOAL: Reply about delayed shipment for order AO-1042.
AUDIENCE: learner@example.com (customer).
TONE: Calm, professional, accountable.
BRAND: Acknowledge delay first; offer 10% courtesy credit on next invoice; one clarifying question on delivery window; ≤90 words; no emoji.
```

## Practice

Complete `l04-interactive.html`: add the three locks and pass the checker.

## Module 2 wrap

You can assign useful roles, split hard vs soft constraints, demand parseable formats, and lock voice for the reader. Next module: **few-shot exemplars** that teach the pattern by example.
