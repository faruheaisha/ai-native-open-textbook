---
title: "WB-Bench-Web Report Workflow"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-report-skills/references/wb-bench-web.md"
sourceRel: ".agents/skills/wbbench-report-skills/references/wb-bench-web.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-report-skills/references/wb-bench-web.md"
sourceSha256: "1381f2d1269e9a1642024858173d8ed279fb138d9998b402faf8eb375788f4ed"
pageSha256: "1381f2d1269e9a1642024858173d8ed279fb138d9998b402faf8eb375788f4ed"
contentMode: "local-full"
zh: ""
---

# WB-Bench-Web Report Workflow

Generate an analysis report from one `WB-Bench-Web` single Harbor run artifact
directory. Analyze only the evaluation results under the input path. Use
`WB-Bench-Web` as the display name, with no version suffix.

## Dataset Context

The public dataset id is `wb-bench-web`. If the user provides a WorkBuddy Bench
repository or dataset directory, read task metadata from a path shaped like
`/path/to/workbuddy-bench/datasets/wb-bench-web`. If no dataset source path is
provided, analyze only the `RUN_DIR` artifacts and do not assume a dataset source
path.

The current task set has 70 tasks:

- Categories: `page-interaction` 21 tasks, `data-visualization` 15 tasks,
  `visual-design` 9 tasks, `analytical-report` 7 tasks, `code-testing` 7 tasks,
  `page-implementation` 6 tasks, and `document-conversion` 5 tasks.
- Task modes: From Scratch 35 tasks, Bug Fix 8 tasks, Extend Existing 8 tasks,
  Review & Analysis 7 tasks, Test Generation 7 tasks, and Format Conversion
  5 tasks.
- Interaction complexity: no interaction, light interaction, single-flow state,
  multi-step workflows, persistence/offline behavior, and cross-state behavior.

Web tasks use the `CompositeVerifier` web profile. Evaluation artifacts may
include rule, VLM chat, and agent-judge evidence. Prefer structured `score.json`
and eval-report evidence. Use screenshots only as supporting evidence.

## Input

Required:

- `RUN_DIR`: a single Harbor run directory. Standard layout:
  `<RUN_DIR>/result.json`, `config.json`, `job.log`, and
