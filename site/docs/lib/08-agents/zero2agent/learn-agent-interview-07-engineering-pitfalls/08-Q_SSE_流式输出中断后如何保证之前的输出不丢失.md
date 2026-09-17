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
pageSha256: "cbabfd4aca233662d57d54841a902290bb0ee33f7ecf78a0f9f244858eca3179"
contentMode: "local-full"
zh: ""
---

## Q：SSE 流式输出中断后如何保证之前的输出不丢失？

> 来源：某教育agent开发【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计 SSE 流式输出网关，处理断线重连和消息重放？】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：如何设计 SSE 流式网关，处理断线重连和消息重放？】

**新手答**：“断了就重新生成呗。”

**高手答**：

SSE 流式断连是 Agent 应用的常见问题（用户关闭浏览器、网络波动等），解决方案分层：
1. **服务端持久化**：每个 SSE 事件带递增 event_id，服务端将已发送内容写入 Redis/DB（key = task_id）
2. **断点续传**：客户端重连时携带 Last-Event-ID，服务端从该位置继续推送
3. **异步任务分离**：将 LLM 生成与 SSE 推送解耦——生成结果写入消息队列，SSE 连接只负责消费和推送。即使连接断开，生成不中断
4. **轮询兜底**：如果 SSE 重连失败，降级为轮询接口拉取 task_id 对应的已生成内容
5. **前端状态恢复**：客户端本地缓存已收到的 chunk，重连后只接收增量

**差距在哪**：关键是“生成过程和推送过程解耦”的架构思想，不要让连接状态影响计算状态。
