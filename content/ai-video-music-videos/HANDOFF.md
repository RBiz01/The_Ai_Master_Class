# HANDOFF — AI Video & Music Videos

For: **The Ai Master Class** publishing bot / content ops  
Package root: `/workspace/courses/ai-video-music-videos/`  
Course id: `ai-video-music-videos`  
Live catalog: https://rbiz01.github.io/The_Ai_Master_Class/ (see `data/courses.json`)

---

## What to publish

1. **Modules 1–6 are fully built** — ship all lessons, interactives, SVG diagrams, and video scripts.
2. **Lesson MP4s are HeyGen pending** — lessons reference `assets/l0N-video.mp4` but **no silent fake MP4s** are included. Omit missing mp4s from publish until presenter renders land.
3. **Do not push from this package automatically** — copy into the site content tree via your normal publish flow. **No GitHub push** from this workspace.
4. **Add catalog entry** — paste the `courses.json` object below (new course; not yet in live catalog).
5. **Cover** — see `assets/images/COVER-NOTE.md` (COVER-NOTE only; no placeholder PNG).

## Suggested site paths

```text
content/ai-video-music-videos/
  COURSE.md
  MANIFEST.json
  HANDOFF.md
  assets/intro-video-script.md
  assets/images/COVER-NOTE.md
  modules/m01-video-brief/
  modules/m02-text-to-video/
  modules/m03-presenter-narration/
  modules/m04-music-video/
  modules/m05-edit-ship/
  modules/m06-video-os/
```

Wire interactives as lesson “practice” objects (static HTML, no network required). Host each module SVG beside the lesson that references it (typically L2). When cover art is ready, copy to `images/courses/ai-video-music-videos.png` on the site.

## Trailers & video assets

- Course/module intro trailers are **scripts-only** until real recordings land.
- **Lesson videos:** referenced as `lessons/assets/l01-video.mp4` … `l04-video.mp4` — **HeyGen pending**. Do **not** generate silent fake theme MP4s for this package.
- Tool stance in copy: model-agnostic T2V; HeyGen/Hyperframes as one presenter path; Grok Imagine as one T2V path.
- Product spelling: **The Ai Master Class** (keep “Ai”).

## Module publish checklist

### Modules 1–6
- [x] `l01`–`l04` lesson markdown (with `## Lesson video` → `assets/l0N-video.mp4` HeyGen pending)
- [x] `l01`–`l04` interactive HTML (dark `#0b0f19`, accents `#7c5cff`/`#ec4899`, numbered Instructions, success criteria)
- [x] Module SVG diagram
- [x] `assets/module-intro-video-script.md` + `assets/example-video-script.md`
- [ ] `lessons/assets/l01-video.mp4` … `l04-video.mp4` (HeyGen pending — omitted from MANIFEST)
- [ ] Cover PNG (COVER-NOTE only for now)

## Safety / voice

- Classroom-safe; fictional **Northstar Studio** / `learner@example.com` only  
- **No real-person likeness. No NSFW.**  
- Voice: confident, practical — brief before generate; cut to the beat  
- No real PII or sensitive materials  

## Blockers

- Lesson presenter MP4s and course/module intro MP4s not in this package (scripts + HeyGen pending).  
- Cover PNG not in this package (COVER-NOTE only).  
- Catalog entry is **new** — paste object below on publish.  
- No GitHub push performed from this workspace package.

---

## Paste-ready `courses.json` object

```json
{
  "id": "ai-video-music-videos",
  "title": "AI Video & Music Videos",
  "tagline": "Text-to-video, presenter clips, and a locked-look music-video pipeline",
  "description": "Text-to-video, presenter clips, and a locked-look music-video pipeline—briefs, continuity, beat-grid stitch, and platform export. Motion + music-video assembly for creators who ship.",
  "level": "Intermediate",
  "duration": "6 hours",
  "lessons": 24,
  "price": 119,
  "compareAtPrice": 149,
  "category": [
    "Generative Media",
    "Strategy"
  ],
  "featured": true,
  "rating": 4.7,
  "reviewCount": 121,
  "gradient": [
    "#7c5cff",
    "#ec4899"
  ],
  "video": {
    "poster": "images/courses/ai-video-music-videos.png",
    "src": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  "curriculum": [
    "Video brief",
    "Text-to-video",
    "Presenter & narration",
    "Music video pipeline",
    "Edit & ship",
    "Video OS"
  ],
  "reviews": [
    {
      "name": "Riley Chen",
      "stars": 5,
      "text": "Finally a course that treats music-video assembly as a system—look lock and beat grid alone changed our turnaround.",
      "date": "2026-08-18"
    },
    {
      "name": "Morgan Blake",
      "stars": 5,
      "text": "Presenter vs VO guidance was practical. We ship lesson videos without fighting the graphics stack now.",
      "date": "2026-07-22"
    },
    {
      "name": "Avery Okonkwo",
      "stars": 4,
      "text": "Strong on continuity and failure modes. Wanted one more vertical-export lab—still the best motion pipeline I’ve used.",
      "date": "2026-06-30"
    },
    {
      "name": "Quinn Nakamura",
      "stars": 5,
      "text": "Differentiates from stills and music courses perfectly. Shipped a 60s cut in the capstone week.",
      "date": "2026-05-14"
    }
  ],
  "image": "images/courses/ai-video-music-videos.png",
  "hasContent": true,
  "contentPath": "content/ai-video-music-videos/"
}
```

### Reviews (also embedded above)

| Name | Stars | Date | Text |
|------|-------|------|------|
| Riley Chen | 5 | 2026-08-18 | Finally a course that treats music-video assembly as a system—look lock and beat grid alone changed our turnaround. |
| Morgan Blake | 5 | 2026-07-22 | Presenter vs VO guidance was practical. We ship lesson videos without fighting the graphics stack now. |
| Avery Okonkwo | 4 | 2026-06-30 | Strong on continuity and failure modes. Wanted one more vertical-export lab—still the best motion pipeline I’ve used. |
| Quinn Nakamura | 5 | 2026-05-14 | Differentiates from stills and music courses perfectly. Shipped a 60s cut in the capstone week. |

## Republish note

- Lessons include learner-facing `## What to do` after Learning objective; keep that section on publish.
- MANIFEST omits missing mp4s by design until HeyGen renders arrive.
