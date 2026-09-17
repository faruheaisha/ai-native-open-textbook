---
title: "ccboard - Claude Code Dashboard Plugin"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/README.md"
sourceRel: "examples/skills/ccboard/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/README.md"
sourceSha256: "08720dbabd84767a5914a1ea84379a02dd09203a476c3308bf98c60d936cac21"
pageSha256: "08720dbabd84767a5914a1ea84379a02dd09203a476c3308bf98c60d936cac21"
contentMode: "local-full"
zh: ""
---

# ccboard - Claude Code Dashboard Plugin

> Comprehensive TUI/Web dashboard for monitoring and managing Claude Code

## Quick Start

### Installation

```bash
# Using Claude Code command
/ccboard-install

# Or manually via cargo
cargo install ccboard
```

### Launch Dashboard

```bash
# Launch TUI
/dashboard

# Or run directly
ccboard
```

## Commands

| Command | Description |
|---------|-------------|
| `/dashboard` | Launch interactive TUI dashboard |
| `/mcp-status` | Monitor MCP servers (press `8`) |
| `/costs` | View cost analytics (press `6`) |
| `/sessions` | Browse conversation history (press `2`) |
| `/ccboard-web` | Launch web interface |
| `/ccboard-install` | Install or update ccboard |

## Features

- **8 Interactive Tabs**: Dashboard, Sessions, Config, Hooks, Agents, Costs, History, MCP
- **Real-time Monitoring**: File watcher for live updates
- **MCP Management**: Server status and configuration
- **Cost Tracking**: Token usage and pricing analytics (e.g., $9,145 total)
- **Session Explorer**: Browse 1.2K+ conversations across 33+ projects
- **File Editing**: Press `e` to edit files in $EDITOR
- **Dual Interface**: Terminal (TUI) and Web UI from single binary

## Navigation

**Jump to Tab**:
- `1` Dashboard
- `2` Sessions
- `3` Config
- `4` Hooks
- `5` Agents
- `6` Costs
- `7` History
- `8` MCP

**Common Keys**:
- `Tab` / `Shift+Tab` : Navigate tabs
- `e` : Edit file in editor
- `o` : Reveal file in finder
- `q` : Quit
- `F5` : Refresh

## MCP Server Monitoring

The MCP tab (press `8`) provides:

- **Live Status**: ● Running, ○ Stopped, ? Unknown
- **Server Details**: Full command, args, environment variables
- **Quick Actions**:
  - `e` : Edit `claude_desktop_config.json`
  - `o` : Reveal config in finder
  - `r` : Refresh server status

## Cost Analytics

Track your Claude Code spending:

- Total tokens: 17.32M
- Total cost: $9,145.20
- Breakdown by model: Opus 4.5 (76%), Sonnet 4.5 (14%)
- Cache hit rate: 99.9%

## Session Explorer

Browse and search conversations:

- 1.2K+ sessions across 33+ projects
- Full-text search (press `/`)
- Metadata: timestamps, tokens, models
- Edit JSONL files directly

## Web Interface

```bash
# Launch web UI
/ccboard-web

# Or with custom port
ccboard web --port 8080

# Run both TUI and Web
ccboard both --port 3333
```

## Requirements

- **Rust 1.70+** and Cargo
- **Claude Code** installed (reads from `~/.claude/`)

## Architecture

Single Rust binary (2.4MB) with:
- **TUI**: Ratatui-based terminal interface
- **Web**: Axum + Leptos web interface
- **Core**: Shared data layer with file watcher

## Data Sources

ccboard reads from:
- `~/.claude/stats-cache.json` - Statistics
- `~/.claude/claude_desktop_config.json` - MCP config
- `~/.claude/projects/*/` - Session JSONL files
- `.claude/settings.json` - Configuration

**Read-only**: Non-invasive monitoring, safe to run with Claude Code.

## Performance

- Initial load: <2s for 1,000+ sessions
- Memory: ~50MB typical usage
- Lazy loading: Session content loaded on-demand

## Limitations

Current version (0.1.0):

- **Read-only**: No write operations
- **MCP status**: Unix only (macOS/Linux)
- **Web UI**: In development

## Troubleshooting

### ccboard not found
```bash
which ccboard          # Check if installed
/ccboard-install       # Install if needed
```

### No data visible
```bash
ls ~/.claude/          # Verify Claude Code directory
cat ~/.claude/stats-cache.json  # Check stats file
```

### MCP status "Unknown"
- Requires Unix (macOS/Linux)
- Windows shows "Unknown" by default
