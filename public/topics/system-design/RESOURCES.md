# System Design — Resources

> Curated, high-trust sources. Knowledge is drawn from these, not parametric
> guesses. Lessons cite back here. Revisit and prune as we learn what's useful.

## Knowledge (primary texts — read once, they reframe everything)

- [**Designing Data-Intensive Applications** — Martin Kleppmann (O'Reilly)](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/)
  The bible. Replication, partitioning, transactions, consistency, batch/stream.
  Use for: the *why* behind every storage/distributed-systems decision. We'll
  lean on Ch.5 (Replication), Ch.6 (Partitioning), Ch.7 (Transactions), Ch.9
  (Consistency/Consensus). ([summary/cheat sheet](https://danlebrero.com/2021/09/01/designing-data-intensive-applications-summary/))
- [**System Design Interview — An Insider's Guide** (Vol 1 & 2) — Alex Xu](https://bytebytego.com/books/)
  The interview framework + ~30 worked problems (rate limiter, URL shortener,
  news feed, chat, etc.). Use for: the interview *script* and drills.
- [**ByteByteGo** — bytebytego.com](https://bytebytego.com/)
  Alex Xu's site: articles, the [SDI course](https://bytebytego.com/courses/system-design-interview),
  and weekly system-design breakdowns. Use for: visual explainers + current
  patterns.
- [**A Philosophy of Software Design** — John Ousterhout](https://web.stanford.edu/~ouster/cgi-bin/book.php)
  "Deep modules", information hiding, separation of concerns. Use for: how to
  draw module/service boundaries well (the #1 thing that makes systems last).
- [**The Site Reliability Workbook / Google SRE Book** — Google (free)](https://sre.google/workbook/)
  SLOs, error budgets, toil, incident response. Use for: treating reliability as
  an engineering discipline with numbers.

## Knowledge (reference constants & explainers)

- [**Latency Numbers Every Programmer Should Know** — Jeff Dean / colin-scott](https://colin-scott.github.io/personal_website/research/latency_trends.html)
  The canonical latency table (L1 cache → disk → network → DC round-trip). Use
  for: back-of-envelope estimation and gut-feel for "is this fast".
- [**The System Design Primer** — donne Martin (GitHub)](https://github.com/donnemartin/system-design-primer)
  Community reference: patterns, tradeoffs, an Anki deck. Use for: spaced
  repetition of the building blocks.
- [**Front-End System Design** resources](https://pagefy.io/system-design/) &
  [**Micro Frontends** — Cam Jackson / martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)
  FE architecture as a system-design discipline: rendering strategies
  (SSR/CSR/SSG/ISR), data fetching (REST/GraphQL/RSC), state, perf budgets.
  Use for: the frontend layer of a full-stack design.
- [**High Scalability** — highscalability.com](https://highscalability.com/)
  Case studies of real architectures (YouTube, Discord, WhatsApp, etc.). Use
  for: "how do they actually do it at scale" reference.

## Wisdom (communities)

- [r/ExperiencedDevs](https://reddit.com/r/ExperiencedDevs) & [r/systemdesign](https://reddit.com/r/systemdesign)
  Senior practitioner discussion, design-critique threads. Use for: real-world
  tradeoff war stories.
- [Hacker News](https://news.ycombinator.com/) — use for: post-mortems and
  engineering-architecture discussions on new systems.

## Gaps

- No personal interview mock-prompt bank yet — target: build one in `reference/`
  as we do the interview-practice phase.
- No "my own design doc template" yet — target: produce one as a reference doc
  once we've done ≥2 real designs.
