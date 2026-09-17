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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "e7b264479f91c4733584a3ff8e1376bb1ac7f2440e1901dc534b3d65fe735b50"
contentMode: "local-full"
zh: ""
---

## AgentState vs 全局变量

### Q：AgentState 的作用是什么？为什么不使用全局变量？

> 来源：字节Agent开发一面（某大厂）

**新手答**：“用全局变量也能存状态吧，AgentState 就是框架的封装。”

**高手答**：

AgentState 解决的核心问题是**状态的可追踪、可回溯、可序列化**——这三点是全局变量做不到的。

**全局变量的致命问题：**

1. **不可追踪**：不知道谁在什么时候改了什么值，调试多步 Agent 像猜谜
2. **不可回溯**：Agent 执行到第 5 步发现走错了，没法回到第 3 步的状态
3. **不可序列化**：没法做 checkpoint 持久化，进程挂了状态全丢
4. **并发不安全**：多个节点并行执行时，全局变量竞争写入导致数据覆盖
5. **默认覆盖语义**：Python dict 赋值是覆盖，但 Agent 很多场景需要累加（如 messages 列表追加）

**AgentState 的设计价值：**

| 能力 | 实现 |
|------|------|
| 状态版本化 | 每个节点执行后生成新版本的 State snapshot |
| Checkpoint | 序列化到 SQLite/Redis，支持断点续跑 |
| Reducer 语义 | 字段可以定义 add（累加）而非 replace（覆盖） |
| 类型安全 | TypedDict 定义 schema，节点间契约明确 |
| 调试追踪 | 每步状态变化有记录，出错时精确定位哪个节点改坏了什么 |

**LangGraph 的经典踩坑**：默认 State 是覆盖式更新。如果你在 State 里放了一个 `messages: list`，节点 A 返回 `\{"messages": [msg1]\}`，节点 B 返回 `\{"messages": [msg2]\}`——结果是 B 覆盖 A，而不是追加。必须用 `Annotated[list, operator.add]` 声明累加语义。

**差距在哪**：面试官考的是你对“状态管理”的工程理解。只把 AgentState 当成“框架的 dict 封装”说明你没用它做过多步任务。能说出 checkpoint、reducer 语义、状态回溯这些设计意图，说明你真的在 LangGraph 上踩过坑。
