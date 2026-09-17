---
title: "Mission - Reviewer Agent: Separate Builder from Marker"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/39-reviewer-agent/mission.md"
sourceRel: "phases/14-agent-engineering/39-reviewer-agent/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/39-reviewer-agent/mission.md"
sourceSha256: "c5a030b454173484bbe15438fb944184607e88f5f934410ab07a1c2af7aa10cf"
pageSha256: "c5a030b454173484bbe15438fb944184607e88f5f934410ab07a1c2af7aa10cf"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-reviewer-agent.md` - extracted skill
