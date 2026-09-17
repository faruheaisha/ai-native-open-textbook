---
title: "Mission - Verification Gates"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/38-verification-gates/mission.md"
sourceRel: "phases/14-agent-engineering/38-verification-gates/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/38-verification-gates/mission.md"
sourceSha256: "440f4c423325ede31b09e949c776d1c7f417777b2c15f572aa4c566f800a7969"
pageSha256: "440f4c423325ede31b09e949c776d1c7f417777b2c15f572aa4c566f800a7969"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-verification-gate.md` - extracted skill
