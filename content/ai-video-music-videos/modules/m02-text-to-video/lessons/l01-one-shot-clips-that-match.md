# Lesson 2.1 — One-shot clips that match


**Module:** Text-to-video  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l01-interactive.html`

---

## Learning objective

Write single-clip T2V prompts that honor subject, look lock, and motion so the first usable take matches the brief.

## What to do

1. Watch the **Lesson video** once for the visual hook (HeyGen pending until `assets/l01-video.mp4` is replaced).
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l01-interactive.html` and follow its Instructions until you hit the success state (this locks in: One-shot clips that match).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Write single-clip T2V prompts that honor subject, look lock, and motion so the first usable take matches the brief.* and `l01-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l01-video.mp4)

**Video:** `assets/l01-video.mp4` — HeyGen pending (presenter path). Do not substitute a silent fake placeholder.

## Teaching

### One-shot that matches the brief

Model-agnostic T2V pattern used at **Northstar Studio** (Grok Imagine is one path among others):

```text
ONE-SHOT T2V
Subject: [from brief]
Action: [one verb phrase]
Camera: [named move or static]
Duration: [Ns]
Look lock: [paste immutable paragraph]
Negative / do-not: [morph, wardrobe change, text overlays, NSFW]
Output: single clip matching brief row #
```

### Talk-over narration

*(Beat 1)* "One shot, one job. Don't ask for a whole music video in one prompt."

*(Beat 2)* "Match the brief row. If the brief was wrong, fix the brief—not the hope."

### Worked micro-example

Brief row 2 → prompt uses exact subject "stylized courier," pan right, 4s, look lock pasted. First usable take matches; no wardrobe invent.

## Practice

Open `l01-interactive.html` and rewrite the vague prompt until the checker lights green.

## Takeaway

One clip per brief row. Paste the look lock every time.
