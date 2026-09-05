# Lesson 5.3 — Platform exports


**Module:** Edit & ship  
**Duration:** ~6–8 min teaching + ~4 min interactive  
**Interactive:** `l03-interactive.html`

---

## Learning objective

Export masters and platform derivatives (16:9, 9:16, square) with bitrate and caption rules that survive upload.

## What to do

1. Watch the **Lesson video** once for the visual hook (HeyGen pending until `assets/l03-video.mp4` is replaced).
2. Read **Teaching** (and the worked example) without rushing.
3. Open `l03-interactive.html` and follow its Instructions until you hit the success state (this locks in: Platform exports).
4. Rewrite or apply the idea once in your own words (one sentence is enough).
5. **You’re done when:** you can explain — in plain language — *Export masters and platform derivatives (16:9, 9:16, square) with bitrate and caption rules that survive upload.* and `l03-interactive.html` shows success.

## Lesson video

![Lesson video](assets/l03-video.mp4)

**Video:** `assets/l03-video.mp4` — HeyGen pending (presenter path). Do not substitute a silent fake placeholder.

## Teaching

### Platform exports

Export ladder:

1. **Master** 16:9 ProRes or high-bitrate Mezzanine
2. **YouTube/web** 16:9 H.264
3. **Vertical** 9:16 center or custom reframe
4. **Square** 1:1 for feeds if needed

Captions: burn-in vs sidecar per platform. Keep loudness consistent.

```text
EXPORT CHECK
- Aspect derivatives from master—not re-generated looks
- Filename: aurora_master_16x9.mp4, aurora_yt_16x9.mp4, …
```

### Talk-over narration

*(Beat 1)* "Master once. Derive many. Don't re-roll look per platform."

*(Beat 2)* "Reframe carefully—center crop is not always the story."

### Worked micro-example

Ship master + YT + vertical; captions sidecar for YT, burn-in for silent autoplay feeds.

## Practice

Open `l03-interactive.html` and rewrite the vague prompt until the checker lights green.

## Takeaway

One master. Platform derivatives. Don't regenerate look per channel.
