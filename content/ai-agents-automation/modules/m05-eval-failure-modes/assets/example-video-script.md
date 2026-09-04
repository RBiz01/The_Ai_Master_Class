# Module 5 example / demo video — Evaluation harnesses & failure modes

**Length:** ~5–8 minutes  
**Tone:** Live worked example, Acme Ops  
**Visual:** Dark edtech; accents `#06b6d4` / `#6366f1`

---

## Talk-over (narration)

*(0:00–0:30)*  
Demo time. We’ll walk **Add harness case for Acme Ops skipped-approval bug.** using fictional Acme Ops data only—no real API keys.

*(0:30–2:00)*  
Setup: goal, inputs, and constraints on screen. Call out risk tiers and stop conditions before any tool runs.

*(2:00–4:30)*  
Execute the happy path: sense → plan → act → observe (or the module’s equivalent). Show the artifact a teammate would receive.

*(4:30–6:00)*  
Show the failure or approval path: what happens when a gate trips, a tool errors, or budget hits the cap.

*(6:00–7:00)*  
Recap takeaways tied to Module 5 lessons. Invite learners to the interactives.

---

## On-screen bullets

| Time | Bullet |
|------|--------|
| 0:20 | Acme Ops · no real keys |
| 1:00 | Goal + stop condition |
| 3:00 | Happy path artifact |
| 5:00 | Gate / failure path |
| 6:30 | Takeaways → practice |

---

## Production notes

- Keep PII fictional (`learner@example.com`, ticket AO-1042).  
- Auth: `ACME_OPS_API_KEY=***REDACTED***` only.
