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
pageSha256: "7743a37cad1fdc2cd395e50e76aae423bc977f87f1134f292e971a5e6e2e5e1b"
contentMode: "local-full"
zh: ""
---

## Q：多轮对话 RL 如何设计过程奖励与终局奖励，并避免用户模拟器过拟合？

> 来源：[阿里云 AI Infer 一面](https://www.nowcoder.com/discuss/921086976030150656)（2026-08-23）

**新手答**：“每轮回答打一个分，任务完成再给最终奖励。”

**高手答**：

终局奖励衡量任务是否完成、约束是否满足和用户目标是否达成；过程奖励只评价可验证的中间进展，例如正确澄清、合法工具调用、状态更新和避免重复动作。过程分不能盖过终局失败，可使用终局门控或较小权重，并对奖励模型做一致性和抗投机测试，防止模型学会讨好模拟器。

用户模拟器应覆盖不同目标、表达、耐心、改口、中断和异常工具反馈，并按真实线上分布分层采样。训练与评测使用不同的模拟器 Prompt、模型和场景模板，保留真人对话与可执行环境作为外部验证；若策略只在某个模拟器上提升而跨模拟器、真人集下降，应判定为过拟合。还要监控对话长度、无效澄清率和奖励组成，识别 Reward Hacking。

**追问：多轮对话 RL 如何冷启动并保证业务约束？**

先用 SFT、规则策略或可验证的专家轨迹把策略拉进有效动作分布，再逐步增加在线探索；一开始就让随机策略跑长链路，会把大部分算力浪费在无效状态。业务硬约束应由环境和程序门禁强制执行，奖励只负责优化“在合法空间里哪条路径更好”，不能用一个负分代替权限、金额上限或合规校验。冷启动阶段按任务难度做 curriculum，并用独立规则集检查约束遵循，避免策略只学会迎合用户模拟器。

**差距在哪**：新手只是把奖励拆成两段，高手处理信用分配、终局门控、模拟器分布和跨环境验证。面试官考的是 RL 指标提升是否代表真实交互能力提升。
