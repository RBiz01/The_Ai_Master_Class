# Lesson 1.4 — Failure modes: mush, extras, off-brand

**Module:** Visual brief
**Duration:** ~6–8 min teaching + ~4 min interactive
**Interactive:** `l04-interactive.html`

---

## Learning objective

Spot and name common still failure modes—mush detail, extras, off-brand—and write reject rules that catch them.

## What to do

1. Watch the **Lesson video** once for the visual hook.
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l04-interactive.html` and follow its Instructions until you hit the success state (this locks in: Failure modes: mush, extras, off-brand).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Spot and name common still failure modes—mush detail, extras, off-brand—and write reject rules that catch them.* and `l04-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l04-video.mp4)

**Video:** `assets/l04-video.mp4` — HeyGen pending (do not ship silent placeholders).

## Teaching

### Name the failure before it ships

Three failure modes kill stills campaigns at Northstar:

1. **Mush** — soft, smeared detail where edges and type should be crisp (logo, product seams, hands).
2. **Extras** — phantom props, extra fingers, duplicate logos, floating labels, weird reflections.
3. **Off-brand** — wrong palette, wrong motif, accidental celebrity likeness, NSFW-adjacent posing.

```text
QA reject checklist (stills)
[ ] Mush on primary subject edges / logo
[ ] Extra limbs, fingers, props, or logos
[ ] Off-palette or wrong motif
[ ] Real-person likeness or NSFW risk
[ ] Wrong aspect or unsafe crop for destination
```

### Talk-over narration

*(Beat 1)* “Pretty mush still fails the zoom test. Clients zoom.”

*(Beat 2)* “If you can’t name the failure mode, you can’t teach the model—or your teammate—what to fix.”

### Worked micro-example

**Fail:** soft logo + fifth finger + electric-blue backdrop.  
**Action:** inpaint logo, regenerate hands or crop, re-lock palette.

## Practice

Open `l04-interactive.html` and rewrite the vague prompt until the checker lights green.

## Takeaway

Reject on mush, extras, and off-brand before you upscale or deliver.
