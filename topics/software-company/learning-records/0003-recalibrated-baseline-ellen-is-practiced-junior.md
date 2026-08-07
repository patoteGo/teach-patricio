# Recalibrated baseline: Ellen is a practiced junior (evidence: live site)

**Supersedes LR-0001.** Direct inspection of <https://ellenribeiro.dev.br/> and
its raw HTML shows Ellen is **far beyond "never deployed / basic."** She is a
**practiced junior**:

- **Employed experience:** ~1y7m as a fullstack intern at a fintech (Intactus)
  — C#/.NET, Entity Framework, SQL Server, REST APIs, MVC/DDD, Azure DevOps,
  Scrum, Kendo UI.
- **Already deployed, herself:** a personal **portfolio in Angular 18**
  (ellenribeiro.dev.br) — responsive, mobile menu, rotating 3D greeting, and a
  WhatsApp CTA. Plus **3 shipped React + TypeScript + Vite + Supabase**
  projects, including a real-time PIX donation platform and a sorteio system.
- **Stack alignment:** her own project stack (React/TS/Supabase) is the
  husband's daily stack — she already operates in the company's technology
  family.

## Real gaps observed on her site (use as lesson material)

- **SEO / metadata:** `<html lang="en">` (wrong — content is PT), title
  `Ellen-portfólio` (weak), **no meta description**, **no Open Graph tags** →
  no preview card when shared on WhatsApp/social (a client-acquisition leak in
  Brazil).
- **Positioning:** reads as a **job-seeker CV** ("Estágio", "júnior"), not a
  **business storefront** — no services, no "what I build for you", no mention
  of EP Software. (Minor: typos "full satck", "projeto e coisas".)

## Implications

- **Do not re-teach:** deploy, git basics, HTML/CSS/JS fundamentals, "how the
  web works". Every lesson adds **professional depth** (SEO, performance,
  accessibility, testing, architecture) or **business skill** (positioning,
  offers, sales).
- Lesson 1 is **not** "first deploy" — it's a real improvement to a real asset
  with a durable takeaway.
- Build-track surface decision: (a) improve the existing Angular portfolio, or
  (b) **rebuild as the EP Software company site in Next.js/TS** (the company
  stack) — recommended as the build-track spine, so every lesson builds the
  real company stack on a real, shippable, mission-critical artifact.
