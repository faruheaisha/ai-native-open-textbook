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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/inbox.md"
sourceRel: "commands/gsd/inbox.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/inbox.md"
sourceSha256: "50e337136d2f38196981263af12bbd1959e8aa8f3f9292feb1b5b41a8a55e992"
pageSha256: "50e337136d2f38196981263af12bbd1959e8aa8f3f9292feb1b5b41a8a55e992"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
One-command triage of the project's GitHub inbox. Fetches all open issues and PRs,
reviews each against the corresponding template requirements (feature, enhancement,
bug, chore, fix PR, enhancement PR, feature PR), reports completeness and compliance,
and optionally applies labels or closes non-compliant submissions.

**Flow:** Detect repo → Fetch open issues + PRs → Classify each by type → Review against template → Report findings → Optionally act (label, comment, close)
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/inbox.md
&lt;/execution_context>

&lt;context>
**Flags:**
- `--issues` — Review only issues (skip PRs)
- `--prs` — Review only PRs (skip issues)
- `--label` — Auto-apply recommended labels after review
- `--close-incomplete` — Close issues/PRs that fail template compliance (with comment explaining why)
- `--repo owner/repo` — Override auto-detected repository (defaults to current git remote)
&lt;/context>

&lt;process>
Execute end-to-end.
Parse flags from arguments and pass to workflow.
&lt;/process>
