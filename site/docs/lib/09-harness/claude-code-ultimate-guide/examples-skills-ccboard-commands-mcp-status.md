---
title: "MCP Status Command"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/commands/mcp-status.md"
sourceRel: "examples/skills/ccboard/commands/mcp-status.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/commands/mcp-status.md"
sourceSha256: "5e8d0f339fa7d8e2031b89383ca3251303445af6c32ecdb752c908e2af1aa3ce"
pageSha256: "5e8d0f339fa7d8e2031b89383ca3251303445af6c32ecdb752c908e2af1aa3ce"
contentMode: "local-full"
zh: ""
---

# MCP Status Command

Launch ccboard and jump directly to the MCP servers management tab.

## Features

- **Server List**: All configured MCP servers from `claude_desktop_config.json`
- **Status Detection**: Live status (● Running, ○ Stopped, ? Unknown)
- **Server Details**: Full command, arguments, environment variables
- **Quick Actions**:
  - `e` : Edit MCP configuration
  - `o` : Reveal config in finder
  - `r` : Refresh server status

## Usage

```bash
# Open MCP tab directly
/mcp-status

# Alternative: run with tab argument
ccboard --tab mcp
```

## MCP Tab Navigation

- `h/j/k/l` or `←/→/↑/↓` : Navigate
- `Enter` : Focus detail pane
- `e` : Edit `~/.claude/claude_desktop_config.json`
- `o` : Reveal config file
- `r` : Refresh server status

## Server Status

- **● Green** : Server process is running
- **○ Red** : Server process is stopped
- **? Gray** : Status unknown (Windows or detection failed)

## Requirements

ccboard must be installed. Run `/ccboard-install` if needed.

## Implementation

```bash
#!/bin/bash

# Check if ccboard is installed
if ! command -v ccboard &> /dev/null; then
    echo "❌ ccboard is not installed"
    echo "Run: /ccboard-install"
    exit 1
fi

# Launch ccboard with MCP tab (tab index 7, accessible with '8' key)
# For now, launch and user presses '8'
# TODO: Add --tab flag to ccboard CLI in future version
exec ccboard
```

**Note**: Currently launches ccboard in dashboard view. Press `8` to access MCP tab.
Future version will support `ccboard --tab mcp` for direct access.
