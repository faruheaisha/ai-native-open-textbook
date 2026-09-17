---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/34-repo-memory-and-state/outputs/skill-state-schema.md"
sourceRel: "phases/14-agent-engineering/34-repo-memory-and-state/outputs/skill-state-schema.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/34-repo-memory-and-state/outputs/skill-state-schema.md"
sourceSha256: "fde0eafdb116c3e5e3a9173929bd23cbd4f9f6f22272d98bb4fadecfc3b2641e"
pageSha256: "fde0eafdb116c3e5e3a9173929bd23cbd4f9f6f22272d98bb4fadecfc3b2641e"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a repo and the agent product running inside it, produce schema-first state files for the workbench.

Produce:

1. `schemas/agent_state.schema.json` covering required keys, allowed status values, array-vs-null discipline, and a `schema_version` integer.
2. `schemas/task_board.schema.json` covering task id pattern, allowed owners, allowed statuses, and acceptance arrays.
3. `tools/state_manager.py` exposing `load`, `commit`, and `update` with temp-and-rename atomic writes.
4. `tools/migrate_state.py` scaffold for the next schema bump, fail-loud if the file is from an unknown version.
5. `agent_state.json` and `task_board.json` seeded at `schema_version: 1` and a fresh backlog.

Hard rejects:

- A schema without a `schema_version` field. Migrations are not optional.
- Allowing `null` where an array is expected. `null` is a write-time bug masquerading as data.
- A writer that uses plain `open(path, "w")`. Atomic writes only; partial files corrupt the source of truth.
- Storing tokens, raw chat transcripts, or PII inside state. State is for repo-relevant facts.

Refusal rules:

- If the repo has no version control, refuse to ship state files. Atomic writes plus git diff is the durability story.
- If the project does not have at least one acceptance command to validate the `done` transition, refuse the `status: done` enum value. Adding `done` without an acceptance check is theater.
- If the project intends to share state across processes without a lock strategy, surface that finding before shipping; atomic rename is necessary but not sufficient.

Output structure:

```
<repo>/
├── agent_state.json
├── task_board.json
├── schemas/
│   ├── agent_state.schema.json
│   └── task_board.schema.json
└── tools/
    ├── state_manager.py
    └── migrate_state.py
```

End with "what to read next" pointing to:

- Lesson 35 for the initialization script that calls the manager on startup.
- Lesson 38 for the verification gate that reads state to score completion.
- Lesson 40 for the handoff generator that consumes the same schema.
