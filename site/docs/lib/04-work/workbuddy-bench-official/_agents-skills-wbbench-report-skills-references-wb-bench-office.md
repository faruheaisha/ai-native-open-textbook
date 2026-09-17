---
title: "WorkBuddyBench-Office Report Workflow"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-report-skills/references/wb-bench-office.md"
sourceRel: ".agents/skills/wbbench-report-skills/references/wb-bench-office.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-report-skills/references/wb-bench-office.md"
sourceSha256: "3d09490b4f8599ae4e3c68795a193a968c46662fa405771963c00849bc48dcf3"
pageSha256: "3d09490b4f8599ae4e3c68795a193a968c46662fa405771963c00849bc48dcf3"
contentMode: "local-full"
zh: ""
---

# WorkBuddyBench-Office Report Workflow

Generate an analysis report from one `WorkBuddyBench-Office` single-run
evaluation artifact directory. Analyze only the evaluation results under the
input path. Use `WorkBuddyBench-Office` as the display name, with no version
suffix.

## Dataset Context

The canonical runtime dataset id is `wb-bench-office-v1.0`. If the user provides
a WorkBuddy Bench repository or dataset directory, read task metadata from a
path shaped like
`/path/to/workbuddy-bench/datasets/wb-bench-office-v1.0`. If no dataset source
path is provided, analyze only the `RUN_DIR` artifacts and do not assume a
dataset source path.

The current task set has 50 tasks:

- `data-file-ops`: 24 tasks covering spreadsheets, JSON, multi-file data
  processing, reconciliation, extraction, aggregation, and rule validation.
- `doc-ops`: 17 tasks covering documents, reports, slides, timelines, briefing
  packs, and explanatory deliverables.
- `automation-workdir`: 9 tasks covering workspace automation, state recovery,
  notification/synchronization flows, and tool/mock-app coordination.

The publish difficulty field is `metadata.difficulty`, with 13 `easy`, 24
`medium`, and 13 `hard` tasks. Do not derive publish difficulty from historical
L-level labels embedded in task names or other provenance fields.

Office tasks declare a dataset CompositeVerifier contract in `dataset.toml` and
provide the dataset-specific implementation in `shared/verifier/plugin.py`.
Deterministic Rule grading evaluates submitted artifacts directly. When a
verifier-side LLM route is configured, task-specific rubrics evaluate textual
and structured evidence extracted from those artifacts, and the
CompositeVerifier applies each task's configured Rule/Judge score merge. A run
without that route reports the Rule component only.

## Input

Required:

- `RUN_DIR`: a single Harbor run artifact directory. Same standard layout as the
  other benchmarks: `<RUN_DIR>/result.json`, `config.json`, `job.log`, and
