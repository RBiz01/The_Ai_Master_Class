#!/usr/bin/env python3
"""
make_lesson_video.py — Dark edtech motion-graphics lesson videos (Pillow + ffmpeg)

Reusable generator for AI for Work lesson clips.
Renders classroom-safe UI mock animations at 854x480, then encodes H.264.

Usage:
  /workspace/courses/pem-venv/bin/python scripts/make_lesson_video.py \\
      --preset m01-l01 --out path/to/l01-video.mp4

  /workspace/courses/pem-venv/bin/python scripts/make_lesson_video.py \\
      --config lessons.json --id l01 --out path/to/out.mp4

  /workspace/courses/pem-venv/bin/python scripts/make_lesson_video.py --all-m01
  /workspace/courses/pem-venv/bin/python scripts/make_lesson_video.py --all-remaining
  /workspace/courses/pem-venv/bin/python scripts/make_lesson_video.py --all-m02

JSON/YAML config schema (list or {"lessons": [...]}):
  {
    "id": "l01",
    "title": "What makes a prompt clear",
    "theme": "vague_to_clear",   # or: gccf_assemble | specificity_slider | failure_tiles
    "duration_s": 8,
    "fps": 12,
    "out": "optional/override.mp4"
  }

Themes cover Modules 1–6 (see themes_m02_m06.py for m02–m06); register new
draw_* functions in THEME_DRAWERS.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any, Callable

try:
    import yaml  # type: ignore
except ImportError:
    yaml = None

from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------
# Design tokens
# ---------------------------------------------------------------------------
W, H = 854, 480
BG = (11, 15, 25)           # #0b0f19
ACCENT_PURPLE = (59, 130, 246)  # #3b82f6
ACCENT_TEAL = (139, 92, 246)     # #8b5cf6
WHITE = (255, 255, 255)
LIGHT = (220, 226, 240)
MUTED = (140, 150, 175)
CARD = (18, 24, 40)
CARD_BORDER = (36, 46, 72)
DANGER = (255, 107, 129)
WARN = (255, 184, 77)
OK = ACCENT_TEAL

DEFAULT_FPS = 12
DEFAULT_DUR = 8.0

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]
FONT_BOLD_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    paths = FONT_BOLD_PATHS if bold else FONT_PATHS
    for p in paths:
        if os.path.isfile(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                continue
    return ImageFont.load_default()


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))


def ease_in_out(t: float) -> float:
    t = clamp(t)
    return t * t * (3 - 2 * t)


def ease_out_cubic(t: float) -> float:
    t = clamp(t)
    return 1 - (1 - t) ** 3


def blend(c1: tuple, c2: tuple, t: float) -> tuple:
    t = clamp(t)
    return tuple(int(lerp(a, b, t)) for a, b in zip(c1, c2))


def with_alpha(img: Image.Image, alpha: float) -> Image.Image:
    """Return RGBA image with overall alpha multiplied."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    if alpha >= 0.999:
        return img
    a = img.split()[3]
    a = a.point(lambda p: int(p * clamp(alpha)))
    out = img.copy()
    out.putalpha(a)
    return out


def rounded_rect(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int, int, int],
    radius: int,
    fill=None,
    outline=None,
    width: int = 1,
) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def text_size(draw: ImageDraw.ImageDraw, text: str, font) -> tuple[int, int]:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    xy_center: tuple[float, float],
    text: str,
    font,
    fill=WHITE,
) -> None:
    tw, th = text_size(draw, text, font)
    draw.text((xy_center[0] - tw / 2, xy_center[1] - th / 2), text, font=font, fill=fill)


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font,
    fill,
    max_width: int,
    line_gap: int = 4,
) -> int:
    """Draw word-wrapped text; return height used."""
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        tw, _ = text_size(draw, trial, font)
        if tw <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        _, th = text_size(draw, line, font)
        y += th + line_gap
    return y - xy[1]


def new_frame() -> Image.Image:
    return Image.new("RGB", (W, H), BG)


def draw_chrome(img: Image.Image, title: str, subtitle: str = "", meta: dict | None = None) -> None:
    """Top bar + lesson title strip."""
    draw = ImageDraw.Draw(img)
    # top accent line
    draw.rectangle([0, 0, W, 3], fill=ACCENT_PURPLE)
    # subtle bottom glow line
    draw.rectangle([0, H - 2, W, H], fill=ACCENT_TEAL)
    font_sm = _font(14, bold=True)
    font_xs = _font(12)
    draw.text((24, 14), "AI FOR WORK", font=font_sm, fill=MUTED)
    module_label = (meta or {}).get("module_label", "Module 1 · Foundations")
    draw.text((24, 34), module_label, font=font_xs, fill=ACCENT_TEAL)
    # title at bottom-left
    font_t = _font(16, bold=True)
    draw.text((24, H - 36), title, font=font_t, fill=LIGHT)
    if subtitle:
        font_s = _font(12)
        tw, _ = text_size(draw, title, font_t)
        draw.text((24 + tw + 16, H - 34), subtitle, font=font_s, fill=MUTED)


# ---------------------------------------------------------------------------
# Theme: vague_to_clear (l01)
# ---------------------------------------------------------------------------
def draw_vague_to_clear(t: float, meta: dict) -> Image.Image:
    """Vague prompt morphs into clear prompt with Outcome/Audience/Scope/Shape labels."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "What makes a prompt clear")
    draw_chrome(img, title, meta=meta)

    # Timeline: 0-0.25 show vague, 0.25-0.55 morph, 0.55-1.0 clear + labels light up
    vague = '“Summarize the emails.”'
    clear_lines = [
        "Summarize the last 24 hours of Acme Ops",
        "vendor emails for a standup update.",
        "Outcome · Audience · Scope · Shape",
    ]

    # Card
    card = [80, 90, W - 80, 340]
    rounded_rect(draw, tuple(card), 16, fill=CARD, outline=CARD_BORDER, width=2)

    font_body = _font(22)
    font_label = _font(13, bold=True)
    font_clear = _font(18)

    if t < 0.28:
        # Vague state
        alpha_pulse = 0.7 + 0.3 * math.sin(t * 18)
        color = blend(MUTED, (200, 160, 160), 0.3)
        draw_centered_text(draw, (W / 2, 200), vague, font_body, fill=color)
        badge = "VAGUE"
        bw, bh = text_size(draw, badge, font_label)
        bx = W // 2 - bw // 2 - 10
        by = 110
        rounded_rect(draw, (bx, by, bx + bw + 20, by + bh + 10), 8, fill=(60, 30, 40), outline=DANGER, width=1)
        draw.text((bx + 10, by + 5), badge, font=font_label, fill=DANGER)
    elif t < 0.55:
        # Morph: fade vague out, fade clear in; card border shifts purple→teal
        u = ease_in_out((t - 0.28) / 0.27)
        border = blend(CARD_BORDER, ACCENT_TEAL, u)
        rounded_rect(draw, tuple(card), 16, fill=CARD, outline=border, width=2)
        # crossfade text
        if u < 0.5:
            fade = 1 - u * 2
            color = blend(MUTED, BG, 1 - fade)
            draw_centered_text(draw, (W / 2, 200), vague, font_body, fill=color)
        else:
            fade = (u - 0.5) * 2
            cy = 160
            for i, line in enumerate(clear_lines[:2]):
                col = blend(BG, LIGHT, fade)
                draw_centered_text(draw, (W / 2, cy + i * 28), line, font_clear, fill=col)
    else:
        # Clear state + labels light teal
        u = ease_out_cubic((t - 0.55) / 0.45)
        rounded_rect(draw, tuple(card), 16, fill=CARD, outline=ACCENT_TEAL, width=2)
        badge = "CLEAR"
        bw, bh = text_size(draw, badge, font_label)
        bx = W // 2 - bw // 2 - 10
        by = 105
        rounded_rect(draw, (bx, by, bx + bw + 20, by + bh + 10), 8, fill=(20, 50, 45), outline=ACCENT_TEAL, width=1)
        draw.text((bx + 10, by + 5), badge, font=font_label, fill=ACCENT_TEAL)

        cy = 155
        for i, line in enumerate(clear_lines[:2]):
            draw_centered_text(draw, (W / 2, cy + i * 28), line, font_clear, fill=LIGHT)

        # Four signal labels lighting up sequentially
        labels = ["Outcome", "Audience", "Scope", "Shape"]
        gap = 18
        total_w = 0
        widths = []
        for lab in labels:
            lw, lh = text_size(draw, lab, font_label)
            widths.append((lw, lh))
            total_w += lw + 24 + gap
        total_w -= gap
        x0 = (W - total_w) // 2
        y0 = 280
        for i, lab in enumerate(labels):
            lit = clamp((u - i * 0.18) / 0.25)
            lw, lh = widths[i]
            fill_bg = blend(CARD, (20, 55, 50), lit)
            outline = blend(CARD_BORDER, ACCENT_TEAL, lit)
            text_c = blend(MUTED, ACCENT_TEAL, lit)
            rounded_rect(
                draw,
                (x0, y0, x0 + lw + 24, y0 + lh + 12),
                8,
                fill=fill_bg,
                outline=outline,
                width=2,
            )
            draw.text((x0 + 12, y0 + 6), lab, font=font_label, fill=text_c)
            x0 += lw + 24 + gap

    return img


# ---------------------------------------------------------------------------
# Theme: gccf_assemble (l02)
# ---------------------------------------------------------------------------
def draw_gccf_assemble(t: float, meta: dict) -> Image.Image:
    """Four panels Goal/Context/Constraints/Format assemble into one prompt card."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Goal · Context · Constraints · Format")
    draw_chrome(img, title, meta=meta)

    panels = [
        ("GOAL", "Standup-ready\nvendor risk digest", ACCENT_PURPLE),
        ("CONTEXT", "Portal go-live Fri\nOps lead: Jordan", ACCENT_TEAL),
        ("CONSTRAINTS", "≤5 bullets\nNo speculation", ACCENT_PURPLE),
        ("FORMAT", "MD · Risk / Action\nheaders", ACCENT_TEAL),
    ]

    font_h = _font(13, bold=True)
    font_b = _font(12)
    font_card = _font(14)
    font_card_h = _font(15, bold=True)

    # Panel layout (2x2)
    pw, ph = 170, 100
    positions_grid = [
        (90, 90),
        (W // 2 + 20, 90),
        (90, 210),
        (W // 2 + 20, 210),
    ]
    # Final assembled card center
    final_card = (120, 100, W - 120, 340)

    if t < 0.45:
        # Panels fly in
        for i, ((label, body, color), (px, py)) in enumerate(zip(panels, positions_grid)):
            appear = ease_out_cubic(clamp((t - i * 0.08) / 0.2))
            if appear <= 0:
                continue
            ox = int((1 - appear) * (-80 if i % 2 == 0 else 80))
            oy = int((1 - appear) * (-40 if i < 2 else 40))
            x, y = px + ox, py + oy
            # draw with brightness based on appear
            bg = blend(BG, CARD, appear)
            rounded_rect(
                draw,
                (x, y, x + pw, y + ph),
                12,
                fill=bg,
                outline=blend(BG, color, appear),
                width=2,
            )
            tc = blend(BG, color, appear)
            bc = blend(BG, LIGHT, appear)
            draw.text((x + 14, y + 12), label, font=font_h, fill=tc)
            for j, line in enumerate(body.split("\n")):
                draw.text((x + 14, y + 36 + j * 18), line, font=font_b, fill=bc)
    elif t < 0.7:
        # Converge toward center card
        u = ease_in_out((t - 0.45) / 0.25)
        cx = W // 2
        cy = 220
        for i, ((label, body, color), (px, py)) in enumerate(zip(panels, positions_grid)):
            x = int(lerp(px, cx - pw // 2, u))
            y = int(lerp(py, cy - ph // 2, u))
            scale_fade = 1 - u * 0.5
            # shrink visually by inset
            inset = int(u * 20)
            rounded_rect(
                draw,
                (x + inset, y + inset, x + pw - inset, y + ph - inset),
                12,
                fill=CARD,
                outline=blend(color, ACCENT_TEAL, u),
                width=2,
            )
            if u < 0.6:
                draw.text((x + 14, y + 12), label, font=font_h, fill=blend(color, MUTED, u))
    else:
        # Assembled prompt card
        u = ease_out_cubic((t - 0.7) / 0.3)
        border = blend(ACCENT_PURPLE, ACCENT_TEAL, u)
        rounded_rect(draw, final_card, 16, fill=CARD, outline=border, width=2)
        draw.text((final_card[0] + 24, final_card[1] + 18), "GCCF PROMPT CARD", font=font_card_h, fill=ACCENT_TEAL)

        lines = [
            ("GOAL", "Standup-ready vendor risk digest"),
            ("CONTEXT", "Portal go-live Friday · Ops lead Jordan"),
            ("CONSTRAINTS", "Max 5 bullets · No speculation · Cite subjects"),
            ("FORMAT", "Markdown under Risk / Action headers"),
        ]
        y = final_card[1] + 55
        for i, (lab, val) in enumerate(lines):
            lit = clamp((u - i * 0.12) / 0.2)
            if lit <= 0:
                continue
            c_lab = blend(BG, ACCENT_PURPLE if i % 2 == 0 else ACCENT_TEAL, lit)
            c_val = blend(BG, LIGHT, lit)
            draw.text((final_card[0] + 24, y), lab, font=font_h, fill=c_lab)
            draw.text((final_card[0] + 140, y), val, font=font_card, fill=c_val)
            y += 36

    return img


# ---------------------------------------------------------------------------
# Theme: specificity_slider (l03)
# ---------------------------------------------------------------------------
def draw_specificity_slider(t: float, meta: dict) -> Image.Image:
    """Slider moves vague → just right → overfit, then settles on just right."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Specificity without overfitting")
    draw_chrome(img, title, meta=meta)

    # Slider track
    track_x0, track_x1 = 120, W - 120
    track_y = 160
    track_h = 8
    rounded_rect(
        draw,
        (track_x0, track_y, track_x1, track_y + track_h),
        4,
        fill=(30, 38, 58),
        outline=CARD_BORDER,
        width=1,
    )

    # Zone markers
    font_lab = _font(13, bold=True)
    font_body = _font(16)
    font_ex = _font(14)
    zones = [
        (0.0, "VAGUE", DANGER),
        (0.5, "JUST RIGHT", ACCENT_TEAL),
        (1.0, "OVERFIT", WARN),
    ]
    for z, lab, col in zones:
        zx = int(lerp(track_x0, track_x1, z))
        draw.ellipse([zx - 5, track_y - 3, zx + 5, track_y + track_h + 3], fill=col)
        tw, _ = text_size(draw, lab, font_lab)
        draw.text((zx - tw // 2, track_y - 28), lab, font=font_lab, fill=col)

    # Knob position over time:
    # 0-0.25 → vague (0), 0.25-0.45 → just right (0.5), 0.45-0.65 → overfit (1.0),
    # 0.65-0.85 → back to just right (0.5), 0.85-1 hold
    if t < 0.22:
        pos = ease_in_out(t / 0.22) * 0.05  # start near vague
    elif t < 0.42:
        pos = lerp(0.05, 0.5, ease_in_out((t - 0.22) / 0.2))
    elif t < 0.62:
        pos = lerp(0.5, 1.0, ease_in_out((t - 0.42) / 0.2))
    elif t < 0.82:
        pos = lerp(1.0, 0.5, ease_in_out((t - 0.62) / 0.2))
    else:
        pos = 0.5

    kx = int(lerp(track_x0, track_x1, pos))
    kr = 14
    # glow
    draw.ellipse([kx - kr - 4, track_y + track_h // 2 - kr - 4, kx + kr + 4, track_y + track_h // 2 + kr + 4], fill=(40, 50, 80))
    knob_color = ACCENT_TEAL if abs(pos - 0.5) < 0.15 else (WARN if pos > 0.5 else DANGER)
    draw.ellipse(
        [kx - kr, track_y + track_h // 2 - kr, kx + kr, track_y + track_h // 2 + kr],
        fill=knob_color,
        outline=WHITE,
        width=2,
    )

    # Example card reflecting position
    if pos < 0.33:
        zone = "vague"
        example = "“Improve this.”"
        tip = "Too many decisions left open."
        border = DANGER
    elif pos < 0.66:
        zone = "just_right"
        example = "Tighten for execs · ≤120 words · lead with risk"
        tip = "Decisions locked. Accidents free."
        border = ACCENT_TEAL
    else:
        zone = "overfit"
        example = "Use “synergize” twice · rhyme the closer · blue banner"
        tip = "Encoding accidents, not intent."
        border = WARN

    card = [80, 220, W - 80, 380]
    rounded_rect(draw, tuple(card), 14, fill=CARD, outline=border, width=2)
    draw_centered_text(draw, (W / 2, 280), example, font_ex, fill=LIGHT)
    draw_centered_text(draw, (W / 2, 330), tip, font_body, fill=blend(MUTED, border, 0.6))

    # Settled checkmark when holding just right
    if t >= 0.82:
        pulse = 0.6 + 0.4 * math.sin((t - 0.82) * 20)
        check = "✓ Goldilocks zone"
        cw, ch = text_size(draw, check, font_lab)
        draw.text(((W - cw) // 2, 395), check, font=font_lab, fill=blend(BG, ACCENT_TEAL, pulse))

    return img


# ---------------------------------------------------------------------------
# Theme: failure_tiles (l04)
# ---------------------------------------------------------------------------
def draw_failure_tiles(t: float, meta: dict) -> Image.Image:
    """Four failure tiles flash then resolve to teal checks."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Common failure modes")
    draw_chrome(img, title, meta=meta)

    tiles = [
        ("Missing goal", "“Thoughts on this?”", "Done means ___."),
        ("Hidden context", "Model invents dates", "Label CONTEXT facts"),
        ("Conflicting limits", "Brief + cover all", "Pick a priority"),
        ("Format drift", "Asked bullets → essay", "Restate FORMAT"),
    ]

    font_h = _font(14, bold=True)
    font_b = _font(12)
    font_fix = _font(11)

    tw, th = 170, 120
    positions = [
        (90, 95),
        (W // 2 + 20, 95),
        (90, 240),
        (W // 2 + 20, 240),
    ]

    for i, ((name, symptom, fix), (px, py)) in enumerate(zip(tiles, positions)):
        # Timeline per tile: appear/flash danger, then resolve to teal check
        local_start = 0.08 + i * 0.1
        flash_end = local_start + 0.28
        resolve_end = flash_end + 0.22

        if t < local_start:
            continue

        if t < flash_end:
            # Flash danger
            u = (t - local_start) / (flash_end - local_start)
            flash = 0.5 + 0.5 * abs(math.sin(u * math.pi * 3))
            border = blend(CARD_BORDER, DANGER, flash)
            bg = blend(CARD, (50, 25, 35), flash * 0.5)
            status = "FAIL"
            status_c = DANGER
            show_fix = False
            check_lit = 0.0
        elif t < resolve_end:
            u = ease_in_out((t - flash_end) / (resolve_end - flash_end))
            border = blend(DANGER, ACCENT_TEAL, u)
            bg = blend((50, 25, 35), (18, 45, 42), u)
            status = "FIX" if u < 0.5 else "OK"
            status_c = blend(DANGER, ACCENT_TEAL, u)
            show_fix = u > 0.4
            check_lit = u
        else:
            border = ACCENT_TEAL
            bg = (18, 45, 42)
            status = "OK"
            status_c = ACCENT_TEAL
            show_fix = True
            check_lit = 1.0

        rounded_rect(draw, (px, py, px + tw, py + th), 12, fill=bg, outline=border, width=2)
        draw.text((px + 14, py + 12), name, font=font_h, fill=LIGHT)
        draw.text((px + 14, py + 38), symptom, font=font_b, fill=MUTED)

        # status badge
        sw, sh = text_size(draw, status, font_fix)
        bx = px + tw - sw - 24
        by = py + 10
        rounded_rect(draw, (bx, by, bx + sw + 12, by + sh + 8), 6, fill=blend(CARD, border, 0.3), outline=status_c, width=1)
        draw.text((bx + 6, by + 4), status, font=font_fix, fill=status_c)

        if show_fix:
            draw.text((px + 14, py + 70), "→ " + fix, font=font_b, fill=blend(MUTED, ACCENT_TEAL, check_lit))

        if check_lit > 0.7:
            # teal check circle
            cx, cy = px + tw - 28, py + th - 28
            r = 12
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ACCENT_TEAL)
            # simple check mark
            draw.line([(cx - 5, cy), (cx - 1, cy + 5), (cx + 6, cy - 4)], fill=BG, width=3)

    return img


THEME_DRAWERS: dict[str, Callable[[float, dict], Image.Image]] = {
    "vague_to_clear": draw_vague_to_clear,
    "gccf_assemble": draw_gccf_assemble,
    "specificity_slider": draw_specificity_slider,
    "failure_tiles": draw_failure_tiles,
}

# Bind + merge Modules 2–6 drawers
from themes_afw import THEME_DRAWERS_M02_M06, bind as _bind_m02_m06  # noqa: E402

_bind_m02_m06({
    "W": W,
    "H": H,
    "BG": BG,
    "ACCENT_PURPLE": ACCENT_PURPLE,
    "ACCENT_TEAL": ACCENT_TEAL,
    "WHITE": WHITE,
    "LIGHT": LIGHT,
    "MUTED": MUTED,
    "CARD": CARD,
    "CARD_BORDER": CARD_BORDER,
    "DANGER": DANGER,
    "WARN": WARN,
    "_font": _font,
    "lerp": lerp,
    "clamp": clamp,
    "ease_in_out": ease_in_out,
    "ease_out_cubic": ease_out_cubic,
    "blend": blend,
    "rounded_rect": rounded_rect,
    "text_size": text_size,
    "draw_centered_text": draw_centered_text,
    "new_frame": new_frame,
    "draw_chrome": draw_chrome,
})
THEME_DRAWERS.update(THEME_DRAWERS_M02_M06)


# ---------------------------------------------------------------------------
# Built-in presets (Modules 1–6)
# ---------------------------------------------------------------------------
def _preset(mid: str, lid: str, title: str, theme: str, module_dir: str, module_label: str) -> dict[str, Any]:
    return {
        "id": lid,
        "title": title,
        "theme": theme,
        "duration_s": 8,
        "fps": 12,
        "module_label": module_label,
        "out_rel": f"modules/{module_dir}/lessons/assets/{lid}-video.mp4",
    }


M01_DIR = "m01-ai-desk-setup"
M01_LABEL = "Module 1 · AI desk setup"
M01_PRESETS: dict[str, dict[str, Any]] = {
    "m01-l01": _preset("m01", "l01", "ChatGPT vs Claude desk tools", "hard_soft_split", M01_DIR, M01_LABEL),
    "m01-l02": _preset("m01", "l02", "Browser apps & workspace habits", "library_shelves", M01_DIR, M01_LABEL),
    "m01-l03": _preset("m01", "l03", "Custom instructions & memory", "tone_dials", M01_DIR, M01_LABEL),
    "m01-l04": _preset("m01", "l04", "Weekly AI ritual", "iterate_v1v3", M01_DIR, M01_LABEL),
}

M02_DIR = "m02-writing-that-sounds-like-you"
M02_LABEL = "Module 2 · Writing like you"
M02_PRESETS: dict[str, dict[str, Any]] = {
    "m02-l01": _preset("m02", "l01", "Capture your voice", "exemplar_builder", M02_DIR, M02_LABEL),
    "m02-l02": _preset("m02", "l02", "Email & Slack like you", "three_kits_expand", M02_DIR, M02_LABEL),
    "m02-l03": _preset("m02", "l03", "Long-form without AI accent", "contrast_set", M02_DIR, M02_LABEL),
    "m02-l04": _preset("m02", "l04", "Editing passes", "tone_dials", M02_DIR, M02_LABEL),
}

M03_DIR = "m03-research-synthesis"
M03_LABEL = "Module 3 · Research & synthesis"
M03_PRESETS: dict[str, dict[str, Any]] = {
    "m03-l01": _preset("m03", "l01", "Grounding: paste sources", "research_funnel", M03_DIR, M03_LABEL),
    "m03-l02": _preset("m03", "l02", "Claim · Evidence · Confidence", "verify_checklist", M03_DIR, M03_LABEL),
    "m03-l03": _preset("m03", "l03", "Multi-source synthesis briefs", "task_decompose", M03_DIR, M03_LABEL),
    "m03-l04": _preset("m03", "l04", "Hallucination red flags", "failure_tiles", M03_DIR, M03_LABEL),
}

M04_DIR = "m04-meetings-notes-actions"
M04_LABEL = "Module 4 · Meetings & notes"
M04_PRESETS: dict[str, dict[str, Any]] = {
    "m04-l01": _preset("m04", "l01", "Transcript to structured notes", "plan_then_answer", M04_DIR, M04_LABEL),
    "m04-l02": _preset("m04", "l02", "Action plans owners & dates", "format_toggle", M04_DIR, M04_LABEL),
    "m04-l03": _preset("m04", "l03", "Pre-meeting briefs", "plan_vs_skip", M04_DIR, M04_LABEL),
    "m04-l04": _preset("m04", "l04", "Follow-ups that get answered", "version_handoff", M04_DIR, M04_LABEL),
}

M05_DIR = "m05-spreadsheets-tables"
M05_LABEL = "Module 5 · Spreadsheets"
M05_PRESETS: dict[str, dict[str, Any]] = {
    "m05-l01": _preset("m05", "l01", "Messy data to clean tables", "format_toggle", M05_DIR, M05_LABEL),
    "m05-l02": _preset("m05", "l02", "Formulas & pivots plain English", "gccf_assemble", M05_DIR, M05_LABEL),
    "m05-l03": _preset("m05", "l03", "Light analysis trends", "multi_pane_scores", M05_DIR, M05_LABEL),
    "m05-l04": _preset("m05", "l04", "Charts & exec one-pagers", "rubrics_vs_stars", M05_DIR, M05_LABEL),
}

M06_DIR = "m06-privacy-policy-playbooks"
M06_LABEL = "Module 6 · Privacy & playbooks"
M06_PRESETS: dict[str, dict[str, Any]] = {
    "m06-l01": _preset("m06", "l01", "What not to paste", "failure_tiles", M06_DIR, M06_LABEL),
    "m06-l02": _preset("m06", "l02", "Vendor policies & company rules", "hard_soft_split", M06_DIR, M06_LABEL),
    "m06-l03": _preset("m06", "l03", "Team playbooks & shared prompts", "library_shelves", M06_DIR, M06_LABEL),
    "m06-l04": _preset("m06", "l04", "Governance versioning review", "version_handoff", M06_DIR, M06_LABEL),
}

ALL_PRESETS: dict[str, dict[str, Any]] = {}
ALL_PRESETS.update(M01_PRESETS)
ALL_PRESETS.update(M02_PRESETS)
ALL_PRESETS.update(M03_PRESETS)
ALL_PRESETS.update(M04_PRESETS)
ALL_PRESETS.update(M05_PRESETS)
ALL_PRESETS.update(M06_PRESETS)

MODULE_PRESET_GROUPS = {
    "m01": M01_PRESETS,
    "m02": M02_PRESETS,
    "m03": M03_PRESETS,
    "m04": M04_PRESETS,
    "m05": M05_PRESETS,
    "m06": M06_PRESETS,
}


# ---------------------------------------------------------------------------
# Render + encode
# ---------------------------------------------------------------------------
def render_frames(
    theme: str,
    meta: dict,
    fps: int,
    duration_s: float,
    frames_dir: Path,
) -> int:
    drawer = THEME_DRAWERS.get(theme)
    if not drawer:
        raise SystemExit(f"Unknown theme: {theme}. Known: {list(THEME_DRAWERS)}")
    n = max(1, int(round(fps * duration_s)))
    frames_dir.mkdir(parents=True, exist_ok=True)
    for i in range(n):
        t = i / max(1, n - 1)
        frame = drawer(t, meta)
        frame.save(frames_dir / f"frame_{i:04d}.png", "PNG")
    return n


def encode_mp4(frames_dir: Path, out_path: Path, fps: int) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Write to temp then move for atomicity
    tmp = out_path.with_suffix(".tmp.mp4")
    pattern = str(frames_dir / "frame_%04d.png")
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(fps),
        "-i", pattern,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-crf", "23",
        "-preset", "medium",
        "-an",
        str(tmp),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    tmp.replace(out_path)


def make_video(spec: dict[str, Any], course_root: Path) -> Path:
    theme = spec["theme"]
    fps = int(spec.get("fps", DEFAULT_FPS))
    dur = float(spec.get("duration_s", DEFAULT_DUR))
    meta = {
        "title": spec.get("title", ""),
        "id": spec.get("id", ""),
        "module_label": spec.get("module_label", "Module 1 · Foundations"),
    }

    if "out" in spec and spec["out"]:
        out_path = Path(spec["out"])
        if not out_path.is_absolute():
            out_path = course_root / out_path
    elif "out_rel" in spec:
        out_path = course_root / spec["out_rel"]
    else:
        raise SystemExit("spec needs 'out' or 'out_rel'")

    with tempfile.TemporaryDirectory(prefix="lessonvid_") as tmp:
        frames_dir = Path(tmp) / "frames"
        n = render_frames(theme, meta, fps, dur, frames_dir)
        encode_mp4(frames_dir, out_path, fps)
    size = out_path.stat().st_size
    print(f"OK  {out_path}  ({n} frames @ {fps}fps, {size:,} bytes)")
    return out_path


def load_config(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() in {".yaml", ".yml"}:
        if yaml is None:
            raise SystemExit("PyYAML not installed; use JSON or pip install pyyaml")
        data = yaml.safe_load(text)
    else:
        data = json.loads(text)
    if isinstance(data, dict) and "lessons" in data:
        return data["lessons"]
    if isinstance(data, list):
        return data
    raise SystemExit("Config must be a list or {lessons: [...]}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Generate dark-edtech lesson MP4s")
    parser.add_argument("--preset", help="Built-in preset id, e.g. m01-l01 or m02-l03")
    parser.add_argument("--all-m01", action="store_true", help="Render all Module 1 lesson videos")
    parser.add_argument("--all-m02", action="store_true", help="Render all Module 2 lesson videos")
    parser.add_argument("--all-m03", action="store_true", help="Render all Module 3 lesson videos")
    parser.add_argument("--all-m04", action="store_true", help="Render all Module 4 lesson videos")
    parser.add_argument("--all-m05", action="store_true", help="Render all Module 5 lesson videos")
    parser.add_argument("--all-m06", action="store_true", help="Render all Module 6 lesson videos")
    parser.add_argument(
        "--all-remaining",
        action="store_true",
        help="Render Modules 2–6 lesson videos (20 clips)",
    )
    parser.add_argument("--all", action="store_true", help="Render all Modules 1–6 lesson videos")
    parser.add_argument("--config", help="JSON/YAML lesson list")
    parser.add_argument("--id", help="Select one lesson id from --config")
    parser.add_argument("--out", help="Output MP4 path (overrides)")
    parser.add_argument(
        "--course-root",
        default=str(Path(__file__).resolve().parents[1]),
        help="Course package root",
    )
    parser.add_argument("--list-themes", action="store_true")
    parser.add_argument("--list-presets", action="store_true")
    args = parser.parse_args(argv)

    if args.list_themes:
        print("\n".join(THEME_DRAWERS))
        return 0
    if args.list_presets:
        for k, v in ALL_PRESETS.items():
            print(f"{k}: theme={v['theme']} → {v['out_rel']}")
        return 0

    course_root = Path(args.course_root)
    specs: list[dict] = []

    module_flags = {
        "m01": args.all_m01,
        "m02": args.all_m02,
        "m03": args.all_m03,
        "m04": args.all_m04,
        "m05": args.all_m05,
        "m06": args.all_m06,
    }
    if args.all:
        for g in MODULE_PRESET_GROUPS.values():
            specs.extend(dict(v) for v in g.values())
    elif args.all_remaining:
        for key in ("m02", "m03", "m04", "m05", "m06"):
            specs.extend(dict(v) for v in MODULE_PRESET_GROUPS[key].values())
    elif any(module_flags.values()):
        for key, on in module_flags.items():
            if on:
                specs.extend(dict(v) for v in MODULE_PRESET_GROUPS[key].values())
    elif args.preset:
        if args.preset not in ALL_PRESETS:
            raise SystemExit(f"Unknown preset {args.preset}. Try --list-presets")
        specs = [dict(ALL_PRESETS[args.preset])]
    elif args.config:
        specs = load_config(Path(args.config))
        if args.id:
            specs = [s for s in specs if s.get("id") == args.id]
            if not specs:
                raise SystemExit(f"No lesson id={args.id} in config")
    else:
        parser.print_help()
        return 1

    if args.out and len(specs) == 1:
        specs[0]["out"] = args.out

    for spec in specs:
        make_video(spec, course_root)
    return 0


if __name__ == "__main__":
    sys.exit(main())
