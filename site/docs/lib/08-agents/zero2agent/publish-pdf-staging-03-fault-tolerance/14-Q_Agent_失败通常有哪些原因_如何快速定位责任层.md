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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-fault-tolerance.md"
sourceRel: "publish-pdf/staging/03-fault-tolerance.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/03-fault-tolerance.md"
sourceSha256: "3d3fec6536b92234d38c933ae3738bd2e2f0687c81d39b5421d097eec7da0e12"
pageSha256: "15c95f4d1a63d6a3f2627703f110be5f25b97bf9be795a21310d3e12033bd442"
contentMode: "local-full"
zh: ""
---

## Q：Agent 失败通常有哪些原因？如何快速定位责任层？

> 来源：点点互动/Agent开发秋招一面

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

**差距在哪**：新手罗列故障名词并统一重试，高手按链路分层、用证据定位，并为不同故障设置不同恢复策略。面试官考的是生产级可观测性和故障归因能力。
