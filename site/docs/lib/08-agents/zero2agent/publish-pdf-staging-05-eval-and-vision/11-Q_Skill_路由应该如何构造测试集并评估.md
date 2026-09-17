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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-eval-and-vision.md"
sourceRel: "publish-pdf/staging/05-eval-and-vision.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/05-eval-and-vision.md"
sourceSha256: "522251cd44ac5841f540eaf4da4f60a49782ca1736e0ab863498790f1cfd6e8e"
pageSha256: "1b523844fa4fea70cc44e56e54a3bddefe40e08e2a663a3532afcee765884977"
contentMode: "local-full"
zh: ""
---

## Q：Skill 路由应该如何构造测试集并评估？

> 来源：字节/Agent 测评一面

**新手答**：“准备一些用户问题，看 Skill 选对了没有，算准确率。”

**高手答**：

Skill 路由是带拒识能力的多标签分类问题。测试集至少包含：单 Skill 正例、语义相近 Skill 的困难负例、多 Skill 组合、无需 Skill 的拒识样本、信息不足需澄清的样本，以及拼写错误和提示注入等扰动样本。

指标不能只看 accuracy：

| 指标 | 关注点 |
|------|--------|
| Recall@K | 正确 Skill 是否进入候选集 |
| Precision/F1 | 是否少暴露无关 Skill |
| Top-1 accuracy | 最终路由是否正确 |
| Reject precision | 无匹配时能否正确拒识 |
| 参数成功率 | 选对后能否生成合法参数 |
| 端到端成功率 | Skill 执行后任务是否真正完成 |

数据按 Skill、意图难度、用户类型和时间切片报告，避免热门 Skill 掩盖长尾失败。线上 badcase 经脱敏、聚类和人工确认后回流到固定回归集；每次修改描述、路由器或模型都跑版本对比。

**差距在哪**：新手只测“选没选对”，高手覆盖召回、拒识、参数和端到端执行，并设计困难负例与线上回流。面试官考的是 Skill 路由能否持续迭代。
