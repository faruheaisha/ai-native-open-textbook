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
pageSha256: "f641c98af3f85c576636bd0b6c61310731c5bfab008dd70fd9408e9131a273e8"
contentMode: "local-full"
zh: ""
---

## Q：如果让两个不同的 Agent 产品进行对话（比如 Claude Code 和 Cursor），在协议层面应该怎么做？

> 来源：字节TikTok AI应用开发一面

**新手答**：“用 API 互相调用呗，一个 Agent 调另一个的接口。”

**高手答**：
这道题考的是跨产品 Agent 互操作（Interoperability）——两个完全独立的 Agent 产品如何协作，而不是在同一框架内的子 Agent 通信。

**协议层选型**：

1. **A2A（Agent-to-Agent Protocol）**：Google 主导的开放协议，专为跨产品 Agent 互操作设计
   - Agent Card：每个 Agent 在 `/.well-known/agent.json` 发布自己的能力声明（输入格式、输出类型、认证方式）
   - Task 生命周期：submitted → working → input-required → completed，支持异步长任务
   - SSE 流式推送 + 多轮交互，天然支持对话式协作

2. **MCP（Model Context Protocol）**：适合工具/资源暴露，但设计上是 Host→Client→Server 单向调用，不是双向 Agent 对话

3. **纯 REST API 对接**：最简单，但耦合度高，需要双方约定接口规范，无法利用标准化协议带来的互操作生态

**实现关键点**：
- **身份认证**：A2A 通过 Agent Card 内的 `securitySchemes` 声明 OAuth2/API Key，跨产品必须解决鉴权
- **能力协商**：A2A 的 Agent Card `skills` 字段描述能力，调用方根据 Card 决定怎么调用，而不是硬编码
- **状态传递**：Task 的 `contextId` 支持多轮对话上下文，每个消息带 `role: agent`，区分于用户消息
- **降级策略**：对方不支持 A2A 时，退化为标准 HTTP + JSON 协议，保留基础互操作能力

**差距在哪**：面试官考的是你对“同框架内的子 Agent 通信”和“跨产品 Agent 互操作”这两个不同层次问题的区分。A2A 的价值在于标准化——就像 HTTP 统一了 Web，A2A 试图统一 Agent 生态的互调方式。
