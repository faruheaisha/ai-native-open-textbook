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
pageSha256: "58cb2b695fbad5bf4fcc56b6392e884c0bab16ac536f5b799cac3cae67205299"
contentMode: "local-full"
zh: ""
---

## Q：Agent 失败通常有哪些原因？如何快速定位责任层？

> 来源：点点互动/Agent开发秋招一面【阿里 Agent Infra 一面题库同题：模型与 Infra 故障归因】【[8.26百度二面](https://www.nowcoder.com/feed/main/detail/190c6c68414b491d856091e42aef2386)追问：根因定位的 Agent 能详细讲一下吗？】

**新手答**：“可能是模型幻觉、工具报错或者网络超时，失败了就重试。”

**高手答**：

先按执行链路分层，而不是看到失败就重试：

| 层级 | 常见失败 | 关键证据 | 处理方式 |
|------|----------|----------|----------|
| 输入与意图 | 需求模糊、路由错误 | 原始输入、路由置信度 | 澄清或重路由 |
| 规划 | 步骤缺失、依赖顺序错误 | Plan、状态迁移记录 | 重规划或规则校验 |
| 模型 | 幻觉、格式不合法 | Prompt、原始响应、解析错误 | 约束解码或降级模型 |
| 工具 | 参数错误、权限不足、超时 | Tool call、错误码、耗时 | 修参、授权、按错误类型重试 |
| 状态与记忆 | 旧状态污染、并发覆盖 | Checkpoint、版本号、trace id | 回滚、隔离或重建状态 |
| 输出验证 | 答案与证据不一致 | 引用、验证器结果 | 拒绝输出或进入修复环 |

生产系统应给每次运行分配 trace id，把 plan、模型调用、工具调用、状态版本和验证结果串成一条可回放链路。重试策略必须按错误分类：瞬时故障可指数退避，确定性参数错误不能原样重试，业务冲突应回滚或转人工。

线上成功率突然下降时可以按 `Scope → Change → Breakdown → Trace` 收敛：先圈定租户、地域、版本和任务类型，再核对模型、Prompt、Tool、Runtime 与基础设施变更；随后按统一错误分类比较各层失败率，最后在失败 Trace 中找到第一个异常 Span。模型请求成功但任务语义错误，和 Pod OOM、网络超时等 Infra 失败必须分开统计。

**差距在哪**：新手罗列故障名词并统一重试，高手按链路分层、用证据定位，并为不同故障设置不同恢复策略。面试官考的是生产级可观测性和故障归因能力。
