---
title: "practice/ — 动手实践"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/README.md"
zh: ""
---

# practice/ — 动手实践

选一个小项目，用 Harness Engineering 的方法论从零构建，验证原文中的经验。

## 文件约定

- 每个实验一个子目录，如 `practice/01-cli-tool/`
- 每个实验包含：README.md（目标与方法）、AGENTS.md（给智能体的指导）、代码
- 关键：人类只写提示词和约束，代码全部由智能体生成

## 已有实验

| 实验 | 验证的概念 | 结果 |
|------|-----------|------|
| [01-ralph-demo/](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/practice/01-ralph-demo/README.md) — Ralph Orchestrator 编排循环 | 帽子系统、背压门控、迭代循环、持久记忆 | 4 轮迭代完成 CLI word counter（321s / $0.31），7 项测试全绿；产物已归档可复验 |

## 实验建议

| 实验 | 验证的概念 | 复杂度 |
|------|-----------|--------|

## 下一步

实践中踩坑了？去 [feedback/](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/feedback/README.md) 记录下来。
