# teach-patricio — repo rules

## Adding a lesson (any topic)

Lessons are Astro pages. Copy the scaffold from
`src/pages/topics/_template/lessons/0001-start-here.astro` to
`src/pages/topics/<topic>/lessons/<slug>.astro` and fill it in
(`build.format: "file"` keeps URLs as `<slug>.html`). Assets stay in
`public/topics/<topic>/assets/` and are referenced with `../assets/…`.

A new lesson file is not done until it is registered everywhere it is listed:

1. Topic sidebar — append the lesson to the `lessons` array in
   `public/topics/<topic>/assets/nav.js`.
2. README — add the row to the topic's lesson table in `README.md` and bump the
   `N lesson(s)` count.
3. Hub — bump the lesson count on the topic's card in `src/pages/index.astro`.
4. Chain — link the new lesson from the previous lesson's `concept-nav` block.

Verify with: every page in `src/pages/topics/<topic>/lessons/` appears in that
topic's `nav.js` and `README.md` table.

If a lesson arrives as raw HTML (e.g. from an external tool), run
`node tools/migrate-to-astro.mjs` after dropping it in `public/`.

## Styling rules (all topics)

- **Never use emojis** in lesson or reference HTML. Use icons from a library
  instead — [Phosphor Icons](https://phosphoricons.com) is already loaded by the
  Astro layouts: `<i class="ph ph-eye"></i>` (also `ph-eye-slash`, `ph-hexagon`,
  `ph-chat-circle-dots`, `ph-arrow-left`…). Inline SVG for anything custom.
