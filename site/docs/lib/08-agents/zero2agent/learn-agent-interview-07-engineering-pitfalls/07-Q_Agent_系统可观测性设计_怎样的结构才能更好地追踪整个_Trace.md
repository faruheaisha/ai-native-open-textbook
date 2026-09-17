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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "55028d11bbb1dc42295da89198d4cc3d3d916cf0b496f5226050b356f32dfafc"
contentMode: "local-full"
zh: ""
---

## Q：Agent 系统可观测性设计——怎样的结构才能更好地追踪整个 Trace？

> 来源：美团Agent开发（智能客服方向）二面 【懂车帝 Agent 开发一面追问：Trace、日志、指标和配置版本联合归因】【阿里 Agent Infra 一面题库追问：Agent Trace 字段与成功率突降排查】 / [阿里千问 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/463438ee0d9e403b98e8578a05ba4e3f) / [百度 Agent 二面](https://www.nowcoder.com/feed/main/detail/bca7dc14bd654e91b89792608111b211)【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：如何设计 Agent 全链路追踪（Trace）和可观测性（Metrics）？】【[百度Agent一面](https://www.nowcoder.com/feed/main/detail/72858aade19d443facc870fea8bb134f)追问：用户的一次请求在最终的 Trace 展示上是什么形式？Trace 具体怎么用，会做分析吗？】【[格物致信（一面过，二面线下拒）](https://www.nowcoder.com/feed/main/detail/f68f0d54184944c391e0d7b6d1bb82c8)追问：Agent很容易变成黑盒，任务失败你如何做可观测性？】

**新手答**：“每一步打个日志就行。”

**高手答**：

Agent 的可观测性和传统微服务 tracing 有本质区别——它是非确定性的。核心设计：
1. **Trace 结构**：每次 Agent 调用生成唯一 trace_id，内部用 span 表示 LLM 调用、工具调用、记忆检索等步骤，形成树状结构
2. **结构化日志**：每个 span 记录输入输出摘要、token、延迟、重试、缓存命中、错误码和业务主键；敏感原文按权限脱敏或不落盘
3. **决策依据**：记录“选了哪个动作、基于哪些可公开的证据和规则”，不要依赖不可审计的原始思维链
4. **跨 Session 关联**：用 user_id + session_id + trace_id 三级关联，支持用户维度的行为分析
5. **异常检测**：设置 token 消耗异常、循环调用、工具连续失败等自动告警规则
6. **版本指纹**：在根 span 和关键子 span 记录 Prompt、模型、Tool Schema、Skill/路由规则、知识库索引和运行配置版本

定位问题时要联合四类证据：Metrics 先确认影响范围和异常时段，Trace 找到慢或错的首个 span，结构化日志还原该节点的输入、重试和错误上下文，版本指纹判断是否由发布变更引起。只看其中一种，容易把下游等待误判成模型慢，或把路由变化误判成数据波动。

线上成功率突降时，回答顺序可以固定为 `Scope → Change → Breakdown → Trace`：先切分租户、地区、模型和 Agent 版本，再核对变更，按 LLM/RAG/Tool/Runtime/Infra 分层比较失败率，最后用成功与失败 Trace 找到第一个分叉点。

日志本身也可能制造假象：把真正失败记成 `INFO`/`DEBUG`、捕获异常后返回空结果、只记录最终 fallback 成功，都会让错误率看似正常。异常被降级时仍应设置 span error status，保留原始错误分类和 fallback 链路；日志级别、指标计数与用户看到的结果要使用同一套错误语义。

入口层应在鉴权、路由和协议解析后统一创建根 span，并把 `traceparent`、业务请求 ID 和版本指纹传到模型网关、RAG、工具服务与异步队列；每个服务只补自己的子 span，避免跨服务后断链。排查“哪个 Agent 最慢”时，先从端到端 Trace 找首个耗时异常或错误 span，再区分本节点计算、排队、重试和下游等待，不能把最后返回的服务当成首因。Metrics 负责发现趋势和影响面，Trace 负责定位路径，Logs 负责解释节点细节，三者通过同一组关联 ID 汇合，不需要背厂商组件清单。

**差距在哪**：面试官要看你是否理解 Agent 的 Trace 不是 request→response 那么简单，需要记录决策过程才能 debug。
