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
pageSha256: "2f6f0bbd695ff72773929c47cea523784295024e32cea55c5bb087e990b1fa34"
contentMode: "local-full"
zh: ""
---

## Q：Agentic RL 与普通 LLM RL 的核心差异是什么？

> 来源：腾讯大模型算法岗一二面（2026-08-22）

**新手答**：“Agentic RL 的轨迹更长，还包含工具调用。”

**高手答**：Agentic RL 优化的是部分可观测环境中的多步状态转移，动作包含语言、工具和等待，奖励常来自外部终态且延迟稀疏；策略还受权限、成本和不可逆副作用约束。训练需可重置沙箱、工具版本、用户模拟器和轨迹级信用分配，并保留恢复/澄清动作。普通文本 RL 更接近单次响应偏好，环境和副作用更弱。

**差距在哪**：新手只看到长度，高手看到环境、动作空间、信用分配和安全约束都改变了。
