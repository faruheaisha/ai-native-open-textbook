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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/audit-fix.md"
sourceRel: "commands/gsd/audit-fix.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/audit-fix.md"
sourceSha256: "2dd4bf52ab77147f97f7f56403de3ddfb707e1e137a0c248375b0aaa0727e56d"
pageSha256: "2dd4bf52ab77147f97f7f56403de3ddfb707e1e137a0c248375b0aaa0727e56d"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Run an audit, classify findings as auto-fixable vs manual-only, then autonomously fix
auto-fixable issues with test verification and atomic commits.

Flags:
- `--max N` — maximum findings to fix (default: 5)
- `--severity high|medium|all` — minimum severity to process (default: medium)
- `--dry-run` — classify findings without fixing (shows classification table)
- `--source <audit>` — which audit to run (default: audit-uat)
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/audit-fix.md
&lt;/execution_context>

&lt;process>
Execute end-to-end.
&lt;/process>
