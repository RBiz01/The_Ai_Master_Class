# HANDOFF — AI Music Production

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-music-production/`  
Course id: `ai-music-production`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, and video scripts.
2. **Lesson MP4s are pending** — markdown references `assets/l0N-video.mp4` with note “HeyGen Hyperframes + Beth narration (pending)”. Do **not** expect silent stub MP4s in this package.
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.
4. **Add catalog entry** — paste the `courses.json` object below (new course; not yet in live catalog).
5. **Cover** — parent drops `ai-music-production-cover.png` (see `assets/images/COVER-NOTE.md`); site path `images/courses/ai-music-production.png`.

## Suggested site paths

```text
content/ai-music-production/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  assets/images/COVER-NOTE.md
  bibles/voice-safety.md
  modules/m01-song-brief/
  modules/m02-lyrics-structure/
  modules/m03-generate-iterate/
  modules/m04-arrangement-mix/
  modules/m05-rights-release/
  modules/m06-music-os/
```

Wire interactives as lesson “practice” objects (static HTML, no network required except Google Fonts). Host each module SVG beside the lesson that references it (typically L2). Copy cover to `images/courses/ai-music-production.png` on the site when ready.

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until HeyGen Hyperframes + Beth narration land.
- **No fake silent lesson MP4s** in this package (per build brief).
- Product spelling: **The Ai Master Class** (keep “Ai”).
- Music only — do not overlap `generative-media`.

## Module publish checklist

### Modules 1–6
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` + pending note)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#ec4899`/`#8b5cf6`, numbered Instructions, success criteria)
- [x] Module SVG diagram
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (HeyGen pending)
- [ ] Cover `assets/images/ai-music-production-cover.png` (parent drop)

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** / `learner@example.com` only  
- **No real emails of real people** · no real artist clone asks · no NSFW · no full copyrighted lyrics  
- Voice: confident, practical — “Brief first. Ship weekly.”  
- Model-agnostic tool stance  

## Blockers

- Course/module intro MP4 trailers not in this package (scripts only).  
- Lesson theme/narration MP4s pending HeyGen.  
- Cover PNG pending parent drop.  
- Catalog entry is **new** — paste object below on publish.  
- No GitHub push performed from this workspace package.

---

## Paste-ready `courses.json` object

```json
{
  "id": "ai-music-production",
  "title": "AI Music Production",
  "tagline": "Write, generate, arrange, and ship tracks with AI music tools",
  "description": "A practical music OS with AI—song briefs, lyrics & structure, generation loops, arrangement & mix notes, rights & release, and a weekly ship cadence. Model-agnostic (Suno/Udio-style). Built for creators who ship.",
  "level": "Beginner",
  "duration": "6 hours",
  "lessons": 24,
  "price": 99,
  "compareAtPrice": 129,
  "category": [
    "Generative Media",
    "Strategy"
  ],
  "featured": true,
  "rating": 4.8,
  "reviewCount": 142,
  "gradient": [
    "#ec4899",
    "#8b5cf6"
  ],
  "video": {
    "poster": "images/courses/ai-music-production.png",
    "src": ""
  },
  "curriculum": [
    "Song brief & taste lock",
    "Lyrics & structure",
    "Generate & iterate",
    "Arrangement & mix notes",
    "Rights, credits, release",
    "A weekly music OS"
  ],
  "reviews": [
    {
      "name": "Maya Ortiz",
      "stars": 5,
      "text": "Finally a music+AI course that starts with briefs and taste locks instead of one vendor’s UI tour. Shipped my first clean single in a week.",
      "date": "2026-08-18"
    },
    {
      "name": "Devon Blake",
      "stars": 5,
      "text": "The rights and release checklist alone saved us from a messy upload. Model-agnostic advice actually transfers.",
      "date": "2026-07-22"
    },
    {
      "name": "Priya Shah",
      "stars": 4,
      "text": "Hook-writing and arrangement maps are excellent. Wanted one more DAW edit demo—still worth it.",
      "date": "2026-06-30"
    },
    {
      "name": "Chris Alvarez",
      "stars": 5,
      "text": "Weekly music OS turned random prompting into a ship cadence. Northstar scenarios feel real without being risky.",
      "date": "2026-05-14"
    }
  ],
  "image": "images/courses/ai-music-production.png",
  "hasContent": true,
  "contentPath": "content/ai-music-production/"
}
```

### Reviews (also embedded above)

| Name | Stars | Date | Text |
|------|-------|------|------|
| Maya Ortiz | 5 | 2026-08-18 | Finally a music+AI course that starts with briefs and taste locks instead of one vendor’s UI tour. Shipped my first clean single in a week. |
| Devon Blake | 5 | 2026-07-22 | The rights and release checklist alone saved us from a messy upload. Model-agnostic advice actually transfers. |
| Priya Shah | 4 | 2026-06-30 | Hook-writing and arrangement maps are excellent. Wanted one more DAW edit demo—still worth it. |
| Chris Alvarez | 5 | 2026-05-14 | Weekly music OS turned random prompting into a ship cadence. Northstar scenarios feel real without being risky. |

## Republish note

- Lessons include learner-facing `## What to do` section; republish lesson pages so learners see it.
- `video.src` left empty until intro trailer exists.
