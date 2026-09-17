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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/01-architecture-design/index.md"
sourceRel: "learn-agent-interview/01-architecture-design/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/01-architecture-design/index.md"
sourceSha256: "27323a2663d0a83175728db159268a6a57cdca2097344c6d6c8c0210cc6da232"
pageSha256: "a8372933e5e032c216a065f4adf3fdf8545992dc98327a32ee249e3fdeeda8ca"
contentMode: "local-full"
zh: ""
---

## Q：ReAct 在工程实现中，消息和状态协议应该怎么设计？

> 来源：字节跳动/AI Agent 秋招一面 【[OPPO IT 开发一面](https://www.nowcoder.com/discuss/923561467092160512)追问：ReAct 工程实现与上一轮结果传递】

**新手答**：“把 Thought、Action、Observation 按顺序拼到 Prompt 里。”

**高手答**：

生产级 ReAct 不能依赖自由文本拼接，而要把每一步建模成可验证的结构化事件。ReAct 和 Plan Mode 也不应是两套互不相干的程序：外层用同一个任务状态机，Plan Mode 先产生带依赖的步骤图，ReAct 则在每个步骤内部根据 observation 动态决策；执行失败、证据不足或环境变化时再回到 Planner 重规划。

典型状态可以设计为 `RECEIVED → CONTEXT_READY → PLANNED → EXECUTING → VERIFYING → COMPLETED`，并允许转入 `WAITING_FOR_USER / RETRYING / REPLANNING / FAILED / CANCELLED`。状态迁移由编排器根据结构化事件驱动，而不是让模型用自然语言声称“现在进入下一步”。

| 字段 | 作用 |
|------|------|
| `step_id / parent_id` | 串起因果链，支持分支与回放 |
| `intent / plan_ref` | 说明本步服务于哪个子目标 |
| `action` | 工具名、版本和结构化参数 |
| `observation` | 标准化结果、错误码、证据引用 |
| `status` | pending/running/succeeded/failed |
| `budget` | 剩余步骤、token、时间和成本 |

模型可见上下文只放完成当前决策所需的摘要；原始 observation、内部错误和审计信息保存在外部状态存储。执行器在工具调用前做 schema、权限和幂等校验，调用后统一标准化结果；策略层再决定继续、重试、重规划或终止。每一步落 checkpoint，才能在断点恢复时从确定状态继续，而不是重放整段自然语言历史。

消息协议与 Runtime 状态要分开：System/User/Assistant/Tool 消息是模型视图，Run/Step/Attempt、租约、预算和副作用记录是控制面事实。上一轮结果先写成带来源、状态和 `tool_call_id` 的 Observation，再由 Context Builder 投影必要摘要；不能把自由文本日志全部回灌，也不能让模型输出的“已完成”直接驱动状态迁移。

**差距在哪**：新手描述论文里的循环，高手把循环落成结构化事件协议、状态机、预算和 checkpoint。面试官考的是能否把 ReAct 从 Prompt Demo 做成可恢复、可审计的系统。
