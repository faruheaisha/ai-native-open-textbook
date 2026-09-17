---
title: "Mission - Capstone: Ship a Reusable Agent Workbench Pack"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/42-agent-workbench-capstone/mission.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/42-agent-workbench-capstone/mission.md"
sourceSha256: "5c51b6606c2fa644eaa8b501301617eeb62ded240a19bdfe4bcacacc91e47989"
pageSha256: "5c51b6606c2fa644eaa8b501301617eeb62ded240a19bdfe4bcacacc91e47989"
contentMode: "local-full"
zh: ""
---

# Mission - Capstone: Ship a Reusable Agent Workbench Pack

## Goal
Assemble the eleven prior lessons into a versioned `outputs/agent-workbench-pack/` directory with an installer that lays it idempotently into any target repo.

## Inputs
- Schemas, scripts, and docs from lessons 32 through 40
- The pack layout: `AGENTS.md`, `docs/`, `schemas/`, `scripts/`, `bin/`, `README.md`, `VERSION`

## Deliverables
- `outputs/agent-workbench-pack/` with the full layout populated
- `bin/install.sh` (or `bin/install.py`) that refuses to overwrite without `--force`
- `VERSION` file plus a `README.md` describing what stays in and what stays out

## Acceptance
- `python3 code/main.py` exits zero and prints the pack tree
- Re-running the assembler is idempotent
- `bin/install.sh` into a fresh target leaves a working workbench: state, board, rules, scope, init, runner, gate, reviewer, handoff all in place

## Out of scope
- Per-project task content. Tasks belong on the target repo's board, not in the pack.
- Vendor SDK calls. The pack is framework-agnostic by design.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-workbench-pack.md` - extracted skill
