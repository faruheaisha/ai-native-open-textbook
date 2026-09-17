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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "bac3d711484d5bb1807cb2a8fd80dd7ef5b0502d6db71ac570f6aa4b4992acfd"
contentMode: "local-full"
zh: ""
---

## SSE、WebSocket 与单次调用

### Q：SSE 和 WebSocket、单次调用的区别是什么？Agent 场景该怎么选？

> 来源：成都agent面试（社招）【阿里 Agent Infra 一面题库同题】 / [阿里淘天一面](https://www.nowcoder.com/feed/main/detail/a32b3c75644e4994933a38e1dfb16bc1)

**新手答**：“WebSocket 双向通信，SSE 单向推送，单次就是普通 HTTP。”

**高手答**：

三种方式的核心差异在于**通信模型和适用场景**：

| 维度 | 单次调用 | SSE | WebSocket |
|------|---------|-----|-----------|
| 方向 | 请求-响应，一次性 | 服务端→客户端单向流 | 双向全双工 |
| 连接 | 短连接，用完即断 | 长连接，服务端持续推送 | 长连接，双方随时发 |
| 协议 | HTTP | HTTP（text/event-stream） | 独立协议（ws://） |
| 断线恢复 | 无需（每次独立） | 内建 Last-Event-ID 续传 | 需自行实现 |
| 适用 | 同步工具调用、简单 QA | 流式生成、Agent 执行过程 | 实时协作、多人编辑 |

**Agent 场景选型：**

1. **纯问答/单步工具调用**：单次 HTTP 即可。延迟低、实现简单、无状态
2. **流式生成 + 工具调用进度**：SSE 最优。90% 的 Agent 产品用这个——模型 token 流式输出 + 工具状态推送，前端只需要“被动接收”
3. **人机协作/多 Agent 对话**：WebSocket。用户需要在 Agent 执行中途插话、发送取消指令、上传追加文件

SSE 重连能可靠重放的是**已持久化事件**，不是要求模型从相同位置继续采样出相同 token。服务端为事件分配递增 ID 并持久化，客户端带 `Last-Event-ID` 重连后按 ID 去重续传；若生成进程已失败，只能从语义检查点重新生成后续内容，并显式开启新分支。有副作用的工具调用必须按幂等键查询既有终态，不能因断线重跑。

**为什么大多数 Agent 产品选 SSE 而非 WebSocket？**
- Agent 交互本质是“用户发一条 → 系统执行一大段”，单向流足够
- SSE 基于 HTTP，天然兼容 CDN、负载均衡、API 网关，运维成本低
- WebSocket 需要维护长连接状态，服务端扩缩容更复杂

**差距在哪**：面试官考的不是定义背诵，而是“你在做 Agent 产品时选了什么、为什么”。能说出 SSE 在 Agent 场景的优势（HTTP 兼容 + 内建断线续传 + 单向够用）以及 WebSocket 的使用边界（需要客户端主动发消息时），说明你做过技术选型。
