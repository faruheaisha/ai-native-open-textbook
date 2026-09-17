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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/32-minimal-agent-workbench/outputs/skill-minimal-workbench.md"
sourceRel: "phases/14-agent-engineering/32-minimal-agent-workbench/outputs/skill-minimal-workbench.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/32-minimal-agent-workbench/outputs/skill-minimal-workbench.md"
sourceSha256: "cebdb4125648e5fd55bbbc9d5d75f619fb1117f27859ab9a3bfe4c9f5929caff"
pageSha256: "cebdb4125648e5fd55bbbc9d5d75f619fb1117f27859ab9a3bfe4c9f5929caff"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a repo path and a short backlog, scaffold the minimum viable agent workbench.

Produce:

1. `AGENTS.md` no longer than 80 lines. It must route to: the state file, the task board, the deeper rules doc (even if empty), and the verification command. No prose tutorials in this file.
2. `agent_state.json` with these keys: `active_task_id`, `touched_files`, `assumptions`, `blockers`, `next_action`. All optional fields default to empty array or empty string, never `null` for arrays.
3. `task_board.json` as a JSON array of tasks. Each task has `id`, `goal`, `owner` (`builder` | `reviewer` | `human`), `acceptance` (list of strings), and `status` (`todo` | `in_progress` | `done` | `blocked`).
4. `docs/agent-rules.md` placeholder with a single H2 per surface so later lessons can fill it.

Hard rejects:

- `AGENTS.md` over 80 lines or under 10 lines. Too long and the agent skips it; too short and it carries no routing.
- A state file that references chat history instead of the repo. The repo is the system of record.
- A task board without `acceptance`. Tasks without acceptance criteria become "looks good" rubber stamps.
- Tasks whose `owner` is `agent` or `model`. Owners are roles, not entities.

Refusal rules:

- If the repo has no verification command, refuse to write `AGENTS.md` until one is supplied or stubbed. A router pointing at a missing gate is worse than no router.
- If the backlog has more than 12 open tasks, refuse and ask the user to split it. Boards over a screen drift into planning theater.
- If the project ships with secrets in tracked files, refuse to write the state file and surface the secret leak as a blocking finding first.

Output structure:

```
<repo>/
├── AGENTS.md
├── agent_state.json
├── task_board.json
└── docs/
    └── agent-rules.md
```

End with "what to read next" pointing to:

- Lesson 33 for turning the rules placeholder into executable constraints.
- Lesson 34 for the durable state schema.
- Lesson 36 for the scope contract per task.
