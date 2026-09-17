---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "e76fcf08216798b2471c8bfc8809558d99792a95bb3ad0b57601f2adeb84feb1"
contentMode: "local-full"
zh: ""
---

## TUI Mode (Fullscreen)

> **New in v2.1.110**

TUI (Text User Interface) mode renders Claude Code in fullscreen with flicker-free output — ideal for terminal multiplexers like tmux or iTerm2 split panes.

### Enabling TUI Mode

Toggle TUI mode with the `/tui` command or launch with the `--tui` flag:

```bash
/tui          # toggle from within a session
claude --tui  # start directly in TUI mode
```

### Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `autoScrollEnabled` | Auto-scroll to latest message | `true` |

Disable auto-scroll via `/config` or `settings.json`:

```json
{
  "autoScrollEnabled": false
}
```

### Focus View

The `/focus` command toggles focus view — a distraction-free display showing only the most relevant output. `Ctrl+O` now toggles between normal and verbose transcript only (focus view is `/focus`).
