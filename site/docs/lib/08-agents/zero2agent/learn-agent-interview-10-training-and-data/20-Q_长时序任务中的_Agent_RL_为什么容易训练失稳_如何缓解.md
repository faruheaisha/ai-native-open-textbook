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
pageSha256: "67e236be825bd7b45eff701a23dece03c71bf587ad54182831f23764b8b8aa4f"
contentMode: "local-full"
zh: ""
---

## Q：长时序任务中的 Agent RL 为什么容易训练失稳？如何缓解？

> 来源：[字节大模型算法岗](https://www.nowcoder.com/discuss/926272098744438784)、[腾讯 CSIG 大模型算法岗](https://www.nowcoder.com/discuss/925526785003909120)、[腾讯 WXG 大模型算法岗](https://www.nowcoder.com/discuss/925163074921709568)

**新手答**：“轨迹太长导致奖励稀疏，可以加过程奖励和增大 Batch。”

**高手答**：长轨迹会同时放大信用分配、方差和分布漂移：终局奖励难判断哪一步有效，少数早期动作会改变后续全部状态；工具延迟、环境随机性和无效长轨迹造成回报重尾；一次 Policy 更新后，旧 Rollout 与新策略的比率在多步连乘下更容易偏离；截断还会把未完成任务误标成失败。只增大 Batch 不能修复错误奖励或环境不可复现。

治理从数据与环境开始：固定工具/环境版本并记录完整轨迹，区分超时、环境故障和策略失败；从短任务、小动作空间和可靠初始策略做 curriculum，再逐步延长 horizon。训练侧使用可验证的阶段里程碑、价值基线或分段 Advantage 降方差，对异常长轨迹和极端重要性权重做诊断性裁剪，并控制每次更新幅度与 Rollout 新鲜度；过程奖励必须做防作弊测试，不能鼓励模型刷步骤。

评测按轨迹长度切片，观察成功率、首错步骤、有效动作率、奖励方差、KL/策略漂移、工具错误、恢复率和单位成功成本。若短任务改善而长任务退化，应先检查信用分配和状态覆盖，不要用总体平均值掩盖 horizon collapse。

**差距在哪**：新手只看到奖励稀疏，高手把环境噪声、策略滞后、长尾方差、截断偏差和课程学习连成稳定训练闭环。
