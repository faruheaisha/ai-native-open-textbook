---
title: "Validate Feature Branch"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.validate.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.validate.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.specify/extensions/git/commands/speckit.git.validate.md"
sourceSha256: "d8f8e5ecc52e819749f355b6dd1ad8400e9b1dfe03882a12c0d2369530f1f083"
pageSha256: "d8f8e5ecc52e819749f355b6dd1ad8400e9b1dfe03882a12c0d2369530f1f083"
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

The branch name must match one of these patterns:

1. **Sequential**: `^[0-9]\{3,\}-` (e.g., `001-feature-name`, `042-fix-bug`, `1000-big-feature`)
2. **Timestamp**: `^[0-9]\{8\}-[0-9]\{6\}-` (e.g., `20260319-143022-feature-name`)

## Execution

If on a feature branch (matches either pattern):
