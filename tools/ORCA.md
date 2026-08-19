# Orca — Power User Guide

[Orca](https://www.onorca.dev/) is a free, open-source **Agent IDE (ADE)**: run Claude Code, Codex, OpenCode, Pi, and any other CLI agent side by side, each in its own isolated git worktree. MIT licensed, ships daily. Source: [stablyai/orca](https://github.com/stablyai/orca).

Docs: <https://www.onorca.dev/docs> · Discord: <https://discord.gg/fzjDKHxv8Q>

## Core model

- **Worktree** = one task. Real git worktree + own agent terminal + own browser tabs. Switching worktrees swaps the whole pane tree; layouts are saved per worktree.
- **Tabs** hold one thing each (terminal, editor, browser, diff, PR). Tabs group into panes; **splits nest** — terminal left, diff top-right, browser bottom-right.
- Anything that runs in a terminal runs in Orca. Bring your own subscriptions.

## Shortcuts (macOS)

| Action | Shortcut |
|---|---|
| Quick Open (files, current worktree) | `Cmd-P` |
| Jump Palette (worktrees, tabs, sessions) | `Cmd-J` |
| Jump to recent session row | `Cmd-1` … `Cmd-6` (in palette) |
| New terminal tab | `Cmd-T` |
| New agent tab (default agent) | `Cmd-Alt-T` |
| Split pane right / down | `Cmd-\` / `Cmd-Shift-\` |
| Next / prev tab (all types) | `Cmd-Shift-]` / `Cmd-Shift-[` |
| Next / prev tab (same type) | `Cmd-Alt-]` / `Cmd-Alt-[` |
| Previous recent tab | `Ctrl-Tab` |
| Close tab / all editor tabs | `Cmd-W` / `Cmd-Alt-W` |
| Find in terminal scrollback | `Cmd-F` |
| Floating terminal (global) | `Cmd-Alt-A` |

Remap under Settings → Shortcuts; overrides live in `~/.orca/keybindings.json`. Linux/Windows use `Ctrl`/`Alt` equivalents. Docs: [tabs-panes-splits](https://www.onorca.dev/docs/model/tabs-panes-splits), [terminal](https://www.onorca.dev/docs/terminal).

### Jump Palette details ([docs](https://www.onorca.dev/docs/model/quick-open))

- Empty query lists recent chats/terminals ranked by attention state (needs-you first, then done, then idle) — the fastest "what needs me" scan.
- Type `#123` to jump to a worktree by GitHub PR number.
- `Tab` in the palette filters by host/project. `Shift-Enter` opens a worktree in a new split. No match? It offers **Create worktree** with your text as the name.
- The tab-strip **+** omnibox searches open tabs, files, URLs, and agents in one field; prefix `?` to force a web search.

## Power-user moves

- **Parallel fan-out** — same prompt to N agents, each in a worktree; compare diffs, merge the winner ([worktrees](https://www.onorca.dev/docs/model/worktrees)).
- **Design Mode** — click any UI element in the embedded Chromium; its HTML, CSS, and cropped screenshot go straight into the agent prompt ([docs](https://www.onorca.dev/docs/browser/design-mode)).
- **Annotate AI diffs** — comment on any diff line, ship comments back to the agent ([docs](https://www.onorca.dev/docs/review/annotate-ai-diff)).
- **GitHub & Linear native** — browse PRs/issues/boards in-app, open a worktree from a task ([docs](https://www.onorca.dev/docs/review/linear)).
- **Drag files/images** straight into an agent prompt; editor is VS Code's Monaco with autosave.
- **Quick Commands** — save `pnpm test`-style commands or reusable agent prompts (Settings → Quick Commands), run from the tab bar or terminal context menu.
- **Right-click terminal → Copy Context** — bounded transcript to paste elsewhere.
- **Agent state dots** — sidebar: green = active, yellow = needs input. Hit yellow first. The **Restart** chip relaunches exited agents (great after laptop sleep).
- **Usage tracking & account switcher** — Claude/Codex usage and rate-limit resets, hot-swap accounts ([docs](https://www.onorca.dev/docs/agents/usage-tracking)).
- **Mobile companion** — live agent status, notifications, follow-ups from your phone ([docs](https://www.onorca.dev/docs/mobile)).
- **SSH worktrees** — run agents on a remote box with reconnect + port forwarding ([docs](https://www.onorca.dev/docs/ssh)).
- **Terminal niceties** — kitty keyboard protocol (real `Shift+Enter` reaches the agent), OSC 52 TUI clipboard on by default (tmux/Nvim/fzf copy works), Ghostty/Warp theme import, link-click action popover.
- **Hygiene** — delete merged worktrees aggressively (one click kills worktree + branch); a bloated list slows the Jump Palette. Recipe: [juggling 10 worktrees](https://www.onorca.dev/docs/recipes/jump-worktrees).

## CLI (agents drive Orca too)

Docs: [CLI overview](https://www.onorca.dev/docs/cli/overview)

```bash
orca skills get orca-cli   # full version-matched CLI guide — read this first
orca status --json         # is the app up?
orca worktree ps --json    # list worktrees
orca terminal list --json  # list terminals
```

On Linux outside Orca-managed terminals use `orca-ide` — bare `orca` there is the GNOME screen reader. Prefer `--json` for scripted calls.
