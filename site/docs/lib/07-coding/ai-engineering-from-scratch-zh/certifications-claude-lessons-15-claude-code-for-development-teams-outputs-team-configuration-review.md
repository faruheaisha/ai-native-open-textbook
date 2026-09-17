---
title: "团队配置审查：Support Router"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/15-claude-code-for-development-teams/outputs/team-configuration-review.md"
sourceRel: "certifications/claude/lessons/15-claude-code-for-development-teams/outputs/team-configuration-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/lessons/15-claude-code-for-development-teams/outputs/team-configuration-review.md"
sourceSha256: "36763f193d7c8ff494760bec5188a5491bfe42c10d2103c5f039eb6925c6f457"
pageSha256: "36763f193d7c8ff494760bec5188a5491bfe42c10d2103c5f039eb6925c6f457"
contentMode: "local-full"
zh: ""
---

# 团队配置审查：Support Router

状态：已准备好接受团队审查

## Scope（范围）

Owner：developer-platform。被审查的 job 会根据 pull request diff 提出 patch，但不能 merge、deploy、发布 comment，也不能读取无关仓库。

## Capability Inventory（能力清单）

Read 仅限隔离 checkout，Edit 仅限 patch workspace。job 可以运行 `python3 -m unittest`；环境不提供网络和生产凭证。merge 及任何外部通信都由人负责。

## Permission Modes（权限模式）

交互式工作从 `default` 开始。`acceptEdits` 可以预先批准文件编辑，但不授权 push、deploy、网络调用或外部消息。headless review 使用 `dontAsk` 和范围明确的 allow rule；deny rule 则会在每种普通 mode 下阻止访问凭证和发布操作。此 job 不允许使用 `bypassPermissions`。

## Context Recovery（上下文恢复）

operator 使用 `/context` 检查上下文占用，并通过指定明确 focus 的 `/compact` 继续同一任务。`/clear` 使用空对话上下文启动无关工作。`/rewind` 可以恢复受追踪的编辑或对话，但 Git 与权威外部状态才是恢复记录。

## Autonomous Boundary（自主边界）

只有同时具备可测量验收条件、evaluator 可见的轮数预算和外部强制的 turn bound 时，才允许使用 `/goal`。`/loop` 可以在 session 保持打开期间轮询 CI，但不能凭空创造新工作，也不能扩大发布权限。两者都保留当前 permission 边界。

## Worktree Ownership（Worktree 归属）
