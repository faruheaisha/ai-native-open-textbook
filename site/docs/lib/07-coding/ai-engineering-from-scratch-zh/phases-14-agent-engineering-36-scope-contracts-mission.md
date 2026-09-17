---
title: "Mission - Scope Contracts and Task Boundaries"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/36-scope-contracts/mission.md"
sourceRel: "phases/14-agent-engineering/36-scope-contracts/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/36-scope-contracts/mission.md"
sourceSha256: "b6244c1ba92dd2b72c680376051921b1381d98a4a75e4ebe7625cbfc71f029d8"
pageSha256: "b6244c1ba92dd2b72c680376051921b1381d98a4a75e4ebe7625cbfc71f029d8"
contentMode: "local-full"
zh: ""
---

# Mission - Scope Contracts and Task Boundaries

## Goal
Write a per-task `scope_contract.json` and a glob-aware checker that compares the agent's diff against the contract and flags any forbidden or off-scope writes.

## Inputs
- A task description with allowed globs, forbidden globs, acceptance commands, rollback paragraph, approvals required
- Two demo runs: one that stays in scope, one that creeps

## Deliverables
- `scope_contract.json` schema validator (subset of JSON Schema, glob arrays)
- A diff parser that produces a `RunSummary` from touched files plus commands run
- `scope_check(contract, run) -> (violations, in_scope, off_scope)`
- `scope_report.json` saved next to the script

## Acceptance
- `python3 code/main.py` exits zero
- The in-scope run reports zero violations
- The creeping run reports the exact off-scope files and the reason for each

## Out of scope
- Time budgets, network egress allowlists. The lesson ships file globs; the exercise prompts extend it.
- Wiring into a runtime interrupt. The lesson exits at the report.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-scope-contract.md` - extracted skill
