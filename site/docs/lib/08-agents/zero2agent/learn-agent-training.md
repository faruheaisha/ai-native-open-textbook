---
title: "learn-agent-training"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/index.md"
sourceRel: "learn-agent-training/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-training/index.md"
sourceSha256: "d0c6c765d2e6dd667522e6d27284cc950f3981da5d21ae72e706b34203a54b4a"
pageSha256: "d0c6c765d2e6dd667522e6d27284cc950f3981da5d21ae72e706b34203a54b4a"
contentMode: "local-full"
zh: ""
---

# learn-agent-training

Agent 不只是 prompt + tool calling——当你需要让模型真正学会“做 Agent”，就得进入训练层面。这个模块聚焦 Agent 场景下的 SFT、RL 与训练环境工程，从轨迹数据、Loss Mask 和算法选型，一直到仿真沙箱、评估门禁、数据回流和上线部署。

适合已经理解 Agent 基本架构、想深入了解“如何训练一个 Agent 模型”的读者。

## 这部分的主线

- Agent SFT 和普通对话 SFT 的核心区别：轨迹数据 vs 单轮问答
- 轨迹数据构造：人工标注 vs 强模型生成 + 人工筛选
- 关键训练技巧：Causal Mask、Loss Mask 策略（哪些 token 该算 loss）
- SFT 与 RL 的配合：SFT 让模型“能跑起来”，RL 提升决策质量
- 训练数据配比经验：Agent 轨迹、Tool Calling、通用指令、长文本、安全数据的比例
- 训练环境工程：仿真交互沙箱、隔离 Verifier、评估门禁与轨迹回流闭环

## 建议阅读顺序

1. [Agent SFT 关键细节：从轨迹数据到 Loss Mask](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/01-agent-sft/index.html)
2. [Agent RL 实战：用强化学习提升推理与决策质量](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/02-agent-rl/index.html)
3. [GRPO vs PPO：Agent 强化学习算法深度对比与选型](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/03-grpo-vs-ppo/index.html)
4. [训练数据配比实战：Agent 不只吃轨迹数据](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/04-data-mix/index.html)
5. [Agent 评测：怎么衡量你训练出来的 Agent 到底行不行](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/05-agent-eval/index.html)
6. [从 SFT 到部署：Agent 模型上线全流程](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/06-train-to-deploy/index.html)
7. [Agent 训练环境工程：从仿真沙箱到数据回流闭环](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-training/07-training-environment-engineering/index.html)

## 文章完成状态

- [x] Agent SFT 关键细节：从轨迹数据到 Loss Mask
- [x] Agent RL：基于环境 Reward 提升决策质量
- [x] GRPO vs PPO：Agent 强化学习算法深度对比与选型
- [x] 训练数据配比实战经验
- [x] Agent 评测：怎么衡量训练效果
- [x] 从 SFT 到部署：Agent 模型上线全流程
- [x] Agent 训练环境工程：从仿真沙箱到数据回流闭环
