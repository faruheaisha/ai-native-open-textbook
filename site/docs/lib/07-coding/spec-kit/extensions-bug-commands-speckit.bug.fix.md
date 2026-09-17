---
title: "Fix Bug"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/bug/commands/speckit.bug.fix.md"
sourceRel: "extensions/bug/commands/speckit.bug.fix.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/bug/commands/speckit.bug.fix.md"
sourceSha256: "df8b28b3687617fa883998d060e5402a2baabd34023bef3d1fbcde9e014c5bf6"
pageSha256: "df8b28b3687617fa883998d060e5402a2baabd34023bef3d1fbcde9e014c5bf6"
contentMode: "local-full"
zh: ""
---

# Fix Bug

Apply the remediation that was proposed by `__SPECKIT_COMMAND_BUG_ASSESS__` and record the changes in a fix report at `.specify/bugs/<slug>/fix.md`. This command is **only** valid after an assessment exists for the given slug.

## User Input

```text
$ARGUMENTS
```

The user input should identify the bug to fix. Accept any of:
