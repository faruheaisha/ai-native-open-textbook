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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "3411ccf6ce82af72350b4be111f29b016bd6dcf8aea61874a551c1362a37c873"
contentMode: "local-full"
zh: ""
---

## Q：预训练与 SFT 在数据、目标函数、计算形态和基础设施上有什么区别？

> 来源：[AI Infra 小厂实习面经](https://www.nowcoder.com/feed/main/detail/166e576d5afa4a298cf9492ed51bed04)

**新手答**：“预训练用海量无标注数据学习通用能力，SFT 用问答数据让模型学会对话。”

**高手答**：

两者都常使用下一个 Token 预测，但数据分布和 Loss Mask 不同。预训练面对大规模连续语料，通常对绝大多数有效 Token 计算 Loss，重点是数据去重、混合比例、长序列装箱和稳定扩展；SFT 使用指令、对话或 Agent 轨迹，通常只监督 Assistant 动作，System/User/Tool Observation 作为条件输入并 Mask，重点是任务覆盖、格式正确、边界样本和防止能力遗忘。

计算侧，预训练规模大、周期长，主要追求集群 MFU、并行效率、Checkpoint 和故障恢复；SFT 数据更小、实验更频繁，常用 LoRA/QLoRA 或较小学习率，关注多版本评测、快速回滚和数据配方可追溯。SFT 也可能全参训练，预训练也不一定只有纯文本，不能用“是否微调参数”定义两者。

验收目标也不同：预训练看 Loss、Scaling 趋势和通用能力，SFT 看指令遵循、领域任务、工具调用、安全以及基础能力回归。生产中应固定基座、Tokenizer、模板、Mask 规则和数据版本，否则无法判断提升来自训练目标还是协议变化。

**差距在哪**：新手只按数据量区分，高手能连接 Loss Mask、数据管线、并行与实验迭代方式，以及两阶段不同的验收目标。
