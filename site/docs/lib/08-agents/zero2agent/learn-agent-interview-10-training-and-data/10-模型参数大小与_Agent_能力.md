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
pageSha256: "54391ae8aa09db71f3e6fdf8ae79da154184282717d119c00600ad4fec68d1dd"
contentMode: "local-full"
zh: ""
---

## 模型参数大小与 Agent 能力

### Q：外部模型参数更大，14B 在 Agent 层面会不会不够？

> 来源：小米 AI Agent 一面（暑期）

**新手答**：“参数越大越好，14B 肯定不如 70B。”

**高手答**：

模型参数大小只是 Agent 系统能力的一个因素，不是唯一瓶颈。Agent 系统的最终效果 = 模型能力 × 工程补偿。

**14B 在 Agent 场景的实际表现：**
- 简单工具调用、格式化输出、遵循固定 SOP：完全够用
- 复杂推理链（5+ 步逻辑推导）：能力边界明显，容易出现指令遵循漂移
- 开放式规划（给定模糊目标自行拆解）：和大模型差距最大的地方

**工程手段补偿模型能力不足：**

| 瓶颈 | 工程方案 |
|------|---------|
| 推理能力弱 | 任务拆解为状态机，每步只需简单决策 |
| 指令遵循差 | 约束解码（JSON Schema 强制格式） |
| 上下文不够 | 检索+压缩，只送最相关的信息 |
| 知识不足 | RAG + 工具调用获取实时信息 |
| 不稳定 | 测试反馈回灌，多次重试+验证 |

**什么时候 14B 真的不够：**
- 需要一次性理解超长代码文件（>10K token）并给出全局重构方案
- 需要在单轮中做复杂数学/逻辑推导
- 需要理解多层嵌套的隐含意图

**选型策略：**
- 不是“全用大的”或“全用小的”——而是按任务风险分级路由
- 简单任务走本地 14B（低延迟低成本），复杂/高风险任务走大模型审核

**差距在哪**：面试官不是在问“14B 好不好”——而是考你对“Agent 系统能力不等于模型能力”的理解。能说出工程补偿手段 + 分级路由策略，说明你知道怎么在成本约束下做出可用的系统。
