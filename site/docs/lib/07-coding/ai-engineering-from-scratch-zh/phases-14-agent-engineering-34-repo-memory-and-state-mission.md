---
title: "Mission - Repo Memory and Durable State"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
sourceRel: "phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
sourceSha256: "5ebe9d414509ae3360a2592cdae3f0847e0c2eea7718d048a72aad83e82bc52d"
pageSha256: "5ebe9d414509ae3360a2592cdae3f0847e0c2eea7718d048a72aad83e82bc52d"
contentMode: "local-full"
zh: ""
---

# Mission - Repo Memory and Durable State

## Goal
Author JSON Schemas for `agent_state.json` and `task_board.json`, build a `StateManager` that loads, validates, mutates, and writes atomically, and prove the round-trip across two turns.

## Inputs
- The three-file workbench shape from lesson 32
- A stdlib-only validator covering required, type, enum, pattern, and items

## Deliverables
- `agent_state.schema.json` and `task_board.schema.json` next to the code
- `StateManager.load`, `StateManager.update`, `StateManager.commit` with temp-and-rename writes
- A demo run that mutates state across two turns and reloads cleanly

## Acceptance
- `python3 code/main.py` exits zero
- A bad write (missing required field, bad enum) is refused, not persisted
- `workdir/agent_state.json` after the run validates against the schema

## Out of scope
- SQLite or external storage backends. The local file is the lesson.
- LangGraph checkpointers, Letta memory blocks. Same idea, different storage; out of scope here.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-state-schema.md` - extracted skill
