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
pageSha256: "41592471a3e86e3c29267da64821e0211eaee85f06314f6f0ff745c039ba37b1"
contentMode: "local-full"
zh: ""
---

## Q：Tool Result 回写模型时，消息契约应该包含哪些字段？

> 来源：Newegg 一面（2026-08-22）【字节火山引擎 Managed Agent 一面追问：Function Call 与 Tool Result 回到上下文】

**新手答**：“返回 call_id 和工具执行结果。”

**高手答**：至少包含稳定 `call_id`、工具/版本、状态、结构化 payload、错误分类、是否可重试、副作用状态、证据引用、截断/分页信息和耗时。结果与原调用一一对应，并区分“执行成功但业务失败”“状态未知”和“部分完成”。大结果落对象存储，只回摘要与受权引用；模型可见错误不得泄露内部堆栈和秘密。

**差距在哪**：新手能串起协议，高手让结果可恢复、可审计且语义无歧义。
