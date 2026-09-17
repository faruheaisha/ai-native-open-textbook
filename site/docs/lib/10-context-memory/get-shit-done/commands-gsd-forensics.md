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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/forensics.md"
sourceRel: "commands/gsd/forensics.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/forensics.md"
sourceSha256: "0fac0f384c7f2f9fe30c003c88315b84705c786c6329c7e67c1536e3b8ca7883"
pageSha256: "0fac0f384c7f2f9fe30c003c88315b84705c786c6329c7e67c1536e3b8ca7883"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Investigate what went wrong during a GSD workflow execution. Analyzes git history, `.planning/` artifacts, and file system state to detect anomalies and generate a structured diagnostic report.

Purpose: Diagnose failed or stuck workflows so the user can understand root cause and take corrective action.
Output: Forensic report saved to `.planning/forensics/`, presented inline, with optional issue creation.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/forensics.md
&lt;/execution_context>

&lt;context>
**Data sources:**
- `git log` (recent commits, patterns, time gaps)
- `git status` / `git diff` (uncommitted work, conflicts)
- `.planning/STATE.md` (current position, session history)
- `.planning/ROADMAP.md` (phase scope and progress)
- `.planning/phases/*/` (PLAN.md, SUMMARY.md, VERIFICATION.md, CONTEXT.md)
- `.planning/reports/SESSION_REPORT.md` (last session outcomes)

**User input:**
- Problem description: $ARGUMENTS (optional — will ask if not provided)
&lt;/context>

&lt;process>
Execute end-to-end.
&lt;/process>

&lt;success_criteria>
- Evidence gathered from all available data sources
- At least 4 anomaly types checked (stuck loop, missing artifacts, abandoned work, crash/interruption)
- Structured forensic report written to `.planning/forensics/report-\{timestamp\}.md`
- Report presented inline with findings, anomalies, and recommendations
- Interactive investigation offered for deeper analysis
- GitHub issue creation offered if actionable findings exist
&lt;/success_criteria>

&lt;critical_rules>
- **Read-only investigation:** Do not modify project source files during forensics. Only write the forensic report and update STATE.md session tracking.
- **Redact sensitive data:** Strip absolute paths, API keys, tokens from reports and issues.
- **Ground findings in evidence:** Every anomaly must cite specific commits, files, or state data.
- **No speculation without evidence:** If data is insufficient, say so — do not fabricate root causes.
&lt;/critical_rules>
