# AI Agents & Automation Bootcamp

**Course ID:** `ai-agents-automation`  
**Tagline:** Build agents that research, decide, and take action  
**Level:** Advanced · **Duration (catalog):** 10 hours · **Lessons:** 32  
**Pacing:** ~1 hour per curriculum module × 8 modules ≈ **8 hours**  
**Gradient:** `#06b6d4` → `#6366f1`  
**Product:** The Ai Master Class

---

## Who this is for

Engineers, automation leads, PMs, and operators who already use LLMs and want **agents that research, decide, and take action**—with tools, approvals, evals, and ops discipline.

Comfortable with APIs and light scripting helps. Patterns stay model-agnostic. All scenarios use fictional **Acme Ops** agents—no real API keys.

## Learning outcomes

By the end of this course, you will be able to:

1. Choose the right shape: **chatbot vs script vs agent** (and when not to agent).
2. Wire **tools and function calls** with safe timeouts, auth stubs, and routing.
3. Design **planning, memory, and run state** so agents can pause and resume.
4. Add **human-in-the-loop** gates by risk tier with clear escalation.
5. Build **eval harnesses**, traces, and regression suites for agent failure modes.
6. Bridge agents to **no-code / low-code** workflows with governance.
7. **Ship** a reliable Acme Ops agent with a go-live checklist.
8. Operate with **cost budgets, monitoring, and incident response**.

## Prerequisites

- Access to any modern LLM with tool/function calling (or a playground equivalent)
- Basic comfort reading JSON schemas and API concepts
- A real workflow you want to automate (we’ll use fictional **Acme Ops**)

## Minute budget (per module ≈ 60 min)

| Block | Minutes | What the learner does |
|-------|---------|------------------------|
| Module intro video | 3–5 | Watch talk-over + on-screen bullets |
| Lessons (4) | 25–30 | Read / watch teaching + narration |
| Example / demo video | 5–8 | See a worked Acme Ops agent example |
| Interactive practice | 15–20 | Complete drills with success criteria |
| Buffer / notes | 3–5 | Capture takeaways for Monday |

**Course total:** ~8 × 60 min ≈ **8 hours** (catalog may list 10 hours / 32 lessons; pacing here is ~1 hour per module).

## Module map (32 lessons · 4 per module)

| Module | Slug | Lessons | Est. time | Status |
|--------|------|---------|-----------|--------|
| 1 | `m01-mental-models-architectures` | 4 | ~60 min | **Fully built** |
| 2 | `m02-tools-functions-api` | 4 | ~60 min | **Fully built** |
| 3 | `m03-planning-memory-state` | 4 | ~60 min | **Fully built** |
| 4 | `m04-human-in-the-loop` | 4 | ~60 min | **Fully built** |
| 5 | `m05-eval-failure-modes` | 4 | ~60 min | **Fully built** |
| 6 | `m06-nocode-lowcode-bridges` | 4 | ~60 min | **Fully built** |
| 7 | `m07-capstone-ship-agent` | 4 | ~60 min | **Fully built** |
| 8 | `m08-ops-cost-monitoring` | 4 | ~60 min | **Fully built** |

### Module 1 — Agent mental models & architectures *(built)*

1. Agent vs chatbot vs script
2. Sense · Plan · Act · Observe
3. Single-agent vs multi-agent
4. When not to use an agent

### Module 2 — Tools, functions, and API wiring *(built)*

1. Tool schemas models can call
2. Function-calling patterns
3. Wiring APIs safely
4. Tool selection and routing

### Module 3 — Planning, memory, and state *(built)*

1. Planning strategies
2. Short-term vs long-term memory
3. State machines for agent runs
4. Context windows and compression

### Module 4 — Human-in-the-loop & approvals *(built)*

1. When to pause for humans
2. Approval gates and risk tiers
3. Escalation paths
4. Designing review UIs

### Module 5 — Evaluation harnesses & failure modes *(built)*

1. Agent failure taxonomy
2. Building eval harnesses
3. Tracing and observability
4. Regression suites

### Module 6 — No-code and low-code automation bridges *(built)*

1. When Zapier/Make/n8n fit
2. Bridging agents to workflow tools
3. Triggers, webhooks, and queues
4. Governance for citizen automation

### Module 7 — Capstone: ship a reliable agent *(built)*

1. Spec your Acme Ops agent
2. Build the tool belt
3. Add HITL and evals
4. Ship checklist and demo

### Module 8 — Ops, cost control, and monitoring *(built)*

1. Cost drivers
2. Rate limits and budgets
3. Monitoring dashboards
4. Incident response for agents

## Voice & safety

- Confident, practical, modern — “ships Monday morning.”
- Classroom-safe: fictional orgs only (**Acme Ops**, `learner@example.com`).
- No real PII, no real API keys, no NSFW, no sensitive operational secrets.
- Auth examples use placeholders like `ACME_OPS_API_KEY=***REDACTED***`.

## Asset notes

Trailers may use sample MP4s on the live site until final recordings replace them. See `HANDOFF.md` and per-module video scripts. Lesson theme clips are motion-graphics MP4s (Pillow + ffmpeg)—**no Grok T2V**. Full course content is ready for publish.
