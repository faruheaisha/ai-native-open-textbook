---
title: "Pull Request 准备清单"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/pr.md"
sourceRel: "zh/01-slash-commands/pr.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/pr.md"
sourceSha256: "d126b4a4cb1ab6d628c14451cd1c5986b09aecfa278183520d81dcc3034ac65f"
pageSha256: "d126b4a4cb1ab6d628c14451cd1c5986b09aecfa278183520d81dcc3034ac65f"
contentMode: "local-full"
zh: ""
---

# Pull Request 准备清单

在创建 PR 之前，请执行以下步骤：

1. 运行格式化：`prettier --write .`
2. 运行测试：`npm test`
3. 查看 git diff：`git diff HEAD`
4. 暂存变更：`git add .`
5. 按 conventional commits 创建提交信息：
   - `fix:` bug 修复
   - `feat:` 新功能
   - `docs:` 文档
   - `refactor:` 代码重构
   - `test:` 测试新增
   - `chore:` 维护

6. 生成 PR 摘要，包含：
   - 变更了什么
   - 为什么变更
   - 做了哪些测试
   - 可能的影响
