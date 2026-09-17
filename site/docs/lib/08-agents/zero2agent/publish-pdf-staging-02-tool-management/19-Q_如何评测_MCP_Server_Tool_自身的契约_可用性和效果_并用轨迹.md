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
pageSha256: "671352aad6f8bbfe3c8ec51d29e099906149aca0ddd3088fcc9ebf6a115801bc"
contentMode: "local-full"
zh: ""
---

## Q：如何评测 MCP Server / Tool 自身的契约、可用性和效果，并用轨迹 Badcase 持续迭代？

> 来源：阿里控股 Agent Infra 暑期一面（2026-04-07）

**新手答**：“用 MCP Inspector 调通工具，再统计调用成功率和延迟；失败样本拿来改 Tool Description。”

**高手答**：

先把“工具是否合格”和“模型是否会用工具”拆开。Server/Tool 单体评测使用固定请求或确定性调用器，避免把模型选错工具归咎于实现；端到端评测再让 Agent 参与，验证描述、选择和结果利用。两层共享同一工具版本和 trace，才能定位首个失败点。

单体评测建立分层门禁：

| 层级 | 测试内容 | 关键指标 |
|------|----------|----------|
| 协议契约 | 初始化与能力发现、`tools/list`、输入/输出 schema、错误对象、取消和版本兼容 | schema 通过率、兼容性失败数 |
| 功能语义 | 黄金输入、边界值、非法参数、权限不足、幂等重放、部分失败和副作用对账 | 结果正确率、错误分类准确率、重复副作用数 |
| 可用性 | 冷启动、并发、超时、断连、重连、限流、依赖故障和资源泄漏 | 成功率、P50/P95/P99、超时率、容量和恢复时间 |
| 安全治理 | 身份与 scope、跨租户、Secret 泄漏、恶意参数、工具结果提示注入和审计完整性 | 越权率、泄漏数、审计覆盖率 |
| Agent 效果 | 正/负/歧义请求、多工具相似候选、返回结果能否支撑最终答案 | Tool Precision/Recall、参数正确率、任务成功率和效用增量 |

“效果”要做对照实验：固定任务分别运行无该 Tool、旧版本和候选版本；不仅看调用率，还看它是否提升最终成功率、证据质量，并控制延迟、Token、外部费用和副作用风险。对随机或实时结果使用不变量、范围和 metamorphic test，而不是要求字面完全一致；会写数据的 Tool 在隔离环境中测试，并以业务状态对账作为 oracle。

轨迹回流先做首错点归因：能力发现失败、描述误导、选错 Tool、参数构造、Server 执行、结果契约、Observation 未被模型使用，还是下游推理错误。Badcase 脱敏后保留输入、候选工具、schema/Server/模型版本、调用参数、结果摘要、时序和人工标签；聚类后转成最小可复现用例，分别进入契约集、语义回归集或 Agent 路由集。修复应对症：改 schema/实现、Tool Description、路由样本或恢复策略，而不是所有失败都靠改 Prompt。

发布时对旧版和候选版跑同一不可变回归集，再做 shadow 和按租户灰度；严重越权、重复副作用和契约破坏是一票否决，质量、延迟与成本采用分层阈值。每个 Badcase 绑定修复版本与回归用例，持续监控线上分布漂移和长尾工具覆盖率，防止只把热门工具越测越好。

**差距在哪**：新手把“能调通”当成“工具可用”，高手分离协议、功能、SLO、安全和 Agent 效用，用首错点归因把轨迹 Badcase 变成可复现回归门禁。面试官考的是能否把 MCP 工具生态做成持续交付的基础设施。
