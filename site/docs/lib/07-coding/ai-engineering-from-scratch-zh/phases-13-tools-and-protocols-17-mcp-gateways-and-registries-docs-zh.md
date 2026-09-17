---
title: "无状态 MCP 网关与注册表准入"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/zh.md"
sourceRel: "phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/zh.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/zh.md"
sourceSha256: "f57dfa69d268ed7a61912daf3aee55a8576e005595f816f6172a82aaf2810c67"
pageSha256: "f57dfa69d268ed7a61912daf3aee55a8576e005595f816f6172a82aaf2810c67"
contentMode: "local-full"
zh: ""
---

# 无状态 MCP 网关与注册表准入

> 网关应让每条路由清晰可见。2026-07-28 协议为它划定方法、名称、版本、能力、身份、缓存和追踪边界，无需传输层会话。

**类型：** Learn
**语言：** Python
**前置要求：** 阶段 13 · 15（安全）、阶段 13 · 16（授权）
**预计时间：** ~75 分钟

## 学习目标

- 在不依赖会话亲和性的情况下，将多个 MCP server 聚合在一个 2026-07-28 端点后。
- 在执行策略或转发前校验每个请求的元数据和路由头。
- 以稳定命名空间、确定性顺序、描述符钉定、RBAC 和私有缓存合并工具。
- 将注册表记录视为仍需准入策略的发现证据。
- 正确路由请求范围内的 SSE、`subscriptions/listen`、MRTR 重试和 Tasks 扩展调用。
- 将旧版握手与会话支持隔离在现代路径外。

## 问题背景

把一个 client 直接连到一个 server 很简单。规模更大的部署需要为这些更棘手的问题给出一致答案：

- 哪些 server 被允许？
- 哪个主体能看到和调用每个工具？
- 两个后端暴露同名工具时怎么办？
- 如何审查描述符变更？
- 在哪里实施限流和记录审计事件？
- 任意实例都能处理下一个请求吗？

网关位于 client 和后端 MCP server 之间。它呈现一个 MCP 端点，实施横切策略，并转发已批准的请求。

早期网关设计常把一个 client 会话多路复用为多个后端会话，并重写 `Mcp-Session-Id`。那是旧版兼容设计。2026-07-28 核心没有协议会话。

## 核心概念

### 现代网关路径

对每个请求：

1. 从传输层授权信息认证主体。
2. 校验 `MCP-Protocol-Version`、`Mcp-Method`、`Mcp-Name` 和 `params._meta`。
3. 对主体、资源、方法、工具和参数授权。
4. 应用描述符、注册表、限流和数据策略。
5. 为选定后端创建全新的自包含请求。
6. 校验后端结果并返回网关结果。
7. 记录审计事件，不记录机密信息。

没有一步需要隐藏的协议会话。应用状态仍可存在于数据库、显式句柄、Tasks 或受完整性保护的 MRTR 状态中。

### 运行时策略是网关的主要决策

准入决定哪个后端版本可以进入网关，并不授权一次实时调用。对每个请求，网关都会依据已认证主体、issuer 和 resource、租户、匹配的方法和名称、规范化参数、已准入的描述符钉定、当前后端健康状态、能力交集、数据分类、限流状态和任何与动作绑定的批准，重新计算策略。

这个顺序很重要。用户角色被撤销时，Registry 记录仍可能活跃；目标参数跨越租户边界时，描述符仍可能被钉定；事故策略隔离变更状态调用时，后端仍可能获批。因此运行时策略才是主要的允许或拒绝决定，Registry 和描述符证据只是输入。

不要按连接或已移除的会话标识符缓存允许决定。策略不可用时，应按操作类别采取预先声明的失败策略。安全默认值是对状态变更和敏感读取失败关闭；明确批准的公开读取路径只有在其风险模型允许时，才可短暂使用最后已知策略。记录作出决定所用的策略版本和失败路径，然后在返回前校验后端结果。

### 一个 POST 端点

现代 Streamable HTTP 通过 POST 发送每条 JSON-RPC 消息：

```text
POST /mcp
