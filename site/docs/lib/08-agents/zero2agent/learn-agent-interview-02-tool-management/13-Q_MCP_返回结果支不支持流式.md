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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/02-tool-management/index.md"
sourceRel: "learn-agent-interview/02-tool-management/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/02-tool-management/index.md"
sourceSha256: "aa8ef11d87c2122215c82572365a04968e18ba073c2f852c7624cc42745ca7d2"
pageSha256: "328f15335fc2beb3703a66036ce3aea64b11ed3bf4e5f526ba1635e847d2014e"
contentMode: "local-full"
zh: ""
---

## Q：MCP 返回结果支不支持流式？

> 来源：淘天/AI Agent一面

**新手答**：“应该支持吧，MCP 用了 SSE。”

**高手答**：

需要区分**传输层的流式**和**工具结果的流式**——这是两件不同的事。

**传输层**：MCP 支持 SSE（Server-Sent Events）作为传输方式，通信管道本身是流式的。

**工具调用结果（tool result）**：在当前 MCP 规范中，`tools/call` 的返回是**一次性返回完整结果**，不支持 partial result 流式推送。

**为什么这么设计**：

模型需要完整的工具返回结果才能继续推理。如果工具结果是流式的（比如只返回了前半段），模型可能“看到一半就开始生成”，导致基于不完整信息做出错误判断。这是一个**正确性 vs 体验**的设计取舍——MCP 选择了正确性。

**长耗时工具的变通方案**：

| 方案 | 原理 | 适用场景 |
|------|------|---------|
| 分阶段工具调用 | 把一个大任务拆成多个独立 tool call，每个阶段独立返回 | 可拆分的多步骤任务 |
| Progress Notification | MCP 的 `notifications/progress` 通知前端执行进度（百分比/状态） | 用户需要知道“还在跑” |
| 异步模式 | 工具立即返回 `task_id`，后续轮次用另一个工具查询结果 | 执行时间 >30s 的任务 |
| Streamable HTTP | 2025 年新增的传输方式，支持更灵活的流式通信 | 远程服务场景 |

**差距在哪**：新手把“传输层支持 SSE”等同于“工具结果支持流式”——混淆了两个层次。高手能区分传输层流式和应用层流式，理解 MCP 为什么选择一次性返回，以及实际项目中如何用变通方案解决长耗时问题。面试官想看你是否真正用过 MCP、理解协议设计背后的取舍。
