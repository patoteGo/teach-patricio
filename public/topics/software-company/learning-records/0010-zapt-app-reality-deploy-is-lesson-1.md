# The task app is "Zapt/Missão Recompensa" — sophisticated, local-only; deploy = Lesson 1

Inspected both repos: `github.com/ellenri/GerenciadorTasks` (backend) and
`github.com/ellenri/frontend-gerenciadorTasks` (frontend). The app is a
**children's chore gamification app** ("Zapt"), and the codebase is
**senior-adjacent** (almost certainly AI-assisted — there's a `.claude/` dir):

- **Backend:** .NET 10, ASP.NET Core, **Clean Architecture / DDD** (Core →
  Application → Infrastructure → Api). EF Core + **SQLite** (`Data Source=
  gerenciador.db` — a local file). Cookie auth HttpOnly + SameSite=Lax + BCrypt.
  ProblemDetails (RFC 7807) via `IExceptionHandler`. Unit of Work. Migrations +
  seed on startup. Static files for `/uploads` (task photo proofs). 46 xUnit
  tests. CORS locked to `localhost:4321`.
- **Frontend:** Astro 5 **SSR** (`@astrojs/node` standalone) + React 19 +
  Tailwind. SSR-aware API client forwards cookies manually. Vite proxy
  `/api` + `/uploads` → backend (same-origin in dev). Vitest + Playwright.
- **Status:** runs locally, connected; **never deployed to a real cloud.**

## Effective level (calibrates lesson depth)

Ellen is **producing senior-level work with AI assistance + husband mentoring**
(not "basic"). Lessons must assume strong fundamentals and target **depth** —
deploy, DB tradeoffs, architecture, design — not basics. Do not dumb down.

## Lesson 1 = deploy Zapt to a real cloud (the clear gap; explicitly requested)

Deploying this full-stack app surfaces cloud-deploy + DB tradeoff + architecture
at once:

- **Two runtimes to host** (.NET API + Node SSR) → keep **same-origin behind one
  domain** (reverse proxy) to preserve the `SameSite=Lax` cookie design — avoids
  reworking to `SameSite=None; Secure`.
- **SQLite is the DB-tradeoff centerpiece:** it's a file on an **ephemeral
  filesystem** — a redeploy or a second instance loses it. Decision: persistent
  volume (SQLite survives; single-instance; YAGNI for now) vs managed Postgres
  (durable; multi-instance; more setup). Teach the tradeoff; pick for the stage.
- `/uploads` (photo proofs) hits the same ephemeral-FS problem → volume or object
  storage.

## Open (needed to build Lesson 1)

- **Platform:** Render (easy/free tier, runs both services + Postgres) vs Fly.io
  (real global cloud, native persistent volumes — ideal for the SQLite lesson),
  vs husband's preference (e.g. Azure — .NET's natural home). Free tier first.
- **DB:** SQLite + persistent volume first (YAGNI; recommended) vs jump to
  managed Postgres (Neon/Supabase free) now.
