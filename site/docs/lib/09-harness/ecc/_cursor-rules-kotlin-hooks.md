---
title: "Kotlin Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/kotlin-hooks.md"
sourceRel: ".cursor/rules/kotlin-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/kotlin-hooks.md"
sourceSha256: "71633ed59bf66ceddfb3235187cf86ee56ef8571e7e62fc666ccaad54a9affd9"
pageSha256: "71633ed59bf66ceddfb3235187cf86ee56ef8571e7e62fc666ccaad54a9affd9"
contentMode: "local-full"
zh: ""
---

# Kotlin Hooks

> This file extends the common hooks rule with Kotlin-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **ktfmt/ktlint**: Auto-format `.kt` and `.kts` files after edit
- **detekt**: Run static analysis after editing Kotlin files
- **./gradlew build**: Verify compilation after changes
