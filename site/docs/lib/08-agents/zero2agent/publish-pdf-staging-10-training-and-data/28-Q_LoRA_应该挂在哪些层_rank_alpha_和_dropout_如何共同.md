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
pageSha256: "71620d689ff95b68a90243ccc1a5e040fc2fe7350fbc263f9f9f700588bd5673"
contentMode: "local-full"
zh: ""
---

## Q：LoRA 应该挂在哪些层？rank、alpha 和 dropout 如何共同影响效果？

> 来源：Shopee 大模型一面（2026-08-22）

**新手答**：“通常挂 Q、V，rank 越大能力越强，dropout 防过拟合。”

**高手答**：

挂载层取决于任务需要改变什么能力。只挂注意力 Q/V 参数少，适合轻量适配；需要明显改变表达、领域风格或生成能力时，常同时评估 K/O 与 MLP 的 up/down/gate 投影。不能只按经验固定层，应通过目标模块消融比较质量、显存、吞吐和合并成本。

`rank` 决定增量矩阵容量，过小欠拟合、过大增加显存并可能记忆噪声；缩放通常是 `alpha / rank`，改变 rank 时要同步理解有效更新幅度；dropout 对小数据可正则化，但过高会削弱有限的适配信号。最终按验证集与能力回归集联合选参，并记录基座、目标模块和量化配置，否则 LoRA 参数不可复现。

**差距在哪**：新手背默认配置，高手从能力目标、容量、缩放和消融实验解释选层与超参数。
