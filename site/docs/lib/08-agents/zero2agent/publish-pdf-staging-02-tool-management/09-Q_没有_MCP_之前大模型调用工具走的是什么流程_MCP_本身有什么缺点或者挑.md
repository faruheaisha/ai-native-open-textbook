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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-tool-management.md"
sourceRel: "publish-pdf/staging/02-tool-management.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/02-tool-management.md"
sourceSha256: "ff29c62f7add4777020864a28d5f388f5a1eb17b853650aa8e6eba538c7c00c1"
pageSha256: "d42af1710588a822fa0ac69f3c954e26480b1b76c3a726dc2ec9f4108e3c0deb"
contentMode: "local-full"
zh: ""
---

## Q：没有 MCP 之前大模型调用工具走的是什么流程？MCP 本身有什么缺点或者挑战？

> 来源：淘天/AI Agent一面 【小得盈满一面追问：上下文膨胀、Secret 隔离与工具投毒】

**新手答**：“就是 Function Calling，模型输出 JSON 然后调用工具。”

**高手答**：

**Pre-MCP 时代的工具调用流程**：

每个工具需要手写完整的适配层，链路如下：

关键痛点：**不同模型的 FC 格式不同**——OpenAI 用 `tool_calls`、Claude 用 `tool_use`、Qwen 有自己的格式。同一个工具跨模型迁移要重写适配代码，维护成本随模型数量线性增长。

**MCP 解决了什么**：

| 维度 | Pre-MCP | MCP |
|------|---------|-----|
| 工具定义 | 每个模型一套 Schema 格式 | 统一 JSON Schema |
| 工具发现 | 硬编码在配置里 | `tools/list` 动态发现 |
| 传输方式 | 自己选 HTTP/gRPC/本地调用 | 标准化（stdio/SSE） |
| 权限模型 | 自行实现 | 协议内置（OAuth2.1） |
| 跨模型复用 | 每换一个模型重写适配 | 一次实现，所有 Agent 复用 |

**MCP 的缺点/挑战（批判性视角）**：

1. **上下文膨胀与选择干扰**：每次连接都要走 `initialize → tools/list`。如果把工具名、说明、参数 schema 和示例全量暴露给模型，100 个工具 × 200 token/工具 = 20K token，还没开始干活就已经消耗大量上下文；候选工具越多，误选和参数混淆也越容易发生。生产环境应先按租户、权限和任务召回工具，再按需披露完整 schema
2. **无状态设计的代价**：工具之间数据传递只能靠上下文中转——工具 A 的输出要传给工具 B，必须先回到模型再传出去，不能工具间直接通信
3. **鉴权边界容易被用错**：协议支持认证，不代表密钥可以交给模型。CLI 或 Host 进程应持有凭证，并在传输层注入授权信息；密钥不能出现在模型上下文、工具参数、日志或工具返回中。Server 端还要按用户和租户做最小权限鉴权，不能只相信模型传入的身份字段
4. **中间层与工具投毒**：社区 MCP Server、代理层或被篡改的工具描述和返回值都可能夹带提示注入，诱导模型调用高危工具或泄露数据。需要 Server 白名单、schema 版本锁定、结果净化、来源追踪和高危操作审批，不能把工具输出当成可信指令
5. **流式返回不完善**：工具结果是一次性返回的，不支持 partial result，长耗时工具的用户体验差

**差距在哪**：新手只能说出“Function Calling”三个字但说不清完整链路。高手能完整对比 Pre-MCP 和 Post-MCP 的差异，且能批判性地指出 MCP 的五个现实挑战。面试官考的是对工具调用演进历史的理解深度，以及对 MCP 局限性的独立思考能力。
