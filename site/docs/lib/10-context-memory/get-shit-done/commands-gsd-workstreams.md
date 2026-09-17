---
title: "/gsd:workstreams"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/workstreams.md"
sourceRel: "commands/gsd/workstreams.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/workstreams.md"
sourceSha256: "575d6cca6a631d8542aaaabde9cd21a9fe624539fdc7e4db838da8349d5519ca"
pageSha256: "575d6cca6a631d8542aaaabde9cd21a9fe624539fdc7e4db838da8349d5519ca"
contentMode: "local-full"
zh: ""
---

# /gsd:workstreams

Manage parallel workstreams for concurrent milestone work.

## Usage

`/gsd:workstreams [subcommand] [args]`

### Subcommands

| Command | Description |
|---------|-------------|
| `list` | List all workstreams with status |
| `create <name>` | Create a new workstream |
| `status <name>` | Detailed status for one workstream |
| `switch <name>` | Set active workstream |
| `progress` | Progress summary across all workstreams |
| `complete <name>` | Archive a completed workstream |
| `resume <name>` | Resume work in a workstream |

## Step 1: Parse Subcommand

Parse the user's input to determine which workstream operation to perform.
If no subcommand given, default to `list`.

## Step 2: Execute Operation

### list
Run: `gsd-sdk query workstream.list --raw --cwd "$CWD"`
Display the workstreams in a table format showing name, status, current phase, and progress.

### create
Run: `gsd-sdk query workstream.create <name> --raw --cwd "$CWD"`
After creation, display the new workstream path and suggest next steps:
- `/gsd:new-milestone --ws <name>` to set up the milestone

### status
Run: `gsd-sdk query workstream.status <name> --raw --cwd "$CWD"`
Display detailed phase breakdown and state information.

### switch
Run: `gsd-sdk query workstream.set <name> --raw --cwd "$CWD"`
Also set `GSD_WORKSTREAM` for the current session when the runtime supports it.
If the runtime exposes a session identifier, GSD also stores the active workstream
session-locally so concurrent sessions do not overwrite each other.

### progress
Run: `gsd-sdk query workstream.progress --raw --cwd "$CWD"`
Display a progress overview across all workstreams.

### complete
Run: `gsd-sdk query workstream.complete <name> --raw --cwd "$CWD"`
Archive the workstream to milestones/.

### resume
Set the workstream as active and suggest `/gsd:resume-work --ws <name>`.

## Step 3: Display Results

Format the JSON output from gsd-sdk query into a human-readable display.
Include the `$\{GSD_WS\}` flag in any routing suggestions.
