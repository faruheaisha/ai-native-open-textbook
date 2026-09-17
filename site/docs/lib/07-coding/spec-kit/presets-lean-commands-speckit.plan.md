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
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/lean/commands/speckit.plan.md"
sourceRel: "presets/lean/commands/speckit.plan.md"
rawUrl: "/raw/07-coding/spec-kit/presets/lean/commands/speckit.plan.md"
sourceSha256: "d4dbd594dc8ea9853583353cfc556ac419ffedf2300c207d4ce75c24debe2ab9"
pageSha256: "d4dbd594dc8ea9853583353cfc556ac419ffedf2300c207d4ce75c24debe2ab9"
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

2. **Load context**: `.specify/memory/constitution.md` and `<feature_directory>/spec.md`.

3. Create an implementation plan and store it in `<feature_directory>/plan.md`.
   - Technical context: tech stack, dependencies, project structure
   - Design decisions, architecture, file structure
