# Lesson 1.1 — What makes a prompt clear

**Module:** Foundations of clear instruction  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Explain why vague prompts fail, and rewrite a mushy ask into a clear instruction that a model can execute without guessing.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — example/theme clip for this lesson.

## Teaching

### The Monday-morning problem

At **Acme Ops**, a teammate drops this into chat:

> “Summarize the emails.”

Sometimes you get a three-bullet digest. Sometimes a novel. Sometimes a dump of every subject line since Tuesday. Same model. Same inbox paste. Different day—different answer.

The model isn’t broken. **The instruction left too many decisions on the table.** Clear prompts remove decisions the model shouldn’t own.

### Clear vs vague (side by side)

| Vague | Clear |
|-------|--------|
| Summarize the emails. | Summarize the last 24 hours of Acme Ops vendor emails for a standup update. |
| Make this better. | Rewrite this status update for executives: keep under 120 words, lead with risk, end with one ask. |
| Help with the launch. | Draft a 5-bullet launch checklist for the Acme Ops portal go-live Friday 9am CT. |

Clarity is not “more words.” Clarity is **named decisions**: what to do, for whom, with what limits, in what shape.

### Four signals of a clear prompt

1. **Outcome is observable** — you could check the answer against a checklist.  
2. **Audience is named** — standup teammates ≠ board ≠ customer support.  
3. **Scope is bounded** — last 24 hours, not “everything.”  
4. **Shape is specified** — bullets, table, email draft, JSON.

If any signal is missing, the model invents it—and invents differently next time.

### Talk-over narration (instructor VO)

*(Beat 1)*  
“If your prompt works once and fails the next day, you didn’t get unlucky—you left decisions open.”

*(Beat 2)*  
“Clear prompts name the outcome, the audience, the scope, and the shape. Let’s rewrite Acme Ops’ ‘summarize the emails’ until those four are locked.”

*(Beat 3)*  
“You’re done with this lesson when you can spot a vague ask in under ten seconds and know which decision is missing.”

## Worked micro-example

**Before**

> Help me with this customer reply.

**After**

> Write a polite reply from Acme Ops Support to `learner@example.com`. Acknowledge the delayed shipment of order AO-1042, offer a 10% courtesy credit on the next invoice, and ask one clarifying question about preferred delivery window. Tone: calm and professional. Max 90 words.

## Practice

Open `l01-interactive.html` and rewrite the vague prompt until the checker lights green.

## Takeaway

Clarity = **observable outcome + audience + scope + shape**. Everything else in this course stacks on that base.
