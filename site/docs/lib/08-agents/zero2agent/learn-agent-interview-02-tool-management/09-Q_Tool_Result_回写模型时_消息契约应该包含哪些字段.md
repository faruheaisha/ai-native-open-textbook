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
pageSha256: "808b6e7f7e5385fedb9f184ee1693ef8f9a4e2ea168f18e5b7fa6f3239831f14"
contentMode: "local-full"
zh: ""
---

## Q：Tool Result 回写模型时，消息契约应该包含哪些字段？

> 来源：[Newegg 一面](https://www.nowcoder.com/discuss/920719616005898240)（2026-08-22）【字节火山引擎 Managed Agent 一面追问：Function Call 与 Tool Result 回到上下文】；[字节中国交易与广告 AI 应用开发一面](https://www.nowcoder.com/feed/main/detail/b34f6902e8544fe2953696ed52e49dba)

**新手答**：“返回 call_id 和工具执行结果。”

**高手答**：至少包含稳定 `call_id`、工具/版本、状态、结构化 payload、错误分类、是否可重试、副作用状态、证据引用、截断/分页信息和耗时。结果与原调用一一对应，并区分“执行成功但业务失败”“状态未知”和“部分完成”。大结果落对象存储，只回摘要与受权引用；模型可见错误不得泄露内部堆栈和秘密。

模型消息通常至少区分 System、User、Assistant 和 Tool：System 放宿主规则，User 表达任务，Assistant 可以携带文本或 `tool_calls`，Tool 消息只回写对应调用的执行结果。并行调用时每个 Tool Result 必须用协议字段与原始 `tool_call_id` 精确配对，不能靠消息顺序猜。进度、审批、重试调度和审计记录属于宿主运行事件；只有模型下一步确实需要的投影才进入对话消息，避免把内部事件流伪装成 User/Tool 消息污染上下文。

**差距在哪**：新手能串起协议，高手让结果可恢复、可审计且语义无歧义。
