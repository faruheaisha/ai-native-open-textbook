---
title: "Mission - The Workbench on a Real Repo"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
sourceRel: "phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/41-workbench-for-real-repos/mission.md"
sourceSha256: "3533a857029feba9102586302c17335cad7e1b0a2a7aca27d9ac0d8f099e5997"
pageSha256: "3533a857029feba9102586302c17335cad7e1b0a2a7aca27d9ac0d8f099e5997"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-workbench-benchmark.md` - extracted skill
