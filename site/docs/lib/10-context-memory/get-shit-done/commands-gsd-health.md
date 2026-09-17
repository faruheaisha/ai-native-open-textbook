---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/health.md"
sourceRel: "commands/gsd/health.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/health.md"
sourceSha256: "45d1b3b2b6cc1d38016c979880c477287a06c0d1c194091ca2275c8e713b440b"
pageSha256: "45d1b3b2b6cc1d38016c979880c477287a06c0d1c194091ca2275c8e713b440b"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Validate `.planning/` directory integrity and report actionable issues. Checks for missing files, invalid configurations, inconsistent state, and orphaned plans.

`--context` runs an orthogonal check: the running session's context utilization. The workflow asks for the model's tokensUsed + contextWindow, calls `gsd-sdk query validate.context`, and renders one of three states:

| Utilization | State    | Action                                                |
|-------------|----------|-------------------------------------------------------|
| < 60%       | healthy  | no action — context is comfortable                    |
| 60% – 70%   | warning  | recommend `/gsd:thread` to start fresh                |
| ≥ 70%       | critical | reasoning quality may degrade past the fracture point |
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/health.md
&lt;/execution_context>

&lt;process>
Execute end-to-end.
Parse `--repair` and `--context` flags from arguments and pass to workflow.
&lt;/process>
