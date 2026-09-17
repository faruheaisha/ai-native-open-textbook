---
title: "Mission - The Workbench on a Real Repo"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
sourceRel: "phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
sourceSha256: "952cd99886e55222ccd1d783c9885b0273f364b9a2b36d1f2dd7f30951896128"
pageSha256: "952cd99886e55222ccd1d783c9885b0273f364b9a2b36d1f2dd7f30951896128"
contentMode: "local-full"
zh: ""
---

# Mission - The Workbench on a Real Repo

## Goal
Run the same `/signup` validation task through a prompt-only pipeline and a workbench-guided pipeline against the same sample app, then emit a before/after comparison report a skeptic can read.

## Inputs
- `sample_app/` with `app.py` (no validation), `test_app.py` (one happy-path test), `README.md`, `scripts/release.sh` as forbidden-zone bait
- Both pipelines fully scripted, no real LLM calls

## Deliverables
- `code/main.py` orchestrating both pipelines against the same fixture
- `before-after-report.md` with the five outcomes table
- `comparison.json` for downstream charting

## Acceptance
- `python3 code/main.py` exits zero
- The report measures all five outcomes: tests actually ran, acceptance met, files outside scope, handoff quality, reviewer total
- The workbench pipeline beats the prompt-only pipeline on at least four of the five

## Out of scope
- Plugging in a real LLM. The pipelines are scripted for reproducibility.
- Tuning the model. The comparison holds the model constant by construction.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-workbench-benchmark.md` - extracted skill
