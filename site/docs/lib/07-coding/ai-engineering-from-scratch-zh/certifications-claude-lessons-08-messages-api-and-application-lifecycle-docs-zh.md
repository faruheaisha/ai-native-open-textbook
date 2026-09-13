---
title: "Messages API 是一台状态机"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/README.md"
zh: ""
---

# Messages API 是一台状态机

> 对话状态由应用维护。一个放错位置的内容块就能破坏整个循环。

**类型：** Build
**语言：** Python
**前置要求：** [把能力花在失败代价高的地方](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/02-model-selection-and-token-economics/README.md)、[把请求变成可测试的合约](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/03-prompting-and-task-decomposition/README.md)、[把每项事实放进正确的上下文](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/04-context-knowledge-memory-and-caching/README.md)
**预计时间：** 约 120 分钟

## 学习目标

- 把一次 Claude 请求建模为明确的应用状态转换
- 分别选择 SDK 或原始 REST，以及同步、流式或批量交付方式
- 使用明确的资产边界构建图片与文档内容块
- 保留类型化响应块，并根据 `stop_reason` 分支处理
- 执行会话、重试、超时、保留和上下文预算规范
- 不依赖真实 API key，测试完整生命周期

## 一次失败，读懂协议

某工程师发送了以下序列：

1. 用户问：“订单 A-17 在哪里？”
2. Claude 返回一个 ID 为 `toolu_01` 的 `tool_use` 块。
3. 应用运行 `lookup_order`。
4. 应用在一个新请求中只发送工具结果。

第二个请求失败了，或者 Claude 的回复仿佛它从未请求过工具。

这并不神秘。Messages API 是无状态的。客户端没有重新发送包含原始 `tool_use` 块的 assistant 消息。`tool_result` 不是独立事实；它在由你的代码维护的对话序列中，通过 ID 回答一项具体工具请求。

框架会替你维护消息数组，所以这个问题很容易被忽略。认证要求你在便利层之下理解协议。亲手构建一次原始状态机，之后调试任何 SDK、agent 框架和托管 runtime 都会容易得多。

## 一次请求，一次转换

请求向模型提供模型、system 指令、消息、token 控制和可选能力。响应返回内容块、用量元数据和生成停止原因。下一步做什么，由应用决定。

```json
{
