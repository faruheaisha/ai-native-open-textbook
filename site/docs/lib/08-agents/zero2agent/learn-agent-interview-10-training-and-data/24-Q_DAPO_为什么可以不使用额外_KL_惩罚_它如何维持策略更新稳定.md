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
pageSha256: "a1d8b0995780ab2e304e3359fac14531dc498ee0845de0b4d727485d52cf1b97"
contentMode: "local-full"
zh: ""
---

## Q：DAPO 为什么可以不使用额外 KL 惩罚？它如何维持策略更新稳定？

> 来源：[字节大模型算法岗](https://www.nowcoder.com/discuss/926272098744438784)、[字节强化学习岗](https://www.nowcoder.com/discuss/925523582761857024)

**新手答**：“DAPO 用 Clip 就能限制更新，所以不需要 KL。”

**高手答**：先限定论文语境。[DAPO 论文](https://arxiv.org/abs/2503.14476)是在长链推理 RL 设置中报告移除 KL 项，并不是证明所有策略优化都不需要参考约束。它通过 asymmetric clipping 的 Clip-Higher 给低概率探索 Token 更大的上升空间，同时仍限制概率比率；Dynamic Sampling 移除组内奖励全相同、没有有效梯度的样本；Token-Level Policy Gradient、长度相关处理与稳定的数据/训练系统共同控制更新质量。

Clip 约束单样本概率比率，KL 衡量策略分布整体偏移，两者不等价。没有显式 KL 时仍要监控实际 KL、熵、Clip Fraction、重要性比率、响应长度、奖励方差和验证集能力；出现策略坍缩、语言漂移或 Reward Hacking 时，可以收紧学习率/Clip、改采样与奖励，必要时重新引入 KL 或参考模型约束。

因此正确回答是“在该算法和实验条件下，显式 KL 不是稳定性的唯一来源”，而不是“DAPO 证明 KL 无用”。复现还要核对代码版本、模型、数据、Reward 和采样配置，不能只抄论文中的一个开关。

**差距在哪**：新手把 Clip 当 KL 的替代公式，高手能区分局部更新约束与全局分布漂移，并说明 DAPO 的稳定性来自一组机制。
