---
title: "BOM Migration Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/bom-migration/bom-migration.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/bom-migration/bom-migration.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/bom-migration/bom-migration.md"
sourceSha256: "06b108626c44ebc5f6904a9ee89c6449219f1c202e1154c46c0c3d7e0554570c"
pageSha256: "06b108626c44ebc5f6904a9ee89c6449219f1c202e1154c46c0c3d7e0554570c"
contentMode: "local-full"
zh: ""
---

# BOM Migration Guide

How to add or upgrade `azure-sdk-bom` and clean up redundant versions across all supported build configurations.

## Prerequisite — Python availability check

The Maven and plain-Gradle flows are automated by `scripts/upgrade_bom.py` (Python 3.10+). The script resolves the latest BOM internally; do not pass or pin a literal BOM version. Before picking a guide, verify Python is available:

The following check works in both **bash** and **PowerShell 7+** (the `||` operator is supported in both):

```bash
python3 --version || python --version
```

For Windows PowerShell 5.1, use:

```powershell
python3 --version; if ($LASTEXITCODE -ne 0) { python --version }
```

- **Python available** → use the script as documented in [bom-maven.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-maven) / [bom-gradle.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-gradle). If `upgrade_bom.py` fails for any reason, do not stop the migration; manually resolve the BOM version and follow the same guide's **Manual Fallback** section.
- **Python NOT available** → follow the **Manual Fallback** section in the same guide. Do not attempt to install Python; perform the edits by hand.

The TOML and programmatic-catalog guides ([bom-gradle-toml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-gradle-toml), [bom-gradle-settings.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-gradle-settings)) are manual-only and unaffected by Python availability.

## Determine the latest BOM version

Resolve the target `azure-sdk-bom` version from the Azure SDK for Java source of truth before editing build files. This is mandatory: do not hardcode, guess, pin, or reuse an illustrative version from another example. Existing versions are accepted only when they exactly match the resolved latest stable version.
Always perform this resolution at the time the migration plan is generated. Never derive `TARGET_AZURE_SDK_BOM_VERSION` from the application being migrated, from a previously generated plan, from package-specific examples, or from model memory. If a resolved version differs from an existing `azure-sdk-bom` in the project, the existing BOM is stale and must be upgraded.

The following invocation works identically in **bash** and **PowerShell** (no shell-specific syntax):

```bash
# Path is relative to the skill directory (plugin/skills/azure-upgrade/)
python3 ./references/languages/java/scripts/upgrade_bom.py --get-latest-version
# or: python ./references/languages/java/scripts/upgrade_bom.py --get-latest-version
```

If Python is not available or the `--get-latest-version` command fails, fetch `https://raw.githubusercontent.com/Azure/azure-sdk-for-java/main/sdk/boms/azure-sdk-bom/pom.xml` directly and use the `<version>` value declared in that BOM `pom.xml`.
