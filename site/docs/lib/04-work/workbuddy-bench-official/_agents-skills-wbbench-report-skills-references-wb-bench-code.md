---
title: "WB-Bench-Code Report Workflow"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-report-skills/references/wb-bench-code.md"
sourceRel: ".agents/skills/wbbench-report-skills/references/wb-bench-code.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-report-skills/references/wb-bench-code.md"
sourceSha256: "df3140c5dda23398a1fef0e971ba79441fdd71a6b5ed9853f2e086ce443171a1"
pageSha256: "df3140c5dda23398a1fef0e971ba79441fdd71a6b5ed9853f2e086ce443171a1"
contentMode: "local-full"
zh: ""
---

# WB-Bench-Code Report Workflow

Generate an analysis report from one `WB-Bench-Code` single Harbor run artifact
directory. Analyze only the evaluation results under the input path. Use
`WB-Bench-Code` as the display name, with no version suffix.

## Dataset Context

The public dataset id is `wb-bench-code`. If the user provides a WorkBuddy Bench
repository or dataset directory, read task metadata from a path shaped like
`/path/to/workbuddy-bench/datasets/wb-bench-code`. If no dataset source path is
provided, analyze only the `RUN_DIR` artifacts and do not assume a dataset source
path.

The current task set has 80 tasks:

- High-frequency categories: `bug-fix` 10 tasks and `feature` 10 tasks.
- Structured coding capability categories: `api-contract`, `schema-behavior`,
  `testing`, `refactor`, `performance`, `reliability`,
  `security-hardening`, and `repo-understanding`.
- Data and product categories: `data-quality`, `data-reporting`,
  `feature-pipeline`, `model-evaluation`, `product-analytics`, and
  `product-policy`.
- Migration and tool categories: `python-port` and `tool-behavior`.

Task artifacts include product code, test code, data/model reports,
configuration tools, and repository-understanding analysis. Scoring uses the
`CompositeVerifier` code profile. Core evidence comes from
hidden/unit/integration/script verifier output, patches, and `score.json`.

## Input

Required:

- `RUN_DIR`: a single Harbor run directory. Standard layout:
  `<RUN_DIR>/result.json`, `config.json`, `job.log`, and
