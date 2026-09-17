---
title: "Test Bug Fix"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/bug/commands/speckit.bug.test.md"
sourceRel: "extensions/bug/commands/speckit.bug.test.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/bug/commands/speckit.bug.test.md"
sourceSha256: "ac2ab5542b0a9b098af75baad0b23b49e3763b8893eda8497bf234fb5a0df2ff"
pageSha256: "ac2ab5542b0a9b098af75baad0b23b49e3763b8893eda8497bf234fb5a0df2ff"
contentMode: "local-full"
zh: ""
---

# Test Bug Fix

Validate that the fix recorded by `__SPECKIT_COMMAND_BUG_FIX__` actually resolves the bug described by `__SPECKIT_COMMAND_BUG_ASSESS__`. The output is a verification report at `.specify/bugs/<slug>/test.md`.

## User Input

```text
$ARGUMENTS
```

The user input should identify the bug to validate. Accept any of:
