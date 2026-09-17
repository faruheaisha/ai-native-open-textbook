---
title: "Execution Guidelines"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/execution-guidelines.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/execution-guidelines.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/execution-guidelines.md"
sourceSha256: "ceb335536b6c00e7b3c73073fbaceb0a89f7e4016b6e13551ce67676c6125196"
pageSha256: "ceb335536b6c00e7b3c73073fbaceb0a89f7e4016b6e13551ce67676c6125196"
contentMode: "local-full"
zh: ""
---

# Execution Guidelines

- **Wrapper preference**: Use Maven Wrapper (`mvnw`/`mvnw.cmd`) or Gradle Wrapper (`gradlew`/`gradlew.bat`) when present in the project root, unless user explicitly specifies otherwise.
- **Template compliance**: Follow the HTML-comment instructions in the template reference files when creating and populating `.github/java-upgrade/\{RUN_ID\}/plan.md`, `progress.md`, `summary.md`. You may remove the HTML comments after populating each section.
- **Output directory**: All plan/progress/summary files are created under `.github/java-upgrade/\{RUN_ID\}/` in the project being migrated. Create this directory at the start of the run.
- **Uninterrupted run**: Complete each phase fully without pausing for user input.
- **Git**: If git is available, create a new branch `java-upgrade/\{RUN_ID\}` before starting the migration. Commit changes per step on this branch. If git is not available, log a warning and proceed — files remain uncommitted in the working directory. Use `N/A` for `<current_branch>` and `<current_commit_id>` placeholders.
