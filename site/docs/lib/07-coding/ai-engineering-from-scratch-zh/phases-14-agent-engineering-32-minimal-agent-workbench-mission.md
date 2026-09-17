---
title: "Mission - The Minimal Agent Workbench"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/32-minimal-agent-workbench/mission.md"
sourceRel: "phases/14-agent-engineering/32-minimal-agent-workbench/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/32-minimal-agent-workbench/mission.md"
sourceSha256: "984a45e6944c07d30b89830e8fbc649019b857d4eccba24c3048b241e9bb21aa"
pageSha256: "984a45e6944c07d30b89830e8fbc649019b857d4eccba24c3048b241e9bb21aa"
contentMode: "local-full"
zh: ""
---

# Mission - The Minimal Agent Workbench

## Goal
Lay down the three-file minimum workbench (router, state, task board) into a fresh `workdir/` and prove a single agent turn can read state, pull a task, write to scope, and persist updated state.

## Inputs
- An empty `workdir/` directory next to the lesson code
- Knowledge of the three files: `AGENTS.md`, `agent_state.json`, `task_board.json`

## Deliverables
- `code/main.py` that creates the three files and runs one turn
- `workdir/AGENTS.md` short router pointing at state, board, and the verification command
- `workdir/agent_state.json` with active task id, touched files, next action
- `workdir/task_board.json` with a small backlog and statuses

## Acceptance
- `python3 code/main.py` exits zero on first and second run
- Second run picks up where the first left off, not from scratch
- Diff printed by the script shows the one file the turn touched

## Out of scope
- Scope contracts, verification gates, reviewer agents. Those layer on top in later lessons.
- Long monolithic `AGENTS.md`. The router stays short on purpose.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-minimal-workbench.md` - extracted skill
