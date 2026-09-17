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
pageSha256: "7a7c7d628a3e989c2e0dbed843ccf376c5ce5f7bc0b10596fae1c74f9a88db30"
contentMode: "local-full"
zh: ""
---

## Q：Agentic RL 与普通 LLM RL 的核心差异是什么？

> 来源：腾讯大模型算法岗一二面（2026-08-22）【[腾讯（WXG）- 大模型算法岗（一面）](https://www.nowcoder.com/discuss/925163074921709568)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[字节跳动 - 大模型算法岗（强化学习方向）](https://www.nowcoder.com/discuss/925523582761857024)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[腾讯（CSIG）- 大模型算法岗（RLHF 与多模态）](https://www.nowcoder.com/discuss/925526785003909120)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异是什么？】【[字节跳动 - 大模型算法岗（RL/后训练方向）](https://www.nowcoder.com/discuss/926272098744438784)追问：智能体强化学习（Agentic RL）与传统 RL 在训练范式和信用分配上的核心差异？】

**新手答**：“Agentic RL 的轨迹更长，还包含工具调用。”

**高手答**：Agentic RL 优化的是部分可观测环境中的多步状态转移，动作包含语言、工具和等待，奖励常来自外部终态且延迟稀疏；策略还受权限、成本和不可逆副作用约束。训练需可重置沙箱、工具版本、用户模拟器和轨迹级信用分配，并保留恢复/澄清动作。普通文本 RL 更接近单次响应偏好，环境和副作用更弱。

**差距在哪**：新手只看到长度，高手看到环境、动作空间、信用分配和安全约束都改变了。
