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
pageSha256: "9c6b33b600b4348ff6d3b2a25d5e2ece5ad7b297be246694097ffcd52b9906a6"
contentMode: "local-full"
zh: ""
---

## Q：为什么 Step-level SFT 之后再进行 GRPO，通常比直接从基座模型开始做 GRPO 稳定？

> 来源：唯品会/NLP算法实习一面

**新手答**：“SFT先打个基础，GRPO在上面调效果更好。”

**高手答**：

**根本原因**：GRPO 需要模型能生成“有区分度”的样本来计算相对奖励。

**直接从基座做GRPO的问题**：

1. **采样质量差**：基座模型在tool-use任务上几乎随机输出，生成的多个样本之间质量无明显差异 → 相对奖励方差接近0 → 梯度信号极弱
2. **格式不对齐**：基座不会输出正确的工具调用格式，所有样本的reward都是0 → GRPO的advantage全为0，等于没训练
3. **探索空间太大**：基座的策略空间极其分散，GRPO的exploration效率极低

**SFT先做的价值**：

1. **格式对齐**：模型学会了输出正确格式的工具调用 → GRPO采样时至少格式对了
2. **缩小策略空间**：模型已经大致知道“该做什么”，GRPO只需优化“怎么做得更好”
3. **提供reward区分度**：SFT后的模型能生成“质量有高有低”的轨迹 → GRPO的相对奖励有意义

**类比**：先教人走路（SFT），再教人跑得快（GRPO）。直接教婴儿跑步，反馈信号全是负的。

**工程经验**：SFT阶段用 200-500 条高质量轨迹就够，关键是覆盖常见工具组合模式。

**差距在哪**：面试官考的是对“SFT+RL”两阶段训练范式背后信息论原理的理解——为什么是两步不是一步。能说出“基座模型采样无区分度导致GRPO梯度信号消失”这个核心原因，说明你理解了GRPO的工作前提。
