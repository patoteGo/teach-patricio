# My Behavioral Story Bank

> Drafted with the coach. Practice these **out loud** from the bullets — don't memorize the prose. Each story maps to many questions (see `reference/question-bank.html`). Paste any of these into the Dojo to rehearse timed.

---

## Story 1 — Delivery-tracking ingest service @ Cencosud

**Tags:** Ownership · Ambiguity · Delivery/pressure · Mentorship (reframeable)
**Maps to:** "project you're most proud of" · "owned end-to-end" · "scaled a system" · "a time you handled a spike/incident" · "a technical decision you justified"

### BLUF (say first)

I built and owned a Node service at Cencosud — a large LATAM retailer — that ingested delivery-tracking events from many external partners and normalized them into one consistent internal event, so every downstream service saw exactly where each package was. It handled **millions of events a day**, spiking hard on Black Friday-type sale days (we run them ~3× a year).

### Situation

Cencosud's microservices estate ran on Kubernetes — mostly Java services, talking through AWS SQS and persisting to Postgres. Delivery events came in from **many external delivery partners, each with a different format**, and downstream services needed a single, consistent view of where every package was.

### Task

Own the **tracking-event ingest service**: consume those heterogeneous partner events, normalize each one into one internal "tracking event," and publish it so the rest of Cencosud saw one source of truth.

### Action (what *I* did)

- Built and owned the Node service end-to-end. **Node over the team's Java default** because this was I/O-heavy ingest — Node handled it efficiently on a low resource footprint.
- Consumed from **SQS**, normalized the payload, and **batch-inserted to Postgres** — chunking several queue messages into each write so the DB kept up under load.
- Instrumented everything in **New Relic** (throughput, error rate, p95, queue depth/consumer lag).

### Result

- Millions of events/day, absorbing heavy Black Friday-style spikes (~3× a year) without the tracking view going stale.
- Every downstream Cencosud service got one consistent tracking signal across all partners.

### Depth reserve — probes you WILL get

> 🎯 **Drill these interactively:** [Lesson 5 — The Architecture Grill](./lessons/0005-architecture-grill.html) (21 probes with model answers: SQS mechanics, data, scale, tradeoffs, team).

| Probe | Answer |
|---|---|
| "How did you measure it?" | New Relic — throughput (rpm), error %, p95/p99, and **SQS queue depth / consumer lag**. (Pin a rough daily figure: ~***M/day, spiking***× on sale days.) |
| "Why Node, not Java like the rest?" | Team was Java-strong, but this service was pure I/O-heavy ingest; Node's async model handled it efficiently on low resources. |
| "Why SQS?" | Decouple partners from consumers, absorb spikes, built-in retry + DLQ for poison messages, scale consumers independently. |
| "How did Postgres keep up?" | **Batch inserts** — chunk N queue messages into one write. (Add if true: PgBouncer pooling, read replicas for reads.) |
| **"SQS is at-least-once — how did you handle duplicates?"** ⚠️ | **Idempotency** — dedup on a stable event ID (upsert / unique constraint) so a redelivery doesn't double-count a package's position. *Have this answer cold.* |
| "What broke?" | **Consumer-lag spike** on a sale day — the service couldn't keep up with its allocated pods. |
| "How did you fix it?" | Scaled up pods on K8s. **Senior version:** and tuned **autoscaling (HPA) on queue depth/lag** so the next spike self-heals instead of paging a human. |
| "What would you do differently?" | Autoscale on lag from day one; or partition/handle the hottest partners separately; or move the hottest read path off Postgres (cache). Pick one you believe. |

### Pitch line (the "Past" beat, ~30s)
>
> "I built and owned a Node service at Cencosud that ingested delivery-tracking events from many external partners and normalized them into one consistent internal event — so every service saw exactly where each package was. Millions of events a day, spiking hard on Black Friday-type sale days. The estate was Java-heavy microservices on Kubernetes, through SQS into Postgres with batch inserts — I used Node because it handled that I/O-heavy ingest efficiently on low resources."

---

## Story 2 — Leading the shipping-system UI rebuild @ Cencosud

**Tags:** Leadership/Mentorship · Ownership · Ambiguity · Delivery (stretch vs. ship)
**Maps to:** "tell me about mentoring/leading" · "owned end-to-end" · "balanced quality vs. speed" · "how you grow people" · "a judgment call"

### BLUF (say first)

I led three frontend developers through a full rebuild of Cencosud's shipping-system interfaces — and the part I'm proudest isn't the shipping itself, it's that I **right-sized the architecture to the team**, and learned to read each person: when to push them to learn something new, and when to just let them move fast on what they already knew.

### Situation

Cencosud's shipping system needed its **entire interface layer rebuilt**. I was handed a team of three frontend developers to do it.

### Task

As the lead, I owned distributing the work, keeping everyone unblocked, and setting the architecture — plus the real judgment call: **calibrating how much to stretch each person vs. shipping on what they already knew.**

### Action (what *I* did)

- **Right-sized the architecture to the team.** Since we all understood the backend, we built **shared libraries that matched the frontend↔backend interfaces** — modeling the contracts once so integration stayed clean and the team could own it long-term.
- **Stretch — TypeScript.** TS was new and intimidating for the JS/dynamic folks on the team. Instead of pointing them at docs, I **ran a TypeScript workshop using our own codebase's use cases**, then followed up in code review to make sure the typing actually stuck.
- **Ship fast — deliberate tech debt.** The company culture was "everything for yesterday," with almost no unit testing. To hit the business timeline we **consciously took on technical debt** — and paired it with a **plan to pay it down across the following sprints**.
- Owned work distribution and actively **unblocked** people — when someone got stuck, I stepped in.

### Result

Delivered the full new frontend in a few months — a React app the team owned and **maintained afterward**, plus reusable FE/BE interface libraries. TypeScript adoption stuck (the team leveled up), and we hit the business timeline without the debt quietly rotting.

### Depth reserve — probes you WILL get

> 🎯 **Drill these interactively:** [Lesson 5 — The Architecture Grill](./lessons/0005-architecture-grill.html) (21 probes with model answers: SQS mechanics, data, scale, tradeoffs, team).

| Probe | Answer |
|---|---|
| "How big was the rebuild?" | A few months; full interface rebuild in React, plus shared FE/BE interface libraries. *[add screen/user count if you have it]* |
| "What did YOU do vs. the team?" | I owned distribution, unblocking, the architecture (incl. the shared-libraries decision), the TS workshop, and the debt/paydown plan; the 3 devs built the interfaces. |
| "When did you push someone to learn?" | The TypeScript workshop — taught it on our own use cases, then followed up in review so it stuck. |
| "When did you choose to ship fast?" | Consciously taking on tech debt to hit the business deadline — with a sprint-by-sprint paydown plan. |
| "Why shared FE/BE libraries?" | The team understood the backend, so we modeled the contracts once and kept FE/BE in sync → less integration churn, fewer bugs at the seam. |
| "Did you actually pay down the debt?" | *[have an honest answer — did the plan hold? partly?]* |
| "How did you decide which debt was OK?" | Reversible/isolated debt, not at the core. |
| "What would you do differently?" | Push harder on testing earlier — carve out test time even under deadline pressure. |

---

## Story 3 — "Greatest weakness": polyglot fluency beyond JS/TS

**Maps to:** "greatest weakness" · "something you're working on" · "how do you learn / stay current" · "negative feedback you've received"

### The answer (say this — ~40s)

> "Honestly, my deepest fluency is JavaScript and TypeScript — front and back. Where I'm actively growing is polyglot environments: I've worked on teams with Ruby, Java, Python, and Kotlin backends, and I'm not fluent in those the way I am in JS/TS, so it slows me down day-to-day. It cost me on a previous job where the backend was Java, Python, and Kotlin — I delivered, but not as fast as I wanted. I'm closing the gap by ramping fast with AI tooling — mapping unfamiliar codebases, picking up idioms — and treating each new language as on-demand learning. I'd call myself **T-shaped** right now: deep in JS/TS, and actively broadening."

### Why it works (the rules)

- **Real** ✓ — genuine, not a fake "perfectionist."
- **Non-core for a JS/TS role** ✓ — React/Node/TS is the JD's core; the weakness is in adjacent stacks.
- **Actively fixing** ✓ — AI-assisted ramping (modern, senior-credible).
- **Progress** ✓ — delivered in the polyglot job.

### ⚠️ The one risk + the mandatory fix

At a **consulting shop like Jahnel** (varied client stacks), *"I struggle outside JS/TS"* **can read as narrow** — *unless* you immediately pair it with proof you deliver anyway + how you ramp. The **"T-shaped"** framing + **"I've delivered in polyglot environments"** evidence is non-optional. **Never state the weakness without the proof.**

### Depth reserve — probes you WILL get

> 🎯 **Drill these interactively:** [Lesson 5 — The Architecture Grill](./lessons/0005-architecture-grill.html) (21 probes with model answers: SQS mechanics, data, scale, tradeoffs, team).

| Probe | Answer |
|---|---|
| "How exactly do you use AI to ramp?" | Map the unfamiliar codebase, explain idioms, generate test cases to validate my understanding, translate patterns I already know from TS. |
| "What clicked for you recently in [Java/Kotlin]?" | *[have ONE concrete concept — e.g. a Kotlin idiom, or how its typing compares to TS]* |
| "How did you handle the Java/Python/Kotlin job day-to-day?" | Paired with teammates, leaned on code review, asked good questions, delivered [X]. |
| "Why not just go deep on one stack?" | I am deep on JS/TS — that's my foundation. I'm broadening so I'm effective in any stack a client brings. |

**Safer backup weakness** (if this one feels risky in the room): *delegating / letting go*, or *over-committing timelines*.

---

## Story 4 — Weakness **and** Failure: over-committing the MV3 Chrome-extension deploy

**Maps to:** "greatest weakness" (over-committing) · "tell me about a failure/mistake" · "a time you learned from a mistake" · "pushed back / disagreed with stakeholders" (reframe)

### The weakness answer (~40s, if asked "greatest weakness")

> "My weakness is over-committing to timelines — I want to say yes, especially when the business is pushing hard, and I've agreed to ship dates that didn't leave room for proper testing. It bit me once: we shipped a Chrome extension on the Manifest V3 migration under commercial pressure, skipped the testing we should have done, and it broke in production. The pressure was real — but the decision to ship was **mine**, and it was the wrong call. Since then I protect testing time explicitly and push back on dates with the actual risk, not just a yes."

### As a failure story (STAR)

- **Situation:** Chrome extension needed the **Manifest V3 migration** (Google-required). Commercial team pushing to ship by a hard date.
- **Task:** Ship the MV3 version by the deadline.
- **Action (the mistake):** I committed to the timeline under commercial pressure and we released **without testing against a production-like environment** — our staging was too sanitized to catch it.
- **Result (failure + fix):** It **broke in production** after deploy — the **content-script ↔ background (service-worker) messaging** failed, because a library we relied on wasn't compatible with MV3's service-worker context. We **rolled back within a couple of hours** of detecting it.
- **Lesson:** I owned that I over-committed. The commercial pressure was real, but shipping was my call. Now I **test against a prod-like environment with realistic data before release**, push back on dates with the actual risk, and bake testing time into the estimate up front.

### ⚠️ The framing that makes or breaks this (read carefully)

1. **The weakness is *over-committing timelines* — NOT "I'm bad at testing."** Testing is core engineering hygiene (the JD lists "automated tests" + "testing practices" as must-haves), so framing yourself as a weak tester is risky. The MV3 failure is the **evidence/lesson** of over-committing, not the weakness itself. Testing gap = *symptom*; saying-yes-too-easily = the weakness.
2. **Own it. Don't blame commercial.** Never say *"they pressured me into it."* Say: *"the pressure was real, but the decision to ship was mine, and it was wrong."* Blaming others = red flag; owning a bad call under pressure = senior gold.

### Depth reserve — probes you WILL get

> 🎯 **Drill these interactively:** [Lesson 5 — The Architecture Grill](./lessons/0005-architecture-grill.html) (21 probes with model answers: SQS mechanics, data, scale, tradeoffs, team).

| Probe | Answer |
|---|---|
| "What specifically broke in MV3?" | Content-script ↔ service-worker **messaging** broke. MV3 tears down the background service worker when idle, and a library we relied on wasn't service-worker-compatible. *(Fine to say: "I don't recall the exact library offhand, but the mechanism was the service-worker context.")* |
| "How did you fix it?" | Rolled back — detected it and rolled back within a couple of hours. |
| "What testing was missing?" | A run against a **production-like environment with realistic data**. Staging was too controlled/sanitized, so it never reproduced the real path that broke. |
| "Did you push back at all?" | *[honest — if not: "I should have, and that's the core lesson."]* |
| "How do you prevent it now?" | Bake testing into the estimate; quote risk-informed dates, not yes-dates; a pre-release checklist. |

---

<!-- Add more stories below as you draft them. Same shape: Tags, BLUF, S/T/A/R, Depth reserve. -->

---

## Story 5 — Building an applied-AI SaaS from scratch @ MyBetterAI (+ the prompt-selector with designer/founder)

**Tags:** AI-first · Ownership/ambiguity (from scratch) · Cross-functional (designer + founder) · Next.js/RSC/SSR
**Maps to:** "AI-first / how you use AI" · "worked with Product/Design/Marketing" · "built something from scratch" · "ambiguity" · "a feature you shaped with stakeholders" · "Next.js/SSR"

### BLUF (say first)

At MyBetterAI I was a senior full-stack engineer building an **applied-AI SaaS from the ground up** with a small startup team — Next.js App Router with React Server Components, TypeScript, and LangChain / Vercel AI SDK across OpenAI, Anthropic, Google, and Groq. I owned AI features end-to-end; the one I'm proudest is a **prompt-builder that let non-technical users craft good prompts** — which only shipped because I worked in a tight loop with the **designer and the founder** to find the version that was actually usable and attractive.

### Situation

Early-stage applied-AI startup. Small team, lots of ambiguity, shipping fast from a blank slate. The product's core value was AI generation (bios, avatars, autocomplete), but prompting was a wall for non-technical users.

### Task

Own full-stack AI features — UI from Figma, the AI plumbing (LangChain + Vercel AI SDK, multi-provider), and specifically make prompting accessible to non-technical users, in close collaboration with the designer and founder.

### Action (what *I* did)

- **Built the product UI from Figma** with **Next.js App Router + React Server Components + TypeScript + Tailwind** — server components for data-heavy/AI sections, client where interactivity needed it.
- **Integrated LangChain + Vercel AI SDK** across **OpenAI, Anthropic, Google, Groq** — including **multi-provider token counting** (cost/limits differ per provider) so we could stay in budget and route sensibly.
- Shipped AI features: **AI-generated biography + avatar workflows**, **AI autocomplete**, and **file imports for prompt context**.
- **Explored document-based RAG** to ground generation in user documents.
- **The prompt-selector** — the cross-functional piece: I worked **iteratively with the designer and the founder** to turn raw prompting power into a **guided selector** non-technical people could use. We traded off flexibility vs. simplicity until we landed on something usable *and* attractive.
- Delivered through **Vercel preview environments + continuous deployment** — fast feedback loop with the whole team.

### Result

A working applied-AI product built from scratch in months, with AI features non-technical users could actually drive via the guided prompt-builder — validated through tight design/founder collaboration.

### Depth reserve — probes you WILL get

> 🎯 **Drill these interactively:** [Lesson 5 — The Architecture Grill](./lessons/0005-architecture-grill.html) (21 probes with model answers: SQS mechanics, data, scale, tradeoffs, team).

| Probe | Answer |
|---|---|
| "How do you pick between providers (OpenAI/Anthropic/Gemini/Groq)?" | Capability + cost + latency tradeoff — token counting per provider let us route by budget/limits; Groq for fast/cheap, Anthropic/OpenAI for quality. |
| "Why RSC / App Router?" | Move data-fetching/AI-orchestration to the server (less client JS, secrets stay server-side), hydrate only where needed. |
| "What's hard about multi-provider token counting?" | Each provider tokenizes/counts differently; had to normalize to a comparable budget so we didn't blow limits or cost. |
| "Tell me about the prompt-selector collaboration." | Designer owned the UX shape, founder the product intent, I owned feasibility + build; we iterated in Vercel previews until it was usable AND attractive. |
| "How do you evaluate AI output quality?" | *(have an honest answer — human review, eval sets, iteration on prompts/chains)* |
| "What broke with RAG?" | *(have one — chunking, retrieval relevance, context-window limits)* |

### Why this is your strongest ClearOne story

- **AI-first = the JD's headline** → you've *built* an AI product, not just used assistants.
- **Next.js / SSR** → clears the "bonus" requirement (App Router + RSC).
- **Designer + founder collaboration** → closes the cross-functional gap.
- **From scratch, ambiguity** → senior ownership signal.

---

## 🎯 Takeaway cheat-sheet (interview-day) — the closing line for each story

> A good takeaway is a **named rule you now follow**, not "I learned to communicate."
> Pattern: *principle → habit*, or a one-line aphorism. One line. Land it.

| Story / theme | Takeaway (say this) |
|---|---|
| **#1 Cencosud ingest** (owned/scaled/tech-decision) | "Right-size the tool to the workload — Node over Java because the job was I/O-heavy. And instrument *before* you scale: I autoscaled on queue lag so the next spike self-healed." |
| **#2 Shipping-UI rebuild** (mentorship/leadership) | "Architecture has to fit the *team* that'll maintain it — and you grow people on real work, not docs." |
| **#3 Polyglot weakness** (AI-first/learning) | "Stay T-shaped: go deep on your core, and use AI to ramp on the rest. Every new stack is on-demand learning now." |
| **#4 MV3 failure** (failure/over-committing) | "The pressure was real, but the call to ship was mine — now I bake testing into the estimate and quote risk-informed dates, not yes-dates." |
| **#5 MyBetterAI** (AI-first/collab/from-scratch) | "The model is only as useful as the UX in front of it — that's why we built a guided selector, not a prompt box. And: ship with the designer in tight loops; feasibility shapes the vision." |
| **CRM simplification** (simplify vs scale) | "Unblock first, then make it scalable — in that order. Defer the future behind a feature flag; don't build it before you need it." |
| **Textus mentorship** (growing people) | "Mentoring isn't transferring answers — it's transferring the *way to find them*." |
| **Code-style disagreement** (conflict) | "Disagree well: engage their reasoning first, argue from context not opinion, and make it the team's call." |
| **System-design (AI settlement offer)** (tech judgment) | "For AI in fintech: treat it like production code — guardrails, evals, a human checkpoint. Automation vs safety is the tradeoff I'd watch." |

**Drill tonight:** for each story, say the answer out loud and **end on the takeaway line above.**
