---
title: "Upgrade Success Criteria (ALL must be met)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-success-criteria.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-success-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/rules/upgrade-success-criteria.md"
sourceSha256: "02a8b277d212d7dbafdcabf5323011c70918c67a4e8b22490b361756cf6ddf44"
pageSha256: "02a8b277d212d7dbafdcabf5323011c70918c67a4e8b22490b361756cf6ddf44"
contentMode: "local-full"
zh: ""
---

# Upgrade Success Criteria (ALL must be met)

- **Goal**: All legacy Azure SDK dependencies (`com.microsoft.azure.*`) replaced with modern equivalents (`com.azure.*`).
- **Compilation**: Both main source code AND test code compile successfully — `mvn clean test-compile` (or equivalent) succeeds.
- **Test**: **100% test pass rate** — `mvn clean test` succeeds. Minimum acceptable: test pass rate ≥ baseline (pre-upgrade pass rate). Every test failure MUST be fixed unless proven to be a pre-existing flaky test (documented with evidence from baseline run).

If any criterion is not met, load [`./troubleshooting.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-troubleshooting) at that point — do NOT stop or defer.
