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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/06-multi-agent-collab/index.md"
sourceRel: "learn-agent-interview/06-multi-agent-collab/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/06-multi-agent-collab/index.md"
sourceSha256: "5ee244b67f4d348fad5285b36ca146b5ff0d9717e0f3b855e900f08593dbf592"
pageSha256: "e7f6b2dc1ed1c902240f812bad04384d32ab756f0936b7fbe871fe72d088f49c"
contentMode: "local-full"
zh: ""
---

## Q：在 A2A 场景下，如何防止两个 Agent 陷入递归对话？

> 来源：AI应用开发进阶面

**新手答**：“设置最大轮次限制。”

**高手答**：

最大轮次是必要的兜底，但只靠它意味着你允许系统白白浪费 N 轮资源后才停下来。需要更早发现和阻断递归。

**递归对话的成因**：Agent A 请求 Agent B 帮助 → B 发现需要 A 的信息 → 再问 A → A 又问 B... 本质是**分布式死锁**——两个节点互相等待对方提供信息。

**四层防递归机制**：

```mermaid
flowchart TB
    subgraph L1["第一层：调用深度计数器"]
        D["每次 A2A 调用携带 depth 字段\ndepth > N（如3）直接返回'无法处理'"]
    end
    subgraph L2["第二层：调用链去重"]
        C["维护 call_stack（类似函数调用栈）\n检测到环路（A→B→A）立即终止"]
    end
    subgraph L3["第三层：任务收敛检测"]
        I["每轮通信后检查新信息增量\n连续2轮无新信息 → 终止"]
    end
    subgraph L4["第四层：全局协调器"]
        G["第三方 orchestrator 监控所有 A2A 通信\n发现循环模式后强制裁断"]
    end
    L1 --> L2 --> L3 --> L4
```

**各层详解**：

| 层级 | 机制 | 检测时机 | 成本 |
|------|------|---------|------|
| 调用深度计数器 | 每次调用 depth+1，超过阈值拒绝 | 发起调用前 | 零成本，一次判断 |
| 调用链去重 | 维护调用栈，检测 A→B→A 环路 | 发起调用前 | 栈查找，O(n) |
| 任务收敛检测 | 对比本轮和上轮的信息增量 | 收到响应后 | 语义对比，有计算成本 |
| 全局协调器 | 监控所有 Agent 间通信拓扑 | 持续监控 | 需要独立服务 |

**A2A 协议层支持**：

Google A2A 协议中，TaskState 的 `BLOCKED` 状态可以标记任务卡死。当一个 Task 在两个 Agent 之间反复流转超过阈值时，协议层自动将任务状态设为 `BLOCKED`，触发超时回收。

**根本解决——设计层面杜绝递归**：

在 Agent 的 system prompt 中明确约束：**“你不能向请求你的 Agent 发起反向请求”**。用 prompt 约束 + 协议层校验双重保险：

```text
System Prompt 约束：
  "当你收到来自其他 Agent 的请求时，你只能基于自己已有的能力和数据回答。
   如果信息不足，返回'信息不足，需要用户提供'，而不是向请求方反向提问。"

协议层校验：
  A2A 消息头中携带 origin_agent_id，
  如果目标 Agent 尝试向 origin_agent_id 发起新请求 → 直接拦截
```

**差距在哪**：面试官考的是对分布式系统死锁问题的理解——A2A 递归本质就是分布式死锁。只设最大轮次是“让死锁超时后自己断”，而调用链去重+收敛检测+prompt约束是“从根本上不让死锁发生”。前者浪费资源，后者预防问题。
