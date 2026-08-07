# The EP Software site already exists (Astro, production-grade) — plan revised

> ⚠️ **CAVEAT (per user):** the site's _marketing content_ (niche, services,
> value prop, the whole "what EP sells" framing) is **unvalidated AI "slop"** —
> not human-grounded, still under discussion, may not be kept. **Do NOT base
> lessons/curriculum on those claims.** Only the _technical facts_ below (Astro
> stack; that it exists + is deployed; trilingual CMS backend; excellent
> metadata) are confirmed ground truth. The business direction itself needs
> real customer validation before it steers any building.

**Supersedes LR-0004.** Direct inspection of <https://www.epsoftware.com.br/>
shows the company site is **already built, live, and high quality** — not "on
paper" and not needing a Next.js rebuild. It is:

- **Astro v7.0.7**, trilingual (pt-BR / en / es) with `hreflang` alternates,
  backed by an **admin panel + `content_translations` table** (a CMS/i18n
  backend; content managed per-locale).
- **Metadata already excellent** — `lang="pt-BR"`, full Open Graph (1200×630
  with alt), Twitter `summary_large_image`, canonical, hreflang, and **JSON-LD**
  (WebSite + Organization/ProfessionalService + a 6-item `OfferCatalog` +
  FAQPage). Better than ~95% of small-business sites.
- **Business facts:** based in **Goiânia/GO**, serving all Brazil remotely;
  `foundingDate 2024`; contact <ellenribeiro15@hotmail.com> / +55-62-99448-8618;
  niche = small businesses running on WhatsApp + Pix + planilhas; services =
  custom web systems, WhatsApp/Pix integrations, dashboards, MVPs, AI
  assistants (incl. a `/chatgpt-no-whatsapp/` subpage).

## What this overturns

- **No "rebuild the EP site in Next.js"** (LR-0004 is void). The selling asset
  is **done**, in Astro. User confirms **"Astro as a stack is fine"** → Astro is
  in-scope for Ellen.
- The **positioning gap I attributed to the company site does not exist** — it
  is a proper storefront, not a CV. (That gap was only real on her personal
  Angular portfolio.)
- The **metadata lesson is moot** for the company site — it's already a model
  of correctness (use it as the _positive_ example instead).

## Open decision (the real question now)

The selling asset exists; the **revenue + skill gap is delivering client
work.** Ellen's learning target is one of:

- **A — extend the real Astro site** (blog/case-studies → content/SEO →
  clients; a lead-capture form → Supabase + WhatsApp). Learns Astro inside a
  senior-built codebase.
- **B — build a real client-deliverable** (e.g. a small "order intake →
  Supabase → live dashboard" MVP). Grows her into DELIVERING what EP sells;
  doubles as a sales demo. Delivery stack React/TS/Supabase.
- **Unknown:** who built epsoftware.com.br (husband vs Ellen w/ AI) — calibrates
  whether "extend it" is a mentor scenario or she already knows Astro. Ask.
