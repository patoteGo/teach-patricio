<div align="center">

# ⬡ Learning Hub

**A personal, portable knowledge base for learning *anything* — one self-contained topic folder per subject, maximally graphical HTML lessons, fully git-portable.**

<img src="https://img.shields.io/badge/format-graphical%20HTML-14132b?style=flat-square">
<img src="https://img.shields.io/badge/portable-static%20files-0fb9a4?style=flat-square">
<img src="https://img.shields.io/badge/CI-auto--syncs%20catalog-6c4bf0?style=flat-square">

</div>

---

## What this is

A multi-topic learning repo. Each **topic** is an isolated workspace under
[`topics/`](./topics) — its own mission, resources, notes, lessons, and
reference docs. Start at [`index.html`](./index.html) (graphical hub) or read
the auto-generated catalog below.

> One topic per folder keeps subjects from bleeding together. A topic is fully
> self-contained — you can lift a single folder out and it still works.

## 📚 Topics & lessons

The catalog below is **auto-generated** from `topics/*/lessons/` by a GitHub
Action on every push, so it never drifts. (See
[`.github/workflows/sync-lessons.yml`](./.github/workflows/sync-lessons.yml).)

<!-- topics:start -->
### Master the Pi Coding Harness as a Power Tool

`topics/pi/` · 7 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [The Core Loop](./topics/pi/lessons/0001-the-core-loop.html) |
| 02 | [Driving the TUI](./topics/pi/lessons/0002-driving-the-tui.html) |
| 03 | [Sessions, Branching & Compaction](./topics/pi/lessons/0003-sessions-branching-compaction.html) |
| 04 | [Context Files](./topics/pi/lessons/0004-context-files.html) |
| 05 | [Skills](./topics/pi/lessons/0005-skills.html) |
| 06 | [Extensions](./topics/pi/lessons/0006-extensions.html) |
| 07 | [Pi Packages](./topics/pi/lessons/0007-packages.html) |

**Total: 7 lesson(s) across 1 topic(s).**
<!-- topics:end -->

## 🗂 Repo map

```
teach-patricio/
├── index.html            # Graphical hub — start here in a browser
├── README.md             # You are here (catalog is auto-synced)
├── topics/               # ONE FOLDER PER TOPIC
│   ├── pi/               #   the Pi power-user course (7 lessons + glossary)
│   └── _template/        #   copy-and-go skeleton for a new topic (CI skips it)
└── .github/              # CI: regenerates the catalog above from topics/*/
```

Each topic folder is a standard teaching workspace:

```
topics/<your-topic>/
├── MISSION.md            # WHY you're learning this (grounds every lesson)
├── RESOURCES.md          # curated, high-trust sources
├── NOTES.md              # teaching notes & session log
├── assets/style.css      # the topic's shared stylesheet (lessons link it)
├── lessons/              # NNNN-dash-name.html — graphical, self-contained
├── reference/            # cheat sheets, glossaries, syntax (revisited often)
└── learning-records/     # decision-grade notes on what's truly learned
```

## ➕ Add a new topic

It's a one-liner:

```bash
cp -r topics/_template topics/<your-topic>
cd topics/<your-topic
# 1) edit MISSION.md with your "why"
# 2) drop graphical lessons into lessons/  (NNNN-name.html)
# 3) commit & push — the README catalog updates itself
```

Then add a card for it in [`index.html`](./index.html). Ask the Pi teach agent
to scaffold the first lesson — it'll follow the same graphical, self-citing
style as the Pi course.

## 💻 Use it on another machine

```bash
git clone <your-repo-url> teach-patricio
cd teach-patricio
open index.html                       # macOS  →  xdg-open on Linux
# or jump straight into a topic:
open topics/pi/lessons/0001-the-core-loop.html
```

Static HTML + CSS per topic. No dependencies, no build step, no internet
required to read (stylesheets load fonts from a CDN but degrade gracefully).

## 🧭 How lessons are taught

- **Graphical first** — diagrams, SVG, visual hierarchy; never walls of text.
- **Self-citing** — claims trace to the curated sources in each topic's
  `RESOURCES.md`, not parametric guesses.
- **One tight win per lesson** — short, completable, in your zone of proximal
  development.
- **Portable** — no absolute local paths baked into any artifact.

## 📝 License

Personal learning notes. Lesson *content* is free to read and learn from; no
rights claimed on third-party material cited in any topic's `RESOURCES.md`.

---

<div align="center">

<sub>One folder per topic. One tight win per lesson. ⬡</sub>

</div>
