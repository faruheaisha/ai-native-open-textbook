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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "0c68b318a1f0c8b92cf3254794fba088ba264ff54abc587f476f9582ca51de09"
contentMode: "local-full"
zh: ""
---

## Q：Agent 系统可观测性设计——怎样的结构才能更好地追踪整个 Trace？

> 来源：美团Agent开发（智能客服方向）二面 【懂车帝 Agent 开发一面追问：Trace、日志、指标和配置版本联合归因】

**新手答**：”每一步打个日志就行。”

**高手答**：

Agent 的可观测性和传统微服务 tracing 有本质区别——它是非确定性的。核心设计：
1. **Trace 结构**：每次 Agent 调用生成唯一 trace_id，内部用 span 表示 LLM 调用、工具调用、记忆检索等步骤，形成树状结构
2. **结构化日志**：每个 span 记录输入输出摘要、token、延迟、重试、缓存命中、错误码和业务主键；敏感原文按权限脱敏或不落盘
3. **决策依据**：记录“选了哪个动作、基于哪些可公开的证据和规则”，不要依赖不可审计的原始思维链
4. **跨 Session 关联**：用 user_id + session_id + trace_id 三级关联，支持用户维度的行为分析
5. **异常检测**：设置 token 消耗异常、循环调用、工具连续失败等自动告警规则
6. **版本指纹**：在根 span 和关键子 span 记录 Prompt、模型、Tool Schema、Skill/路由规则、知识库索引和运行配置版本

定位问题时要联合四类证据：Metrics 先确认影响范围和异常时段，Trace 找到慢或错的首个 span，结构化日志还原该节点的输入、重试和错误上下文，版本指纹判断是否由发布变更引起。只看其中一种，容易把下游等待误判成模型慢，或把路由变化误判成数据波动。

日志本身也可能制造假象：把真正失败记成 `INFO`/`DEBUG`、捕获异常后返回空结果、只记录最终 fallback 成功，都会让错误率看似正常。异常被降级时仍应设置 span error status，保留原始错误分类和 fallback 链路；日志级别、指标计数与用户看到的结果要使用同一套错误语义。

**差距在哪**：面试官要看你是否理解 Agent 的 Trace 不是 request→response 那么简单，需要记录决策过程才能 debug。
