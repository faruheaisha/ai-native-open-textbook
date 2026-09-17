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
pageSha256: "e071455fd23258c51b0be7e8ca0966fad29ed41dc691f4d9e1c8b0d883b2bc7d"
contentMode: "local-full"
zh: ""
---

## Q：AI Coding Agent 的 Solo 模式和 Plan 模式应该如何设计？

> 来源：[字节 Trae 二面](https://www.nowcoder.com/discuss/924821959647440896)

**新手答**：“Solo 模式让 Agent 直接改代码，Plan 模式先输出计划让用户确认。”

**高手答**：两种模式应共享代码检索、工具权限、工作区快照和任务状态机，区别是决策门禁。Solo 在目标清晰、影响范围小、验证充分时允许 Agent 连续执行；Plan 先产出包含目标、涉及文件、步骤依赖、风险、验证方式和待确认假设的结构化计划，用户确认的应是这些决策点，而不是一段不可执行的说明文字。

计划确认后要冻结 `plan_version` 和基线 commit，每个执行步骤回写状态、证据与偏差。发现新依赖或修改范围扩大时，不能悄悄继续，应生成 plan diff 并重新确认高风险部分；低风险局部调整可以在预先约定的预算内自治。模式切换也必须发生在 checkpoint：Plan 转 Solo 要保留已确认约束，Solo 升级 Plan 则要暂停副作用并解释触发原因。

验收不能只看是否生成代码。还要比较任务成功率、计划变更率、用户确认次数、错误修改范围、回滚率、耗时和 Token 成本，并按重构、修 Bug、跨仓库变更等任务类型切片。这样 Solo/Plan 是风险与自治程度的控制面，而不是两个互不相干的产品按钮。

**差距在哪**：新手只描述交互顺序，高手把计划版本、偏差处理、模式切换和验收指标设计成同一执行协议。
