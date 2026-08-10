# Teaching method: ACTIVE learning (AI as tutor, not author) + deploy = local Docker

## The method shift (steers ALL future lessons)

The user observed Ellen is **bored and passive** in the current loop: prompt the
LLM → wait ~10 min → paste → it breaks → prompt again. She's outsourcing the
coding, not learning. "This process should be exciting and active, not passive
and boring."

**Fix — every lesson is an ACTIVE micro-loop, not a vibe-prompt:**

- **AI = tutor, not author.** It explains, quizzes, poses tiny challenges,
  reviews HER code. It does NOT write big chunks for her to paste.
- **Read → predict → change one line by hand → run (seconds) → observe.**
- **Fast feedback (seconds, not 10-min waits):** small local changes, immediate
  result — this is what makes it exciting.
- She writes the code; she owns the understanding.

This matches the skill's own philosophy: effortful retrieval, desirable
difficulty, tight feedback loops.

## Deploy target revised

NOT a public cloud (the LR-0010 platform question is moot for now). The user
wants to **deploy on local Docker** (he has the repo cloned to test). So
"deploy" = **containerize Zapt + `docker compose up` locally** — the foundation
of all cloud deploy, fully under their control, fast feedback. Done ACTIVELY:
she writes/understands the Dockerfiles + compose (two services, same-origin) —
not "LLM, write me a compose."

## Active-mastery spine — architecture concepts in HER code, as active exercises

Concrete, learnable, high-value things in the Zapt codebase — each framed as an
**active exercise** (read her real code → predict → hand-change → observe), NOT
a vibe-prompt:

1. **Dependency direction / Clean Arch** — swap `EfTaskRepository` for the
   `InMemoryTaskRepository` already in the repo; app still runs. Feel the
   abstraction.
2. **Dependency Injection wiring** — comment out one `AddScoped<IRepo, EfRepo>()`
   in `Program.cs`; watch the startup DI error; understand injection.
3. **Middleware pipeline order matters** — reorder `UseAuth`/`UseCors`/
   `MapControllers`; predict what breaks; observe.
4. **EF migrations = schema version control** — read the 6 migrations in order
   (the schema's evolution story); then she writes a new one (add a column).
5. **Cookie auth: an API returns 401, not a redirect** — why `OnRedirectToLogin`
   returns 401; what her frontend does on 401 (client-side redirect). Two layers.
6. **SSR cookie forwarding** — remove the manual `Cookie:` header in `api.ts`;
   watch auth break in SSR but work on the client. Understand why (server-side
   fetch ≠ browser).
7. **Unit of Work = atomicity** — recreate a partial-write bug; understand
   transactions.
8. **Domain exception → ProblemDetails** — throw a `DomainException`; observe the
   clean 400; count the controllers (N try/catch avoided).
