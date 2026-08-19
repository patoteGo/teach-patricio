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

### Running locally

There are two ways to preview, and only one of them runs the API:

| Command | Static HTML | Middleware (password gate) | `/api/progress` |
|---|---|---|---|
| `python3 -m http.server` | ✅ | ❌ never runs | ❌ 404s → lesson falls back to `localStorage` |
| `vercel dev` | ✅ | ✅ | ✅ hits your real Upstash DB |

**Don't hand-write a `.env`** — pull the variables from Vercel so there's a single
source of truth (the dashboard) and no copy-paste drift:

```bash
vercel link                  # once: link this folder to the Vercel project
vercel env pull .env.local   # writes all 4 vars: APP_PASSWORD, AUTH_TOKEN, UPSTASH_*
vercel dev                   # → http://localhost:3000
```

So the order matters: add the two `UPSTASH_*` vars in the Vercel dashboard first
(next to the existing `APP_PASSWORD` / `AUTH_TOKEN`), then pull.

Notes:

- `vercel dev` serves plain http, but browsers treat `localhost` as trustworthy, so the
  auth cookie's `Secure` flag still works. If login ever loops locally, that cookie is
  the first suspect.
- Ratings made at `localhost:3000` are stored under the same key (`grill-cencosud`) as
  production — local drills and production share progress.
- `.env*` files are git-ignored (see [`.gitignore`](./.gitignore)); never commit them —
  the Upstash token grants full access to the database.

## 📚 Topics & lessons

The catalog below is **auto-generated** from `topics/*/lessons/` by a GitHub
Action on every push, so it never drifts. (See
[`.github/workflows/sync-lessons.yml`](./.github/workflows/sync-lessons.yml).)

<!-- topics:start -->
### Behavioral Interview

`./src/pages/topics/behavioral-interview/` · 7 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Entrevista Comportamental · Lição 1 — BLUF + STAR](./src/pages/topics/behavioral-interview/lessons/0001-bluf-star.html) |
| 02 | [Entrevista Comportamental · Lição 2 — O Dojo](./src/pages/topics/behavioral-interview/lessons/0002-the-dojo.html) |
| 03 | [Behavioral Interview · Lição 3 — O Pitch](./src/pages/topics/behavioral-interview/lessons/0003-the-pitch.html) |
| 04 | [Entrevista Comportamental · Lição 4 — Perguntas de Acompanhamento](./src/pages/topics/behavioral-interview/lessons/0004-follow-ups.html) |
| 05 | [Untitled](./src/pages/topics/behavioral-interview/lessons/0005-architecture-grill.html) |
| 06 | [Untitled](./src/pages/topics/behavioral-interview/lessons/0006-fanout-decoded.html) |
| 07 | [Untitled](./src/pages/topics/behavioral-interview/lessons/0007-monitoring-lag-decoded.html) |

### Clearone Interview

`./src/pages/topics/clearone-interview/` · 2 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [ClearOne Advantage — playbook · 8 de agosto de 2026](./src/pages/topics/clearone-interview/lessons/0001-clearone-playbook.html) |
| 02 | [ClearOne — lembretes rápidos do stack](./src/pages/topics/clearone-interview/lessons/0002-stack-cheatsheet.html) |

### Frontdoor Interview

`./src/pages/topics/frontdoor-interview/` · 1 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Lob — tela inicial de 30 minutos · 13 de agosto de 2026](./src/pages/topics/frontdoor-interview/lessons/0001-lob-intro-screen.html) |

### Localstack Aws

`./src/pages/topics/localstack-aws/` · 7 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [LocalStack 1 — o primeiro comando](./src/pages/topics/localstack-aws/lessons/0001-localstack-up.html) |
| 02 | [LocalStack 2 — S3 pelo CLI](./src/pages/topics/localstack-aws/lessons/0002-s3-cli.html) |
| 03 | [LocalStack 3 — Lambda em Python](./src/pages/topics/localstack-aws/lessons/0003-lambda-python.html) |
| 04 | [LocalStack 4 — Lambda em TypeScript](./src/pages/topics/localstack-aws/lessons/0004-lambda-typescript.html) |
| 05 | [LocalStack 5 — SNS, SQS e gatilhos](./src/pages/topics/localstack-aws/lessons/0005-event-driven.html) |
| 06 | [LocalStack 6 — Terraform I](./src/pages/topics/localstack-aws/lessons/0006-terraform-first.html) |
| 07 | [LocalStack 7 — Terraform II](./src/pages/topics/localstack-aws/lessons/0007-terraform-stack.html) |

### Pi

`./src/pages/topics/pi/` · 9 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Pi · Lição 1 — O Core Loop](./src/pages/topics/pi/lessons/0001-the-core-loop.html) |
| 02 | [Pi · Lição 2 — Dirigindo o TUI](./src/pages/topics/pi/lessons/0002-driving-the-tui.html) |
| 03 | [Pi · Lição 3 — Sessões, Ramificação e Compaction](./src/pages/topics/pi/lessons/0003-sessions-branching-compaction.html) |
| 04 | [Pi · Lição 4 — Arquivos de Contexto](./src/pages/topics/pi/lessons/0004-context-files.html) |
| 05 | [Pi · Lição 5 — Skills](./src/pages/topics/pi/lessons/0005-skills.html) |
| 06 | [Pi · Lição 6 — Extensões](./src/pages/topics/pi/lessons/0006-extensions.html) |
| 07 | [Pi · Lição 7 — Pacotes do Pi](./src/pages/topics/pi/lessons/0007-packages.html) |
| 08 | [O mapa: LLM, agente, harness, ferramentas, skills e MCP](./src/pages/topics/pi/lessons/0008-o-mapa-dos-agentes.html) |
| 09 | [Untitled](./src/pages/topics/pi/lessons/0009-orquestra-de-agentes.html) |

### Portuguese

`./src/pages/topics/portuguese/` · 2 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Falsos amigos — as palavras que te traem](./src/pages/topics/portuguese/lessons/0001-falsos-amigos-traicoeiros.html) |
| 02 | [Sotaque — as cinco marcas que entregam](./src/pages/topics/portuguese/lessons/0002-sotaque-cinco-marcas.html) |

### Software Company

`./src/pages/topics/software-company/` · 1 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [EP Software · Lição 1 — Antes do código, a pessoa (descoberta com a padeira em início)](./src/pages/topics/software-company/lessons/0001-antes-do-codigo.html) |

### Software Concepts

`./src/pages/topics/software-concepts/` · 12 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [SQL básico — selecionar, combinar e resumir](./src/pages/topics/software-concepts/lessons/0001-sql-foundations.html) |
| 02 | [OAuth — o fluxo básico, visualmente](./src/pages/topics/software-concepts/lessons/0002-oauth-flow.html) |
| 03 | [Sandbox SQL — pratique escrevendo](./src/pages/topics/software-concepts/lessons/0003-sql-sandbox.html) |
| 04 | [Chaves relacionais — PK e FK, o 1-para-muitos](./src/pages/topics/software-concepts/lessons/0004-relational-keys.html) |
| 05 | [Estimativa — DAU, QPS e por que um número basta](./src/pages/topics/software-concepts/lessons/0005-estimation.html) |
| 06 | [Cache — a taxa de hit é um dial de carga do banco](./src/pages/topics/software-concepts/lessons/0006-cache-hit-rate.html) |
| 07 | [AWS SQS — a fila que desacopla](./src/pages/topics/software-concepts/lessons/0007-aws-sqs.html) |
| 08 | [AWS S3 — o mapa chave → bytes](./src/pages/topics/software-concepts/lessons/0008-aws-s3.html) |
| 09 | [Apache Kafka — o log que não apaga](./src/pages/topics/software-concepts/lessons/0009-apache-kafka.html) |
| 10 | [Redis — memória com TTL](./src/pages/topics/software-concepts/lessons/0010-redis.html) |
| 11 | [PostgreSQL vs MySQL — irmãos, não gêmeos](./src/pages/topics/software-concepts/lessons/0011-postgres-vs-mysql.html) |
| 12 | [Load balancer — o porteiro que divide a fila](./src/pages/topics/software-concepts/lessons/0012-load-balancer.html) |

### System Design

`./src/pages/topics/system-design/` · 4 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [System Design · Lição 1 — O loop de design](./src/pages/topics/system-design/lessons/0001-the-design-loop.html) |
| 02 | [System Design · Lição 2 — As quatro forças](./src/pages/topics/system-design/lessons/0002-the-four-forces.html) |
| 03 | [System Design · Lição 3 — Escala e estimativa](./src/pages/topics/system-design/lessons/0003-scale-and-estimation.html) |
| 04 | [System Design · Lição 4 — Estado, acoplamento e módulos profundos](./src/pages/topics/system-design/lessons/0004-state-and-boundaries.html) |

### System Design Practice

`./src/pages/topics/system-design-practice/` · 6 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [System Design Dojo · Desenhe e fale](./src/pages/topics/system-design-practice/lessons/0001-draw-and-talk.html) |
| 02 | [System Design · A escada de dificuldade](./src/pages/topics/system-design-practice/lessons/0002-the-difficulty-ladder.html) |
| 03 | [Brief L1 — Encurtador de URL](./src/pages/topics/system-design-practice/lessons/0003-starter-url-shortener.html) |
| 04 | [Brief L1–2 — Onboarding + email (ClearOne)](./src/pages/topics/system-design-practice/lessons/0004-starter-onboarding-email.html) |
| 05 | [Brief L2 — Entrega de webhook (Lob)](./src/pages/topics/system-design-practice/lessons/0005-starter-webhook-delivery.html) |
| 06 | [System Design · Warmup copy-recall](./src/pages/topics/system-design-practice/lessons/0006-warmup-copy-recall.html) |

### Tooling

`./src/pages/topics/tooling/` · 2 lesson(s)

| # | Lesson |
|---|--------|
| 01 | [Vim — o loop essencial](./src/pages/topics/tooling/lessons/0001-vim-core-loop.html) |
| 02 | [Orca — o cockpit dos agentes](./src/pages/topics/tooling/lessons/0002-orca-agent-cockpit.html) |

**Total: 53 lesson(s) across 11 topic(s).**
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
