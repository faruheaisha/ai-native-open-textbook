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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-architecture-design.md"
sourceRel: "publish-pdf/staging/01-architecture-design.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/01-architecture-design.md"
sourceSha256: "5392c35240d8ade29e7a3bd3d16f639416d4d44c3540bc40d195968737985cc6"
pageSha256: "49ffead9f89aeb66398cd724189711ae2225e1e32010a9deb9961c02d3d741a7"
contentMode: "local-full"
zh: ""
---

## Q：Agent 如何持续推进 Goal，并避免行为漂移和目标漂移？

> 来源：腾讯 WXG 微信读书一面（2026-08-24）

**新手答**：“把目标写进 System Prompt，每轮提醒模型，并设置最大循环次数。”

**高手答**：Goal 不能只是一句反复拼接的自然语言，而要编译成可执行、可验证的任务契约：包含成功条件、硬约束、禁止事项、证据要求和终止条件。Planner 将它拆成带依赖的子目标；运行时单独维护 `goal_id`、当前计划、完成证据、未决项和预算，不能让模型靠聊天历史自行判断进度。

每次行动前做三项门禁：该行动服务于哪个未完成子目标，是否违反权限或成本约束，成功后能产生什么可验证证据；无法回答就澄清或重规划。行动后由工具结果、测试或规则 Verifier 更新状态，不能让模型凭一句“已完成”关闭任务。环境变化、连续低信息增益或前提失效时允许有限重规划，但原始 Goal 和硬约束不可被重写；用户确实改变目标时，应生成新版本并记录差异。

工程上还要保存结构化 trace，监控无目标行动率、重复行动率、约束违反率和目标覆盖率。最大步数、Token 和时间预算只是失控兜底，不是完成标准；预算耗尽而目标未满足时应明确报告未完成项和所需输入。

**差距在哪**：新手依赖 Prompt 提醒，高手把 Goal 变成版本化契约，用子目标、证据、行动门禁和有限重规划形成闭环。面试官考的是 Agent 能否长期推进任务，同时保持行为可解释、目标不可被中间上下文悄悄改写。
