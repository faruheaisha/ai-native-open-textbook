---
title: "Mission - Reviewer Agent: Separate Builder from Marker"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/39-reviewer-agent/mission.md"
sourceRel: "phases/14-agent-engineering/39-reviewer-agent/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/39-reviewer-agent/mission.md"
sourceSha256: "a17f2f69a3aac8989763f074d6d85987866ab76818f48141f596c8093400de74"
pageSha256: "a17f2f69a3aac8989763f074d6d85987866ab76818f48141f596c8093400de74"
contentMode: "local-full"
zh: ""
---

# Mission - Reviewer Agent: Separate Builder from Marker

## Goal
Build a reviewer loop that reads the builder's artifacts read-only and emits a `review_report.json` scored across five dimensions, totalling out of 10, with a verdict of pass, soft_fail, or hard_fail.

## Inputs
- `ReviewerInputs` bundling diff, state, feedback, and verification verdict from prior lessons
- Rubric dimensions: problem fit, scope discipline, assumptions, verification quality, handoff readiness

## Deliverables
- One scoring function per dimension (stub-grade for the lesson, deterministic)
- `review_report.json` writer with five scores, total, and verdict
- Two demo cases: a clean change and a "right tests, wrong problem" change

## Acceptance
- `python3 code/main.py` exits zero
- The clean change scores at least 7 with verdict `pass`
- The wrong-problem change drops below 5 on at least one dimension and verdict flips to `hard_fail`

## Out of scope
- Real LLM calls. The lesson stubs each dimension; the skill swaps in a model later.
- Editing the diff. The reviewer reads, scores, and reports. Patches are the builder's job next turn.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-reviewer-agent.md` - extracted skill
