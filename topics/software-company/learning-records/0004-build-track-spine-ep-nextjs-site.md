# Build track spine chosen: the EP Software site in Next.js

**Status: superseded by [[0005-ep-site-already-exists-astro]].** The company
site already exists, in Astro (production-grade); no Next.js rebuild. Kept for
history.

_Original (now void):_

Decided (Path A): the "build" track is built on a **real artifact — the EP
Software company website, in Next.js/TS** (the company stack) — rather than
polishing Ellen's existing Angular portfolio. Each lesson ships one real
improvement to this live site, so every minute builds the actual company stack
on a mission-critical, shippable asset.

Lesson 1 = scaffold + deploy + **metadata done right from the start**, with the
durable takeaway **"two audiences — humans read the body, machines read the
`<head>`."** This also fixes, on day one, the exact gaps found on her Angular
site (`lang="en"`, no description, no Open Graph).

## Implications

- The Angular portfolio (`ellenribeiro.dev.br`) is **no longer the primary
  build surface** — it stays as a reference/portfolio piece.
- A **domain for EP Software** is still needed (open item; metadata uses a
  placeholder URL until then).
- Future build lessons hang off the EP Next.js site: positioning/copy, contact
  form, projects/portfolio section, performance & accessibility, etc.
- The metadata skill is itself a **sellable service** for Brazilian small
  businesses ("seu site legível no Google + bonito no WhatsApp") → bridges the
  build→sell tracks.
