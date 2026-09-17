---
title: "Upgrade Strategy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-strategy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-strategy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-strategy.md"
sourceSha256: "0bc9907765b4ee188ad0a254d9f59a2caf90d689a56df2882ec2d75e672a8b94"
pageSha256: "0bc9907765b4ee188ad0a254d9f59a2caf90d689a56df2882ec2d75e672a8b94"
contentMode: "local-full"
zh: ""
---

# Upgrade Strategy

- **Incremental upgrades**: Stepwise dependency upgrades to avoid large jumps breaking builds.
- **Minimal changes**: Only upgrade dependencies essential for compatibility with the modern Azure SDKs.
- **Risk-first**: Handle EOL/challenging deps early in isolated steps.
- **Necessary/Meaningful steps only**: Each step MUST change code/config. NO steps for pure analysis/validation. Merge small related changes. **Test**: "Does this step modify project files?"
- **Automation tools**: Use automation tools like OpenRewrite for efficiency; always verify output. For BOM upgrades, run the [`scripts/upgrade_bom.py`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/scripts/upgrade_bom.py) script in the parent folder when Python 3.10+ is available; if Python is not available or the script fails, manually resolve the BOM version and follow the **Manual Fallback** sections in [bom-maven.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-maven) / [bom-gradle.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-bom-migration-bom-gradle) instead (see [Migration Guidelines](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-INSTRUCTION#maven-use-the-upgrade_bom-script)).
- **Successor preference**: Compatible successor > Adapter pattern > Code rewrite.
- **Build tool compatibility**: Check Maven/Gradle version compatibility with the project's JDK. Upgrade the build tool (including wrapper) if the current version does not support the JDK.
- **Temporary errors OK**: Steps may pass with known errors if resolved later or pre-existing.
