---
title: "Mission - Verification Gates"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/38-verification-gates/mission.md"
sourceRel: "phases/14-agent-engineering/38-verification-gates/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/38-verification-gates/mission.md"
sourceSha256: "1dd0bf9312da230f40d65baae08eaf1419dd8562e4bed8dc256633df73a941cd"
pageSha256: "1dd0bf9312da230f40d65baae08eaf1419dd8562e4bed8dc256633df73a941cd"
contentMode: "local-full"
zh: ""
---

# Mission - Verification Gates

## Goal
Implement `verify(task_id, artifacts)` as a pure deterministic function over scope report, rule report, feedback log, and diff, emitting one `verification_report.json` per task close-out.

## Inputs
- Stub loaders for `scope_report.json`, `rule_report.json`, `feedback_record.jsonl`, and the diff
- The check table: acceptance ran, acceptance exited zero, scope clean, no `null` exits, all block-severity rules pass

## Deliverables
- A pure `verify(task_id, artifacts) -> VerdictReport`
- A printer that shows per-check results and the final pass/fail
- Three demo scenarios written to disk: clean pass, scope creep, missing acceptance

## Acceptance
- `python3 code/main.py` exits zero
- The clean-pass scenario reports `passed: true`; the other two report `passed: false`
- Each scenario writes a separate `verification_report.json` under `outputs/verification/`

## Out of scope
- LLM-as-judge logic. The gate stays deterministic; qualitative judgment belongs to the reviewer in lesson 39.
- Signed override audit logs. The exercise prompts extend the gate that way.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-verification-gate.md` - extracted skill
