---
title: "Agent Workbench Pack"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/README.md"
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
