# Reference explainers: diagram-rich PT HTML for every important concept/flow

New standing practice (user request): whenever an **important concept or flow**
arrives in Ellen's learning, produce a **well-designed, diagram-rich HTML
reference in Portuguese** (PT-primary, with the EN/PT toggle to match the hub)
under `topics/software-company/reference/`, and wire it into `assets/nav.js`
(`extra`).

Purpose: these are the **reference documents** the teaching skill emphasizes —
the compressed essence, designed for quick re-reference, that "fix the
knowledge" (storage strength). They complement the active lessons: the lesson
makes her DO the small change; the reference is the beautiful map she pins and
revisits.

Style rules: reuse `assets/style.css`; CSS/SVG diagrams (request flow,
middleware pipeline, layer/onion, cookie flow); one tight concept per doc;
ground every label in her real files (`Program.cs`, `api.ts`, etc.).

First one shipped: `reference/fluxo-de-uma-requisicao.html` — the end-to-end
request flow through Zapt (the central mental model that makes the rest click).
