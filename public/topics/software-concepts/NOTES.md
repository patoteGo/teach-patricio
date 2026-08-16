# Teaching Notes — Practical Software Concepts

## Learner profile

- Senior full-stack engineer refreshing foundations for interviews and production explanations.
- Skip database history and protocol trivia; emphasize mental models, trade-offs, and precise vocabulary.

## Stated preferences

- Group software concepts together, separate from dated interview preparation.
- Be highly graphical and interactive; animation is welcome.
- Keep lessons short enough to review before an interview.

## Interactive lesson contract

- Use `h2.section` for persisted completion checkpoints.
- When adding a lesson: register it in `assets/nav.js` (sidebar), `README.md` (lesson table), the hub card count in `index.html`, and link it from the previous lesson's `concept-nav`.
- Put one recall-worthy phrase in `<strong>` per teaching paragraph.
- Prefer immediate feedback and motion that explains flow, not decorative animation.
- Keep learner-facing labels bilingual in Portuguese and English.

## Session log

- Session 1: Created the software-concepts workspace, SQL lesson, OAuth lesson, and quick reference.
- Session added: `0011-postgres-vs-mysql.html` — one comparison lesson covering alike (relational, ACID, MVCC, portable SQL) and different (strictness, JSON, upsert/RETURNING, VACUUM, licenses).
- Session added: `0012-load-balancer.html` — doorman model: one public IP, N interchangeable servers, health checks, distribution rules (round-robin / least connections / hash), L4 vs L7, balancer-as-SPOF and its fixes.
- Session added: `0008-aws-s3.html` — key→bytes map model (no folders, LIST caps at 1000), strong consistency since 2020, 11 nines, storage classes + lifecycle. Sidebar now renders `group` labels; SQS + S3 grouped under "AWS" (nav.js `group` field). Kafka/Redis/Postgres/LB renumbered 09–12.
