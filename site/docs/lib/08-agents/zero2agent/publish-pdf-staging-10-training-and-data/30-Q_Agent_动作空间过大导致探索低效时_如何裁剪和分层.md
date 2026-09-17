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
pageSha256: "334f83c2e8bbca18deecfd90da9e90d4f6eca046569edcf7c449c1ff71f6e5dd"
contentMode: "local-full"
zh: ""
---

## Q：Agent 动作空间过大导致探索低效时，如何裁剪和分层？

> 来源：阿里千问 C 端算法实习一面（2026-08-10）

**新手答**：“减少工具数量，或者让模型先做工具检索。”

**高手答**：先按任务阶段、权限和前置条件形成动态可行动作集，再用分层策略让高层选择子目标、低层选择具体工具；同义动作合并为参数化能力，非法和无效动作由环境 mask。训练时采用课程学习，从短链和小动作集逐步扩展，并监控有效动作率、探索熵、无效调用和各阶段成功率。裁剪不能删除恢复动作，否则策略一旦偏离就无法回到有效状态。

**差距在哪**：新手只缩工具列表，高手同时设计层级策略、环境约束和训练分布。
