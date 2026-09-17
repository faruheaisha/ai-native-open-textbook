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
pageSha256: "3c08ef98f06729b91b5432543df339bac99b10aefa6045df6e9f37f78b9736c8"
contentMode: "local-full"
zh: ""
---

## Q：多轮对话 RL 如何设计过程奖励与终局奖励，并避免用户模拟器过拟合？

> 来源：阿里云 AI Infer 一面（2026-08-23）

**新手答**：“每轮回答打一个分，任务完成再给最终奖励。”

**高手答**：

终局奖励衡量任务是否完成、约束是否满足和用户目标是否达成；过程奖励只评价可验证的中间进展，例如正确澄清、合法工具调用、状态更新和避免重复动作。过程分不能盖过终局失败，可使用终局门控或较小权重，并对奖励模型做一致性和抗投机测试，防止模型学会讨好模拟器。

用户模拟器应覆盖不同目标、表达、耐心、改口、中断和异常工具反馈，并按真实线上分布分层采样。训练与评测使用不同的模拟器 Prompt、模型和场景模板，保留真人对话与可执行环境作为外部验证；若策略只在某个模拟器上提升而跨模拟器、真人集下降，应判定为过拟合。还要监控对话长度、无效澄清率和奖励组成，识别 Reward Hacking。

**差距在哪**：新手只是把奖励拆成两段，高手处理信用分配、终局门控、模拟器分布和跨环境验证。面试官考的是 RL 指标提升是否代表真实交互能力提升。
