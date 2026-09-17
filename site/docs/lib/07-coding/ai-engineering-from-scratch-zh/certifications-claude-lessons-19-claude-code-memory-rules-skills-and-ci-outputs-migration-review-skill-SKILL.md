---
title: "Migration 审查"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
sourceRel: "certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
sourceSha256: "650debaf886bbfe5a660b923f9509ee5cf4e6c5ce54eac934dcd7f80b4c1f03c"
pageSha256: "650debaf886bbfe5a660b923f9509ee5cf4e6c5ce54eac934dcd7f80b4c1f03c"
contentMode: "local-full"
zh: ""
---

# Migration 审查

仅审查 `$ARGUMENTS` 指定的 migration 文件，以及验证其兼容性所需的代码。本 Skill 不授权应用 migration。

1. Run `python3 ${CLAUDE_SKILL_DIR\}/scripts/check_scope.py $ARGUMENTS`.
2. 若检查器拒绝任何 `migrations/` 外的路径，立即停止。
3. 阅读 [references/review-checklist.md](/lib/07-coding/ai-engineering-from-scratch-zh/certifications-claude-lessons-19-claude-code-memory-rules-skills-and-ci-outputs-migration-review-skill-references-review-checklist)。
4. 检查每个被接受文件及其 schema 假设。
5. 报告正向行为、回滚限制、锁风险、数据量风险、验证证据和未解决 blocker。

返回以下标题：`Scope`、`Evidence`、`Risks`、`Rollback`、`Blockers` 和 `Decision`。所需证据缺失时，必须使用 `Decision: blocked`。

随附检查器是 [scripts/check_scope.py](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/scripts/check_scope.py)。`allowed-tools` 条目只为调用回合预批准该命令，不移除其它 tool，也不替代项目权限 Rule。
