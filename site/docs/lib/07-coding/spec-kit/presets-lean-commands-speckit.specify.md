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
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/lean/commands/speckit.specify.md"
sourceRel: "presets/lean/commands/speckit.specify.md"
rawUrl: "/raw/07-coding/spec-kit/presets/lean/commands/speckit.specify.md"
sourceSha256: "9d68997ce418cc3293f66f946681bed0a33328c64a05757c0554ded19eec0ce2"
pageSha256: "9d68997ce418cc3293f66f946681bed0a33328c64a05757c0554ded19eec0ce2"
contentMode: "local-full"
zh: ""
---

# Spec Kit（GitHub 官方规格驱动开发工具包）

## User Input

```text
$ARGUMENTS
```

## Outline

1. **Ask the user** for the feature directory path (e.g., `specs/my-feature`). Do not proceed until provided.

2. Create the directory and write `.specify/feature.json`:
   ```json
   { "feature_directory": "<feature_directory>" }
   ```

3. Create a specification from the user input and store it in `<feature_directory>/spec.md`.
   - Overview, functional requirements, user scenarios, success criteria
   - Every requirement must be testable
   - Make informed defaults for unspecified details
