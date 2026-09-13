---
title: "第 8 章：多 Agent 架构"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/README.md"
zh: ""
---

# 第 8 章：多 Agent 架构

> 从单个 Agent 到 Agent 团队——Claude Code 如何协调多个 Agent 并行完成复杂任务。

## 8.1 三种多 Agent 模式

Claude Code 支持三种多 Agent 协作模式，适用于不同复杂度的场景：

```mermaid
graph TB
    subgraph 模式1 ["子 Agent (AgentTool)"]
        direction LR
        P1[父 Agent] -->|fork| C1[子 Agent]
        C1 -->|返回结果| P1
    end

    subgraph 模式2 ["协调器 (Coordinator)"]
        direction TB
        CO[协调器<br/>只分配不执行] -->|派生| W1[Worker 1]
        CO -->|派生| W2[Worker 2]
        CO -->|派生| W3[Worker 3]
        W1 -->|结果| CO
        W2 -->|结果| CO
        W3 -->|结果| CO
    end

    subgraph 模式3 ["Swarm 团队"]
        direction LR
        T1[Agent A] <-->|信箱通信| T2[Agent B]
        T2 <-->|信箱通信| T3[Agent C]
        T1 <-->|信箱通信| T3
    end

    模式1 ~~~ 模式2
    模式2 ~~~ 模式3
```

| 模式 | 适用场景 | 通信方式 | 特点 |
|------|---------|---------|------|
| **子 Agent** | 单个独立子任务 | fork-return | 最简单，父 Agent 等待结果 |
| **协调器** | 复杂多步任务 | 派生 + 综合 | 协调器不执行，只编排 |
| **Swarm 团队** | 并行协作任务 | 命名信箱 | Agent 间对等通信 |
