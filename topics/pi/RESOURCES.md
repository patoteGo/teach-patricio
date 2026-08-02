# Pi Coding Harness — Resources

> Curated, high-trust sources. Knowledge is drawn from these, not parametric guesses. All lesson claims should cite back here.

## Knowledge (primary docs)

- [Pi Documentation — pi.dev/docs/latest](https://pi.dev/docs/latest)
  Canonical, always-current docs. Use for: everything. Mirrors the locally installed `docs/*.md`.
- [Pi GitHub — earendil-works/pi](https://github.com/earendil-works/pi)
  Source monorepo. The coding agent lives in `packages/coding-agent`. Use for: reading actual behavior, issues, changelogs.
- [npm: @earendil-works/pi-coding-agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
  Install/source page, README is the same as the repo's. Use for: install, version pinning.
- Local install docs: `/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/docs/*.md`
  Exact version (v0.83.0) installed on this machine. Use for: offline, version-accurate reference. Key files:
  - `quickstart.md`, `usage.md`, `sessions.md`, `keybindings.md`, `settings.md`
  - `skills.md`, `extensions.md`, `prompt-templates.md`, `themes.md`, `packages.md`
  - `models.md`, `providers.md`, `custom-provider.md`, `compaction.md`, `sdk.md`, `rpc.md`, `security.md`
- [Agent Skills Specification — agentskills.io](https://agentskills.io/specification)
  The open standard Pi skills follow. Use for: writing portable skills usable across harnesses (Claude Code, Codex, etc.).

## Knowledge (philosophy & rationale — read these once, they reframe how you think about Pi)

- [Mario Zechner — "Pi Coding Agent" (design rationale)](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
  Why Pi has no MCP, no sub-agents, no plan mode, no permission popups, no background bash. Use for: understanding the "minimal core, extend don't fork" philosophy.
- [Mario Zechner — "What if you don't need MCP at all?"](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)
  The CLI+README argument against MCP. Use for: deciding build-a-CLI vs build-an-extension.

## Wisdom (communities)

- [Pi Discord](https://discord.com/invite/3cU7Bz4UPx)
  Official community, package-sharing channel. Use for: real-time troubleshooting, finding packages, workflow critique.
- Skill repositories to mine for patterns:
  - [anthropics/skills](https://github.com/anthropics/skills) — document processing, web dev skills.
  - [badlogic/pi-skills](https://github.com/badlogic/pi-skills) — web search, browser automation, Google APIs, transcription.

## Gaps

- No curated "power-user dotfiles" reference yet (a polished `~/.pi/agent/` setup). Target: build our own as we learn, then it becomes a reference doc here.
- No package evaluation checklist yet — needed before the "install a package" lesson (trust/security).
