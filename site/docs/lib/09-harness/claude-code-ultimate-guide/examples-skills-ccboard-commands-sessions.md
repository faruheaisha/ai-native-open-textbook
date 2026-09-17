---
title: "Sessions Browser Command"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/commands/sessions.md"
sourceRel: "examples/skills/ccboard/commands/sessions.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/commands/sessions.md"
sourceSha256: "ae7071894dfd0ccfc29432f5fe9ccb3d9c23aab7faccc2448390cb880ea35105"
pageSha256: "ae7071894dfd0ccfc29432f5fe9ccb3d9c23aab7faccc2448390cb880ea35105"
contentMode: "local-full"
zh: ""
---

# Sessions Browser Command

Launch ccboard and jump directly to the sessions exploration tab.

## Features

- **Project Tree**: Navigate 33+ projects with nested structure
- **Session List**: 1.2K+ sessions with metadata
- **Search**: Filter sessions by project, message, or model (press `/`)
- **Session Details**:
  - Timestamps (start, end, duration)
  - Token usage breakdown
  - Models used
  - First message preview
- **File Operations**:
  - `e` : Open session JSONL in editor
  - `o` : Reveal session file in finder

## Usage

```bash
# Open sessions tab directly
/sessions

# Alternative: run with tab argument
ccboard --tab sessions
```

## Sessions Tab Navigation

- `←/→` : Switch between project tree and session list
- `↑/↓` : Navigate items
- `Enter` : View session details
- `/` : Open search input
- `e` : Edit selected session JSONL file
- `o` : Reveal session file

## Session Metadata

Each session shows:
- **ID**: Unique session identifier
- **Started**: First message timestamp
- **Duration**: Total conversation time
- **Messages**: Message count
- **Tokens**: Total tokens used
- **Models**: AI models used (e.g., opus-4.5, sonnet-4.5)
- **Preview**: First user message (200 chars)

## Search Examples

```
# Search by project name
/my-project

# Search by model
/opus

# Search by message content
/implement feature
```

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

# Launch ccboard with Sessions tab (tab index 1, accessible with '2' key)
# For now, launch and user presses '2'
exec ccboard
```

**Note**: Currently launches ccboard in dashboard view. Press `2` to access Sessions tab.
Future version will support `ccboard --tab sessions` for direct access.
