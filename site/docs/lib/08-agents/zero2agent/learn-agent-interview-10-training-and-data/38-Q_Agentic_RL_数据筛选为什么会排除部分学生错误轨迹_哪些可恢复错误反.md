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
pageSha256: "4985274ead19044b1b43899e53d191dbd28c347d3f7198409e5b7b81c99fa1af"
contentMode: "local-full"
zh: ""
---

## Q：Agentic RL 数据筛选为什么会排除部分学生错误轨迹？哪些可恢复错误反而值得保留？

> 来源：[阿里云 AI Infer 一面](https://www.nowcoder.com/discuss/921086976030150656)

**新手答**：“错误轨迹会教坏模型，所以全部过滤，只保留成功轨迹。”

**高手答**：

先挑战前提：**没有“错误轨迹一律排除”的通用规则**。要区分它在训练中扮演什么角色。

- 作为 SFT/蒸馏目标：如果把学生的错误 Action 当成 target，确实会强化错误；环境损坏、奖励错标、工具协议解析失败等脏轨迹也应隔离。
- 作为 on-policy RL 样本：失败正是当前策略分布的一部分，直接删掉会造成选择偏差，还可能让训练看不到最需要修复的状态。
- 作为恢复能力数据：`错误动作 → 真实 Observation → 识别错误 → 改计划 → 成功` 很有价值，但 loss 应监督纠正动作，不能把错误动作伪装成专家示范。

我会给轨迹记录 `policy_version`、环境/工具版本、Action 合法性、奖励可信度、首错步骤、是否可恢复和终态。筛选顺序是：先去掉环境/标签损坏数据，再把有效成功轨迹、可恢复失败和不可恢复失败分桶；SFT、偏好学习和 RL 分别消费适合自己的视图。还要保留失败率和过滤率监控，防止只训练“顺风局”。

没有主流算法规定“失败轨迹必须全部过滤”，这是数据视图和训练目标共同决定的工程选择。近期 [SENTINEL failure-driven Agent RL 论文](https://arxiv.org/abs/2606.12908)还会从失败轨迹归纳错误模式并生成针对性任务，进一步说明失败不是天然废料；但这项研究的具体收益不能外推成所有任务的通用结论。

**差距在哪**：新手按成功/失败二分数据，高手会区分错误示范、有效探索和恢复轨迹，并防止筛选改变 on-policy 分布。
