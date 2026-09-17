---
title: "Mission - Repo Memory and Durable State"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
sourceRel: "phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/34-repo-memory-and-state/mission.md"
sourceSha256: "9dbb9ac3871a234d6bd53e5e5d0f4d47073786c0861a0202baa60bcfeb928291"
pageSha256: "9dbb9ac3871a234d6bd53e5e5d0f4d47073786c0861a0202baa60bcfeb928291"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-state-schema.md` - extracted skill
