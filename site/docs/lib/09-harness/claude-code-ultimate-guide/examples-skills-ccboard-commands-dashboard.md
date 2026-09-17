---
title: "Dashboard Command"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/commands/dashboard.md"
sourceRel: "examples/skills/ccboard/commands/dashboard.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/commands/dashboard.md"
sourceSha256: "42482b3fbc5a38c466e8bfa54345d24e50f84584976a653509cf32b43d519574"
pageSha256: "42482b3fbc5a38c466e8bfa54345d24e50f84584976a653509cf32b43d519574"
contentMode: "local-full"
zh: ""
---

# Dashboard Command

Launch the interactive ccboard TUI to visualize and monitor your Claude Code usage.

## Features

- **8 Interactive Tabs**: Dashboard, Sessions, Config, Hooks, Agents, Costs, History, MCP
- **Real-time Monitoring**: File watcher for live updates
- **MCP Management**: Server status and configuration
- **Cost Tracking**: Token usage and pricing analytics
- **Session Explorer**: Browse and search conversation history
- **File Editing**: Press `e` to edit files in $EDITOR

## Usage

```bash
# Launch TUI dashboard
/dashboard

# Alternative: run directly
ccboard
```

## Navigation

- `1-8` : Jump to specific tab
- `Tab` / `Shift+Tab` : Navigate tabs
- `q` : Quit
- `F5` : Refresh data
- `e` : Edit selected file
- `o` : Reveal file in finder

## Requirements

ccboard must be installed. If not installed, run:
```bash
/ccboard-install
```

## Implementation

```bash
#!/bin/bash

# Check if ccboard is installed
if ! command -v ccboard &> /dev/null; then
    echo "❌ ccboard is not installed"
    echo ""
    echo "Install with:"
    echo "  /ccboard-install"
    echo ""
    echo "Or manually:"
    echo "  cargo install ccboard"
    exit 1
fi

# Launch ccboard TUI
exec ccboard
```
