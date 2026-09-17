---
title: "Agent Workbench Pack"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
sourceSha256: "4eb05897b69bd7b44c40850eaf3d345ba02ef19b971fe5302a18752f3ecf66e7"
pageSha256: "4eb05897b69bd7b44c40850eaf3d345ba02ef19b971fe5302a18752f3ecf66e7"
contentMode: "local-full"
zh: ""
---

# Agent Workbench Pack

Drop-in workbench for any repo that wants reliable agent work.

## What you get

- `AGENTS.md` short router into the rest of the pack.
- `docs/` rules, reliability policy, handoff protocol, reviewer rubric.
- `schemas/` JSON Schemas for state, board, and scope contract.
- `scripts/` init, feedback runner, verification gate, handoff generator.
- `bin/install.sh` idempotent installer.

## Quickstart

```
bin/install.sh
$EDITOR task_board.json
python3 scripts/init_agent.py
```

## Versioning

The `VERSION` file is the contract. Major bumps require a state migration.
