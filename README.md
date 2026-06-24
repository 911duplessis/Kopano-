# The Connection Network — Proposal Engine

A JSON-driven engine for generating multi-vendor infrastructure proposals.
No build step, no framework — open the rendered HTML file directly or serve
the repo with any static file server.

## Structure

```
engine/
  theme.css      luxury dark theme, shared across all proposals
  starfield.js   animated background (cover only)
  slider.js      before/after image comparison component
  modules.js     renders a single service division card
  renderer.js    assembles the full proposal from a data object
  export.js      export-to-PDF (print) and export-to-HTML (download)
data/
  tcn-kl-001.json   proposal data for Kopano Lounge (TCN-KL-001)
proposals/
  tcn-kl-001.html   entry point that loads the engine + data above
```

## Brand separation rule

`The Connection Network` (TCN) is the coordinating umbrella only — it never
performs technical work and never shares a visual mark with execution
partners. Each `modules[]` entry in the JSON carries its own `partner` name
and `accentColor`; the renderer keeps each partner's badge visually distinct
(`.div-partner-badge`) and lists every partner independently in the closing
brand footer (`.brand-footer`), with "Powered under The Connection Network"
appearing only as a small footer line — never merged into a partner's logo.

## Creating a new proposal

1. Copy `data/tcn-kl-001.json` to `data/<new-id>.json` and edit the fields
   (client, master contact, `modules[]`, `offer`, `investment`, `terms`,
   `closing`). Each module needs: `partner`, `accentColor`, `title`, `body`,
   `scope[]`, `price`.
2. Copy `proposals/tcn-kl-001.html` to `proposals/<new-id>.html` and point
   the `fetch()` call at your new JSON file.
3. Open the new HTML file in a browser. Use the bottom-right toolbar to
   **Export PDF** (print dialog) or **Export HTML** (downloads a
   self-contained, shareable `.html` file).

## Before/after slider

Add entries to `beforeAfter` in the JSON:

```json
"beforeAfter": [
  { "before": "images/site-before.jpg", "after": "images/site-after.jpg", "caption": "Counter cabling — before / after trunking" }
]
```

Each entry renders a draggable comparison slider (`engine/slider.js`).

## Legacy proposal

`index.html` at the repo root is a standalone, pre-existing proposal page
(LMGI / Kopano Lounge) and is independent of the engine above.
