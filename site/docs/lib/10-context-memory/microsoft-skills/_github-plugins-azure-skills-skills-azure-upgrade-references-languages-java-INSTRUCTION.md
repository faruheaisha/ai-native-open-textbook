---
title: "Azure SDK Migration Guidelines"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/INSTRUCTION.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/INSTRUCTION.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/INSTRUCTION.md"
sourceSha256: "5613629285530244a4b172988da800eaed5d91639e26d2dae09774ca5c7c05d2"
pageSha256: "5613629285530244a4b172988da800eaed5d91639e26d2dae09774ca5c7c05d2"
contentMode: "local-full"
zh: ""
---

# Azure SDK Migration Guidelines

## Context

The application is identified using legacy Azure SDKs for Java (`com.microsoft.azure.*`). These libraries reached end of support in 2023. They are not recommended for use in production, should be migrated to the latest Azure SDKs with the latest security patches and new capabilities support.

Follow these steps:

- **Inventory legacy dependencies**: Use tools such as `mvn dependency:tree` or `gradlew dependencies` to find every `com.microsoft.azure.*` SDK and map each one to its modern counterpart under `com.azure.*`. Do **not** rely solely on the root reactor — also grep the entire repository for legacy coordinates so you catch build files that aren't reachable from the root project. Run from the repo root:

  ```bash
  # Find every file referencing legacy groupIds/artifacts, including CI, samples, parent poms, buildSrc, version catalogs, Dockerfiles, and docs.
  grep -RIn --exclude-dir={.git,target,build,node_modules,out} \
    -E 'com\.microsoft\.azure(\.|:)|microsoft-azure-|azure-eventhubs-eph|azure-keyvault(:|["'\''])' .
  ```

  PowerShell equivalent (run from repo root):

  ```powershell
  Get-ChildItem -Path . -Recurse -File |
    Where-Object { $_.FullName -notmatch '(\\|/)(\.git|target|build|node_modules|out)(\\|/)' } |
    Select-String -Pattern 'com\.microsoft\.azure(\.|:)|microsoft-azure-|azure-eventhubs-eph|azure-keyvault(:|["''])'
  ```

  Commonly overlooked locations:`.ci/**/pom.xml`, `ci/**`, parent/BOM poms, `buildSrc/`, `gradle/libs.versions.toml`, `settings.gradle(.kts)`, `archetype-resources/`, sample sub-modules, Dockerfiles, shell/PowerShell scripts, and README snippets. Every hit must end up on the migration file list.

- **Adopt supported SDKs**: Replace the legacy dependencies with their modern equivalents in your `pom.xml` or `build.gradle`, following the migration guide to align feature parity and new SDK names.

- **Update application code**: Refactor your code to the builder-based APIs, updated authentication flows (Azure Identity), and modern async or reactive patterns required by the latest SDKs. Add concise comments explaining non-obvious changes.

- **Test thoroughly**: Run unit, integration, and end-to-end tests to validate that the modern SDKs behave as expected, focusing on authentication, retry, and serialization differences.

## Migration Guide

### Assumption

- Project is Maven or Gradle.
- Java code is on JDK 8 or above.

### Migrate dependencies (Add them to plan guidelines when generating plan)

Immediately load and read [BOM Migration Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-migration) before choosing `TARGET_AZURE_SDK_BOM_VERSION`; do not rely on this summary alone. The guide covers how to determine the latest BOM version, plus Maven, plain Gradle, TOML version catalogs (`libs.versions.toml`), and programmatic version catalogs (`settings.gradle`).
