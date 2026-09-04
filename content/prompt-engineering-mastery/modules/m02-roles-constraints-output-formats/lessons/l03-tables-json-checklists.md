# Lesson 2.3 — Tables, JSON, and checklists that parse

**Module:** Roles, constraints, and output formats  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Specify output shapes—markdown tables, JSON, and checklists—so a human or a script can consume the answer without cleanup.

## Teaching

### Format is a contract

Saying “make it structured” is not a contract. Naming columns, keys, or checkbox lines is.

| Vague | Parseable |
|-------|-----------|
| Give me a table of risks | Markdown table: Risk \| Impact \| Owner \| Status |
| Return JSON | JSON object with keys: `blocker` (bool), `item`, `owner`, `next_step` |
| Checklist please | Markdown checklist `- [ ]` with exactly one owner per line |

### Tables — name columns and row rules

```text
FORMAT: Markdown table with columns:
| Risk | Severity (BLOCKER/WATCH) | Evidence (email subject) | Owner |
One risk per row. No prose before or after the table.
```

### JSON — show a tiny schema + example

Models follow examples better than adjectives.

```text
FORMAT: Return ONLY valid JSON (no markdown fences) matching:
{
  "blockers": [{"item": string, "owner": string, "due": string}],
  "watch": [{"item": string, "note": string}]
}
If none, use empty arrays.
```

### Checklists — verbs + owners

```text
FORMAT: Markdown checklist for Acme Ops portal go-live:
- [ ] <action verb> — Owner: <name> — Due: <date or time>
Max 7 items. No commentary outside the list.
```

### Parsing tips that save Monday

1. **Forbid wrappers** — “No preamble. No closing thanks.”  
2. **Empty states** — say what to return when nothing qualifies.  
3. **One shape only** — don’t ask for “JSON or a table, whatever.”  
4. **Validate once** — paste the output into a table renderer or `JSON.parse` mentally.

### Talk-over narration

*(Beat 1)*  
“Format isn’t a vibe. It’s a schema your future self can paste into a doc or a script.”

*(Beat 2)*  
“Tables need columns. JSON needs keys. Checklists need verbs and owners. Show a miniature example when stakes are high.”

*(Beat 3)*  
“In the drill, you’ll turn a fuzzy ‘make it structured’ ask into a parseable contract.”

## Worked micro-example

**Before**

> Structure the vendor update somehow.

**After**

```text
GOAL: Extract vendor risks for Friday portal go-live.
FORMAT: ONLY a markdown table with columns Risk | Severity (BLOCKER/WATCH) | Evidence | Owner.
HARD: No prose outside the table; Severity must be BLOCKER or WATCH; Evidence = email subject from the paste.
```

## Practice

Open `l03-interactive.html` and write a parseable format block.

## Takeaway

**Named shape + empty state + no wrapper prose** = outputs that survive the handoff.
