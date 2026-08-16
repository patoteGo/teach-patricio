# teach-patricio — repo rules

## Adding a lesson (any topic)

A new lesson file is not done until it is registered everywhere it is listed:

1. Topic sidebar — append the lesson to the `lessons` array in
   `topics/<topic>/assets/nav.js`.
2. README — add the row to the topic's lesson table in `README.md` and bump the
   `N lesson(s)` count.
3. Hub — bump the lesson count on the topic's card in `index.html`.
4. Chain — link the new lesson from the previous lesson's `concept-nav` block.

Verify with: every file in `topics/<topic>/lessons/` appears in that topic's
`nav.js` and `README.md` table.

## Styling rules (all topics)

- **Never use emojis** in lesson or reference HTML. Use icons from a library
  instead — [Phosphor Icons](https://phosphoricons.com) is already loaded by the
  Astro layouts: `<i class="ph ph-eye"></i>` (also `ph-eye-slash`, `ph-hexagon`,
  `ph-chat-circle-dots`, `ph-arrow-left`…). Inline SVG for anything custom.
