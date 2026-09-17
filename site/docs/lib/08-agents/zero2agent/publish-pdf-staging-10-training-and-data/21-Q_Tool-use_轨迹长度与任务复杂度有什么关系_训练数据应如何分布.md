---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "b986a42019fd43682c09d7aecbcaa9a68e36990bb361c330c67c4351dcadd290"
contentMode: "local-full"
zh: ""
---

## Q：Tool-use 轨迹长度与任务复杂度有什么关系？训练数据应如何分布？

> 来源：唯品会/大模型算法实习

**新手答**：“简单任务轨迹短，复杂任务轨迹长，训练时都放一些。”

**高手答**：

轨迹长度不是目标，而是任务复杂度、工具依赖深度和失败恢复次数的结果。最短轨迹通常是一次工具调用：识别意图、填参数、调用、回答；最长轨迹可能包含规划、多个有依赖的工具、观察结果、重规划和失败恢复。

数据集不能按 token 长度机械配比，应按能力分桶：

| 分桶 | 典型轨迹 | 训练目标 |
|------|----------|----------|
| 单工具短轨迹 | 1 次调用 | Schema 遵循、参数填充 |
| 多工具并行 | 多个无依赖调用 | 工具选择、结果聚合 |
| 多工具串行 | A 的输出作为 B 的输入 | 依赖推理、状态传递 |
| 长程恢复轨迹 | 调用失败后重试或换工具 | 错误诊断、重规划 |

工程上先统计生产任务的步骤数、工具数、依赖深度和失败率，再分层采样。训练时使用长度分桶和 token-budget batch，避免少量超长样本吞掉显存；评测则按桶分别报告成功率，不能只看总体平均值。

**差距在哪**：新手只看到“长短”，高手会把轨迹长度还原为工具依赖、规划和恢复能力，并说明如何分桶采样与分层评测。面试官考的是训练数据是否真实覆盖线上任务分布。
