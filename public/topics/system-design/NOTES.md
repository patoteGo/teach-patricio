# Teaching Notes — System Design

## Learner profile (assumed — confirm)

- Experienced developer; comfortable with a backend stack, HTTP, SQL, basic cloud.
- Dual goal: **interview readiness** + **build better real systems**.
- Wants breadth (backend · infra · frontend), **fundamentals-first**.
- Match the repo house style: graphical, dark, bilingual PT/EN, self-citing.

## Open questions (answer these — or say "use defaults" — to lock the mission)

1. **Timeline / urgency:** Is there an interview date driving the pace? (affects how fast we reach the interview-practice phase)
   - Default: no fixed date → steady fundamentals-first arc.
2. **Current level / role:** e.g. mid-level backend, senior fullstack, etc. (sets how much I assume vs. explain)
   - Default: senior fullstack — skip intro CS, go straight to tradeoffs.
3. **Forced-priority emphasis (if you had to pick first):** "interview-script fluent ASAP" or "deep real-world architecture first"?
   - Default: **both in parallel** — fundamentals that serve each, interview drills interleaved from lesson 3.
4. **Frontend depth:** include a real **frontend system-design** track (rendering strategy, data fetching, state, perf budgets) or keep FE light?
   - Default: include it as Phase 3 (~3–4 lessons).

## Proposed curriculum (fundamentals-first) — adjust freely

**Phase 1 — Fundamentals (the mental models everything rests on)**

1. The design loop: **requirements → constraints → tradeoffs** (the opening move; works for every interview + every real design). ← *Lesson 1*
2. The **four forces**: latency, throughput, availability, consistency (+ SLAs/SLOs/error budgets).
3. **Scale & numbers**: orders of magnitude, back-of-envelope, capacity planning (latency table, "powers of two").
4. **Stateful vs stateless · coupling & cohesion · sync vs async** (where Ousterhout's "deep modules" lives).
5. **Consistency & CAP**: strong / eventual / linearizable; the tradeoff you're really making.
6. **Reliability primitives**: redundancy, replication, failover, retries + idempotency, backpressure, circuit breakers.
7. **Caching**: where/what/invalidation — the "hardest problem" + cache stampede.
8. **Data & storage engines**: relational / NoSQL / log / OLTP-vs-OLAP (DDIA core).

**Phase 2 — Building blocks (the boxes you compose)**
9. Load balancers · API gateways · CDNs · DNS.
10. Databases deep: replication, sharding, indexing, connection pooling.
11. Queues & streams (Kafka-ish) · event-driven decoupling.
12. Compute: services / serverless / containers + orchestration.
13. Observability: metrics · logs · traces · SLO dashboards.

**Phase 3 — Patterns & tradeoffs (real architecture)**
14. Monolith vs microservices; service boundaries; event-driven; CQRS/ES; saga.
15. Scaling reads & writes; hotspots; thundering herd; rate limiting.
16. **Frontend system design**: rendering (SSR/CSR/SSG/ISR/RSC), data fetching, state, performance budgets, micro-frontends.

**Phase 4 — Interview practice (the script + drills)**
17. The 4-step interview framework + the "wrap-up" (tradeoffs & follow-ups).
18–N. Worked problems: URL shortener · rate limiter · key-value store · news feed · chat · ticket booking · top-K.

## Teaching approach

- Each lesson: one tight mental model + a **diagram** + a **worked mini-example** + a **retrieval check** + a primary-source citation from `RESOURCES.md`.
- Interviews and real architecture use the *same* fundamentals; I'll surface the interview framing as a sidebar where it sharpens the lesson.
- Build a **reference doc** per phase (cheat sheet of the forces / the building blocks / the interview script) — these are what you'll re-read.

## Session log

- Session 1 (setup): scaffolded `topics/system-design/` from the template; researched and populated `RESOURCES.md` (DDIA, Alex Xu SDI, ByteByteGo, Ousterhout, Google SRE, latency table, FE-system-design); drafted `MISSION.md` (marked DRAFT) and this curriculum map. **No lessons built yet** — waiting on the 4 open questions to lock the mission, then build Lesson 1 (the design loop) in the repo's dark+bilingual+sidebar style.
- Session 2: user said **"use defaults"** → locked the mission (senior fullstack; fundamentals-first; interview + real-world in parallel; FE track in Phase 3). Built **Lesson 1 — “The design loop”** (clarify → estimate → sketch → deep-dive → trade off): a 5-stage loop SVG, a “five forces” diagram, the tradeoff-seesaw cards, an applied URL-shortener walkthrough, and 3 retrieval questions incl. a “high-leverage question” trainer. Grounded in DDIA ch.1 + ByteByteGo + the latency-numbers table. Dark + bilingual + sidebar (registered the new topic in shared `nav.js`, copied components to the topic's `assets/`). Fixed the README catalog `sync_readme.py` (title regex now handles `data-pt`/`data-en` title attributes and prefers the EN label). Validated headless: dark, PT↔EN swap on HTML+SVG, 3/3 quizzes, sidebar active-highlight, no overflow, 0 errors. No learning record yet — exposure ≠ mastery.
- Session 3 (batch build while user reads): built **Lesson 2 — “The four forces”** by hand (latency/throughput/availability/consistency, the nines table, SLO+error-budget, CAP tension; Google SRE + DDIA ch.5). Then **parallel workers** authored **Lesson 3 — “Scale & estimation”** (units/powers, the latency ladder SVG, back-of-envelope method + chat-app math) and **Lesson 4 — “State & boundaries”** (stateless vs stateful, push-state-out, Ousterhout deep modules, sync vs async) from pinned content briefs. Worker 3 correctly flagged that 1 ns → 100 ms spans ~8 orders of magnitude (not 6) and rendered it honestly. All three validated headless (dark, 3/3 quizzes, EN swap, sidebar, 0 errors). Phase-1 fundamentals now at 4/8. Next up: 5 consistency & CAP, 6 reliability primitives, 7 caching, 8 storage engines.
