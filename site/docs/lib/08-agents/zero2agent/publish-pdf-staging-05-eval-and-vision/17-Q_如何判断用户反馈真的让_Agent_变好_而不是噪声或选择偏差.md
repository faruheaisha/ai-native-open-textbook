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
pageSha256: "4ca543016719119e73f1b3d5f8cc24e34fa10d86799e0d14c522d23b375764e7"
contentMode: "local-full"
zh: ""
---

## Q：如何判断用户反馈真的让 Agent 变好，而不是噪声或选择偏差？

> 来源：MiniMax 平台研发一面（2026-08-20）

**新手答**：“统计点赞、点踩和采纳率，指标上升就有效。”

**高手答**：反馈要绑定任务、版本、曝光和后续结果，区分显式评价、行为代理信号和人工修正。用稳定分桶 A/B 或准实验控制用户与任务难度，处理延迟反馈、重复用户和只在失败时反馈的选择偏差。结论同时看任务成功、负向副作用、成本和各切片置信区间；反馈先进入候选集，经去重、归因和回归验证后才能沉淀为规则或训练数据。

**差距在哪**：新手看相关性，高手建立可归因的实验和数据准入链路。
