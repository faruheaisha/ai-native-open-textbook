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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "99d5a18a3f1a506169ded1df1af231810b99b4242b8e7f6a03bd243193209151"
contentMode: "local-full"
zh: ""
---

## Q：Skill 间需要传递敏感信息时，如何做到内部可用、对用户不可见？

> 来源：[百度 Coding Agent 二面](https://www.nowcoder.com/feed/main/detail/b9521e2b51e04afeac0a3a32e13f4da9)【[pdd agent 一面](https://www.nowcoder.com/feed/main/detail/ee971b755cbd475a91ef62cee38cdac8)追问：使用Skill实现时，如何防止向用户泄漏业务数据和核心脚本？】

**新手答**：“在 Prompt 里告诉模型不要把密钥输出给用户。”

**高手答**：

Prompt 不是机密性边界。真正的设计目标是：**让下游 Skill 获得使用秘密的能力，而不是获得秘密本身**。密码、Token、私钥和敏感业务字段默认不进入模型上下文、Tool Message、流式事件或可检索记忆。

先把跨 Skill 数据分成两条通道：

| 通道 | 内容 | 约束 |
|---|---|---|
| 模型可见状态 | 脱敏摘要、资源 ID、权限结论、操作结果 | 可进入上下文，但仍按租户和任务隔离 |
| 运行时机密状态 | Secret reference、短期凭证、原始敏感字段 | 通过模型外 envelope 传递，只由受控 Connector 解引用 |

`secret_ref` 不进入 Prompt 或普通 Tool Message，而是放在模型外 envelope 中，并绑定 `run_id + tool_id + audience + scope + TTL`；它不可转让，也不能由可执行任意代码的下游 Skill 自行兑换。编排器检查调用方身份、任务目的和目标资源后，只让可信 Connector 在真正发请求时解引用，并向模型返回“授权成功/失败”和脱敏结果。

当前 MCP [Authorization 规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)适用于启用授权的 HTTP transport，不代表所有 transport 都自动具备 OAuth 边界。MCP Client 获得的 Token 也不得透传给下游 API；Connector 应为目标资源换取或注入独立 audience 的短期凭证。“哪些字段可进入模型和用户输出”仍是应用侧的信息流策略。

还要对所有输出 sink 做统一门禁：

1. **Prompt/Tool Result**：只允许白名单字段，原始错误栈和响应头先脱敏。
2. **日志/Trace**：敏感值不落明文，保留分类标签、哈希或受权引用。
3. **流式响应/最终答复**：输出前再次做字段级策略检查，不能只扫敏感词。
4. **持久化与回放**：机密状态有独立 TTL、吊销和删除流程；回放环境使用替代凭证。

如果无法证明一条数据从 source 到 sink 的授权链，系统应拒绝传递或转人工，而不是让模型决定“这次应该没事”。

**差距在哪**：新手把保密寄托在模型自律。高手把数据分级、Secret reference、短期授权和输出 sink 做成模型外的确定性信息流控制，让 Skill 能完成任务却拿不到可泄露的长期秘密。
