# Build target locked: the "WhatsApp → Supabase → dashboard" capability

Resolved the open decision in LR-0005. The build-track spine is a **single,
reusable, revenue-enabling capability**: the core pattern EP sells — **intake
(WhatsApp) → Supabase → live dashboard.** Every client system EP builds is a
variant of this, so mastering it once unlocks most delivery work.

Calibration confirmed: **the husband built epsoftware.com.br (Astro); Ellen
knows basic Astro; building/extending is a mentor scenario** (he guides her).

- **Build stack: Vite + React + TS + Supabase** (Ellen's known stack from her
  own projects; the husband's daily stack). Next.js is **not** required for this
  app — a deliberate choice to keep friction on the *concept* (realtime,
  architecture), not the framework. (Veto-able.)
- **Lesson 1 = "A fonte da verdade":** the heartbeat of the system on the real
  stack — create the `orders` table, a React app that inserts + lists, and
  **Supabase Realtime** so a new record appears live across browser tabs.
  Durable takeaway: **"the database is the single source of truth; every screen
  is just a live view of it."** Win: two tabs, add an order in one, watch it pop
  in the other.

## Provisional spine

- L1 source of truth + realtime (this lesson)
- L2 dashboard UX: status (pendente / pago / pronto), derived views
- L3 real WhatsApp intake: webhook (Evolution API / Meta Cloud API) → insert
- L4 auth + RLS (only the team sees the dashboard)
- L5 the EP polish + deploy + reusable starter

## Implications

- The metadata lesson (old L1) and the Next.js rebuild plan are **both void**.
- This capability doubles as a **sales demo** ("assim organizamos seus pedidos")
  and a **reusable starter** for every future client.
- Ellen's ZPD stretch in L1 = **Supabase Realtime** (likely new to her); the
  React/TS/Supabase CRUD parts she already knows.
