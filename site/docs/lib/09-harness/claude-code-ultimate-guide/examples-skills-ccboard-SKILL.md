---
title: "ccboard - Claude Code Dashboard"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/SKILL.md"
sourceRel: "examples/skills/ccboard/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/SKILL.md"
sourceSha256: "b2614b2a59a1fa1e8c89c1bfa9a19de78cbd78711c99f56306966c9b52d8246d"
pageSha256: "b2614b2a59a1fa1e8c89c1bfa9a19de78cbd78711c99f56306966c9b52d8246d"
contentMode: "local-full"
zh: ""
---

# ccboard - Claude Code Dashboard

Comprehensive TUI/Web dashboard for monitoring and managing your Claude Code usage.

## Overview

ccboard provides a unified interface to visualize and explore all your Claude Code data:

- **Sessions**: Browse all conversations across your projects
- **Statistics**: Real-time token usage, cache hit rates, activity trends
- **MCP Servers**: Monitor and manage Model Context Protocol servers
- **Costs**: Track spending with detailed token breakdown and pricing
- **Configuration**: View cascading settings (Global > Project > Local)
- **Hooks**: Explore pre/post execution hooks and automation
- **Agents**: Manage custom agents, commands, and skills
- **History**: Search across all messages with full-text search

## Installation

### Via Cargo (Recommended)

```bash
# Using Claude Code command
/ccboard-install

# Or manually
cargo install ccboard
```

### Requirements

- Rust 1.70+ and Cargo
- Claude Code installed (reads from `~/.claude/`)

## Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `/dashboard` | Launch TUI dashboard | `ccboard` |
| `/mcp-status` | Open MCP servers tab | Press `8` |
| `/costs` | Open costs analysis | Press `6` |
| `/sessions` | Browse sessions | Press `2` |
| `/ccboard-web` | Launch web UI | `ccboard web` |
| `/ccboard-install` | Install/update ccboard | - |

## Features

### 8 Interactive Tabs

#### 1. Dashboard (Press `1`)
- Token usage statistics
- Session count
- Messages sent
- Cache hit ratio
- MCP server count
- 7-day activity sparkline
- Top 5 models usage gauges

#### 2. Sessions (Press `2`)
- Dual-pane: Project tree + Session list
- Metadata: timestamps, duration, tokens, models
- Search: Filter by project, message, or model (press `/`)
- File operations: `e` to edit JSONL, `o` to reveal in finder

#### 3. Config (Press `3`)
- 4-column cascading view: Global | Project | Local | Merged
- Settings inheritance visualization
- MCP servers configuration
- Rules (CLAUDE.md) preview
- Permissions, hooks, environment variables
- Edit config with `e` key

#### 4. Hooks (Press `4`)
- Event-based hook browsing (PreToolUse, UserPromptSubmit)
- Hook bash script preview
- Match patterns and conditions
- File path tracking for easy editing

#### 5. Agents (Press `5`)
- 3 sub-tabs: Agents (12) | / Commands (5) | ★ Skills (0)
- Frontmatter metadata extraction
- File preview and editing
- Recursive directory scanning

#### 6. Costs (Press `6`)
- 3 views: Overview | By Model | Daily Trend
- Token breakdown: input, output, cache read/write
- Pricing: total estimated costs
- Model distribution breakdown

#### 7. History (Press `7`)
- Full-text search across all sessions
- Activity by hour histogram (24h)
- 7-day sparkline
- All messages searchable

#### 8. MCP (Press `8`) **NEW**
- Dual-pane: Server list (35%) | Details (65%)
- Live status detection: ● Running, ○ Stopped, ? Unknown
- Full server details: command, args, environment vars
- Quick actions: `e` edit config, `o` reveal file, `r` refresh status

### Navigation

**Global Keys**:
- `1-8` : Jump to tab
- `Tab` / `Shift+Tab` : Navigate tabs
- `q` : Quit
- `F5` : Refresh data

**Vim-style**:
- `h/j/k/l` : Navigate (left/down/up/right)
- `←/→/↑/↓` : Arrow alternatives

**Common Actions**:
- `Enter` : View details / Focus pane
- `e` : Edit file in $EDITOR
- `o` : Reveal file in finder
- `/` : Search (in Sessions/History tabs)
- `Esc` : Close popup / Cancel

### Real-time Monitoring

ccboard includes a file watcher that monitors `~/.claude/` for changes:

- **Stats updates**: Live refresh when `stats-cache.json` changes
- **Session updates**: New sessions appear automatically
- **Config updates**: Settings changes reflected in UI
- **500ms debounce**: Prevents excessive updates

### File Editing

Press `e` on any item to open in your preferred editor:

- Uses `$VISUAL` > `$EDITOR` > platform default (nano/notepad)
- Supports: Sessions (JSONL), Config (JSON), Hooks (Shell), Agents (Markdown)
- Terminal state preserved (alternate screen mode)
- Cross-platform (macOS, Linux, Windows)

### MCP Server Management

The MCP tab provides comprehensive server monitoring:

**Status Detection** (Unix):
- Checks running processes via `ps aux`
- Extracts package name from command
- Displays PID when running
- Windows shows "Unknown" status

**Server Details**:
- Full command and arguments
- Environment variables with values
- Config file path (`~/.claude/claude_desktop_config.json`)
- Quick edit/reveal actions

**Navigation**:
- `h/l` or `←/→` : Switch between list and details
- `j/k` or `↑/↓` : Select server
- `Enter` : Focus detail pane
- `e` : Edit MCP config
- `o` : Reveal config in finder
- `r` : Refresh server status

## Usage Examples

### Daily Monitoring

```bash
# Launch dashboard
/dashboard

# Check activity and costs
# Press '1' for overview
# Press '6' for costs breakdown
# Press '7' for recent history
```

### MCP Troubleshooting

```bash
# Open MCP tab
/mcp-status

# Or: ccboard then press '8'

# Check server status (● green = running)
# Press 'e' to edit config if needed
# Press 'r' to refresh status after changes
```

### Session Analysis

```bash
# Browse sessions
/sessions

# Press '/' to search
# Filter by project: /my-project
# Filter by model: /opus
# Press 'e' on session to view full JSONL
```

### Cost Tracking

```bash
# View costs
/costs

# Press '1' for overview
# Press '2' for breakdown by model
# Press '3' for daily trend

# Identify expensive sessions
# Track cache efficiency (99.9% hit rate)
```

## Web Interface

Launch browser-based interface for remote monitoring:

```bash
# Launch web UI
/ccboard-web

# Or with custom port
ccboard web --port 8080

# Access at http://localhost:3333
```

**Features**:
- Same data as TUI (shared backend)
- Server-Sent Events (SSE) for live updates
- Responsive design (desktop/tablet/mobile)
- Concurrent multi-user access

**Run both simultaneously**:
```bash
ccboard both --port 3333
```

## Architecture

ccboard is a single Rust binary with dual frontends:

```
ccboard/
├── ccboard-core/      # Parsers, models, data store, watcher
├── ccboard-tui/       # Ratatui frontend (8 tabs)
└── ccboard-web/       # Axum + Leptos frontend
```

**Data Sources**:
- `~/.claude/stats-cache.json` - Statistics
- `~/.claude/claude_desktop_config.json` - MCP config
- `~/.claude/projects/*/` - Session JSONL files
- `~/.claude/settings.json` - Global settings
- `.claude/settings.json` - Project settings
- `.claude/settings.local.json` - Local overrides
- `.claude/CLAUDE.md` - Rules and behavior

## Troubleshooting

### ccboard not found

```bash
# Check installation
which ccboard

# Install if needed
/ccboard-install
```

### No data visible

```bash
# Verify Claude Code is installed
ls ~/.claude/

# Check stats file exists
cat ~/.claude/stats-cache.json

# Run with specific project
ccboard --project ~/path/to/project
```

### MCP status shows "Unknown"

- Status detection requires Unix (macOS/Linux)
- Windows shows "Unknown" by default
