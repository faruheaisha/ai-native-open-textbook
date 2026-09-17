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
pageSha256: "6c1494b89956f2282ca6c9ac9c5faa618164c2c5938dd49fdbda364c156a25c3"
contentMode: "local-full"
zh: ""
---

## Q：为什么 SFT 后继续做 DPO/PPO 等偏好优化可能导致基础能力退化？

> 来源：哔哩哔哩 AI 后端开发凉经（2026-08-22）

**新手答**：“偏好数据太少或学习率太大，模型过拟合了。”

**高手答**：

偏好数据通常覆盖窄、风格偏置强，优化会把概率质量推向少数偏好模式；奖励模型或偏好标签的系统误差会被策略放大。训练分布偏离 SFT 分布、KL 约束不足、重复离线数据导致过优化，以及长回答更易获高分等偏差，都可能让通用知识、指令遵循和多样性下降。

治理上混入高质量 SFT/通用 replay 数据，控制学习率、步数和 KL，按能力分桶监控而不是只看总 reward；在通用、领域、安全和格式评测集上设置不可回退门槛。DPO 还要检查 chosen/rejected 长度与来源偏差，PPO 要监控 reward、KL、熵和 value loss 的联动。必要时使用 adapter 隔离或回滚，而不是追求单一偏好榜分。

**差距在哪**：新手把退化归因于“过拟合”，高手说明了分布漂移、奖励偏差和策略过优化的具体机制，并给出多能力门禁。
