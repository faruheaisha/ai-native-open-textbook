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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-architecture-design.md"
sourceRel: "publish-pdf/staging/01-architecture-design.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/01-architecture-design.md"
sourceSha256: "5392c35240d8ade29e7a3bd3d16f639416d4d44c3540bc40d195968737985cc6"
pageSha256: "ed3657552650d389965d9ee918928549518d2c777f5df85f4aeeb3049bbc4279"
contentMode: "local-full"
zh: ""
---

## Q：基于强化学习的 Agent 与传统基于 Prompt 的 Agent 有何区别？各自的适用场景？

> 来源：Agent开发八股合集（南京大学）

**新手答**：“RL Agent 就是用强化学习训练模型，Prompt Agent 就是写提示词让模型做事，RL 更高级。”

**高手答**：

这两种范式解决的核心问题不同：**Prompt-based Agent 依赖模型的 in-context learning 能力做决策，RL-based Agent 通过环境反馈直接优化策略网络。**

| 维度 | Prompt-based Agent | RL-based Agent |
|------|-------------------|----------------|
| **决策机制** | 每步由 LLM 根据 Prompt + 上下文生成动作 | 策略网络根据状态直接输出动作概率 |
| **学习方式** | 无需训练，靠 Prompt 设计 + Few-shot 引导 | 需要大量环境交互数据 + 奖励信号训练 |
| **可解释性** | 高——每步有自然语言推理链 | 低——策略是黑箱权重 |
| **泛化性** | 强——LLM 自带海量世界知识，换任务改 Prompt 即可 | 弱——换环境需要重新训练或 Transfer |
| **稳定性** | 依赖模型能力上限，复杂任务易偏 | 训练收敛后执行确定性高 |
| **成本结构** | 推理时 token 成本高 | 训练成本高，推理成本低 |

**适用场景对比：**

- **Prompt-based**：任务多样、需要通用推理、环境复杂且难以模拟（如代码编写、开放对话、信息检索）。大多数企业级 Agent 产品用这种。
- **RL-based**：环境可模拟、奖励信号明确、动作空间有限（如游戏 AI、机器人控制、特定优化任务）。WebArena 类 benchmark 中 RL fine-tuned Agent 效果好。

**现实中的融合趋势（RLHF/GRPO）：**

当前 LLM Agent 实际上已经融合了两者——基座模型用 RL（RLHF/GRPO）对齐人类偏好后，部署时以 Prompt-based 方式运行。更前沿的方向如 Agentic RL（Agent 在环境中探索生成轨迹，再用 RL 优化推理策略）正在模糊这条界限。

**差距在哪**：面试官考的是你对“Agent 决策机制”的深度理解。新手把 RL 和 Prompt 当成对立面，高手能指出两者解决不同层面的问题，并能说出当前“基座用 RL 训练 + 推理用 Prompt 驱动”的融合范式，体现你对技术全栈的理解。
