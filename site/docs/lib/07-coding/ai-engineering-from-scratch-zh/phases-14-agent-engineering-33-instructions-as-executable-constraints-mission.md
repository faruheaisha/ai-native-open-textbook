---
title: "Mission - Agent Instructions as Executable Constraints"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
sourceRel: "phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
sourceSha256: "469956ec6899ba903cdfd19a20d04c7e31c74a5e01315376152a0feeae26f14f"
pageSha256: "469956ec6899ba903cdfd19a20d04c7e31c74a5e01315376152a0feeae26f14f"
contentMode: "local-full"
zh: ""
---

# Mission - Agent Instructions as Executable Constraints

## Goal
Turn prose instructions into machine-checkable rules across five categories and emit a rule report a reviewer can score.

## Inputs
- `docs/agent-rules.md` with one rule per heading, each carrying slug, category, description, and a `check` field
- A demo agent run that intentionally violates two rules

## Deliverables
- Parser that loads `agent-rules.md` into a dataclass
- `rule_checker.py` style functions, one per `check` referenced
- `rule_report.json` with pass/fail per rule and an aggregate severity

## Acceptance
- `python3 code/main.py` exits zero
- Output prints the parsed rule set, the run trace, and pass/fail per rule
- `rule_report.json` catches the two intentional violations

## Out of scope
- Wiring the checker into CI. The lesson exits at a written report.
- Framework guardrails (OpenAI SDK, LangGraph interrupts). The rule set is the human-readable contract those implement.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-rule-set-builder.md` - extracted skill
