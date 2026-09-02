# Fuzzy Chainsaw — 3D Model Shop

Sleek, modern **3D printable / 3D model marketplace** — pure static site served by **GitHub Pages**.

**Live:** https://rbiz01.github.io/fuzzy-chainsaw/

This repository previously hosted a neon arcade of browser games. It has been overhauled into a static 3D model shop. Inventory lives in `data/products.json`. No build step, no paid APIs, no paid fonts/assets.

## Features

- **Browse catalog** — category chips, search, and sort
- **Product detail** — specs, quantity, add to cart / buy
- **Purchase flow** — cart with mock checkout (Stripe Payment Link placeholder)
- **Email signup** — first-visit modal offers **10%** off (stored in `localStorage`; Formspree endpoint placeholder)
- **Free stack** — vanilla HTML/CSS/JS, Google Fonts (DM Sans, Space Grotesk)
- **Placeholders** — gradient thumbnails, sample STL/ZIP downloads, mock payments

## Preview locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Or:

```bash
npx --yes serve -p 8080
```

**Note:** some browsers restrict `fetch()` of `data/products.json` via `file://`. Prefer a local server.

## GitHub Pages deploy

Pages is already enabled for this repo. Site files live at the **repository root** (`index.html`, `css/`, `js/`, `data/`, `downloads/`).

1. Merge this branch to `main` (or set Pages to serve this branch).
2. In **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
3. Wait for the Pages build; site will be at `https://rbiz01.github.io/fuzzy-chainsaw/` (or your custom domain).

Relative links (`css/`, `js/`, `data/`) work under the project Pages subpath.

No `docs/` folder, `CNAME`, or `.github` Pages workflow is required for the current setup. After merge, confirm Settings still points at **root** of `main`.

## Add / edit products

Edit **`data/products.json`**. Add new category strings to the top-level `categories` array. Thumbnails are CSS/SVG gradients from each product’s `gradient` field.

**TODO:** Point post-purchase downloads at real per-product STL/ZIP files under `downloads/`.

## Email signup (10% discount)

- First visit shows a modal; submitting stores `fc_discount`, `fc_email`, `fc_visited` in **localStorage**
- Checkout applies **10%** when `fc_discount` is set
- Set `EMAIL_FORM_ENDPOINT` in `js/app.js` to a Formspree (or similar) URL

## Stripe (placeholder)

Checkout is **mock** — “Complete purchase” clears the cart and offers sample downloads. Replace `STRIPE_PAYMENT_LINK` in `js/app.js` when ready. Never commit secret keys.

## Project layout

```
├── index.html          Home + featured
├── catalog.html        Grid, search, category chips
├── product.html        Detail (?id=)
├── cart.html           Cart + mock checkout + downloads
├── css/styles.css
├── js/                 app, home, catalog, product, cart
├── data/products.json
├── downloads/          sample-model.stl, sample-pack.zip
├── README.md
└── SUMMARY.md
```

## License note

Sample product copy and placeholder geometry are for demo only. Replace with your own designs and commercial license terms before charging.
