---
title: "Loop Status Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/loop-status.md"
sourceRel: "commands/loop-status.md"
rawUrl: "/raw/09-harness/ecc/commands/loop-status.md"
sourceSha256: "74ca3ff7a7249f5d0bc7f87cdec882ef1f682ebc6567653eac5bb7ebaeae8b2e"
pageSha256: "74ca3ff7a7249f5d0bc7f87cdec882ef1f682ebc6567653eac5bb7ebaeae8b2e"
contentMode: "local-full"
zh: ""
---

# Loop Status Command

Inspect active loop state, progress, and failure signals.

This slash command can only run after the current session dequeues it. If you
need to inspect a wedged or sibling session, run the packaged CLI from another
terminal:

```bash
npx --package ecc-universal ecc loop-status --json
```

The CLI scans local Claude transcript JSONL files under
`~/.claude/projects/**` and reports stale `ScheduleWakeup` calls or `Bash`
tool calls that have no matching `tool_result`.

## Usage

`/loop-status [--watch]`

## What to Report

- active loop pattern
- current phase and last successful checkpoint
- failing checks (if any)
- estimated time/cost drift
- recommended intervention (continue/pause/stop)

## Cross-Session CLI

- `ecc loop-status --json` emits machine-readable status for recent local
  Claude transcripts.
- `ecc loop-status --home <dir>` scans a different home directory when
  inspecting another local profile or mounted workspace.
- `ecc loop-status --transcript <session.jsonl>` inspects one transcript
  directly.
- `ecc loop-status --bash-timeout-seconds 1800` adjusts the stale Bash
  threshold.
- `ecc loop-status --exit-code` exits `2` when stale loop or tool signals are
  found, or `1` when transcripts cannot be scanned.
- `--exit-code` with `--watch` requires `--watch-count` so watchdog scripts do
  not wait forever for a process exit.
- `ecc loop-status --watch` refreshes status until interrupted.
- `ecc loop-status --watch --watch-count 3 --exit-code` refreshes a bounded
  number of times, then exits with the highest status seen.
- `ecc loop-status --watch --watch-count 3` emits a bounded watch stream for
  scripts and handoffs.
- `ecc loop-status --watch --write-dir ~/.claude/loops` maintains
  `index.json` and per-session JSON snapshots for sibling terminals or
  watchdog scripts.

## Watch Mode

When `--watch` is present, refresh status periodically. With `--json`, each
refresh is emitted as one JSON object per line so another terminal or script can
consume the stream.

## Snapshot Files

Use `--write-dir <dir>` when a separate process needs to inspect loop state
without waiting for the current Claude session to dequeue `/loop-status`. The
CLI writes:

- `index.json` with one row per inspected session.
