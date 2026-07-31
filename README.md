<div align="center">

# ⬡ Pi Power-User

**A personal, portable course for bending the [Pi coding harness](https://github.com/earendil-works/pi) into a power tool — not a chat box.**

<img src="https://img.shields.io/badge/Pi-v0.83-6c4bf0?style=flat-square" alt="Pi v0.83">
<img src="https://img.shields.io/badge/status-active%20learning-0fb9a4?style=flat-square">
<img src="https://img.shields.io/badge/lessons-01%20%2F%20~07-f59e0b?style=flat-square">
<img src="https://img.shields.io/badge/format-graphical%20HTML-14132b?style=flat-square">

</div>

---

## Why this exists

I'm an experienced developer who adopted **Pi** and wants to wield it like a
power tool: spend less time on mechanical coding, bend Pi to my workflow
(skills, extensions, packages), and stop fighting the tool.

This repo is the **living knowledge base** for that journey — one tight win
per lesson, maximally graphical, fully portable so I can pick it up on any
machine.

> 📌 The full charter, success criteria, and constraints live in **[MISSION.md](./MISSION.md)**.

## 📘 Lessons

Each lesson is a self-contained, graphical HTML file — open it in any browser,
no build step. The **Completed** table below is auto-generated from the
`lessons/` folder by a GitHub Action on every push, so it never drifts.

<!-- lessons:start -->
| # | Lesson | Status |
|---|--------|--------|
| 01 | [The Core Loop](./lessons/0001-the-core-loop.html) | ✅ Done |
<!-- lessons:end -->

> ➕ Drop a new `lessons/NNNN-*.html` and push — the table updates itself on
> the next push (see `.github/workflows/sync-lessons.yml`).

### 🚧 Roadmap

The planned sequence (delete each line as it ships):

- **02** — Driving the TUI: steering, branching, compaction
- **03** — Sessions, `/tree`, and context compaction
- **04** — Project context: `AGENTS.md` & `.pi/settings.json`
- **05** — Writing your first **skill**
- **06** — Extensions: extending Pi without forking it
- **07** — Packages & the trust/security model

## 🗂 Repo map

```
teach-patricio/
├── MISSION.md            # Course charter: why, success criteria, scope
├── RESOURCES.md          # Curated, high-trust sources (docs, posts, communities)
├── NOTES.md              # Teaching notes & session log (internal)
├── README.md             # You are here
├── .github/              # CI: auto-syncs the lesson table below
├── lessons/              # Graphical, self-contained HTML lessons
│   └── 0001-the-core-loop.html
├── learning-records/     # One short markdown note per learning session
│   └── 0001-prior-knowledge-and-mission.md
├── assets/
│   └── style.css         # Shared stylesheet — one consistent look across lessons
└── reference/            # Dumped reference snippets (empty for now)
```

## 💻 Use it on another machine

Clone it wherever you keep your dotfiles/projects:

```bash
git clone https://github.com/patoteGo/teach-patricio.git
cd teach-patricio
open lessons/0001-the-core-loop.html   # macOS  →  xdg-open on Linux, start on Windows
```

That's it. Lessons are static HTML + one CSS file — no dependencies, no
install, no internet required to read (the shared stylesheet loads fonts from
a CDN but degrades gracefully offline).

**Keep learning across machines:** open a session, read the latest
[`learning-records/`](./learning-records) note to see where you left off,
and keep going.

## 🧭 How this course is taught

- **Graphical first.** Every lesson leads with diagrams, SVG, and visual
  hierarchy — never walls of text.
- **Self-citing.** Claims trace back to the canonical sources in
  [RESOURCES.md](./RESOURCES.md), not parametric guesses.
- **Portable.** Nothing depends on a specific machine — no absolute local
  paths baked into lessons.
- **Lazy/power path.** Pi's whole philosophy is a minimal core you *extend*,
  not fork. The lessons teach that same sensibility.

## 📚 Source material

Everything here is grounded in the official docs and the design rationale
behind Pi. See **[RESOURCES.md](./RESOURCES.md)** for the full, curated list,
notably:

- [Pi Documentation](https://pi.dev/docs/latest) · [Pi on GitHub](https://github.com/earendil-works/pi)
- [Mario Zechner — "Pi Coding Agent" design rationale](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [Agent Skills Specification](https://agentskills.io/specification)

## 📝 License

Personal learning notes. The lesson *content* is free to read and learn from;
the [Pi](https://github.com/earendil-works/pi) project itself is owned by its
authors. No rights claimed on third-party material cited in
[RESOURCES.md](./RESOURCES.md).

---

<div align="center">

<sub>Built one tight win at a time. ⬡</sub>

</div>
