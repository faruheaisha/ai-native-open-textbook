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
pageSha256: "a6dc577edda047edd4e378cabc205edeb644ed3b11825489ba2d2246041e50c4"
contentMode: "local-full"
zh: ""
---

## Q：Agentic CFT 与 SFT、RL 的目标有何不同？为什么训练时要 Mask Observation Token？

> 来源：[Shopee Agent 开发一面](https://www.nowcoder.com/feed/main/detail/79fe3fc8f8cb4c4d9beca478f4279e3a)（2026-08-24）；[腾讯一面微调 Mask 追问](https://www.nowcoder.com/discuss/924026569318727680)

**新手答**：“CFT 让模型持续学习 Agent 数据，SFT 学示范，RL 用奖励优化；Observation 不是模型生成的，所以不算 loss。”

**高手答**：

这里先确认 CFT 的口径：若指 Agentic Continual Fine-Tuning，它关注的是模型在持续到来的新工具、新任务和新环境上增量吸收能力，同时控制灾难性遗忘；SFT 主要最大化固定专家示范中目标动作的似然；RL 则让策略在可交互环境中探索，直接优化任务成功、成本与安全等序列级回报。CFT 是数据和生命周期范式，不等于一种独立 loss，实践中可以使用 SFT、偏好优化或 replay/正则化组合实现。

Agent 轨迹通常交错出现 `assistant action -> environment observation -> assistant action`。Observation 是环境给定的条件，不是策略要预测的动作，因此应保留在 attention 上下文中，但将其 label 设为 ignore，只对 Assistant 的推理、工具调用和最终回答计算 loss。否则模型会花容量背诵工具返回，甚至学会“伪造环境结果”；较长 Observation 还会主导 token 平均 loss，稀释真正动作 token 的梯度。

“是否 Mask User、System、Tool”不能脱离数据契约回答。prompt-completion 目标通常只对 completion 计 loss；assistant-only 的多轮 SFT 通常只监督 Assistant span；全序列语言建模则可能对所有 token 计算 next-token loss。即使消息角色叫 Tool，也要区分 Assistant 生成的工具名/参数与环境回传的 Tool Result：前者是策略动作，通常需要监督；后者是条件信息，通常只参与 attention。User/System 是否 Mask 同样取决于要训练的是回复策略还是全序列建模，不能把“外部信息”当作无条件忽略规则。

但不能机械地按文本标签 Mask：需要可靠的 role/span 边界，工具调用参数若由模型生成必须计入 loss，工具返回和系统注入才 Mask；多模态环境 token、错误反馈也要按生产协议确定归属。训练后分别评测动作选择、参数正确率、Observation 利用率和最终任务成功率，避免模型虽然不预测 Observation，却也不读取它。

**差距在哪**：新手只记住“Observation 不算 loss”，高手能区分条件 token 与策略动作，说明错误 Mask 的训练后果，并指出 CFT 是持续适配目标而不是另一种神秘损失函数。
