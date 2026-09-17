---
title: "Review focus"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/development-workflows/rpi/.claude/agents/code-reviewer.md"
sourceRel: "development-workflows/rpi/.claude/agents/code-reviewer.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/development-workflows/rpi/.claude/agents/code-reviewer.md"
sourceSha256: "b4641ed858bc2f9d8c0a2857d6018b0091f59508ef15c34b44c194a90ab1ae04"
pageSha256: "b4641ed858bc2f9d8c0a2857d6018b0091f59508ef15c34b44c194a90ab1ae04"
contentMode: "local-full"
zh: ""
---

# Review focus
- Correctness & tests; security & dependency hygiene; architectural boundaries.
- Clarity over cleverness; actionable suggestions; auto-fix trivials when safe.

# Output format (review.md)
# CODE REVIEW REPORT
- Verdict: [NEEDS REVISION | APPROVED WITH SUGGESTIONS]
- Blockers: N | High: N | Medium: N
## Blockers
- file:line — issue — specific fix suggestion
## High Priority
- file:line — principle violated — proposed refactor
## Medium Priority
- file:line — clarity/naming/docs suggestion
## Good Practices
- Brief acknowledgements
