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

## ☁️ Progress sync (optional)

Interactive lessons (e.g. the
[Architecture Grill](./topics/behavioral-interview/lessons/0005-architecture-grill.html))
save their drill results. Locally that's `localStorage` (browser-only). On Vercel,
results persist across devices/browsers via [`api/progress.js`](./api/progress.js) —
a ~60-line proxy to a free [Upstash Redis](https://upstash.com) database (plain `fetch`, no SDK).

Why not SQLite or files: Vercel serverless functions have an ephemeral filesystem —
writes don't survive the invocation.

Setup (once):

1. Create a free Redis database at [upstash.com](https://console.upstash.com) → copy the
   **REST API** URL and token.
2. In Vercel → Project → Settings → Environment Variables, add:

   | Variable | Value |
   |---|---|
   | `UPSTASH_REDIS_REST_URL` | `https://your-db.upstash.io` |
   | `UPSTASH_REDIS_REST_TOKEN` | *(REST token)* |

3. Redeploy. The route is already behind the site's password middleware.

Without the env vars the site still works — lessons just keep saving to `localStorage`.

## 📚 Topics & lessons

The catalog below is **auto-generated** from `topics/*/lessons/` by a GitHub
Action on every push, so it never drifts. (See
[`.github/workflows/sync-lessons.yml`](./.github/workflows/sync-lessons.yml).)

<!-- topics:start -->
### Ace the Senior Fullstack Behavioral Interview

`topics/behavioral-interview/` · 4 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [BLUF + STAR](./topics/behavioral-interview/lessons/0001-bluf-star.html) |
| 02 | [The Dojo](./topics/behavioral-interview/lessons/0002-the-dojo.html) |
| 03 | [The Pitch](./topics/behavioral-interview/lessons/0003-the-pitch.html) |
| 04 | [Follow-ups](./topics/behavioral-interview/lessons/0004-follow-ups.html) |

### ClearOne Advantage Senior Full-Stack interview (8 August 2026)

`topics/clearone-interview/` · 2 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [ClearOne Advantage — playbook · 8 August 2026](./topics/clearone-interview/lessons/0001-clearone-playbook.html) |
| 02 | [ClearOne — stack quick reminders](./topics/clearone-interview/lessons/0002-stack-cheatsheet.html) |

### Lob — Senior Software Engineer intro screen (13 August 2026)

`topics/frontdoor-interview/` · 1 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Lob — 30-minute intro screen · 13 August 2026](./topics/frontdoor-interview/lessons/0001-lob-intro-screen.html) |

### Master the Pi Coding Harness as a Power Tool

`topics/pi/` · 9 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [The Core Loop](./topics/pi/lessons/0001-the-core-loop.html) |
| 02 | [Driving the TUI](./topics/pi/lessons/0002-driving-the-tui.html) |
| 03 | [Sessions, Branching & Compaction](./topics/pi/lessons/0003-sessions-branching-compaction.html) |
| 04 | [Context Files](./topics/pi/lessons/0004-context-files.html) |
| 05 | [Skills](./topics/pi/lessons/0005-skills.html) |
| 06 | [Extensions](./topics/pi/lessons/0006-extensions.html) |
| 07 | [Pi Packages](./topics/pi/lessons/0007-packages.html) |
| 08 | [The map: LLM, agent, harness, tools, skills and MCP](./topics/pi/lessons/0008-o-mapa-dos-agentes.html) |
| 09 | [Manager-workers topology](./topics/pi/lessons/0009-orquestra-de-agentes.html) |

### Missão: EP Software — nossa empresa (Patricio + esposa)

`topics/software-company/` · 1 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Before code, the person (discovery with the pre-launch baker)](./topics/software-company/lessons/0001-antes-do-codigo.html) |

### Practical software concepts

`topics/software-concepts/` · 7 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Basic SQL — select, join, and aggregate](./topics/software-concepts/lessons/0001-sql-foundations.html) |
| 02 | [OAuth — the basic flow, visually](./topics/software-concepts/lessons/0002-oauth-flow.html) |
| 03 | [SQL sandbox — learn by writing](./topics/software-concepts/lessons/0003-sql-sandbox.html) |
| 04 | [Relational keys — PK and FK, the one-to-many](./topics/software-concepts/lessons/0004-relational-keys.html) |
| 05 | [Estimation — DAU, QPS and why one number is enough](./topics/software-concepts/lessons/0005-estimation.html) |
| 06 | [Cache — the hit rate is a DB-load dial](./topics/software-concepts/lessons/0006-cache-hit-rate.html) |
| 07 | [AWS SQS — the queue that decouples](./topics/software-concepts/lessons/0007-aws-sqs.html) |

### System Design (backend · infra · frontend)

`topics/system-design/` · 4 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [The Design Loop](./topics/system-design/lessons/0001-the-design-loop.html) |
| 02 | [The Four Forces](./topics/system-design/lessons/0002-the-four-forces.html) |
| 03 | [Scale & Estimation](./topics/system-design/lessons/0003-scale-and-estimation.html) |
| 04 | [State, coupling & deep modules](./topics/system-design/lessons/0004-state-and-boundaries.html) |

### System Design Interview Dojo

`topics/system-design-practice/` · 5 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [System Design Dojo · Draw and talk](./topics/system-design-practice/lessons/0001-draw-and-talk.html) |
| 02 | [System Design · The difficulty ladder](./topics/system-design-practice/lessons/0002-the-difficulty-ladder.html) |
| 03 | [Brief L1 — URL shortener](./topics/system-design-practice/lessons/0003-starter-url-shortener.html) |
| 04 | [Brief L1–2 — Onboarding + email (ClearOne)](./topics/system-design-practice/lessons/0004-starter-onboarding-email.html) |
| 05 | [Brief L2 — Webhook delivery (Lob)](./topics/system-design-practice/lessons/0005-starter-webhook-delivery.html) |

### Tooling

`topics/tooling/` · 1 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Vim — the core loop](./topics/tooling/lessons/0001-vim-core-loop.html) |

**Total: 34 lesson(s) across 9 topic(s).**
<!-- topics:end -->

## 🗂 Repo map

```
teach-patricio/
├── index.html            # Graphical hub — start here in a browser
├── README.md             # You are here (catalog is auto-synced)
├── topics/               # ONE FOLDER PER TOPIC
│   ├── pi/               #   the Pi power-user course (9 lessons + glossary)
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
