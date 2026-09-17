---
title: "WB-Bench Report Skills"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-report-skills/SKILL.md"
sourceRel: ".agents/skills/wbbench-report-skills/SKILL.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-report-skills/SKILL.md"
sourceSha256: "c629578456ca30f712d1de4941b0b0b4adc969bbb76d6c4e341de8206d0f3acb"
pageSha256: "c629578456ca30f712d1de4941b0b0b4adc969bbb76d6c4e341de8206d0f3acb"
contentMode: "local-full"
zh: ""
---

# WB-Bench Report Skills

This repository-local skill routes WB-Bench report generation to the matching
benchmark-specific workflow under `references/`:

- `references/wb-bench-office.md`: `WB-Bench-Office` office, data-file,
  document, and workdir task reports.
- `references/wb-bench-web.md`: `WB-Bench-Web` web, UI automation, visual,
  reporting, and test-generation task reports.
- `references/wb-bench-code.md`: `WB-Bench-Code` code task reports.

## Routing

When the user asks for a report for one of these benchmarks:

1. Identify the benchmark from the user request, Harbor `config.json`, archive
   name, run directory name, job directory name, or dataset id.
2. Read the matching reference workflow completely before doing analysis:
   - `references/wb-bench-office.md`
   - `references/wb-bench-web.md`
   - `references/wb-bench-code.md`
3. Use the public display name in report titles:
   - `WB-Bench-Office`
   - `WB-Bench-Web`
   - `WB-Bench-Code`
4. Use public dataset ids without version suffixes:
   - `wb-bench-office`
   - `wb-bench-web`
   - `wb-bench-code`
5. Keep Harbor input artifacts read-only and write outputs only to `REPORT_DIR`
   (see Shared Workflow; defaults to `<RUN_DIR>/report/`).

Fallback: if the benchmark cannot be identified, ask the user which of the three
report workflows to use.

If the user does not provide any path, ask them to provide a valid complete
single-run artifact directory `RUN_DIR`. Do not guess a default path or search
broad workspace or cluster directories.

## Input Shape

The user input is expected to be a single evaluation run artifact directory
`RUN_DIR`: one model, one dataset, one evaluation round.

A standard Harbor result tree has three nested levels; `RUN_DIR` is the middle
(run) level:

```
