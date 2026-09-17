---
title: "Mission - Agent Workbench: Why Capable Models Still Fail"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
sourceRel: "phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
sourceSha256: "4aa16a1adb02fc67bb42c0c7e38cf8dc4afb7c780ef144fba50b14e1dba74d02"
pageSha256: "4aa16a1adb02fc67bb42c0c7e38cf8dc4afb7c780ef144fba50b14e1dba74d02"
contentMode: "local-full"
zh: ""
---

# Mission - Agent Workbench: Why Capable Models Still Fail

## Goal
Run the same small repo task twice, once prompt-only and once with the seven workbench surfaces wired in, and emit a failure-mode report that maps each missed surface to the symptom it caused.

## Inputs
- A stub agent and a tiny FastAPI-style handler to validate
- The seven-surface list (instructions, state, scope, feedback, verification, review, handoff)

## Deliverables
- `code/main.py` that runs both pipelines back to back
- `failure_modes.json` summarizing the prompt-only run
- One-line verdict for the workbench run

## Acceptance
- `python3 code/main.py` exits zero
- Output shows a side-by-side log of the two runs
- `failure_modes.json` lists every missed surface with the matching symptom

## Out of scope
- Calling a real model. The stub is rule-based on purpose.
- Building any one surface in depth. That is what the next eleven lessons are for.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-workbench-audit.md` - extracted skill
