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
pageSha256: "ed7d1ca7d55a29db08ae4c03c7ee8536abb35ca0246e6f214ff76eda867d7698"
contentMode: "local-full"
zh: ""
---

## Q：LangGraph 图状态机里，怎么捕获每个节点的执行结果并实时推前端？

> 来源：淘天/AI Agent一面

**新手答**：“用回调函数。”

**高手答**：

问题本质：LangGraph 的节点是异步执行的，但前端需要实时看到“当前执行到哪一步”和“每步结果”。解决方案分三层：

**第一层：LangGraph 层——流式获取节点 state diff**

使用 `stream_mode="updates"` 流式获取每个节点的状态变更，每个节点执行完会 yield 一个 `\{node_name: state_update\}` 对象：

```python
async for event in graph.astream(input, config, stream_mode="updates"):
    node_name = list(event.keys())[0]
    state_update = event[node_name]
    # 每个节点完成时都会产出一个事件
```

**第二层：后端层（FastAPI + SSE）——包装为事件流**

将 LangGraph 的 async generator 包装为 SSE EventSource，每个节点完成时发送一个 event：

```text
event: node_end
data: {"node": "search_node", "result": "找到5条相关文档", "timestamp": "..."}

event: node_start
data: {"node": "generate_node", "status": "正在生成回答..."}

event: token_stream
data: {"content": "根据检索结果，..."}
```

**第三层：前端层——按事件类型更新 UI**

监听 SSE 事件流，按 node_name 更新 UI 组件状态：

```text
"正在检索..." → "检索完成，找到5条" → "正在生成回答..." → 流式文本输出
```

**关键细节**：

| 事件类型 | 用途 | 处理方式 |
|---------|------|---------|
| `node_start` | 节点开始执行 | 前端展示 loading 动画 |
| `node_end` | 节点执行完成 | 前端展示节点结果摘要 |
| `tool_call` | 工具调用中间结果 | 展示搜索结果等中间信息 |
| `token_stream` | LLM 逐 token 输出 | 流式文本渲染 |
| `error` | 节点执行异常 | 展示“该步骤失败，正在重试” |

**完整架构**：

**对比 LangChain 的 callback 方案**：callback 是同步拦截机制，不适合异步图执行；LangGraph 的 stream 是原生支持的一等公民，直接 yield 节点级别的状态变更，更适合图状态机的执行模型。

**差距在哪**：新手只知道 callback 这一种方式。高手给出了 LangGraph 层（stream_mode）+ 后端层（SSE）+ 前端层（事件驱动 UI）的三层方案，且区分了五种事件类型的不同处理方式。面试官考的是对 LangGraph streaming API 和前后端实时通信的实战经验——不是理论概念，而是你真的用 LangGraph 做过面向用户的产品。
