# Conversion spec — dark mode + bilingual (PT/EN)

Goal: convert a Pi-course HTML lesson to **dark mode + bilingual (Portuguese
default, English secondary)** using the **shared components**, matching the gold
template exactly.

## Files to read first

1. `topics/pi/assets/i18n.css` and `topics/pi/assets/i18n.js` — the shared engine.
2. `topics/pi/assets/dark.css` — the dark token override.
3. `topics/pi/lessons/0001-the-core-loop.html` — **the gold template. Copy its
   structure/pattern EXACTLY.**

## Head of the file

```html
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title data-pt="…" data-en="…">…PT title…</title>
    <link rel="stylesheet" href="../assets/style.css" />
    <link rel="stylesheet" href="../assets/dark.css" />
    <link rel="stylesheet" href="../assets/i18n.css" />
    <script src="../assets/i18n.js" defer></script>
  </head>
  <body class="lang-pt">
```

**Do NOT add a `.langswitch` div** — `i18n.js` injects the PT/EN switch into the
hero automatically.

## Bilingual text (HTML)

Wrap every visible run in a pair. Default visible = Portuguese.

```html
<span data-lang="pt">Texto em português</span><span data-lang="en">English text</span>
```

- For a heading/kicker/callout `<p>`, put the two spans inside it.
- Keep inline `<code>`, `<strong>`, `<em>`, `<a>` **inside** the span so both
  languages keep formatting. Translate the words around them; leave code
  identifiers, CLI flags, file names, and tool names (`read`/`write`/`edit`/
  `bash`/`grep`/`find`/`ls`, `SKILL.md`, `AGENTS.md`, `/tree`, etc.) UNCHANGED
  in both languages.

## Bilingual SVG

Give every `<text>`, `<title>`, `<desc>` **both** `data-pt` and `data-en`. The
existing text is the PT value; translate to EN. `i18n.js` swaps `textContent`.

```html
<text … data-pt="SESSÃO" data-en="SESSION">SESSÃO</text>
```

## Dark-mode SVG color audit (critical)

The light theme used near-white fills and dark muted text — those disappear or
glare on dark. Apply these mappings to SVG `fill`/`stroke`:

| light value | dark replacement | use |
|---|---|---|
| `#efeafb` / `#fff` (panel/card fill) | `#211d33` (violet panel) or `#181a26` (neutral card) | box fills |
| `#d9cefb` / `#e7e5f0` (light stroke) | `#6c4bf0` / `#3a3f55` | borders/lines |
| `#4a4866` (muted text) | `#9ea2b8` | labels |
| `#9a96b3` (light muted) | `#a0a3b5` | secondary labels |
| `#14132b` (ink, on a dark surface) | `#eceef6` | text sitting on dark bg |
| `#6c4bf0` accent | `#8b6ff7` | brighter on dark |
| `#0fb9a4` accent | `#2dd4bf` | brighter on dark |
| `#f59e0b` accent | `#fbbf24` | brighter on dark |
| `#ef476f` accent | `#fb7185` | brighter on dark |
| `#fff` on a colored badge/chip | `#fff` (keep) | white on color is fine |
Gradient stops stay vibrant. After editing, eyeball contrast: no dark text on
dark bg, no white text on white.

## Quizzes (convert EVERY quiz)

The old `data-answer` + text-match pattern breaks with bilingual text. Convert
to the `data-correct` + bilingual-feedback pattern from the template:

```html
<div class="quiz" id="q1" role="group" aria-labelledby="q1l">
  <div class="q" id="q1l"><span data-lang="pt">…pergunta…</span><span data-lang="en">…question…</span></div>
  <div class="options">
    <button class="opt" data-correct="true" data-fb-pt="…" data-fb-en="…"><span data-lang="pt">…</span><span data-lang="en">…</span></button>
    <button class="opt" data-correct="false" data-fb-pt="…" data-fb-en="…">…</button>
    …
  </div>
  <div class="verdict" aria-live="polite"></div>
</div>
```

Then use **exactly** the template's closing `<script>` (the bilingual quiz wiring
with `verdictFor` / `resetQuiz`, and the `DOMContentLoaded` → `PiI18n.on` reset
subscription). Do **not** call `PiI18n.on(...)` synchronously — `i18n.js` is
deferred and runs after inline scripts; wrap it in `DOMContentLoaded`.

## Interactive JS already in the lesson

If the lesson has its own interactive JS (filter chips, etc.), keep it working.
For any dynamic text it renders, read `PiI18n.lang` and subscribe with
`PiI18n.on(fn)` inside a `DOMContentLoaded` listener.

## Preserve

- All internal links and `href`s (translate only link text).
- All SVGs (recolor + bilingual-label; keep geometry).
- Section count, callouts, cards, code blocks (translate comments only).
- The footer + "ask your teacher" callout.

## Source language of each file

- Lessons 2–7, glossary: originally **English** → add Portuguese (PT default).
- Lesson 8 (`0008-o-mapa-dos-agentes.html`): originally **Portuguese** → add
  English (PT default).

## Acceptance (self-check before finishing)

- File links `style.css`, `dark.css`, `i18n.css`, loads `i18n.js` (defer).
- No `.langswitch` div in the file (it's injected).
- Dark background renders (body bg ≈ `#0e0f17`).
- Clicking EN hides all `[data-lang="pt"]`, shows `[data-lang="en"]`, and swaps
  SVG labels.
- Each quiz's correct option (data-correct="true") marks green and shows the EN
  feedback when in EN.
- No `innerHTML`/`outerHTML` anywhere.
- No trailing whitespace; internal links resolve.
