---
title: "Validate Feature Branch"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/git/commands/speckit.git.validate.md"
sourceRel: "extensions/git/commands/speckit.git.validate.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/git/commands/speckit.git.validate.md"
sourceSha256: "fa5fdbed9b3fa5ecc55091ee3043a6543f3bffcf4f454ee38aa6c488c9706174"
pageSha256: "fa5fdbed9b3fa5ecc55091ee3043a6543f3bffcf4f454ee38aa6c488c9706174"
contentMode: "local-full"
zh: ""
---

# Validate Feature Branch

Validate that the current Git branch follows the expected feature branch naming conventions.

## Prerequisites

- Check if Git is available by running `git rev-parse --is-inside-work-tree 2>/dev/null`
- If Git is not available, output a warning and skip validation:
  ```
  [specify] Warning: Git repository not detected; skipped branch validation
  ```

## Validation Rules

Get the current branch name:

```bash
git rev-parse --abbrev-ref HEAD
```

The branch name's final path segment must start with one of these feature markers:

1. **Sequential**: `[0-9]\{3,\}-` (e.g., `001-feature-name`, `042-fix-bug`, `1000-big-feature`, `jdoe/web/008-guided-tour`)
2. **Timestamp**: `[0-9]\{8\}-[0-9]\{6\}-` (e.g., `20260319-143022-feature-name`, `jdoe/web/20260319-143022-feature-name`)

## Execution

If on a feature branch (matches either pattern):
