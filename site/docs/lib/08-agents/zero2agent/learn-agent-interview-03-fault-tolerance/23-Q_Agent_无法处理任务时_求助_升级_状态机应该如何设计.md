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
pageSha256: "a5ccccfd001188229d30f1b4cc4a17667ba35d9d117753a84ca2ce51adc158a0"
contentMode: "local-full"
zh: ""
---

## Q：Agent 无法处理任务时，“求助 / 升级”状态机应该如何设计？

> 来源：[百度 Agent 研发岗一面](https://www.nowcoder.com/discuss/926273622006665216)

**新手答**：“连续失败几次就转人工，并把聊天记录发给人工。”

**高手答**：先区分失败类型：缺信息进入 `NEED_INPUT`，能力缺失进入 `NEED_SPECIALIST`，工具暂时故障进入 `RETRY_WAIT`，权限或高风险动作进入 `NEED_APPROVAL`，不可恢复错误才进入 `ESCALATED`。每个状态必须定义进入条件、允许动作、超时和终态，不能用一个模糊的 `failed` 覆盖所有情况。

升级包应包含用户目标、已确认约束、已执行步骤、工具证据、失败分类、剩余预算和明确的下一步请求；原始长对话只作为可追溯附件。接管者返回 `accepted / need_more_context / rejected`，编排器用版本号和 lease 确保同一任务只有一个 owner。人工或专门 Agent 接管后，旧 Worker 的迟到结果不能覆盖新状态。

还要设置防振荡策略：同一路径连续升级失败时不能在主 Agent 与兜底 Agent 间循环；使用最大升级深度、冷却时间和已尝试能力集合。指标至少包括升级率、误升级率、接管后成功率、上下文补问次数、等待时间和重复副作用。

**差距在哪**：新手把升级当转发聊天记录，高手把失败类型、所有权转移、上下文交接和防循环写成可验证状态机。
