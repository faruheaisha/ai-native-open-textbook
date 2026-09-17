---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/lean/commands/speckit.tasks.md"
sourceRel: "presets/lean/commands/speckit.tasks.md"
rawUrl: "/raw/07-coding/spec-kit/presets/lean/commands/speckit.tasks.md"
sourceSha256: "b363acd5cdbc3312b2fa03c763913515947feb214702281fe13355401ebd0210"
pageSha256: "b363acd5cdbc3312b2fa03c763913515947feb214702281fe13355401ebd0210"
contentMode: "local-full"
zh: ""
---

# Spec Kit（GitHub 官方规格驱动开发工具包）

## User Input

```text
$ARGUMENTS
```

## Outline

1. Read `.specify/feature.json` to get the feature directory path.

2. **Load context**: `.specify/memory/constitution.md` and `<feature_directory>/spec.md` and `<feature_directory>/plan.md`.

3. Create dependency-ordered implementation tasks and store them in `<feature_directory>/tasks.md`.
   - Every task uses checklist format: `- [ ] [TaskID] Description with file path`
   - Organized by phase: setup, foundational, user stories in priority order, polish
