# Acme Ops — Monday-morning prompt kit (starter)

**Product:** The Ai Master Class · Prompt Engineering Mastery  
**Owner example:** `learner@example.com`  
**Safety:** Fictional only — never paste real PII or secrets

---

## Card: `ops.customer-delay-json` · v1.0

**When to use:** Warehouse-confirmed shipping slip; customer asks for status.  
**When NOT:** Legal threats, refunds over policy — escalate to human.

```text
GOAL: Draft a customer reply as JSON for a confirmed delay.
CONTEXT: {{paste facts}}
CONSTRAINTS:
- Never invent ETAs or dates not in CONTEXT
- Offer only what CONTEXT allows
- Calm, plain language
FORMAT: JSON keys customer_message, offer_applied, needs_human_review only
```

**Eval:** rubric Facts/Format/Policy/Tone · golden: happy/edge/cliff delay set

---

## Card: `ops.meeting-notes-decisions` · v1.0

**When to use:** After an internal standup or launch sync transcript.  
**When NOT:** HR/performance conversations.

```text
GOAL: Extract decisions and owners from the transcript.
CONTEXT: {{transcript}}
CONSTRAINTS: No new facts not present in transcript. Mark unknowns as OPEN.
FORMAT:
## Decisions
## Owners (Name | Action | Due)
## Open questions
```

---

## Card: `ops.status-done-next-risks` · v1.0

**When to use:** Monday status to internal audience.  
**When NOT:** External customer marketing copy.

```text
GOAL: Write a ≤150-word status update.
CONTEXT: {{bullets or paste}}
CONSTRAINTS: Label BLOCKER only if customer-impacting and unowned. No invented dates.
FORMAT:
## Done
## Next
## Risks
```

---

## Card: `research.claim-evidence-confidence` · v1.0

**When to use:** Competitor or market notes from provided sources only.  
**When NOT:** When you have zero sources — gather sources first.

```text
GOAL: Answer {{question}} using only SOURCES below.
SOURCES: {{paste}}
CONSTRAINTS: Never invent citations. Flag gaps.
FORMAT: For each point — Claim / Evidence / Confidence (High|Med|Low)
```

---

## Governance

- Never paste: secrets, API keys, real customer PII, live tokens  
- Owner required on every card  
- Bump version on behavior change; one-line changelog  
- Retire cards with a kill date when the workflow dies
