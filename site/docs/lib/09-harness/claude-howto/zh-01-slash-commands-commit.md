---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/commit.md"
sourceRel: "zh/01-slash-commands/commit.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/commit.md"
sourceSha256: "da6c2c72d09f4e70d722d590ef92be55afab25e65a8d53a87a14c4f03eddab56"
pageSha256: "da6c2c72d09f4e70d722d590ef92be55afab25e65a8d53a87a14c4f03eddab56"
contentMode: "local-full"
zh: ""
---

# Claude How-To

## 上下文

- 当前 git 状态: !`git status`
- 当前 git diff: !`git diff HEAD`
- 当前分支: !`git branch --show-current`
- 最近的提交: !`git log --oneline -10`

## 你的任务

根据上面的变更创建一个单独的 Git 提交。

如果通过参数传入了 message，就直接使用它：$ARGUMENTS

否则，分析这些变更，并按照 conventional commits 格式生成合适的提交信息：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档变更
- `refactor:` 代码重构
- `test:` 新增测试
- `chore:` 维护任务
