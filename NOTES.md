# Teaching Notes

## Learner profile

- Experienced developer. Skip generic "what is an LLM / terminal / git" framing entirely.
- Wants Pi as a **power tool**, not a chat assistant. Lead with mechanics, model, and customization — not "how to ask nicely".
- Fastest path to value = understanding the core loop + the extension/skill system.

## Stated preferences (respect these every lesson)

- **Graphical HTML.** Every lesson must be visually rich: diagrams, SVG, color, visual hierarchy. Avoid text walls. (User: "every time you create a html, make it as graphical as possible".)
- **Portable.** This whole folder is meant to become a git repo the user clones elsewhere. Keep artifacts self-contained and self-citing; no absolute local paths baked into lessons (cite web URLs + note local install path exists).
- Ponytail sensibility requested by harness config — teach the lazy/power path.

## Teaching approach decisions

- Sequence (proposed): (1) Core loop / mental model → (2) Interactive TUI mastery → (3) Sessions, branching, compaction → (4) Context files (AGENTS.md) → (5) Skills → (6) Extensions → (7) Packages & trust. Adjust based on what the user asks.
- Lessons are short, one tight win each, per the teach skill.
- Build reusable components into `assets/` only when a second lesson would duplicate them. Lesson 1 ships the shared stylesheet (`assets/style.css`).

## Session log

- Session 1: Established mission, populated RESOURCES.md, shipped Lesson 1 (the core loop). Created learning record 0001.
