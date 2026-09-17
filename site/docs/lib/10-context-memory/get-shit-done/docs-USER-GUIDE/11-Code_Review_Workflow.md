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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "47ef515265ef6f99fe7931f82c3c7a1fbae364fafd664573b9a4f644470bd3cc"
contentMode: "local-full"
zh: ""
---

## Code Review Workflow

### Phase Code Review

After executing a phase, run a structured code review before UAT:

```bash
/gsd-code-review 3               # Review all changed files in phase 3
/gsd-code-review 3 --depth=deep  # Deep cross-file review (import graphs, call chains)
```

The reviewer scopes files automatically using SUMMARY.md (preferred) or git diff fallback. Findings are classified as Critical, Warning, or Info in `\{phase\}-REVIEW.md`.

```bash
/gsd-code-review 3 --fix           # Fix Critical + Warning findings atomically
/gsd-code-review 3 --fix --auto    # Fix and re-review until clean (max 3 iterations)
```

### Autonomous Audit-to-Fix

To run an audit and fix all auto-fixable issues in one pass:

```bash
/gsd-audit-fix                   # Audit + classify + fix (medium+ severity, max 5)
/gsd-audit-fix --dry-run         # Preview classification without fixing
```

### Code Review in the Full Phase Lifecycle

The review step slots in after execution and before UAT:

```
/gsd-execute-phase N   ->  /gsd-code-review N  ->  /gsd-code-review N --fix  ->  /gsd-verify-work N
```
