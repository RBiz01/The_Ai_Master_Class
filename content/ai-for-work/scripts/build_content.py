#!/usr/bin/env python3
"""Generate all AI for Work course content (meta, lessons, interactives, diagrams, scripts)."""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
A1, A2 = "#3b82f6", "#8b5cf6"
BG, PANEL = "#0b0f19", "#121826"

MODULES = [
  {
    "slug": "m01-ai-desk-setup",
    "num": 1,
    "title": "Your AI desk setup",
    "goal": "Stand up a reliable ChatGPT + Claude desk: pick the right tool, lock habits, set custom instructions, and run a weekly ritual that ships Monday morning.",
    "why": "Tools without habits become tab clutter. Module 1 installs the operating system for every later workflow.",
    "diagram": "diagram-ai-desk.svg",
    "diagram_title": "AI desk setup stack",
    "next": "m02-writing-that-sounds-like-you",
    "success": [
      "Can choose ChatGPT vs Claude for a given work task with a one-line reason",
      "Has a named workspace habit (folders, projects, or chats) they will actually use",
      "Can draft custom instructions that encode role, audience, and do-nots",
      "Can describe a 20-minute weekly AI ritual with capture → clean → ship steps",
    ],
    "lessons": [
      ("l01-chatgpt-vs-claude-desk-tools", "ChatGPT vs Claude: pick the right desk tool",
       "Choose ChatGPT or Claude for common Acme Ops tasks without thrash.",
       ["tool","chat","claude","compare","when"]),
      ("l02-browser-apps-workspace-habits", "Browser, apps, and workspace habits that stick",
       "Install a lightweight workspace habit so chats stay findable next Monday.",
       ["habit","folder","project","workspace","name"]),
      ("l03-custom-instructions-and-memory", "Custom instructions and memory that serve you",
       "Write custom instructions that encode who you are at work—and what never to invent.",
       ["instruction","memory","role","audience","do-not","dont"]),
      ("l04-weekly-ai-ritual", "Your weekly AI ritual (ship Monday morning)",
       "Design a short weekly ritual: capture drafts, clean library, ship one real artifact.",
       ["ritual","weekly","monday","capture","ship"]),
    ],
  },
  {
    "slug": "m02-writing-that-sounds-like-you",
    "num": 2,
    "title": "Writing that sounds like you",
    "goal": "Train AI to draft in your voice: exemplars, channel-specific kits, long-form without the AI accent, and editing passes that tighten tone.",
    "why": "Generic AI prose burns trust. Module 2 makes every draft pass the 'would I send this?' test.",
    "diagram": "diagram-voice-loop.svg",
    "diagram_title": "Voice capture → draft → edit loop",
    "next": "m03-research-synthesis",
    "success": [
      "Can paste 2–3 exemplars that teach tone, not just topic",
      "Can draft email/Slack that matches channel norms",
      "Can spot and remove AI-accent tells (hedges, filler, fake certainty)",
      "Can run a three-pass edit: tighten → tone-check → brand-lock",
    ],
    "lessons": [
      ("l01-capture-your-voice-with-exemplars", "Capture your voice with exemplars",
       "Build a tiny voice pack from real Acme Ops writing samples.",
       ["exemplar","voice","sample","tone","like me"]),
      ("l02-email-and-slack-like-you", "Email and Slack that sound like you",
       "Channel kits: email vs Slack length, warmth, and asks.",
       ["email","slack","channel","ask","subject"]),
      ("l03-long-form-without-ai-accent", "Long-form drafts without the AI accent",
       "Strip hedges, purple prose, and fake certainty from longer drafts.",
       ["accent","hedge","filler","rewrite","plain"]),
      ("l04-editing-passes-tighten-tone", "Editing passes: tighten, tone-check, brand-lock",
       "Run a three-pass edit checklist before anything leaves your desk.",
       ["tighten","tone","brand","pass","edit"]),
    ],
  },
  {
    "slug": "m03-research-synthesis",
    "num": 3,
    "title": "Research & synthesis without hallucinations",
    "goal": "Ground answers in sources you paste, tag claims with evidence and confidence, synthesize multi-source briefs, and catch hallucination red flags.",
    "why": "Confident wrong answers are expensive. Module 3 installs verification as a habit, not an afterthought.",
    "diagram": "diagram-ground-verify.svg",
    "diagram_title": "Ground → Claim → Verify loop",
    "next": "m04-meetings-notes-actions",
    "success": [
      "Always pastes source text (or links + excerpts) before asking for facts",
      "Can label claims with evidence quotes and confidence",
      "Can produce a multi-source brief with conflicts called out",
      "Can name four hallucination red flags and a verification step",
    ],
    "lessons": [
      ("l01-grounding-paste-sources", "Grounding: paste sources, don't invent",
       "Force the model to work only from pasted Acme Ops source text.",
       ["source","paste","ground","only from","do not invent"]),
      ("l02-claim-evidence-confidence", "Claim → Evidence → Confidence tags",
       "Structure research answers as claim / evidence / confidence.",
       ["claim","evidence","confidence","quote","tag"]),
      ("l03-multi-source-synthesis-briefs", "Multi-source synthesis briefs",
       "Merge 2–3 sources into one brief; surface conflicts explicitly.",
       ["synthesis","conflict","brief","sources","merge"]),
      ("l04-hallucination-red-flags", "Hallucination red flags and verification loops",
       "Spot overconfident fluff and run a cheap verify loop.",
       ["hallucin","verify","red flag","citation","check"]),
    ],
  },
  {
    "slug": "m04-meetings-notes-actions",
    "num": 4,
    "title": "Meetings, notes, and action plans",
    "goal": "Turn transcripts into structured notes, action plans with owners and dates, five-minute pre-briefs, and follow-ups people actually answer.",
    "why": "Meetings die in the chat scroll. Module 4 makes AI the post-meeting operator—not a transcript dump.",
    "diagram": "diagram-meeting-pipeline.svg",
    "diagram_title": "Meeting → notes → actions → follow-up",
    "next": "m05-spreadsheets-tables",
    "success": [
      "Can convert a messy transcript into Decisions / Risks / Actions",
      "Can assign owners and due dates without inventing people",
      "Can produce a pre-meeting brief from agenda + prior notes",
      "Can write a follow-up that asks one clear next step",
    ],
    "lessons": [
      ("l01-transcript-to-structured-notes", "From transcript to structured notes",
       "Map raw transcript text into Decisions, Risks, and Open questions.",
       ["transcript","decision","risk","notes","structure"]),
      ("l02-action-plans-owners-dates", "Action plans with owners and dates",
       "Extract actions as Owner · Task · Due — never invent owners.",
       ["owner","due","action","date","assignee"]),
      ("l03-pre-meeting-briefs", "Pre-meeting briefs in five minutes",
       "Build a one-pager from agenda + last meeting notes.",
       ["brief","agenda","pre-meeting","prep","one-pager"]),
      ("l04-follow-ups-that-get-answered", "Follow-ups that get answered",
       "Write crisp follow-ups with one ask and a reply deadline.",
       ["follow-up","ask","deadline","reply","reminder"]),
    ],
  },
  {
    "slug": "m05-spreadsheets-tables",
    "num": 5,
    "title": "Spreadsheets, tables, and light analysis",
    "goal": "Clean messy pasted data into tables, explain formulas in plain English, run light trend/outlier analysis, and ship exec one-pagers.",
    "why": "Most work data arrives dirty. Module 5 makes ChatGPT/Claude your table co-pilot—not a replacement for your spreadsheet.",
    "diagram": "diagram-data-to-decision.svg",
    "diagram_title": "Messy data → table → insight → ask",
    "next": "m06-privacy-policy-playbooks",
    "success": [
      "Can turn a messy paste into a named-column markdown/CSV table",
      "Can ask for formula explanations in plain English before applying",
      "Can surface trends and outliers with caveats",
      "Can draft an exec one-pager with one clear ask",
    ],
    "lessons": [
      ("l01-messy-data-to-clean-tables", "Paste messy data → clean tables",
       "Normalize pasted Acme Ops rows into a clean table schema.",
       ["table","column","clean","csv","header"]),
      ("l02-formulas-pivots-plain-english", "Formulas and pivots explained in plain English",
       "Request formula/pivot explanations you could teach a teammate.",
       ["formula","pivot","explain","plain","sum"]),
      ("l03-light-analysis-trends-outliers", "Light analysis: trends, outliers, asks",
       "Ask for trends and outliers with explicit caveats—no fake precision.",
       ["trend","outlier","caveat","analysis","insight"]),
      ("l04-charts-exec-one-pagers", "Charts and executive one-pagers",
       "Turn a table into an exec brief: headline, 3 bullets, one ask.",
       ["exec","one-pager","headline","ask","chart"]),
    ],
  },
  {
    "slug": "m06-privacy-policy-playbooks",
    "num": 6,
    "title": "Privacy, policy, and team playbooks",
    "goal": "Know what not to paste, map vendor policies to company rules, publish team playbooks, and govern shared prompts with versioning and review.",
    "why": "Speed without guardrails creates incidents. Module 6 makes safe defaults the easy path for Acme Ops.",
    "diagram": "diagram-privacy-playbook.svg",
    "diagram_title": "Data class → policy → playbook → review",
    "next": None,
    "success": [
      "Can classify paste content into public / internal / restricted",
      "Can state a simple ChatGPT vs Claude policy line for Acme Ops",
      "Can draft a one-page team playbook entry for a recurring workflow",
      "Can version a shared prompt and name a reviewer",
    ],
    "lessons": [
      ("l01-what-not-to-paste", "What not to paste (data classes)",
       "Sort example snippets into public, internal, and restricted buckets.",
       ["paste","restricted","pii","internal","public","class"]),
      ("l02-vendor-policies-company-rules", "Vendor policies and your company rules",
       "Translate vendor defaults into a short Acme Ops AI use rule.",
       ["policy","vendor","company","rule","approved"]),
      ("l03-team-playbooks-shared-prompts", "Team playbooks and shared prompts",
       "Write a playbook card: when to use, prompt stub, do-nots.",
       ["playbook","shared","prompt","team","stub"]),
      ("l04-governance-versioning-review", "Governance: versioning, review, escalation",
       "Add version, owner, reviewer, and escalation to a shared kit.",
       ["version","review","owner","escalat","govern"]),
    ],
  },
]

def interactive_html(mod, lesson_idx, filename_stem, title, objective, keywords):
    mid = mod["num"]
    lid = lesson_idx
    accent = A1
    accent2 = A2
    # Build keyword checks - 4 criteria from keywords groups
    kws = keywords
    # Create 4 criteria based on lesson
    criteria_js = []
    criteria_li = []
    # Split keywords into up to 4 groups
    groups = []
    chunk = max(1, (len(kws) + 3) // 4)
    for i in range(0, len(kws), chunk):
        groups.append(kws[i:i+chunk])
    while len(groups) < 4:
        groups.append(kws[:1])
    groups = groups[:4]
    labels = [
        f"Uses key idea: {', '.join(groups[0][:2])}",
        f"Covers: {', '.join(groups[1][:2])}",
        f"Includes: {', '.join(groups[2][:2])}",
        f"Mentions: {', '.join(groups[3][:2])}",
    ]
    # Better criteria labels per lesson via title heuristics
    criteria_labels = labels
    for i, g in enumerate(groups):
        arr = json.dumps([x.lower() for x in g])
        criteria_js.append(f"const c{i+1} = hasAny(t, {arr});")
        criteria_li.append(f'<li id="c{i+1}">{criteria_labels[i]}</li>')

    source_prompts = {
        1: [
            "Just use AI somehow for my work.",
            "I have too many ChatGPT tabs.",
            "Make the AI remember me.",
            "I should use AI more.",
        ],
        2: [
            "Write this so it sounds good.",
            "Make an email about the delay.",
            "Expand this into a long update.",
            "Edit this.",
        ],
        3: [
            "What does the market think of Acme Ops?",
            "Is this claim true?",
            "Combine these docs somehow.",
            "Are you sure?",
        ],
        4: [
            "Summarize the meeting.",
            "Who should do what?",
            "Prep me for the meeting.",
            "Send a follow-up.",
        ],
        5: [
            "Fix this spreadsheet paste.",
            "What formula should I use?",
            "Analyze this.",
            "Make a chart for execs.",
        ],
        6: [
            "Paste the customer list into ChatGPT.",
            "What's our AI policy?",
            "Share my prompt with the team.",
            "We should govern prompts somehow.",
        ],
    }
    vague = source_prompts[mid][lid-1]
    placeholders = {
        1: "Write a clear desk-setup instruction…",
        2: "Rewrite so voice and channel are locked…",
        3: "Rewrite with grounding / evidence rules…",
        4: "Rewrite for notes, owners, or follow-ups…",
        5: "Rewrite for tables, formulas, or exec brief…",
        6: "Rewrite with privacy / policy / playbook detail…",
    }
    hint_text = {
        1: "Name the tool (ChatGPT/Claude), the habit or instruction, and the Monday outcome.",
        2: "Name channel (email/Slack), paste or reference exemplars, and lock tone/length.",
        3: "Require pasted sources, claim→evidence→confidence, and a verify step.",
        4: "Ask for Decisions/Risks/Actions, Owner·Task·Due, or one clear ask + deadline.",
        5: "Specify columns/schema, plain-English formula explain, trends with caveats, or headline + ask.",
        6: "Classify data, state a policy line, include playbook stub, or add version/owner/reviewer.",
    }[mid]

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title} · AI for Work</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
:root {{
  --bg: {BG};
  --panel: {PANEL};
  --border: #1e293b;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: {accent};
  --accent2: {accent2};
  --danger: #f87171;
  --ok: #34d399;
  --warn: #fbbf24;
}}
* {{ box-sizing: border-box; }}
body {{
  margin: 0; min-height: 100vh;
  font-family: "DM Sans", system-ui, -apple-system, sans-serif;
  background: radial-gradient(1200px 600px at 10% -10%, rgba(59,130,246,.18), transparent),
              radial-gradient(900px 500px at 100% 0%, rgba(139,92,246,.14), transparent),
              var(--bg);
  color: var(--text);
  line-height: 1.55;
}}
.wrap {{ max-width: 820px; margin: 0 auto; padding: 28px 20px 48px; }}
.badge {{
  display: inline-flex; gap: 8px; align-items: center;
  font-size: 12px; letter-spacing: .04em; text-transform: uppercase;
  color: var(--accent2); background: rgba(139,92,246,.08);
  border: 1px solid rgba(139,92,246,.25); padding: 6px 10px; border-radius: 999px;
}}
h1 {{ font-size: 1.55rem; margin: 14px 0 8px; letter-spacing: -0.02em; }}
.sub {{ color: var(--muted); margin: 0 0 22px; }}
.card {{
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 14px; padding: 18px 18px 16px; margin-bottom: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,.25);
}}
.card h2 {{ margin: 0 0 10px; font-size: 1rem; color: #fff; }}
.card ol {{ margin: 0; padding-left: 1.2rem; color: var(--text); }}
.card li {{ margin: 6px 0; }}
.prompt-box {{
  background: #0a0e16; border: 1px dashed #334155; border-radius: 10px;
  padding: 12px 14px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .9rem; color: #cbd5e1; white-space: pre-wrap;
}}
label {{ display: block; font-size: .85rem; color: var(--muted); margin-bottom: 6px; }}
textarea {{
  width: 100%; background: #0a0e16; color: var(--text);
  border: 1px solid #334155; border-radius: 10px; padding: 12px 14px;
  font: inherit; resize: vertical;
}}
textarea:focus {{
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59,130,246,.25);
}}
.row {{ display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }}
button {{
  appearance: none; border: 0; cursor: pointer;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: white; font-weight: 600; padding: 10px 16px; border-radius: 10px;
}}
button.secondary {{
  background: transparent; border: 1px solid #334155; color: var(--text);
}}
#feedback {{
  display: none; margin-top: 12px; padding: 12px 14px; border-radius: 10px;
  border: 1px solid var(--border); font-size: .95rem;
}}
#feedback.show {{ display: block; }}
#feedback.ok {{ background: rgba(52,211,153,.08); border-color: rgba(52,211,153,.35); color: #bbf7d0; }}
#feedback.bad {{ background: rgba(248,113,113,.08); border-color: rgba(248,113,113,.35); color: #fecaca; }}
#feedback.partial {{ background: rgba(251,191,36,.08); border-color: rgba(251,191,36,.35); color: #fde68a; }}
.success {{
  display: none; margin-top: 16px; padding: 14px 16px; border-radius: 12px;
  border: 1px solid rgba(139,92,246,.4);
  background: linear-gradient(135deg, rgba(59,130,246,.15), rgba(139,92,246,.12));
}}
.success.show {{ display: block; }}
.success strong {{ color: var(--accent2); }}
.checks {{ list-style: none; padding: 0; margin: 8px 0 0; }}
.checks li {{ padding: 4px 0 4px 22px; position: relative; color: var(--muted); }}
.checks li:before {{ content: "○"; position: absolute; left: 0; }}
.checks li.pass {{ color: var(--ok); }}
.checks li.pass:before {{ content: "●"; }}
.hint {{ font-size: .85rem; color: var(--muted); margin-top: 8px; }}
</style>
</head>
<body>
<div class="wrap">
  <div class="badge">Module {mid} · Lesson {lid} · Interactive</div>
  <h1>{title}</h1>
  <p class="sub">{objective}</p>

  <div class="card">
    <h2>Instructions</h2>
    <ol>
      <li>Read the vague Acme Ops prompt in the box below.</li>
      <li>Rewrite it so a teammate could run it Monday morning without guessing.</li>
      <li>Click <strong>Check rewrite</strong>. Fix anything the checker flags.</li>
      <li>You're done when all success criteria turn green.</li>
    </ol>
  </div>

  <div class="card">
    <h2>Vague prompt (Acme Ops)</h2>
    <div class="prompt-box" id="source">{vague}</div>
  </div>
  <div class="card">
    <h2>Your rewrite</h2>
    <label for="editor">Rewrite with enough decisions locked for a reliable answer.</label>
    <textarea id="editor" rows="8" placeholder="{placeholders[mid]}"></textarea>
    <div class="row">
      <button type="button" id="check">Check rewrite</button>
      <button type="button" class="secondary" id="hintBtn">Show hint</button>
      <button type="button" class="secondary" id="reset">Reset</button>
    </div>
    <p class="hint" id="hint" hidden>{hint_text}</p>
  </div>

  <div id="feedback" role="status" aria-live="polite"></div>

  <div class="card" style="margin-top:16px">
    <h2>You're done when</h2>
    <ul class="checks" id="criteria">
      {chr(10).join(criteria_li)}
    </ul>
  </div>

  <div class="success" id="success">
    <strong>Nice work.</strong> Capture one takeaway for Monday, then continue the module.
  </div>
</div>
<script>
const editor = document.getElementById('editor');
const feedback = document.getElementById('feedback');
const success = document.getElementById('success');
const hint = document.getElementById('hint');
document.getElementById('hintBtn').onclick = () => {{ hint.hidden = !hint.hidden; }};
document.getElementById('reset').onclick = () => {{
  editor.value = '';
  feedback.className = ''; feedback.textContent = ''; feedback.classList.remove('show');
  success.classList.remove('show');
  ['c1','c2','c3','c4'].forEach(id => document.getElementById(id).classList.remove('pass'));
}};
function hasAny(text, words){{ return words.some(w => text.includes(w)); }}
document.getElementById('check').onclick = () => {{
  const t = editor.value.toLowerCase().trim();
  if (t.length < 40) {{
    feedback.className = 'show bad';
    feedback.textContent = 'Too short — add enough detail that another teammate could run this without asking you questions.';
    return;
  }}
  const vague = {json.dumps(vague.lower())};
  if (t === vague || t === vague.replace(/\\.$/,'')) {{
    feedback.className = 'show bad';
    feedback.textContent = 'That’s still the vague original. Lock the decisions the model should not invent.';
    return;
  }}
  {chr(10).join(criteria_js)}
  const map = {{c1,c2,c3,c4}};
  Object.entries(map).forEach(([id, ok]) => {{
    document.getElementById(id).classList.toggle('pass', ok);
  }});
  const score = [c1,c2,c3,c4].filter(Boolean).length;
  if (score === 4) {{
    feedback.className = 'show ok';
    feedback.textContent = 'Strong rewrite. All success criteria are present.';
    success.classList.add('show');
  }} else if (score >= 2) {{
    feedback.className = 'show partial';
    feedback.textContent = `Partial credit (${{score}}/4). Strengthen the criteria that are still open circles.`;
    success.classList.remove('show');
  }} else {{
    feedback.className = 'show bad';
    feedback.textContent = 'Still too vague. Use the hint, then add the missing decisions.';
    success.classList.remove('show');
  }}
}};
</script>
</body>
</html>
'''

def lesson_md(mod, idx, stem, title, objective):
    mid = mod["num"]
    teaching = LESSON_TEACHING[(mid, idx)]
    return f'''# Lesson {mid}.{idx} — {title}

**Module:** {mod["title"]}  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l0{idx}-interactive.html`

---

## Learning objective

{objective}

## Lesson video

![Lesson video](assets/l0{idx}-video.mp4)

**Video:** `assets/l0{idx}-video.mp4` — example/theme clip for this lesson.

## Teaching

{teaching}

## Practice

Open `l0{idx}-interactive.html` and rewrite the vague prompt until the checker lights green.

## Takeaway

{TAKEAWAYS[(mid, idx)]}
'''

# Teaching bodies and takeaways — practical Acme Ops voice
LESSON_TEACHING = {}
TAKEAWAYS = {}

def T(mid, lid, body, takeaway):
    LESSON_TEACHING[(mid, lid)] = body.strip()
    TAKEAWAYS[(mid, lid)] = takeaway.strip()

T(1,1,'''
### Pick the tool for the job

At **Acme Ops**, Jordan opens both ChatGPT and Claude every morning—and still picks wrong half the time.

Rule of thumb (not religion):

| Reach for… | When… |
|------------|--------|
| **ChatGPT** | Fast drafts, browsing-style lookups, light code/table help, Plugins/GPTs you already trust |
| **Claude** | Long docs, careful rewriting, sticking to pasted source text, thoughtful analysis |

### Talk-over narration (instructor VO)

*(Beat 1)* “Stop asking which model is smarter. Ask which desk tool fits *this* task.”

*(Beat 2)* “For Acme Ops portal go-live notes with a 12-page vendor PDF pasted in, Claude’s long-context discipline often wins. For a five-bullet Slack update in two minutes, ChatGPT is fine.”

*(Beat 3)* “Write your own one-line chooser and pin it. Consistency beats vibes.”

### Worked micro-example

**Task:** Rewrite a 2,000-word incident postmortem into a calm customer email for `learner@example.com`.

**Chooser:** Claude — long source + tone-sensitive rewrite. Then paste the Claude draft into ChatGPT only if you need a shorter Slack variant.
''', "Chooser card: one line for ChatGPT, one line for Claude. Pin it.")

T(1,2,'''
### Habits beat tab archaeology

Vague chat titles like “help” and “draft 3” vanish by Friday. Acme Ops standard:

1. **Name the chat** with outcome + date: `Portal go-live risks · 2026-09-03`
2. **One project/folder per workflow** (standups, vendor briefs, customer replies)
3. **Pin the winners**; archive the experiments

### Talk-over narration

*(Beat 1)* “If you can’t find last week’s good prompt, you don’t have a desk—you have a junk drawer.”

*(Beat 2)* “Spend thirty seconds naming the chat. Future-you ships faster.”

*(Beat 3)* “Browser apps (ChatGPT / Claude) plus one notes doc for reusable prompts is enough. Don’t overbuild.”
''', "Name · folder · pin. Three habits. Zero new SaaS required.")

T(1,3,'''
### Custom instructions that actually help

Bad custom instructions: “Be helpful and brilliant.”

Good Acme Ops block:

```text
I work at Acme Ops (ops/program). Audience defaults: internal standup or exec brief.
Prefer bullets; flag uncertainty; never invent vendors, dates, or owners.
If sources are missing, say what’s missing instead of filling gaps.
```

### Talk-over narration

*(Beat 1)* “Custom instructions are your standing brief—don’t waste them on personality cosplay.”

*(Beat 2)* “Encode role, default audience, and hard do-nots. That’s memory that serves you.”

*(Beat 3)* “Revisit quarterly. Stale instructions create stale voice.”
''', "Role + audience + do-nots. Update when your job changes.")

T(1,4,'''
### The 20-minute Monday ritual

1. **Capture** (5 min): dump sticky prompts from last week into your library doc  
2. **Clean** (10 min): delete duds; tag keepers Email / Research / Meetings / Data  
3. **Ship** (5 min): produce one real artifact (brief, follow-up, table) before standup

### Talk-over narration

*(Beat 1)* “AI skill compounds when you schedule it—like gym, but with less sweat.”

*(Beat 2)* “Acme Ops runs the ritual Monday 8:40 CT. Protect it.”

*(Beat 3)* “Done means one shipped artifact, not twenty open tabs.”
''', "Capture → clean → ship. Twenty minutes. Every Monday.")

T(2,1,'''
### Exemplars teach voice

Paste 2–3 short samples *you* wrote. Label what to copy: length, warmth, directness.

**Acme Ops voice pack stub**

- Sample A: crisp Slack unblock ask  
- Sample B: calm customer delay email to `learner@example.com`  
- Sample C: exec risk bullet with one ask

### Talk-over narration

*(Beat 1)* “Don’t say ‘sound like me.’ Show three receipts.”

*(Beat 2)* “Exemplars beat adjectives. ‘Professional’ means nothing; your last email means everything.”
''', "Two or three real samples beat ten adjectives.")

T(2,2,'''
### Channel kits

| Channel | Length | Warmth | Ask |
|---------|--------|--------|-----|
| Email | 80–120 words | Polite, complete | One clear CTA |
| Slack | 2–5 lines | Direct | One unblock question |

### Talk-over narration

*(Beat 1)* “Same news, different costume. Email carries context; Slack carries speed.”

*(Beat 2)* “Tell the model the channel first—format follows.”
''', "Channel first. Then tone. Then ask.")

T(2,3,'''
### Kill the AI accent

Tells: “In today’s rapidly evolving landscape…”, triple hedges, fake certainty, symmetrical three-item fluff.

**Fix prompt add-on:** “Rewrite in plain Acme Ops voice. No hedges. No corporate clichés. Short sentences.”

### Talk-over narration

*(Beat 1)* “If it sounds like a keynote, it’s not ready to send.”

*(Beat 2)* “Cut filler. Keep facts. Keep your cadence.”
''', "Plain sentences. No landscape. No synergy.")

T(2,4,'''
### Three editing passes

1. **Tighten** — cut 20% words  
2. **Tone-check** — match audience (exec vs teammate vs customer)  
3. **Brand-lock** — Acme Ops terms, no invented product names

### Talk-over narration

*(Beat 1)* “Draft is free. Send is expensive. Pay the three-pass tax.”
''', "Tighten → tone → brand. Then send.")

T(3,1,'''
### Paste the source or don’t ask for facts

```text
Use ONLY the text between <source> tags. If the answer isn’t there, say “Not in source.”
<source>…paste…</source>
```

### Talk-over narration

*(Beat 1)* “Models invent politely. Your job is to starve invention with sources.”
''', "No source paste → no factual ask.")

T(3,2,'''
### Claim · Evidence · Confidence

Force the shape:

| Claim | Evidence (quote) | Confidence |
|-------|------------------|------------|
| SSL install slips to Fri 2pm CT | “Earliest install Friday 2pm CT” | High |

### Talk-over narration

*(Beat 1)* “Opinions without quotes are cosplay research.”
''', "Every claim needs a quote and a confidence tag.")

T(3,3,'''
### Synthesis with conflicts

When sources disagree, **don’t average**. Table the conflict and recommend a check.

### Talk-over narration

*(Beat 1)* “A brief that hides conflict is a liability. Surface it.”
''', "Merge sources. Highlight conflicts. Assign a check.")

T(3,4,'''
### Red flags

1. Specific numbers with no source  
2. Named people/vendors you didn’t provide  
3. “Studies show” without citation  
4. Perfect certainty on fuzzy inputs  

**Verify loop:** re-ask “Quote the line that supports claim #2 or delete it.”

### Talk-over narration

*(Beat 1)* “Confidence is not evidence. Make it show its work—or cut it.”
''', "Flag → quote-check → delete or keep.")

T(4,1,'''
### Transcript → structure

Ask for three buckets only: **Decisions**, **Risks**, **Open questions**. Ignore banter.

### Talk-over narration

*(Beat 1)* “Notes are for operators, not novelists.”
''', "Decisions · Risks · Open questions. That’s the skeleton.")

T(4,2,'''
### Owner · Task · Due

```text
Extract actions as a table: Owner | Task | Due date.
If owner/date missing, write UNKNOWN — do not invent names or dates.
```

### Talk-over narration

*(Beat 1)* “Invented owners create ghost work. Prefer UNKNOWN.”
''', "Never invent owners or dates. Mark UNKNOWN.")

T(4,3,'''
### Five-minute pre-brief

Inputs: agenda + last meeting actions. Output: Purpose · Must-decide · Watch-outs · Prep links.

### Talk-over narration

*(Beat 1)* “Walk in with decisions, not vibes.”
''', "Purpose, must-decide, watch-outs. One page.")

T(4,4,'''
### Follow-ups that get answers

Subject + 3 lines + **one ask** + reply-by date. CC only people who must act.

### Talk-over narration

*(Beat 1)* “A follow-up with three asks gets zero replies.”
''', "One ask. One deadline. Send.")

T(5,1,'''
### Dirty paste → schema

Provide target columns first: `Week | Vendor | Amount | Status`. Ask the model to normalize and flag bad rows.

### Talk-over narration

*(Beat 1)* “Schema before story. Clean table, then analysis.”
''', "Name columns. Normalize. Flag garbage rows.")

T(5,2,'''
### Plain-English formulas

“Explain the formula like I’m teaching Jordan tomorrow. Then give the spreadsheet formula.”

### Talk-over narration

*(Beat 1)* “If you can’t teach it, don’t paste it into prod sheets.”
''', "Explain first. Formula second.")

T(5,3,'''
### Trends with caveats

Require: trend statement, 1–2 outliers, **caveat** (sample size / missing weeks), and one recommended ask.

### Talk-over narration

*(Beat 1)* “No fake precision. Acme Ops would rather be roughly right.”
''', "Trend · outlier · caveat · ask.")

T(5,4,'''
### Exec one-pager

Headline (≤12 words) · 3 bullets · 1 ask · optional chart description (not decoration).

### Talk-over narration

*(Beat 1)* “Execs buy clarity. Charts support; they don’t substitute.”
''', "Headline, three bullets, one ask.")

T(6,1,'''
### Data classes

| Class | Examples | Paste? |
|-------|----------|--------|
| Public | Marketing copy | OK |
| Internal | Portal go-live checklist | Careful / redact |
| Restricted | Customer PII, credentials, payroll | **Never** into consumer AI |

### Talk-over narration

*(Beat 1)* “Speed is not a reason to paste `learner@example.com` lists into a consumer chat.”
''', "Public / internal / restricted. Restricted never pastes.")

T(6,2,'''
### Policy one-liner

Acme Ops example: “Use approved ChatGPT/Claude work seats for internal content; no restricted data; customer quotes only if already publishable or redacted.”

### Talk-over narration

*(Beat 1)* “Vendor marketing ≠ your policy. Write your line.”
''', "One policy sentence everyone can repeat.")

T(6,3,'''
### Playbook card

- **When to use**  
- **Prompt stub**  
- **Do-nots**  
- **Example output**

Store in the shared Acme Ops kit doc.

### Talk-over narration

*(Beat 1)* “If only you can run the prompt, it’s not a team asset.”
''', "When · stub · do-nots · example.")

T(6,4,'''
### Governance fields

`Version · Owner · Reviewer · Last reviewed · Escalation path`

Bump version when behavior changes; ping reviewer on restricted workflows.

### Talk-over narration

*(Beat 1)* “Shared prompts without owners become abandoned scripts.”
''', "Version, owner, reviewer, escalate.")


def svg_diagram(mod):
    title = mod["diagram_title"]
    boxes = {
        1: [("Tool chooser","ChatGPT vs Claude"),("Workspace habits","Name · folder · pin"),("Instructions","Role · audience · do-nots"),("Weekly ritual","Capture → clean → ship")],
        2: [("Exemplars","2–3 real samples"),("Channel kit","Email vs Slack"),("Draft","Plain voice"),("Edit passes","Tighten · tone · brand")],
        3: [("Paste sources","Ground the ask"),("Claim tags","Evidence · confidence"),("Synthesize","Surface conflicts"),("Verify","Quote-check loop")],
        4: [("Transcript","Raw meeting text"),("Notes","Decisions · risks"),("Actions","Owner · task · due"),("Follow-up","One ask + deadline")],
        5: [("Messy paste","Dirty rows"),("Clean table","Named columns"),("Analysis","Trends · outliers"),("Exec brief","Headline + ask")],
        6: [("Data class","Public→restricted"),("Policy line","Company rules"),("Playbook","Shared stubs"),("Governance","Version · review")],
    }[mod["num"]]
    colors = [A1, "#60a5fa", "#a78bfa", A2]
    parts = [f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
  <title id="title">{title}</title>
  <desc id="desc">{title} for AI for Work module {mod["num"]}</desc>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f19"/><stop offset="100%" stop-color="#121826"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="{A1}"/><stop offset="100%" stop-color="{A2}"/>
    </linearGradient>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="{A2}"/>
    </marker>
  </defs>
  <rect width="960" height="540" fill="url(#bgGrad)"/>
  <circle cx="120" cy="80" r="90" fill="{A1}" opacity="0.12"/>
  <circle cx="860" cy="460" r="110" fill="{A2}" opacity="0.10"/>
  <text x="48" y="52" font-family="DM Sans, system-ui, sans-serif" font-size="22" font-weight="700" fill="#e2e8f0">{title}</text>
  <text x="48" y="78" font-family="DM Sans, system-ui, sans-serif" font-size="14" fill="#94a3b8">AI for Work · Module {mod["num"]} · Acme Ops</text>
''']
    x0 = 48
    for i, ((h, sub), col) in enumerate(zip(boxes, colors)):
        x = x0 + i * 230
        parts.append(f'''  <rect x="{x}" y="160" width="200" height="140" rx="16" fill="#121826" stroke="{col}" stroke-width="2"/>
  <text x="{x+20}" y="192" font-family="DM Sans, system-ui, sans-serif" font-size="13" font-weight="600" fill="{col}">{i+1} · {h.upper()}</text>
  <text x="{x+20}" y="228" font-family="DM Sans, system-ui, sans-serif" font-size="14" fill="#e2e8f0">{sub.split(' · ')[0]}</text>
  <text x="{x+20}" y="252" font-family="DM Sans, system-ui, sans-serif" font-size="14" fill="#e2e8f0">{(' · '.join(sub.split(' · ')[1:]) if ' · ' in sub else '')}</text>
''')
        if i < 3:
            parts.append(f'  <line x1="{x+200}" y1="230" x2="{x+230}" y2="230" stroke="{col}" stroke-width="2" marker-end="url(#arrow)"/>\n')
    parts.append(f'''  <rect x="280" y="360" width="400" height="90" rx="18" fill="#0a0e16" stroke="url(#accentGrad)" stroke-width="2"/>
  <text x="480" y="400" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif" font-size="16" font-weight="700" fill="#e2e8f0">Ships Monday morning</text>
  <text x="480" y="426" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif" font-size="13" fill="#94a3b8">Practical ChatGPT &amp; Claude workflows for Acme Ops</text>
  <text x="48" y="510" font-family="DM Sans, system-ui, sans-serif" font-size="12" fill="#64748b">The Ai Master Class · AI for Work · Module {mod["num"]}</text>
</svg>
''')
    return "".join(parts)


def module_intro_script(mod):
    lessons = ", ".join(t for _, t, _, _ in mod["lessons"])
    return f'''# Module {mod["num"]} intro video — {mod["title"]}

**Length:** ~3–5 minutes  
**Tone:** Confident, practical, Monday-morning  
**Visual:** Dark premium edtech; accent `{A1}` → `{A2}`

---

## Talk-over (narration)

*(0:00–0:25)*  
Welcome to Module {mod["num"]} of **AI for Work: ChatGPT & Claude** on The Ai Master Class. {mod["goal"].split('.')[0]}.

*(0:25–0:55)*  
At fictional Acme Ops, vague AI use creates thrash—extra tabs, generic prose, unchecked claims. This hour installs habits you can reuse every Monday.

*(0:55–1:40)*  
You’ll cover: {lessons}. Each lesson pairs teaching with an interactive drill and success criteria.

*(1:40–2:30)*  
Expect roughly one hour: intro, four lessons with practice, a diagram, and a worked demo script. Keep a notes doc open for takeaways.

*(2:30–3:15)*  
Success: you leave with something you can run at Acme Ops without pinging a teammate for basics.

*(3:15–3:45)*  
Open Lesson 1 when you’re ready. Headphones on; editor ready.

---

## On-screen bullets

| Time | Bullet |
|------|--------|
| 0:20 | Module {mod["num"]}: {mod["title"]} |
| 1:00 | ChatGPT & Claude · practical workflows |
| 1:50 | 4 lessons · 4 drills · 1 diagram |
| 2:40 | ~60 minutes |
| 3:20 | Ships Monday morning |

---

## Shot list

1. Title card with blue→purple gradient and module name.  
2. Acme Ops scenario beat.  
3. Animated diagram (`{mod["diagram"]}`).  
4. Interactive UI montage.  
5. End card: Lesson 1 CTA.

---

## Production notes

- Captions on; duck music under VO.  
- Placeholder MP4 OK until final render.
'''


def example_script(mod):
    demos = {
        1: ("Desk setup live", "Build a ChatGPT vs Claude chooser card and custom instructions for Jordan at Acme Ops."),
        2: ("Voice rewrite live", "Rewrite a generic delay email using three Acme Ops exemplars until it sounds human."),
        3: ("Grounded brief live", "Paste two vendor emails; force Claim→Evidence→Confidence; delete unsupported lines."),
        4: ("Meeting to actions live", "Turn a messy transcript into Decisions/Risks and an Owner·Task·Due table with UNKNOWNs."),
        5: ("Dirty data to exec brief", "Normalize a pasted cost table; explain a SUMIF; ship headline + one ask."),
        6: ("Policy + playbook live", "Classify three snippets; write Acme Ops AI policy one-liner; publish a playbook card with version fields."),
    }
    name, blurb = demos[mod["num"]]
    return f'''# Module {mod["num"]} example video — {name}

**Length:** ~5–8 minutes  
**Scene:** Screen capture + talk-over  
**Cast:** Instructor (VO) · fictional Acme Ops scenario  
**Safety:** No real PII — use `learner@example.com`, order `AO-1042`, vendor “Northwind Parts”

---

## Setup

{blurb}

---

## Talk-over + demo beats

### Beat 1 — Fail it live (0:00–1:00)
Show the vague ask. Produce a weak output. VO: “This is what thrash looks like.”

### Beat 2 — Install the pattern (1:00–3:30)
Rebuild with the module’s core frame. Narrate each decision you lock.

### Beat 3 — Verify (3:30–5:30)
Run once more. Show the checklist / success criteria lighting up.

### Beat 4 — Close (5:30–7:00)
Split before/after. CTA: pause and complete the matching interactive.

---

## On-screen bullets

- Vague → decisions locked  
- Acme Ops only · fictional data  
- Ships Monday morning  

---

## Production notes

- Captions on; no real customer data.  
- Placeholder MP4 OK until final render.
'''


def write_module(mod):
    mdir = ROOT / "modules" / mod["slug"]
    (mdir / "assets").mkdir(parents=True, exist_ok=True)
    (mdir / "lessons" / "assets").mkdir(parents=True, exist_ok=True)

    lessons_table = "\n".join(
        f"| {i} | `lessons/l0{i}-{stem.split('-',1)[1] if False else stem}.md` | {title} | `l0{i}-interactive.html` |"
        # fix: stem already includes l0N-
        for i, (stem, title, obj, kw) in enumerate(mod["lessons"], 1)
    )
    # rebuild properly
    rows = []
    for i, (stem, title, obj, kw) in enumerate(mod["lessons"], 1):
        rows.append(f"| {i} | `lessons/{stem}.md` | {title} | `l0{i}-interactive.html` |")
    lessons_table = "\n".join(rows)
    success = "\n".join(f"- {s}  " for s in mod["success"])
    nxt = f"`{mod['next']}`" if mod["next"] else "Course complete — ship your Acme Ops playbook."

    module_md = f'''# Module {mod["num"]} — {mod["title"]}

**Slug:** `{mod["slug"]}`  
**Course:** AI for Work: ChatGPT & Claude  
**Lessons:** 4 · **Est. time:** ~60 minutes  
**Status:** Fully built

---

## Goal

{mod["goal"]}

## Why this module ships {"first" if mod["num"]==1 else "here"}

{mod["why"]}

## Minute budget (~60 min)

| Block | Minutes | Asset |
|-------|---------|--------|
| Module intro video | 4 | `assets/module-intro-video-script.md` |
| Lesson 1 + interactive | 12 | `l01-*.md` / `l01-interactive.html` |
| Lesson 2 + interactive | 14 | `l02-*` + diagram `{mod["diagram"]}` |
| Lesson 3 + interactive | 12 | `l03-*` |
| Lesson 4 + interactive | 12 | `l04-*` |
| Example / demo video | 6 | `assets/example-video-script.md` |

## Lessons

| # | File | Title | Interactive |
|---|------|-------|-------------|
{lessons_table}

## Assets

- `assets/{mod["diagram"]}` — {mod["diagram_title"]}
- `assets/module-intro-video-script.md` — ~4 min module intro
- `assets/example-video-script.md` — worked demo (~6 min)

## Success criteria for the learner

{success}

## Next module

{nxt}
'''
    (mdir / "MODULE.md").write_text(module_md)
    (mdir / "assets" / mod["diagram"]).write_text(svg_diagram(mod))
    (mdir / "assets" / "module-intro-video-script.md").write_text(module_intro_script(mod))
    (mdir / "assets" / "example-video-script.md").write_text(example_script(mod))

    for i, (stem, title, obj, kw) in enumerate(mod["lessons"], 1):
        (mdir / "lessons" / f"{stem}.md").write_text(lesson_md(mod, i, stem, title, obj))
        (mdir / "lessons" / f"l0{i}-interactive.html").write_text(
            interactive_html(mod, i, stem, title, obj, kw)
        )


def write_course_meta():
    course = f'''# AI for Work: ChatGPT & Claude

**Course ID:** `ai-for-work`  
**Tagline:** Ship better writing, research, and decisions every day  
**Level:** Beginner · **Duration:** 6 hours · **Lessons:** 24  
**Pacing:** ~1 hour per curriculum module × 6 modules  
**Gradient:** `{A1}` → `{A2}`  
**Product:** The Ai Master Class

> **Catalog note:** Live catalog may still list **5 hours / 20 lessons**. Pacing rule is **~1 hour per curriculum module**; this package has **6 modules → ~6 hours / 24 lessons**. Site bot should update `duration` and `lessons` on publish (see `HANDOFF.md`).

---

## Who this is for

Operators, PMs, marketers, founders, and individual contributors who already open ChatGPT or Claude at work—and want reliable Monday-morning workflows for writing, research, meetings, light analysis, and safe team use.

No coding required. Patterns compare ChatGPT and Claude where it helps; habits transfer.

## Learning outcomes

By the end of this course, you will be able to:

1. Set up an **AI desk** with tool chooser, workspace habits, custom instructions, and a weekly ritual.
2. Draft writing that **sounds like you** across email and Slack—with editing passes that kill the AI accent.
3. Run **grounded research**: paste sources, tag claims, synthesize, and verify.
4. Turn meetings into **notes, owners, and follow-ups** people answer.
5. Clean tables, explain formulas, and ship **light analysis** plus exec one-pagers.
6. Apply **privacy, policy, and playbooks** so speed doesn’t create incidents.

## Prerequisites

- Access to ChatGPT and/or Claude (work or personal seats per your policy)
- A real workflow to improve (we’ll use fictional **Acme Ops** scenarios)

## Minute budget (per module ≈ 60 min)

| Block | Minutes | What the learner does |
|-------|---------|------------------------|
| Module intro video | 3–5 | Watch talk-over + on-screen bullets |
| Lessons (4) | 25–30 | Read / watch teaching + narration |
| Example / demo video | 5–8 | See a live rewrite or worked example |
| Interactive practice | 15–20 | Complete drills with success criteria |
| Buffer / notes | 3–5 | Capture takeaways for Monday |

**Course total:** ~6 × 60 min ≈ **6 hours** (catalog may still say 5h/20 — update on publish).

## Module map (24 lessons · ~4 per module)

| Module | Slug | Lessons | Est. time | Status |
|--------|------|---------|-----------|--------|
| 1 | `m01-ai-desk-setup` | 4 | ~60 min | **Fully built** |
| 2 | `m02-writing-that-sounds-like-you` | 4 | ~60 min | **Fully built** |
| 3 | `m03-research-synthesis` | 4 | ~60 min | **Fully built** |
| 4 | `m04-meetings-notes-actions` | 4 | ~60 min | **Fully built** |
| 5 | `m05-spreadsheets-tables` | 4 | ~60 min | **Fully built** |
| 6 | `m06-privacy-policy-playbooks` | 4 | ~60 min | **Fully built** |

### Module 1 — Your AI desk setup *(built)*

1. ChatGPT vs Claude: pick the right desk tool  
2. Browser, apps, and workspace habits that stick  
3. Custom instructions and memory that serve you  
4. Your weekly AI ritual (ship Monday morning)  

### Module 2 — Writing that sounds like you *(built)*

1. Capture your voice with exemplars  
2. Email and Slack that sound like you  
3. Long-form drafts without the AI accent  
4. Editing passes: tighten, tone-check, brand-lock  

### Module 3 — Research & synthesis without hallucinations *(built)*

1. Grounding: paste sources, don't invent  
2. Claim → Evidence → Confidence tags  
3. Multi-source synthesis briefs  
4. Hallucination red flags and verification loops  

### Module 4 — Meetings, notes, and action plans *(built)*

1. From transcript to structured notes  
2. Action plans with owners and dates  
3. Pre-meeting briefs in five minutes  
4. Follow-ups that get answered  

### Module 5 — Spreadsheets, tables, and light analysis *(built)*

1. Paste messy data → clean tables  
2. Formulas and pivots explained in plain English  
3. Light analysis: trends, outliers, asks  
4. Charts and executive one-pagers  

### Module 6 — Privacy, policy, and team playbooks *(built)*

1. What not to paste (data classes)  
2. Vendor policies and your company rules  
3. Team playbooks and shared prompts  
4. Governance: versioning, review, escalation  

## Voice & safety

- Confident, practical, modern — “ships Monday morning.”
- Classroom-safe: fictional orgs only (**Acme Ops**, `learner@example.com`).
- No real PII, no NSFW, no sensitive operational secrets.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Asset notes

Trailers and demos currently scripts-first until real recordings replace them. See `HANDOFF.md` and per-module video scripts. Full course content (lessons, interactives, diagrams, scripts, lesson theme MP4s) is ready for publish.
'''
    (ROOT / "COURSE.md").write_text(course)

    intro = f'''# Course trailer — AI for Work: ChatGPT & Claude

**Length:** 60–90 seconds  
**Tone:** Confident, practical, Monday-morning  
**Visual style:** Dark premium edtech (`#0b0f19` base, accents `{A1}` / `{A2}`)  
**Placeholder media:** Sample MP4 until final render

---

## Talk-over (narration)

*(0:00–0:08)*  
You already open ChatGPT or Claude at work. The gap isn’t access—it’s habits that ship.

*(0:08–0:22)*  
**AI for Work** teaches writing, research, meetings, light analysis, and safe team playbooks you can run Monday morning.

*(0:22–0:40)*  
Set up your desk, sound like yourself, ground research so it doesn’t hallucinate, turn meetings into owners and dates, clean tables, and publish policies your team will follow.

*(0:40–0:58)*  
Six modules. Twenty-four lessons. Drills that feel like Acme Ops—not theory slides.

*(0:58–1:15)*  
If AI still feels like extra tabs, this is the course that turns it into a desk. Enroll in **AI for Work** on The Ai Master Class.

---

## On-screen bullets (timed)

| Time | Bullet |
|------|--------|
| 0:10 | Ship better writing, research, decisions |
| 0:25 | ChatGPT & Claude · practical desk |
| 0:38 | Research · meetings · tables · policy |
| 0:50 | 6 modules · 24 lessons · ~6 hours |
| 1:05 | Ships Monday morning |

---

## Shot list

1. Cold open: messy tabs vs clean desk chooser.  
2. Curriculum flash: six module cards.  
3. Interactive success toast montage.  
4. Close: gradient orb, **The Ai Master Class**, CTA.

---

## Production notes

- Music: light tech pulse, duck under VO.  
- Product spelling: **The Ai Master Class** (keep “Ai”).
'''
    (ROOT / "assets" / "intro-video-script.md").write_text(intro)

    handoff = f'''# HANDOFF — AI for Work: ChatGPT & Claude

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-for-work/`  
Course id: `ai-for-work`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, video scripts, and lesson theme MP4s.
2. **All 24 lesson MP4 theme clips** are present (`modules/m01–m06/…/lessons/assets/l01–l04-video.mp4`).
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.

## Catalog metadata — UPDATE ON PUBLISH

Live catalog may still say:

- `duration`: **"5 hours"**
- `lessons`: **20**

**Pacing rule for this package:** **~1 hour per curriculum module** × **6 modules** ≈ **6 hours** / **24 lessons**.

**Action for site bot:** update `courses.json` (and any UI copy) to **6 hours** and **24 lessons** when publishing `ai-for-work`. Keep gradient `{A1}` → `{A2}` and product spelling **The Ai Master Class**.

## Suggested site paths

```text
content/ai-for-work/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  modules/m01-ai-desk-setup/
  modules/m02-writing-that-sounds-like-you/
  modules/m03-research-synthesis/
  modules/m04-meetings-notes-actions/
  modules/m05-spreadsheets-tables/
  modules/m06-privacy-policy-playbooks/
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2).

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until real recordings land.
- **All 24 lesson theme videos present (m01–m06)** — dark edtech motion-graphics MP4s at each module’s `lessons/assets/l01-video.mp4` … `l04-video.mp4` (854×480, ~8s, 12fps, H.264 yuv420p +faststart, silent).
- **Pipeline:** `scripts/make_lesson_video.py` (+ `scripts/themes_afw.py`) renders Pillow frames → `/usr/bin/ffmpeg`. **Grok Imagine / T2V deferred** (not used).
- CLI: `--all-m01` … `--all-m06`, `--all`.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Modules 1–6
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4`)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `{A1}`/`{A2}`, numbered Instructions, success criteria)
- [x] Module SVG diagram
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [x] `lessons/assets/l01-video.mp4` … `l04-video.mp4`

## Safety / voice

- Classroom-safe; fictional **Acme Ops** / `learner@example.com` only  
- Voice: confident, practical — “ships Monday morning”  
- ChatGPT vs Claude comparisons OK; no real secrets  
- No real PII, NSFW, or sensitive materials  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only). **All 24 lesson theme clips (m01–m06) are present** via Pillow+ffmpeg.  
- Catalog duration/lesson count may be stale (5h/20) — **update to 6h/24 on publish**.  
- No GitHub push performed from this workspace package.
'''
    (ROOT / "HANDOFF.md").write_text(handoff)


def build_manifest(file_paths):
    files = []
    for p in sorted(file_paths):
        rel = str(p.relative_to(ROOT))
        if rel.startswith("scripts/") and rel.endswith(".py") and "build_content" in rel:
            continue
        typ = "other"
        if rel in ("COURSE.md", "HANDOFF.md") or rel.endswith("MODULE.md"):
            typ = "meta"
        elif rel.endswith("-interactive.html"):
            typ = "interactive"
        elif "/lessons/" in rel and rel.endswith(".md"):
            typ = "lesson"
        elif rel.endswith(".svg"):
            typ = "diagram"
        elif rel.endswith("-video-script.md") or rel.endswith("intro-video-script.md"):
            typ = "video-script"
        elif rel.endswith(".mp4"):
            typ = "video"
        elif rel == "MANIFEST.json":
            continue
        files.append({"path": rel, "type": typ, "bytes": p.stat().st_size})

    lesson_videos = {}
    for i, mod in enumerate(MODULES, 1):
        key = f"m0{i}"
        clips = [
            f"modules/{mod['slug']}/lessons/assets/l0{j}-video.mp4" for j in range(1, 5)
        ]
        lesson_videos[key] = {
            "status": "added",
            "generator": "scripts/make_lesson_video.py",
            "clips": clips,
            "specs": "854x480 H.264 yuv420p +faststart ~8s @12fps dark-edtech theme clips (Pillow+ffmpeg motion-graphics; Grok Imagine deferred)",
        }

    minute = {"perModuleMinutes": 60, "courseTotalHours": 6}
    for i in range(1, 7):
        minute[f"m0{i}"] = {
            "introVideo": 4, "l01": 12, "l02": 14, "l03": 12, "l04": 12,
            "exampleVideo": 6, "total": 60,
        }

    manifest = {
        "courseId": "ai-for-work",
        "title": "AI for Work: ChatGPT & Claude",
        "product": "The Ai Master Class",
        "tagline": "Ship better writing, research, and decisions every day",
        "level": "Beginner",
        "duration": "6 hours",
        "lessons": 24,
        "pacing": "~1 hour per curriculum module × 6 modules",
        "catalogNote": "Catalog may still say 5 hours / 20 lessons — update to 6 hours / 24 lessons on publish",
        "gradient": [A1, A2],
        "moduleStatus": {m["slug"]: "built" for m in MODULES},
        "minuteBudget": minute,
        "typeTags": ["meta", "lesson", "interactive", "diagram", "video-script", "video", "image", "doc", "stub", "other"],
        "files": files,
        "lessonVideos": lesson_videos,
        "lessonVideosNote": "All 24 lesson theme MP4s present (m01–m06). Generated via local motion-graphics pipeline (Pillow + ffmpeg); Grok Imagine deferred.",
    }
    (ROOT / "MANIFEST.json").write_text(json.dumps(manifest, indent=2) + "\n")


def main():
    write_course_meta()
    for mod in MODULES:
        write_module(mod)
    # collect files except mp4s yet
    paths = [p for p in ROOT.rglob("*") if p.is_file() and "build_content" not in p.name]
    build_manifest(paths)
    print("Content written under", ROOT)


if __name__ == "__main__":
    main()
