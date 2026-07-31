# Mission: Master the Pi Coding Harness as a Power Tool

## Why

The user is an experienced developer who has adopted **Pi** (`@earendil-works/pi-coding-agent`, a minimal terminal coding harness) and wants to wield it as a power tool rather than a chat box. The concrete outcome: spend less time on mechanical coding work, bend Pi to fit their personal workflow (skills, extensions, packages), and stop fighting the tool. When this skill lands, Pi stops being "another AI chat" and becomes a programmable lever on their daily work.

## Success looks like

- Can explain Pi's core loop (model + 4 tools) and *predict* what it will do on a given prompt.
- Drives the interactive TUI fluently: branches sessions via `/tree`, compacts long contexts, steers mid-turn.
- Has written at least one **skill** and one **extension** that customize Pi to their own workflow.
- Has installed or evaluated a **pi package** and understands the trust/security model.
- Curates project context (`AGENTS.md`, `.pi/settings.json`) to make Pi behave consistently across a codebase.
- Keeps all learning in this folder as a portable, git-versioned knowledge base they can move anywhere.

## Constraints

- Learner is an experienced developer — skip "what is a terminal/LLM", go straight to Pi-specific mechanics and power features. No hand-holding on basics.
- All learning artifacts live in **this folder** and must be portable (git repo the user can clone elsewhere). Prefer self-contained, self-citing HTML lessons.
- **Every HTML lesson must be as graphical as possible** — diagrams, visual hierarchy, color, SVG — not walls of text. (Explicit user preference.)
- Ponytail sensibility: teach the lazy/power path, not the over-engineered one.

## Out of scope (for now)

- Building Pi from source / contributing to the Pi core (`docs/development.md`).
- Deep SDK / RPC / embedding Pi into other apps — revisit once interactive mastery is solid.
- llama.cpp local-model setup — a separate rabbit hole; surface only as an option.
- Provider-by-provider account setup beyond the general `/login` flow.
