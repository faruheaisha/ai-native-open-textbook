---
title: "Harness 组件示例"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-02-what-a-harness-actually-is/code/harness-components.md"
sourceRel: "docs/zh/lectures/lecture-02-what-a-harness-actually-is/code/harness-components.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-02-what-a-harness-actually-is/code/harness-components.md"
sourceSha256: "49474990487534531c5d7775e501c5a5da66a3b1ee7570640d60c21e91babaa4"
pageSha256: "49474990487534531c5d7775e501c5a5da66a3b1ee7570640d60c21e91babaa4"
contentMode: "local-full"
zh: ""
---

# Harness 组件示例

对于在本地仓库中工作的编码 Agent：

- 模型：
  LLM 本身

- Harness：
  - 系统提示词
  - AGENTS.md
  - bash 工具
  - 文件读写工具
  - git 访问
  - 本地文件系统
  - 启动脚本
  - 测试命令
  - 停止钩子
  - 代码检查
  - 评估循环

如果你更改了上述任何一个 harness 组件，你就改变了实际运行的 Agent。
