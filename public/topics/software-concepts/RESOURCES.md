# Practical Software Concepts Resources

## Knowledge

- [PostgreSQL tutorial: Querying a Table](https://www.postgresql.org/docs/current/tutorial-select.html)
  Official introduction to SELECT lists, filters, expressions, sorting, and DISTINCT.
- [PostgreSQL tutorial: Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html)
  Official visualizable model for inner and outer joins, matching rows with `ON`.
- [PostgreSQL tutorial: Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html)
  Official guide to COUNT, MAX, GROUP BY, and the WHERE-versus-HAVING distinction.
- [PostgreSQL SQL-INSERT syntax](https://www.postgresql.org/docs/current/sql-insert.html)
  Official reference for ON CONFLICT and RETURNING, used in the Postgres-vs-MySQL lesson.
- [MySQL INSERT ... ON DUPLICATE KEY UPDATE](https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html)
  Official MySQL reference for the equivalent upsert path.
- [AWS — Application Load Balancer introduction](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
  Official guide for L7 load balancing, target groups, and health checks.
- [nginx — HTTP Load Balancer admin guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
  Official reference for upstream pools, weights, and passive checks.
- [RFC 6749: OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
  Primary specification for OAuth roles, authorization grants, tokens, and protected-resource access.
- [RFC 7636: Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636)
  Primary specification for the PKCE verifier/challenge mechanism.
- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/rfc9700)
  Current security guidance: authorization code, PKCE, exact redirect handling, and avoiding implicit flow.

## Wisdom (Communities)

- [DBA Stack Exchange](https://dba.stackexchange.com/)
  Moderated practitioner feedback for concrete SQL behavior and database design questions.
- [IETF OAuth Working Group](https://oauth.net/community/)
  Standards community and discussion links for nuanced OAuth security and interoperability questions.

## Gaps

- Add stack-specific implementation sources only when the user's target framework is known.
