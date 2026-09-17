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
pageSha256: "7c445b0c462c10334140d15a6b3502c01bd7306b79eab704a05487f77bed5de9"
contentMode: "local-full"
zh: ""
---

## Q：Agentic CFT 与 SFT、RL 的目标有何不同？为什么训练时要 Mask Observation Token？

> 来源：Shopee Agent 开发一面（2026-08-24）

**新手答**：“CFT 让模型持续学习 Agent 数据，SFT 学示范，RL 用奖励优化；Observation 不是模型生成的，所以不算 loss。”

**高手答**：

这里先确认 CFT 的口径：若指 Agentic Continual Fine-Tuning，它关注的是模型在持续到来的新工具、新任务和新环境上增量吸收能力，同时控制灾难性遗忘；SFT 主要最大化固定专家示范中目标动作的似然；RL 则让策略在可交互环境中探索，直接优化任务成功、成本与安全等序列级回报。CFT 是数据和生命周期范式，不等于一种独立 loss，实践中可以使用 SFT、偏好优化或 replay/正则化组合实现。

Agent 轨迹通常交错出现 `assistant action -> environment observation -> assistant action`。Observation 是环境给定的条件，不是策略要预测的动作，因此应保留在 attention 上下文中，但将其 label 设为 ignore，只对 Assistant 的推理、工具调用和最终回答计算 loss。否则模型会花容量背诵工具返回，甚至学会“伪造环境结果”；较长 Observation 还会主导 token 平均 loss，稀释真正动作 token 的梯度。

但不能机械地按文本标签 Mask：需要可靠的 role/span 边界，工具调用参数若由模型生成必须计入 loss，工具返回和系统注入才 Mask；多模态环境 token、错误反馈也要按生产协议确定归属。训练后分别评测动作选择、参数正确率、Observation 利用率和最终任务成功率，避免模型虽然不预测 Observation，却也不读取它。

**差距在哪**：新手只记住“Observation 不算 loss”，高手能区分条件 token 与策略动作，说明错误 Mask 的训练后果，并指出 CFT 是持续适配目标而不是另一种神秘损失函数。
