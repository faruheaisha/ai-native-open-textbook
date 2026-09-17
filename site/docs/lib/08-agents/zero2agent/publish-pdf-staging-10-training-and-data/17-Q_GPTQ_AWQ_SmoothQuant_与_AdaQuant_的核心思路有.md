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
pageSha256: "edd0ce2a09f0ba3cb26f99d712917aa339ef094369acbf536cf7f345e46f4e0f"
contentMode: "local-full"
zh: ""
---

## Q：GPTQ、AWQ、SmoothQuant 与 AdaQuant 的核心思路有什么不同？

> 来源：[智谱 AI Infra 一面](https://www.nowcoder.com/feed/main/detail/846a09e34fea4fe9a7e14da2a88e3f72)、[后摩智能 AI Infra 一面](https://www.nowcoder.com/feed/main/detail/9b2e184532094836bfeb0658f3c0f22a)、[AI Infra 小厂面经](https://www.nowcoder.com/feed/main/detail/c7eee5b04fb8424aa4847f0e21fab875)

**新手答**：“它们都是低比特量化方法，GPTQ 和 AWQ 量权重，SmoothQuant 量激活。”

**高手答**：

这些方法处理的困难不同。GPTQ 用校准数据近似二阶信息，按块逐步量化权重并补偿误差，重点是 Weight-only PTQ 的重构质量；AWQ 根据激活统计识别对输出更敏感的权重通道，通过缩放保护显著权重，再做低比特权重量化；SmoothQuant 把激活中的离群难度通过等价缩放迁移到更容易量化的权重侧，主要服务 W8A8 一类权重和激活同时量化场景。

AdaQuant 这一名称在不同论文或实现中可能指不同的自适应量化方案，不能只背缩写。回答时应先锁定具体论文或库，再说明它优化 Scale、舍入还是逐层重构。方法可以组合，但组合后的格式必须被 Serving 后端支持，否则离线误差更低也不等于线上收益更高。

选型要看模型结构、目标位宽、是否量化激活、校准数据、允许的校准成本和硬件 Kernel。最终用同一基线比较质量、模型大小、预处理时间、端到端时延和吞吐，不能引用脱离模型与硬件的固定加速倍数。

**差距在哪**：新手记方法标签，高手说清每种方法在解决哪类误差、依赖什么统计，以及算法收益如何受部署后端约束。
