---
title: "Phase 4: Summarize & Validate"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-4-summarize.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-4-summarize.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-4-summarize.md"
sourceSha256: "03abf5a9b896159423825bc9f83f9859723aed0ed86e1a0916b48c997b2d2f9d"
pageSha256: "03abf5a9b896159423825bc9f83f9859723aed0ed86e1a0916b48c997b2d2f9d"
contentMode: "local-full"
zh: ""
---

# Phase 4: Summarize & Validate

Load this file when executing Phase 4. Refer back to [`upgrade-success-criteria`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-success-criteria) and [`upgrade-strategy`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-strategy) for success criteria and strategy, and [`../rules/troubleshooting.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-troubleshooting) when failures occur.

1. Create `.github/java-upgrade/\{RUN_ID\}/summary.md` from the Summary Template — replace placeholders and follow HTML-comment instructions to populate final results.
2. Apply the validation checklist from the Migration Guidelines:
   - Migrated project passes compilation
   - All tests pass — don't silently skip tests
   - No legacy SDK dependencies/references exist
   - If `azure-sdk-bom` is used, ensure no explicit version dependencies for Azure libraries in the BOM
   - For each migration guide recorded during migration, fetch and verify the migrated code follows the guide's recommendations. Fix any deviations.
3. Populate `summary.md` (Upgrade Result, Tech Stack Changes, Commits, Challenges, Limitations, Next Steps)
4. Clean up temp files; remove HTML comments from all `.md` files
5. Verify all goals met
