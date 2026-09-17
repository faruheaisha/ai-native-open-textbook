---
title: "Migration 审查清单"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
sourceRel: "certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
sourceSha256: "0ef26985025eac5b185cfa8c07e33dcfc026a96e4ac2f1f4c59b8758871a1af0"
pageSha256: "0ef26985025eac5b185cfa8c07e33dcfc026a96e4ac2f1f4c59b8758871a1af0"
contentMode: "local-full"
zh: ""
---

# Migration 审查清单

## Forward（正向）

- 确认 schema 和数据迁移。
- 检查与当前已 deploy 应用版本的兼容性。
- 估算锁、事务时长和受影响行数。

## Rollback（回滚）

- 说明回滚是否安全、有损或不可能。
- 将破坏性清理与兼容性迁移分开。
- 无法逆转时，明确恢复或补偿路径。

## Evidence（证据）

- 记录精确的验证命令和结果。
- 将每项风险关联到文件和陈述。
- 生产数据量或兼容性证据缺失时，将决定保持为 blocked。
