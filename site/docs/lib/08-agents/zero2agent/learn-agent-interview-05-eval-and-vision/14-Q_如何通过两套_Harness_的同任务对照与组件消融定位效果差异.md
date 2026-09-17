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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "2db5da8adf177acd65ad87c0304d408af087e126681f1215b5fbb81192fa354b"
contentMode: "local-full"
zh: ""
---

## Q：如何通过两套 Harness 的同任务对照与组件消融定位效果差异？

> 来源：[Teamily AI QA/测开面经](https://www.nowcoder.com/feed/main/detail/6a01e27dc1b142d29921eb3cc7bcd20f)【[深信服 ai agent 一面](https://www.nowcoder.com/feed/main/detail/83326f3bcc5546b2b556373ad29a6d71)追问：如何评估 Harness 效果？】

**新手答**：“让两个 Harness 各跑一遍，哪个成功率高就用哪个。”

**高手答**：

直接比较两个端到端分数只能说明“整体不同”，不能说明差异来自哪里。先冻结模型及采样参数、任务集、工具和数据版本、权限、预算、并发和运行环境；两套 Harness 使用同一成功条件和统一 trace schema，否则模型更强、工具更快或评测口径不同都会被误算成 Harness 收益。

诊断分三步：

1. **端到端基线**：比较任务成功率、步骤数、Token、延迟、工具错误、恢复率和安全违规，并按任务类型切片。
2. **首错点对齐**：把 Context Builder、Planner/Router、Tool layer、Memory、Retry、Verifier 的输入输出映射到同一逻辑阶段，找到第一处行为分叉。
3. **组件互换/消融**：在 A 中替换 B 的单个组件，或关闭某项能力；每次只改变一个变量。若单组件无收益但组合有收益，再做二阶交互实验。

每次运行保存任务、组件/Prompt/模型版本、随机种子、候选工具、状态迁移、Observation 和验收证据。统一 trace 可以参考 OpenTelemetry 对 [Trace 与 Span 语义](https://opentelemetry.io/docs/specs/semconv/general/trace/)的约定，但 Agent 阶段字段仍需项目自己定义。随机任务应重复运行并报告置信区间，不能凭一两个 case 下结论。

如果两套结果都差，先看共同失败：任务定义或 Oracle 错、模型能力不足、工具/数据有缺陷，还是两套都缺少同一种恢复机制。修复后同时跑局部组件集和端到端回归，避免“Router 指标变好但最终成功率下降”。

**差距在哪**：新手做产品赛马。高手通过控制变量、首错点对齐和组件交换建立因果证据，既能识别单组件收益，也能发现组件之间的交互效应。
