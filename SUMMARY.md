# Fuzzy Chainsaw — Summary

## Pages

| Page | File | What it does |
|------|------|----------------|
| Home | `index.html` | Hero, featured products, value props |
| Catalog | `catalog.html` | Grid browse, category chips, search, sort |
| Product | `product.html?id=…` | Preview (SVG gradient), description, specs, qty, Add / Buy |
| Cart / Checkout | `cart.html` | Line items, discount, mock checkout, download links |

Shared chrome: sticky nav, cart badge, footer, first-visit email modal (injected by `js/app.js`).

## How the 10% discount works

1. On first visit (`fc_visited` missing), a signup modal appears after a short delay.
2. User submits email → stored in `localStorage` as `fc_email`, flag `fc_discount=1`, `fc_visited=1`.
3. Closing without signup still sets `fc_visited` (modal won’t spam every load).
4. `FC.priceFor()` multiplies list price by `0.9` when `fc_discount` is set — catalog cards, product detail, and cart totals all use it.
5. Email POST to Formspree is **skipped** until `EMAIL_FORM_ENDPOINT` no longer contains `TODO`.

## What’s placeholder / TODO

- **12 sample products** in `data/products.json` (planters, minis, gadgets, decor, mechanical).
- **Images**: generated SVG/CSS gradients (no photo assets).
- **Downloads**: `downloads/sample-model.stl` and `sample-pack.zip` — same files for every product after mock purchase.
- **Payments**: mock “Complete purchase”; Stripe Payment Link constant is a TODO string.
- **Email**: Formspree/Netlify endpoint placeholders + comments in modal and `js/app.js`.
- **License / support**: footer TODOs; “Personal use*” on product page is demo copy.
- **No paid dependencies**: Google Fonts free tier (DM Sans, Space Grotesk), vanilla HTML/CSS/JS.

## Decisions

- **No build step** — root-level static files for simplest GitHub Pages deploy (vs Vite → `docs/`).
- **Relative URLs** — works at domain root or project Pages subpath.
- **Cart & discount in localStorage** — fine for a demo storefront; replace with server-side cart/session when Stripe goes live.
- Built **locally** under `/workspace/fuzzy-chainsaw-shop` (Cloud Agents unavailable; no git clone of the old gaming site).
