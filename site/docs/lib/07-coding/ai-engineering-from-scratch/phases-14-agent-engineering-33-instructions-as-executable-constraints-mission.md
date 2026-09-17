---
title: "Mission - Agent Instructions as Executable Constraints"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
sourceRel: "phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/33-instructions-as-executable-constraints/mission.md"
sourceSha256: "9613972d26d6ac978b204fc552b422a82c4f497b7125864675cedf8161a5cb72"
pageSha256: "9613972d26d6ac978b204fc552b422a82c4f497b7125864675cedf8161a5cb72"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-rule-set-builder.md` - extracted skill
