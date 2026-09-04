"""Theme drawers for AI for Work Modules 2–6."""
from __future__ import annotations

import math
from typing import Callable

from PIL import Image, ImageDraw

# Re-exported helpers/tokens are injected by make_lesson_video via bind()
_W = 854
_H = 480
BG = (11, 15, 25)
ACCENT_PURPLE = (59, 130, 246)
ACCENT_TEAL = (139, 92, 246)
WHITE = (255, 255, 255)
LIGHT = (220, 226, 240)
MUTED = (140, 150, 175)
CARD = (18, 24, 40)
CARD_BORDER = (36, 46, 72)
DANGER = (255, 107, 129)
WARN = (255, 184, 77)

_font = None
lerp = None
clamp = None
ease_in_out = None
ease_out_cubic = None
blend = None
rounded_rect = None
text_size = None
draw_centered_text = None
new_frame = None
draw_chrome = None


def bind(ns: dict) -> None:
    """Bind drawing helpers from make_lesson_video into this module."""
    g = globals()
    for k, v in ns.items():
        g[k] = v
    # Ensure W/H always present for drawer bodies
    g["W"] = ns.get("W", g.get("W", _W))
    g["H"] = ns.get("H", g.get("H", _H))
    g["_W"] = g["W"]
    g["_H"] = g["H"]


# ---------------------------------------------------------------------------
# M2
# ---------------------------------------------------------------------------
def draw_role_badge_sharpen(t: float, meta: dict) -> Image.Image:
    """Blank silhouette gains role badge; output sharpens from noise to bullets."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Role prompting")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(13)
    font_sm = _font(12)

    # Avatar card left
    ax, ay, aw, ah = 70, 90, 200, 260
    rounded_rect(draw, (ax, ay, ax + aw, ay + ah), 16, fill=CARD, outline=CARD_BORDER, width=2)
    # silhouette circle
    cx, cy, r = ax + aw // 2, ay + 90, 42
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(28, 34, 52), outline=MUTED, width=2)
    # head/shoulders hint
    draw.ellipse([cx - 18, cy - 22, cx + 18, cy + 14], fill=(50, 58, 80))
    draw.pieslice([cx - 36, cy + 20, cx + 36, cy + 70], 200, 340, fill=(50, 58, 80))

    badge_u = ease_out_cubic(clamp((t - 0.15) / 0.35))
    if badge_u > 0:
        badge = "Acme Ops briefing writer"
        bw, bh = text_size(draw, badge, font_sm)
        bx = ax + (aw - bw - 20) // 2
        by = ay + 175
        bg = blend(CARD, (20, 50, 45), badge_u)
        outline = blend(CARD_BORDER, ACCENT_TEAL, badge_u)
        rounded_rect(draw, (bx, by, bx + bw + 20, by + bh + 12), 8, fill=bg, outline=outline, width=2)
        draw.text((bx + 10, by + 6), badge, font=font_sm, fill=blend(MUTED, ACCENT_TEAL, badge_u))

    # Output panel right
    ox, oy, ow, oh = 300, 90, W - 370, 260
    sharp = ease_in_out(clamp((t - 0.4) / 0.5))
    border = blend(CARD_BORDER, ACCENT_TEAL, sharp)
    rounded_rect(draw, (ox, oy, ox + ow, oy + oh), 16, fill=CARD, outline=border, width=2)
    draw.text((ox + 18, oy + 14), "OUTPUT", font=font_h, fill=blend(MUTED, ACCENT_PURPLE, sharp))

    if sharp < 0.45:
        # noise bars
        for i in range(8):
            y = oy + 50 + i * 22
            wobble = int(12 * math.sin(t * 30 + i))
            wlen = 80 + (i * 37 + int(t * 50)) % 120 + wobble
            col = blend(MUTED, (90, 100, 120), 0.5)
            rounded_rect(draw, (ox + 18, y, ox + 18 + wlen, y + 10), 3, fill=col)
    else:
        bullets = [
            "• Vendor risk: portal SLA slip",
            "• Owner: Jordan (Ops)",
            "• Next: confirm Fri cutover",
            "• Blocker: missing SOW sign-off",
        ]
        u = ease_out_cubic((sharp - 0.45) / 0.55)
        for i, line in enumerate(bullets):
            lit = clamp((u - i * 0.12) / 0.2)
            if lit <= 0:
                continue
            draw.text((ox + 18, oy + 55 + i * 36), line, font=font_b, fill=blend(BG, LIGHT, lit))

    return img


def draw_hard_soft_split(t: float, meta: dict) -> Image.Image:
    """Split screen: hard teal locks vs soft dashed purple guides."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Hard vs soft constraints")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(12)
    mid = W // 2

    # divider
    draw.line([(mid, 80), (mid, 400)], fill=CARD_BORDER, width=2)

    # Left: HARD
    hard_u = ease_out_cubic(clamp(t / 0.45))
    draw.text((40, 95), "HARD (must)", font=font_h, fill=blend(MUTED, ACCENT_TEAL, hard_u))
    hard_items = ["≤5 bullets", "No speculation", "Cite ticket IDs", "Label BLOCKER"]
    for i, item in enumerate(hard_items):
        appear = ease_out_cubic(clamp((t - 0.08 - i * 0.08) / 0.2))
        if appear <= 0:
            continue
        y = 130 + i * 48
        x = 40
        # solid bar
        rounded_rect(
            draw,
            (x, y, x + mid - 70, y + 36),
            8,
            fill=blend(BG, (18, 45, 42), appear),
            outline=blend(CARD_BORDER, ACCENT_TEAL, appear),
            width=2,
        )
        # lock square
        lx, ly = x + 10, y + 8
        draw.rectangle([lx, ly, lx + 18, ly + 18], outline=blend(MUTED, ACCENT_TEAL, appear), width=2)
        if appear > 0.6:
            draw.rectangle([lx + 4, ly + 4, lx + 14, ly + 14], fill=ACCENT_TEAL)
        draw.text((x + 40, y + 10), item, font=font_b, fill=blend(MUTED, LIGHT, appear))

    # Right: SOFT
    soft_u = ease_out_cubic(clamp((t - 0.25) / 0.45))
    draw.text((mid + 30, 95), "SOFT (prefer)", font=font_h, fill=blend(MUTED, ACCENT_PURPLE, soft_u))
    soft_items = ["Shorter sentences", "Lead with risk", "Active voice", "Friendly if space"]
    for i, item in enumerate(soft_items):
        appear = ease_out_cubic(clamp((t - 0.3 - i * 0.08) / 0.2))
        if appear <= 0:
            continue
        y = 130 + i * 48
        x = mid + 30
        # dashed-look border via alternating segments
        box = (x, y, x + mid - 70, y + 36)
        rounded_rect(draw, box, 8, fill=blend(BG, CARD, appear), outline=None)
        # draw dashed outline manually
        col = blend(CARD_BORDER, ACCENT_PURPLE, appear)
        x0, y0, x1, y1 = box
        for sx in range(x0, x1, 10):
            draw.line([(sx, y0), (min(sx + 5, x1), y0)], fill=col, width=2)
            draw.line([(sx, y1), (min(sx + 5, x1), y1)], fill=col, width=2)
        for sy in range(y0, y1, 10):
            draw.line([(x0, sy), (x0, min(sy + 5, y1))], fill=col, width=2)
            draw.line([(x1, sy), (x1, min(sy + 5, y1))], fill=col, width=2)
        draw.text((x + 16, y + 10), item, font=font_b, fill=blend(MUTED, LIGHT, appear))

    # Draft label at bottom
    if t > 0.75:
        u = ease_out_cubic((t - 0.75) / 0.25)
        msg = "Draft: Acme Ops status update"
        mw, _ = text_size(draw, msg, font_b)
        draw.text(((W - mw) // 2, 400), msg, font=font_b, fill=blend(BG, MUTED, u))

    return img


def draw_format_toggle(t: float, meta: dict) -> Image.Image:
    """Toggle table / JSON / checklist views of same Acme Ops data."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Tables · JSON · checklists")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(13)
    font_mono = _font(12)

    modes = ["TABLE", "JSON", "CHECKLIST"]
    # cycle: 0-0.3 table, 0.3-0.55 json, 0.55-1 checklist
    if t < 0.32:
        mode_i = 0
        local = t / 0.32
    elif t < 0.58:
        mode_i = 1
        local = (t - 0.32) / 0.26
    else:
        mode_i = 2
        local = (t - 0.58) / 0.42

    # tabs
    tab_w = 130
    start_x = (W - tab_w * 3 - 20) // 2
    for i, m in enumerate(modes):
        tx = start_x + i * (tab_w + 10)
        ty = 88
        active = i == mode_i
        col = ACCENT_TEAL if active else CARD_BORDER
        bg = (20, 50, 45) if active else CARD
        rounded_rect(draw, (tx, ty, tx + tab_w, ty + 32), 8, fill=bg, outline=col, width=2)
        tw, th = text_size(draw, m, font_h)
        draw.text((tx + (tab_w - tw) // 2, ty + 8), m, font=font_h, fill=ACCENT_TEAL if active else MUTED)

    # content card
    card = [70, 140, W - 70, 390]
    rounded_rect(draw, tuple(card), 14, fill=CARD, outline=ACCENT_PURPLE if mode_i == 1 else ACCENT_TEAL, width=2)

    fade = ease_out_cubic(clamp(local))
    if mode_i == 0:
        # table
        headers = ["Risk", "Owner", "Status"]
        rows = [["SLA slip", "Jordan", "Open"], ["SOW gap", "Priya", "BLOCKER"]]
        x0, y0 = 100, 165
        col_w = [200, 160, 160]
        for i, h in enumerate(headers):
            draw.text((x0 + sum(col_w[:i]), y0), h, font=font_h, fill=blend(BG, ACCENT_TEAL, fade))
        draw.line([(90, y0 + 28), (W - 90, y0 + 28)], fill=CARD_BORDER, width=1)
        for r, row in enumerate(rows):
            lit = clamp((fade - 0.2 - r * 0.2) / 0.25)
            for c, cell in enumerate(row):
                draw.text(
                    (x0 + sum(col_w[:c]), y0 + 45 + r * 40),
                    cell,
                    font=font_b,
                    fill=blend(BG, LIGHT, lit),
                )
    elif mode_i == 1:
        lines = [
            '{',
            '  "blocker": true,',
            '  "item": "SOW sign-off",',
            '  "owner": "Priya",',
            '  "next_step": "Legal review Fri"',
            '}',
        ]
        for i, line in enumerate(lines):
            lit = clamp((fade - i * 0.08) / 0.2)
            draw.text((120, 170 + i * 28), line, font=font_mono, fill=blend(BG, LIGHT, lit))
    else:
        items = [
            "[x] Confirm Fri cutover owner",
            "[ ] Collect SOW signature",
            "[ ] Update standup digest",
        ]
        for i, line in enumerate(items):
            lit = clamp((fade - i * 0.15) / 0.25)
            col = ACCENT_TEAL if line.startswith("[x]") else LIGHT
            draw.text((120, 180 + i * 42), line, font=font_b, fill=blend(BG, col, lit))

    return img


def draw_tone_dials(t: float, meta: dict) -> Image.Image:
    """Three tone dials snap; draft restyles without changing facts."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Tone · audience · brand locks")
    draw_chrome(img, title, meta=meta)

    font_h = _font(12, bold=True)
    font_b = _font(13)
    font_sm = _font(12)

    dials = [("Calm", 0.15), ("Executive", 0.35), ("Support", 0.55)]
    # which dial is active over time
    if t < 0.35:
        active = 0
    elif t < 0.65:
        active = 1
    else:
        active = 2

    for i, (name, start) in enumerate(dials):
        appear = ease_out_cubic(clamp((t - start) / 0.2))
        cx = 140 + i * 220
        cy = 150
        r = 48
        if appear <= 0:
            continue
        border = ACCENT_TEAL if i == active and t >= start else blend(CARD_BORDER, ACCENT_PURPLE, appear)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=border, width=3)
        # needle
        snap = ease_out_cubic(clamp((t - start) / 0.25))
        angle = math.radians(-90 + snap * 90)  # from left to up-right
        nx = cx + int(math.cos(angle) * (r - 12))
        ny = cy + int(math.sin(angle) * (r - 12))
        draw.line([(cx, cy), (nx, ny)], fill=ACCENT_TEAL if i == active else MUTED, width=3)
        draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=WHITE)
        tw, _ = text_size(draw, name, font_h)
        draw.text((cx - tw // 2, cy + r + 10), name, font=font_h, fill=blend(MUTED, LIGHT, appear))

    # Draft card
    facts = "Order AO-1042 delayed 2 days · 10% credit allowed"
    styles = [
        "We’re sorry for the delay on AO-1042. A 10% credit is available.",
        "AO-1042: 2-day slip. Offer 10% courtesy credit. Confirm receipt.",
        "Hi — AO-1042 slipped two days. Happy to apply a 10% credit.",
    ]
    card = [70, 260, W - 70, 400]
    rounded_rect(draw, tuple(card), 14, fill=CARD, outline=ACCENT_TEAL, width=2)
    draw.text((90, 275), "FACTS (unchanged)", font=font_h, fill=MUTED)
    draw.text((90, 300), facts, font=font_sm, fill=LIGHT)
    draw.text((90, 340), "DRAFT TONE", font=font_h, fill=ACCENT_PURPLE)
    draw.text((90, 365), styles[active], font=font_b, fill=LIGHT)

    return img


# ---------------------------------------------------------------------------
# M3
# ---------------------------------------------------------------------------
def draw_zero_vs_fewshot(t: float, meta: dict) -> Image.Image:
    """Empty slot vs three exemplar cards; output becomes consistent."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Zero vs few-shot")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)
    font_sm = _font(11)

    # Left: zero-shot
    rounded_rect(draw, (50, 90, 400, 250), 12, fill=CARD, outline=CARD_BORDER, width=2)
    draw.text((70, 105), "ZERO-SHOT", font=font_h, fill=WARN)
    # empty slot
    rounded_rect(draw, (70, 140, 380, 210), 8, fill=(14, 18, 30), outline=DANGER, width=1)
    draw_centered_text(draw, (225, 175), "(no exemplars)", _font(14), fill=MUTED)

    # Right: few-shot cards feed in
    rounded_rect(draw, (430, 90, W - 50, 250), 12, fill=CARD, outline=CARD_BORDER, width=2)
    draw.text((450, 105), "FEW-SHOT", font=font_h, fill=ACCENT_TEAL)
    for i in range(3):
        appear = ease_out_cubic(clamp((t - 0.1 - i * 0.12) / 0.2))
        if appear <= 0:
            continue
        y = 140 + i * 32
        ox = int((1 - appear) * 40)
        rounded_rect(
            draw,
            (450 + ox, y, W - 70 + ox, y + 26),
            6,
            fill=blend(BG, (20, 45, 42), appear),
            outline=blend(CARD_BORDER, ACCENT_TEAL, appear),
            width=1,
        )
        draw.text((460 + ox, y + 5), f"Exemplar {i + 1}: in → out", font=font_sm, fill=blend(MUTED, LIGHT, appear))

    # Output panels bottom
    cons = ease_in_out(clamp((t - 0.5) / 0.4))
    # left inconsistent
    rounded_rect(draw, (50, 275, 400, 400), 12, fill=CARD, outline=blend(CARD_BORDER, DANGER, 1 - cons), width=2)
    draw.text((70, 290), "OUTPUT", font=font_h, fill=MUTED)
    if cons < 0.5:
        messy = ["rambling paragraph…", "wrong format", "tone flips"]
        for i, line in enumerate(messy):
            draw.text((70, 325 + i * 22), line, font=font_b, fill=blend(DANGER, MUTED, cons))
    else:
        draw.text((70, 340), "still drifts", font=font_b, fill=MUTED)

    rounded_rect(draw, (430, 275, W - 50, 400), 12, fill=CARD, outline=blend(CARD_BORDER, ACCENT_TEAL, cons), width=2)
    draw.text((450, 290), "OUTPUT", font=font_h, fill=MUTED)
    if cons > 0.3:
        good = ["• Calm apology", "• Credit when allowed", "• One next step"]
        for i, line in enumerate(good):
            lit = clamp((cons - 0.3 - i * 0.15) / 0.2)
            draw.text((450, 325 + i * 22), line, font=font_b, fill=blend(BG, ACCENT_TEAL, lit))

    return img


def draw_exemplar_builder(t: float, meta: dict) -> Image.Image:
    """Exemplar card: Input / Output / Why-it-works fields fill in."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Writing exemplars")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_lab = _font(12, bold=True)
    font_b = _font(13)

    card = [80, 90, W - 80, 400]
    rounded_rect(draw, tuple(card), 16, fill=CARD, outline=ACCENT_PURPLE, width=2)
    draw.text((105, 108), "EXEMPLAR CARD  ·  Acme Ops", font=font_h, fill=ACCENT_TEAL)

    fields = [
        ("INPUT", "Customer asks where AO-1042 is. Warehouse: 2-day slip.", 0.1),
        ("OUTPUT", "Calm apology + 10% credit offer + one clarifying Q.", 0.35),
        ("WHY IT WORKS", "Matches policy · exact format · no invented ETA.", 0.6),
    ]
    y = 155
    for label, body, start in fields:
        appear = ease_out_cubic(clamp((t - start) / 0.28))
        if appear <= 0:
            y += 70
            continue
        rounded_rect(
            draw,
            (105, y, W - 105, y + 58),
            10,
            fill=blend(BG, (22, 30, 48), appear),
            outline=blend(CARD_BORDER, ACCENT_TEAL, appear),
            width=1,
        )
        draw.text((120, y + 8), label, font=font_lab, fill=blend(MUTED, ACCENT_PURPLE, appear))
        # typewriter effect
        n = int(len(body) * appear)
        draw.text((120, y + 30), body[:n], font=font_b, fill=blend(BG, LIGHT, appear))
        y += 70

    return img


def draw_contrast_set(t: float, meta: dict) -> Image.Image:
    """Good vs near-miss side by side."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Contrast sets")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(13)
    font_sm = _font(12)

    # Good card
    g_appear = ease_out_cubic(clamp(t / 0.35))
    rounded_rect(
        draw,
        (50, 100, 400, 380),
        14,
        fill=CARD,
        outline=blend(CARD_BORDER, ACCENT_TEAL, g_appear),
        width=2,
    )
    draw.text((70, 120), "GOOD", font=font_h, fill=blend(MUTED, ACCENT_TEAL, g_appear))
    goods = [
        "Apology + allowed credit",
        "No invented dates",
        "One clear next step",
    ]
    for i, line in enumerate(goods):
        lit = clamp((g_appear - 0.2 - i * 0.15) / 0.2)
        draw.text((70, 170 + i * 40), "✓  " + line, font=font_b, fill=blend(BG, LIGHT, lit))

    if t > 0.55:
        u = ease_out_cubic((t - 0.55) / 0.2)
        # teal badge
        draw.ellipse([320, 300, 360, 340], fill=blend(BG, ACCENT_TEAL, u))
        draw.line([(330, 320), (338, 328), (350, 312)], fill=BG, width=3)

    # Near-miss
    n_appear = ease_out_cubic(clamp((t - 0.2) / 0.35))
    rounded_rect(
        draw,
        (430, 100, W - 50, 380),
        14,
        fill=CARD,
        outline=blend(CARD_BORDER, DANGER, n_appear),
        width=2,
    )
    draw.text((450, 120), "NEAR-MISS", font=font_h, fill=blend(MUTED, DANGER, n_appear))
    bads = [
        "Invented Friday 2pm ETA",
        "Credit when policy forbids",
        "Looks fine — fails HARD rule",
    ]
    for i, line in enumerate(bads):
        lit = clamp((n_appear - 0.2 - i * 0.15) / 0.2)
        draw.text((450, 170 + i * 40), "✗  " + line, font=font_b, fill=blend(BG, LIGHT, lit))

    if t > 0.7:
        u = ease_out_cubic((t - 0.7) / 0.2)
        # red mark
        draw.ellipse([720, 300, 760, 340], outline=blend(BG, DANGER, u), width=3)
        draw.line([(730, 310), (750, 330)], fill=blend(BG, DANGER, u), width=3)
        draw.line([(750, 310), (730, 330)], fill=blend(BG, DANGER, u), width=3)

    return img


def draw_token_quality_meters(t: float, meta: dict) -> Image.Image:
    """Token meter fills; quality rises then holds after trim."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Token budget vs quality")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)

    # Phase: add exemplars 0-0.5, trim 0.5-0.75, hold 0.75-1
    if t < 0.5:
        tokens = ease_in_out(t / 0.5) * 0.9
        quality = ease_in_out(t / 0.5) * 0.85
        label = "Adding exemplars…"
    elif t < 0.75:
        u = (t - 0.5) / 0.25
        tokens = lerp(0.9, 0.55, ease_in_out(u))
        quality = lerp(0.85, 0.88, ease_in_out(u))
        label = "Trim weak exemplars"
    else:
        tokens = 0.55
        quality = 0.88
        label = "High quality · fewer tokens"

    def meter(y, name, val, color):
        draw.text((100, y), name, font=font_h, fill=MUTED)
        rounded_rect(draw, (100, y + 28, W - 100, y + 52), 8, fill=(30, 38, 58), outline=CARD_BORDER, width=1)
        fill_x = int(lerp(100, W - 100, val))
        rounded_rect(draw, (100, y + 28, fill_x, y + 52), 8, fill=color)
        pct = f"{int(val * 100)}%"
        draw.text((W - 100 - 50, y), pct, font=font_b, fill=color)

    meter(120, "TOKEN USE", tokens, ACCENT_PURPLE)
    meter(220, "QUALITY", quality, ACCENT_TEAL)

    # exemplar chips
    n_show = 5 if t < 0.5 else (3 if t >= 0.55 else 4)
    for i in range(n_show):
        appear = ease_out_cubic(clamp((t - i * 0.08) / 0.15)) if t < 0.55 else 1.0
        if t >= 0.55 and i >= 3:
            continue
        x = 100 + i * 130
        weak = i >= 3
        col = WARN if weak and t < 0.55 else ACCENT_TEAL
        if appear <= 0:
            continue
        rounded_rect(
            draw,
            (x, 320, x + 110, 360),
            8,
            fill=blend(BG, CARD, appear),
            outline=blend(CARD_BORDER, col, appear),
            width=2,
        )
        draw.text((x + 14, 332), f"Ex {i + 1}", font=font_b, fill=blend(MUTED, LIGHT, appear))

    lw, _ = text_size(draw, label, font_h)
    draw.text(((W - lw) // 2, 385), label, font=font_h, fill=ACCENT_TEAL)

    return img


# ---------------------------------------------------------------------------
# M4
# ---------------------------------------------------------------------------
def draw_plan_vs_skip(t: float, meta: dict) -> Image.Image:
    """Complex path lights Plan; simple skips to Answer."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "When to ask for reasoning")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)

    # Complex card left
    rounded_rect(draw, (40, 95, 410, 390), 14, fill=CARD, outline=ACCENT_PURPLE, width=2)
    draw.text((60, 110), "COMPLEX", font=font_h, fill=ACCENT_PURPLE)
    draw.text((60, 140), "Vendor risk triage", font=font_b, fill=LIGHT)

    steps = ["Plan", "Gather", "Decide", "Answer"]
    for i, s in enumerate(steps):
        lit = ease_out_cubic(clamp((t - 0.1 - i * 0.12) / 0.2))
        y = 185 + i * 42
        rounded_rect(
            draw,
            (70, y, 380, y + 32),
            8,
            fill=blend(BG, (22, 30, 48), lit),
            outline=blend(CARD_BORDER, ACCENT_TEAL if i == 0 or i == 3 else ACCENT_PURPLE, lit),
            width=2,
        )
        draw.text((90, y + 8), s, font=font_b, fill=blend(MUTED, LIGHT, lit))
        if i < 3 and lit > 0.5:
            draw.line([(225, y + 32), (225, y + 42)], fill=ACCENT_TEAL, width=2)

    # Simple card right
    rounded_rect(draw, (430, 95, W - 40, 390), 14, fill=CARD, outline=ACCENT_TEAL, width=2)
    draw.text((450, 110), "SIMPLE", font=font_h, fill=ACCENT_TEAL)
    draw.text((450, 140), "Lookup go-live date", font=font_b, fill=LIGHT)

    skip_u = ease_out_cubic(clamp((t - 0.2) / 0.35))
    # crossed out Plan
    rounded_rect(draw, (460, 185, W - 70, 217), 8, fill=CARD, outline=blend(CARD_BORDER, MUTED, skip_u), width=1)
    draw.text((480, 193), "Plan  (skip)", font=font_b, fill=blend(MUTED, MUTED, skip_u))
    if skip_u > 0.4:
        draw.line([(470, 201), (W - 80, 201)], fill=DANGER, width=2)

    ans = ease_out_cubic(clamp((t - 0.45) / 0.3))
    rounded_rect(
        draw,
        (460, 250, W - 70, 320),
        8,
        fill=blend(BG, (18, 45, 42), ans),
        outline=blend(CARD_BORDER, ACCENT_TEAL, ans),
        width=2,
    )
    draw.text((480, 275), "Answer: Friday 9am CT", font=font_b, fill=blend(BG, LIGHT, ans))

    if t > 0.8:
        u = ease_out_cubic((t - 0.8) / 0.2)
        msg = "Both correct for their case"
        mw, _ = text_size(draw, msg, font_h)
        draw.text(((W - mw) // 2, 405), msg, font=font_h, fill=blend(BG, ACCENT_TEAL, u))

    return img


def draw_plan_then_answer(t: float, meta: dict) -> Image.Image:
    """Plan bullets first; Final answer unlocks after."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Plan then answer")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(13)

    # Plan panel
    plan_done = clamp(t / 0.55)
    rounded_rect(draw, (60, 90, W - 60, 250), 14, fill=CARD, outline=ACCENT_PURPLE, width=2)
    draw.text((85, 105), "PHASE 1 · PLAN", font=font_h, fill=ACCENT_PURPLE)
    bullets = [
        "1. List vendor risks from paste",
        "2. Flag anything without owner",
        "3. Rank by go-live impact",
    ]
    for i, b in enumerate(bullets):
        lit = ease_out_cubic(clamp((t - 0.08 - i * 0.12) / 0.2))
        draw.text((90, 145 + i * 28), b, font=font_b, fill=blend(BG, LIGHT, lit))
        if lit > 0.8:
            draw.text((W - 120, 145 + i * 28), "✓", font=font_h, fill=ACCENT_TEAL)

    # Answer panel locked then unlocked
    unlocked = t >= 0.55
    u = ease_out_cubic(clamp((t - 0.55) / 0.35))
    border = blend(CARD_BORDER, ACCENT_TEAL, u) if unlocked else CARD_BORDER
    rounded_rect(draw, (60, 275, W - 60, 400), 14, fill=CARD, outline=border, width=2)
    label = "PHASE 2 · FINAL ANSWER" if unlocked else "PHASE 2 · LOCKED"
    draw.text((85, 290), label, font=font_h, fill=blend(MUTED, ACCENT_TEAL, u))
    if unlocked:
        draw.text((90, 335), "Top risk: SOW unsigned — owner Priya — BLOCKER", font=font_b, fill=blend(BG, LIGHT, u))
        draw.text((90, 365), "Next: Legal review before Fri cutover", font=font_b, fill=blend(BG, LIGHT, u))
    else:
        # lock icon hint
        draw_centered_text(draw, (W / 2, 350), "Waiting for plan…", font_b, fill=MUTED)

    return img


def draw_task_decompose(t: float, meta: dict) -> Image.Image:
    """One messy task splits into three ordered subtasks."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Decomposing multistep")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)

    if t < 0.28:
        # big messy card
        u = 1 - ease_in_out(t / 0.28) * 0.3
        rounded_rect(draw, (120, 140, W - 120, 320), 16, fill=CARD, outline=WARN, width=2)
        draw_centered_text(draw, (W / 2, 200), "MESSY TASK", font_h, fill=WARN)
        draw_centered_text(
            draw,
            (W / 2, 245),
            "“Handle the portal launch comms + risks + owners”",
            font_b,
            fill=LIGHT,
        )
    else:
        u = ease_out_cubic(clamp((t - 0.28) / 0.35))
        tasks = [
            ("1. Risks", "Extract blockers"),
            ("2. Owners", "Assign each item"),
            ("3. Comms", "Draft standup note"),
        ]
        positions = [70, 310, 550]
        for i, ((lab, body), x) in enumerate(zip(tasks, positions)):
            appear = ease_out_cubic(clamp((t - 0.3 - i * 0.1) / 0.25))
            if appear <= 0:
                continue
            y = 130
            done = t > 0.55 + i * 0.12
            border = ACCENT_TEAL if done else ACCENT_PURPLE
            rounded_rect(
                draw,
                (x, y, x + 200, y + 160),
                12,
                fill=CARD,
                outline=blend(CARD_BORDER, border, appear),
                width=2,
            )
            draw.text((x + 20, y + 20), lab, font=font_h, fill=blend(MUTED, border, appear))
            draw.text((x + 20, y + 60), body, font=font_b, fill=blend(BG, LIGHT, appear))
            if done:
                du = ease_out_cubic(clamp((t - 0.55 - i * 0.12) / 0.2))
                draw.ellipse([x + 150, y + 110, x + 180, y + 140], fill=blend(BG, ACCENT_TEAL, du))
                draw.line([(x + 158, y + 125), (x + 165, y + 132), (x + 174, y + 116)], fill=BG, width=2)
            if i < 2 and appear > 0.5:
                draw.line([(x + 200, y + 80), (positions[i + 1], y + 80)], fill=ACCENT_TEAL, width=2)

    return img


def draw_verify_checklist(t: float, meta: dict) -> Image.Image:
    """Answer then checklist; one mismatch corrects."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Self-checks & verification")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)

    # Answer panel
    rounded_rect(draw, (50, 90, 420, 380), 14, fill=CARD, outline=CARD_BORDER, width=2)
    draw.text((70, 105), "ANSWER", font=font_h, fill=ACCENT_PURPLE)
    lines = [
        "Go-live: Friday 9am CT",
        "Owner: Jordan",
        "Risk: none reported",  # will be corrected
    ]
    corrected = t >= 0.65
    for i, line in enumerate(lines):
        if i == 2 and corrected:
            line = "Risk: SOW unsigned (BLOCKER)"
            col = ACCENT_TEAL
        elif i == 2 and t >= 0.4:
            col = DANGER
        else:
            col = LIGHT
        draw.text((70, 150 + i * 40), line, font=font_b, fill=col)

    # Checklist overlay
    check_u = ease_out_cubic(clamp((t - 0.25) / 0.35))
    rounded_rect(
        draw,
        (440, 90, W - 50, 380),
        14,
        fill=blend(BG, CARD, check_u),
        outline=blend(CARD_BORDER, ACCENT_TEAL, check_u),
        width=2,
    )
    if check_u > 0:
        draw.text((460, 105), "VERIFY", font=font_h, fill=blend(MUTED, ACCENT_TEAL, check_u))
        checks = [
            ("Date matches paste", True),
            ("Owner named", True),
            ("Blockers surfaced", False if t < 0.65 else True),
        ]
        for i, (lab, ok) in enumerate(checks):
            lit = clamp((check_u - i * 0.15) / 0.2)
            mark = "✓" if ok else "!"
            col = ACCENT_TEAL if ok else DANGER
            draw.text((460, 160 + i * 50), f"{mark}  {lab}", font=font_b, fill=blend(BG, col, lit))

    if t > 0.75:
        u = ease_out_cubic((t - 0.75) / 0.25)
        msg = "Mismatch fixed → re-verify"
        mw, _ = text_size(draw, msg, font_h)
        draw.text(((W - mw) // 2, 400), msg, font=font_h, fill=blend(BG, ACCENT_TEAL, u))

    return img


# ---------------------------------------------------------------------------
# M5
# ---------------------------------------------------------------------------
def draw_rubrics_vs_stars(t: float, meta: dict) -> Image.Image:
    """Star rating dissolves; rubric grid scores draft."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Rubrics beat vibes")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(13)
    font_sm = _font(12)

    if t < 0.35:
        # stars dissolve
        u = ease_in_out(t / 0.35)
        fade = 1 - u
        draw_centered_text(draw, (W / 2, 160), "Vibe rating", font_h, fill=blend(BG, MUTED, fade))
        stars = "★ ★ ★ ☆ ☆"
        draw_centered_text(draw, (W / 2, 220), stars, _font(28), fill=blend(BG, WARN, fade))
        draw_centered_text(draw, (W / 2, 290), "“feels okay?”", font_b, fill=blend(BG, MUTED, fade))
    else:
        u = ease_out_cubic(clamp((t - 0.35) / 0.5))
        draw.text((80, 95), "RUBRIC · Acme Ops draft", font=font_h, fill=ACCENT_TEAL)
        criteria = [
            ("Clarity", 4),
            ("Constraints met", 5),
            ("Tone lock", 4),
            ("Format", 5),
        ]
        # grid header
        rounded_rect(draw, (70, 130, W - 70, 380), 12, fill=CARD, outline=ACCENT_PURPLE, width=2)
        draw.text((100, 150), "Criterion", font=font_sm, fill=MUTED)
        draw.text((500, 150), "Score", font=font_sm, fill=MUTED)
        draw.line([(90, 175), (W - 90, 175)], fill=CARD_BORDER, width=1)
        for i, (name, score) in enumerate(criteria):
            lit = clamp((u - i * 0.15) / 0.25)
            y = 195 + i * 40
            draw.text((100, y), name, font=font_b, fill=blend(BG, LIGHT, lit))
            # score boxes
            for s in range(5):
                x = 500 + s * 28
                filled = s < score and lit > 0.5
                draw.rectangle(
                    [x, y, x + 22, y + 22],
                    fill=ACCENT_TEAL if filled else CARD,
                    outline=blend(CARD_BORDER, ACCENT_TEAL, lit),
                    width=1,
                )

    return img


def draw_golden_set_compare(t: float, meta: dict) -> Image.Image:
    """Three golden cards; new output compared pass/fail."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Tiny golden set")
    draw_chrome(img, title, meta=meta)

    font_h = _font(12, bold=True)
    font_b = _font(12)

    for i in range(3):
        appear = ease_out_cubic(clamp((t - i * 0.1) / 0.25))
        x = 60 + i * 250
        rounded_rect(
            draw,
            (x, 95, x + 220, 200),
            10,
            fill=CARD,
            outline=blend(CARD_BORDER, ACCENT_TEAL, appear),
            width=2,
        )
        draw.text((x + 16, 110), f"GOLDEN {i + 1}", font=font_h, fill=blend(MUTED, ACCENT_TEAL, appear))
        draw.text((x + 16, 145), "in → gold out", font=font_b, fill=blend(BG, LIGHT, appear))

    # New output
    cmp_u = ease_out_cubic(clamp((t - 0.4) / 0.4))
    rounded_rect(
        draw,
        (60, 230, W - 60, 390),
        12,
        fill=CARD,
        outline=blend(CARD_BORDER, ACCENT_PURPLE, cmp_u),
        width=2,
    )
    draw.text((85, 250), "NEW MODEL OUTPUT", font=font_h, fill=blend(MUTED, ACCENT_PURPLE, cmp_u))
    marks = [("vs G1", True), ("vs G2", True), ("vs G3", False)]
    for i, (lab, ok) in enumerate(marks):
        lit = clamp((cmp_u - i * 0.2) / 0.25)
        x = 100 + i * 220
        col = ACCENT_TEAL if ok else DANGER
        status = "PASS" if ok else "FAIL"
        rounded_rect(
            draw,
            (x, 300, x + 160, 350),
            8,
            fill=blend(BG, (18, 45, 42) if ok else (50, 25, 35), lit),
            outline=blend(CARD_BORDER, col, lit),
            width=2,
        )
        draw.text((x + 30, 315), f"{lab}: {status}", font=font_b, fill=blend(BG, col, lit))

    return img


def draw_iterate_v1v3(t: float, meta: dict) -> Image.Image:
    """v1→v2→v3 timeline; score climbs."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Iterate without rewrite")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(12)

    versions = [
        ("v1", "Base GCCF", 0.45, 0.1),
        ("v2", "+ hard max 5 bullets", 0.65, 0.35),
        ("v3", "+ tone: exec calm", 0.88, 0.6),
    ]
    # timeline line
    draw.line([(100, 180), (W - 100, 180)], fill=CARD_BORDER, width=3)

    for i, (ver, change, score, start) in enumerate(versions):
        appear = ease_out_cubic(clamp((t - start) / 0.25))
        if appear <= 0:
            continue
        x = 140 + i * 240
        draw.ellipse([x - 12, 168, x + 12, 192], fill=blend(CARD_BORDER, ACCENT_TEAL, appear))
        draw.text((x - 15, 120), ver, font=font_h, fill=blend(MUTED, ACCENT_PURPLE, appear))
        # change card
        rounded_rect(
            draw,
            (x - 90, 220, x + 100, 300),
            10,
            fill=CARD,
            outline=blend(CARD_BORDER, ACCENT_TEAL, appear),
            width=2,
        )
        # wrap change text
        draw.text((x - 75, 240), change[:18], font=font_b, fill=blend(BG, LIGHT, appear))
        if len(change) > 18:
            draw.text((x - 75, 262), change[18:], font=font_b, fill=blend(BG, LIGHT, appear))
        # score
        sc = f"score {int(score * 100)}"
        draw.text((x - 40, 320), sc, font=font_h, fill=blend(BG, ACCENT_TEAL, appear))

    if t > 0.85:
        u = ease_out_cubic((t - 0.85) / 0.15)
        msg = "One constraint change per step"
        mw, _ = text_size(draw, msg, font_h)
        draw.text(((W - mw) // 2, 370), msg, font=font_h, fill=blend(BG, MUTED, u))

    return img


def draw_multi_pane_scores(t: float, meta: dict) -> Image.Image:
    """Same rubric across three generic model panes."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Model-agnostic eval")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(12)

    panes = [("Model A", 0.82), ("Model B", 0.74), ("Model C", 0.91)]
    for i, (name, score) in enumerate(panes):
        appear = ease_out_cubic(clamp((t - i * 0.12) / 0.3))
        x = 50 + i * 265
        rounded_rect(
            draw,
            (x, 100, x + 240, 380),
            12,
            fill=CARD,
            outline=blend(CARD_BORDER, ACCENT_PURPLE, appear),
            width=2,
        )
        draw.text((x + 20, 120), name, font=font_h, fill=blend(MUTED, LIGHT, appear))
        draw.text((x + 20, 155), "Rubric (shared)", font=font_b, fill=blend(BG, MUTED, appear))
        criteria = ["Clarity", "Format", "Tone"]
        for j, c in enumerate(criteria):
            lit = clamp((appear - 0.2 - j * 0.1) / 0.2)
            y = 200 + j * 36
            draw.text((x + 20, y), c, font=font_b, fill=blend(BG, LIGHT, lit))
            # mini bar
            rounded_rect(draw, (x + 100, y + 4, x + 210, y + 18), 4, fill=(30, 38, 58))
            fw = int(110 * score * lit)
            rounded_rect(draw, (x + 100, y + 4, x + 100 + fw, y + 18), 4, fill=ACCENT_TEAL)
        sc_txt = f"{int(score * 100)}"
        draw.text((x + 90, 330), sc_txt, font=_font(22, bold=True), fill=blend(BG, ACCENT_TEAL, appear))

    return img


# ---------------------------------------------------------------------------
# M6
# ---------------------------------------------------------------------------
def draw_library_shelves(t: float, meta: dict) -> Image.Image:
    """Prompt cards file into folders on shelves."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Cataloging reusable prompts")
    draw_chrome(img, title, meta=meta)

    font_h = _font(12, bold=True)
    font_b = _font(11)

    folders = ["Email", "Research", "Meetings", "Status"]
    colors = [ACCENT_PURPLE, ACCENT_TEAL, ACCENT_PURPLE, ACCENT_TEAL]

    for i, (folder, col) in enumerate(zip(folders, colors)):
        appear = ease_out_cubic(clamp((t - i * 0.08) / 0.25))
        x = 50 + i * 195
        y = 110
        # shelf folder
        rounded_rect(
            draw,
            (x, y, x + 175, y + 220),
            10,
            fill=CARD,
            outline=blend(CARD_BORDER, col, appear),
            width=2,
        )
        draw.text((x + 20, y + 16), folder, font=font_h, fill=blend(MUTED, col, appear))
        # cards filing in
        n_cards = 1 + (i % 3)
        for j in range(n_cards):
            cu = ease_out_cubic(clamp((t - 0.15 - i * 0.08 - j * 0.08) / 0.25))
            if cu <= 0:
                continue
            cy = y + 55 + j * 45 + int((1 - cu) * -30)
            rounded_rect(
                draw,
                (x + 15, cy, x + 160, cy + 36),
                6,
                fill=blend(BG, (22, 30, 48), cu),
                outline=blend(CARD_BORDER, col, cu),
                width=1,
            )
            draw.text((x + 28, cy + 10), f"prompt {j + 1}", font=font_b, fill=blend(BG, LIGHT, cu))

    return img


def draw_three_kits_expand(t: float, meta: dict) -> Image.Image:
    """Three kit icons expand into GCCF templates."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Email · notes · status kits")
    draw_chrome(img, title, meta=meta)

    font_h = _font(13, bold=True)
    font_b = _font(11)
    font_sm = _font(10)

    kits = ["Email", "Notes", "Status"]
    expanded = t > 0.35

    for i, name in enumerate(kits):
        appear = ease_out_cubic(clamp((t - i * 0.1) / 0.25))
        x = 70 + i * 260
        if not expanded:
            # icon circle
            cx, cy = x + 80, 200
            r = int(40 * appear)
            if r > 0:
                draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT_TEAL, width=3)
                tw, _ = text_size(draw, name, font_h)
                draw.text((cx - tw // 2, cy + r + 16), name, font=font_h, fill=blend(MUTED, LIGHT, appear))
        else:
            u = ease_out_cubic(clamp((t - 0.35) / 0.4))
            rounded_rect(
                draw,
                (x, 100, x + 230, 380),
                12,
                fill=CARD,
                outline=blend(CARD_BORDER, ACCENT_PURPLE, u),
                width=2,
            )
            draw.text((x + 16, 115), f"{name} kit", font=font_h, fill=blend(MUTED, ACCENT_TEAL, u))
            fields = ["GOAL", "CONTEXT", "CONSTRAINTS", "FORMAT"]
            for j, f in enumerate(fields):
                lit = clamp((u - j * 0.12) / 0.2)
                y = 160 + j * 48
                rounded_rect(
                    draw,
                    (x + 14, y, x + 210, y + 36),
                    6,
                    fill=blend(BG, (22, 30, 48), lit),
                    outline=blend(CARD_BORDER, ACCENT_TEAL, lit),
                    width=1,
                )
                draw.text((x + 24, y + 10), f, font=font_sm, fill=blend(MUTED, LIGHT, lit))

    return img


def draw_research_funnel(t: float, meta: dict) -> Image.Image:
    """Documents funnel into synthesis brief with sources."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Research synthesis kits")
    draw_chrome(img, title, meta=meta)

    font_h = _font(12, bold=True)
    font_b = _font(12)

    # docs at top
    docs = ["Brief A", "Notes B", "Thread C", "Spec D"]
    for i, d in enumerate(docs):
        appear = ease_out_cubic(clamp((t - i * 0.06) / 0.2))
        x = 80 + i * 180
        y = 95 + int((1 - appear) * -20)
        if appear <= 0:
            continue
        rounded_rect(
            draw,
            (x, y, x + 140, y + 50),
            8,
            fill=CARD,
            outline=blend(CARD_BORDER, ACCENT_PURPLE, appear),
            width=2,
        )
        draw.text((x + 30, y + 16), d, font=font_b, fill=blend(BG, LIGHT, appear))

    # funnel lines
    funnel_u = ease_in_out(clamp((t - 0.25) / 0.35))
    if funnel_u > 0:
        draw.line([(150, 160), (W // 2 - 40, 260)], fill=blend(BG, ACCENT_TEAL, funnel_u), width=2)
        draw.line([(W - 150, 160), (W // 2 + 40, 260)], fill=blend(BG, ACCENT_TEAL, funnel_u), width=2)
        draw.line([(W // 2, 160), (W // 2, 260)], fill=blend(BG, ACCENT_PURPLE, funnel_u), width=2)

    # synthesis output
    out_u = ease_out_cubic(clamp((t - 0.5) / 0.35))
    rounded_rect(
        draw,
        (150, 250, W - 150, 400),
        14,
        fill=CARD,
        outline=blend(CARD_BORDER, ACCENT_TEAL, out_u),
        width=2,
    )
    if out_u > 0:
        draw.text((180, 270), "SYNTHESIS BRIEF", font=font_h, fill=blend(MUTED, ACCENT_TEAL, out_u))
        draw.text((180, 310), "• Key finding: cutover risk on SOW", font=font_b, fill=blend(BG, LIGHT, out_u))
        draw.text((180, 340), "• Sources: Brief A, Spec D (fictional)", font=font_b, fill=blend(BG, MUTED, out_u))
        draw.text((180, 370), "• Ask: Legal review before Fri", font=font_b, fill=blend(BG, LIGHT, out_u))

    return img


def draw_version_handoff(t: float, meta: dict) -> Image.Image:
    """v1.2 → v1.3 changelog + handoff stamp."""
    img = new_frame()
    draw = ImageDraw.Draw(img)
    title = meta.get("title", "Versioning & handoff")
    draw_chrome(img, title, meta=meta)

    font_h = _font(14, bold=True)
    font_b = _font(13)
    font_sm = _font(12)

    # version cards
    v_u = ease_out_cubic(clamp(t / 0.4))
    rounded_rect(draw, (80, 110, 320, 220), 12, fill=CARD, outline=blend(CARD_BORDER, MUTED, v_u), width=2)
    draw.text((110, 140), "v1.2", font=_font(22, bold=True), fill=blend(BG, MUTED, v_u))
    draw.text((110, 180), "prior prompt", font=font_b, fill=blend(BG, MUTED, v_u))

    # arrow
    if t > 0.25:
        au = ease_out_cubic(clamp((t - 0.25) / 0.2))
        draw.line([(340, 165), (480, 165)], fill=blend(BG, ACCENT_TEAL, au), width=3)
        draw.polygon([(470, 155), (490, 165), (470, 175)], fill=blend(BG, ACCENT_TEAL, au))

    rounded_rect(
        draw,
        (500, 110, W - 80, 220),
        12,
        fill=CARD,
        outline=blend(CARD_BORDER, ACCENT_TEAL, v_u),
        width=2,
    )
    draw.text((530, 140), "v1.3", font=_font(22, bold=True), fill=blend(BG, ACCENT_TEAL, v_u))
    draw.text((530, 180), "current", font=font_b, fill=blend(BG, LIGHT, v_u))

    # changelog
    c_u = ease_out_cubic(clamp((t - 0.4) / 0.3))
    rounded_rect(draw, (80, 250, 480, 400), 12, fill=CARD, outline=CARD_BORDER, width=2)
    draw.text((100, 270), "CHANGELOG", font=font_h, fill=blend(MUTED, ACCENT_PURPLE, c_u))
    changes = ["+ hard: cite ticket IDs", "~ tone: exec calm", "− removed fluff role"]
    for i, ch in enumerate(changes):
        lit = clamp((c_u - i * 0.15) / 0.2)
        draw.text((100, 310 + i * 28), ch, font=font_b, fill=blend(BG, LIGHT, lit))

    # stamp
    if t > 0.7:
        s_u = ease_out_cubic(clamp((t - 0.7) / 0.25))
        sx, sy = 520, 270
        # rotated-looking stamp via thick border
        rounded_rect(
            draw,
            (sx, sy, sx + 230, sy + 110),
            8,
            fill=blend(BG, (18, 45, 42), s_u),
            outline=blend(BG, ACCENT_TEAL, s_u),
            width=3,
        )
        draw.text((sx + 20, sy + 25), "READY FOR", font=font_sm, fill=blend(BG, ACCENT_TEAL, s_u))
        draw.text((sx + 20, sy + 55), "Acme Ops team", font=font_h, fill=blend(BG, LIGHT, s_u))

    return img


THEME_DRAWERS_M02_M06: dict[str, Callable] = {
    "role_badge_sharpen": draw_role_badge_sharpen,
    "hard_soft_split": draw_hard_soft_split,
    "format_toggle": draw_format_toggle,
    "tone_dials": draw_tone_dials,
    "zero_vs_fewshot": draw_zero_vs_fewshot,
    "exemplar_builder": draw_exemplar_builder,
    "contrast_set": draw_contrast_set,
    "token_quality_meters": draw_token_quality_meters,
    "plan_vs_skip": draw_plan_vs_skip,
    "plan_then_answer": draw_plan_then_answer,
    "task_decompose": draw_task_decompose,
    "verify_checklist": draw_verify_checklist,
    "rubrics_vs_stars": draw_rubrics_vs_stars,
    "golden_set_compare": draw_golden_set_compare,
    "iterate_v1v3": draw_iterate_v1v3,
    "multi_pane_scores": draw_multi_pane_scores,
    "library_shelves": draw_library_shelves,
    "three_kits_expand": draw_three_kits_expand,
    "research_funnel": draw_research_funnel,
    "version_handoff": draw_version_handoff,
}
