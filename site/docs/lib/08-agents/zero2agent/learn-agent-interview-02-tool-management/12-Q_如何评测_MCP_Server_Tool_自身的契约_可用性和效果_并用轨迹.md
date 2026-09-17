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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/02-tool-management/index.md"
sourceRel: "learn-agent-interview/02-tool-management/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/02-tool-management/index.md"
sourceSha256: "aa8ef11d87c2122215c82572365a04968e18ba073c2f852c7624cc42745ca7d2"
pageSha256: "e5098a362e8675c56834bea3857c9bce33d68f6db6217b34fb807233f6dca833"
contentMode: "local-full"
zh: ""
---

## Q：如何评测 MCP Server / Tool 自身的契约、可用性和效果，并用轨迹 Badcase 持续迭代？

> 来源：阿里控股 Agent Infra 暑期一面【[未知公司 Agent 二面](https://www.nowcoder.com/feed/main/detail/16675d793c0c42e8a6b46d42fb561561)追问：如何判断 CLI/MCP 是否 AI-Friendly】

**新手答**：“用 MCP Inspector 调通工具，再统计调用成功率和延迟；失败样本拿来改 Tool Description。”

**高手答**：

先把“工具是否合格”和“模型是否会用工具”拆开。Server/Tool 单体评测使用固定请求或确定性调用器，避免把模型选错工具归咎于实现；端到端评测再让 Agent 参与，验证描述、选择和结果利用。两层共享同一工具版本和 trace，才能定位首个失败点。

单体评测建立分层门禁：

| 层级 | 测试内容 | 关键指标 |
|------|----------|----------|
| 协议契约 | 初始化与能力发现、`tools/list`、输入/输出 schema、错误对象、可选取消能力及竞态、版本兼容 | schema 通过率、兼容性失败数 |
| 功能语义 | 黄金输入、边界值、非法参数、权限不足、幂等重放、部分失败和副作用对账 | 结果正确率、错误分类准确率、重复副作用数 |
| 可用性 | 冷启动、并发、超时、断连、重连、限流、依赖故障和资源泄漏 | 成功率、P50/P95/P99、超时率、容量和恢复时间 |
| 安全治理 | 身份与 scope、跨租户、Secret 泄漏、恶意参数、工具结果提示注入和审计完整性 | 越权率、泄漏数、审计覆盖率 |
| Agent 效果 | 正/负/歧义请求、多工具相似候选、返回结果能否支撑最终答案 | Tool Precision/Recall、参数正确率、任务成功率和效用增量 |

对 CLI 还要增加一组**机器可用性契约**：`--help` 能否稳定发现能力；是否支持非交互模式和结构化输出；stdout 是否只放结果、stderr 是否承载诊断；退出码和错误类型是否稳定；是否支持 `--dry-run`、幂等键、超时、取消和可恢复的进度。一个“人能用”的 CLI 如果只能读彩色终端文本、遇错就交互询问、成功失败都返回 0，就不是 AI-Friendly。

对 MCP 则按当前官方 [Tools 规范](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) 验证 `tools/list`、`tools/call`、输入/输出 schema、错误对象和工具列表变更通知。协议合规只是底线；工具是否真正 AI-Friendly，仍要由困难负例、参数修复、取消恢复和端到端任务效用证明。

取消不能被当成所有实现都必须完成的强保证。MCP 的 [Cancellation 规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation)将通知定义为可选能力，接收方可能忽略，且取消通知与原请求完成会发生竞态；评测应分别覆盖支持取消、不支持取消、迟到结果和重复通知。对于使用 Tasks 扩展的长任务，还要验证 `tasks/cancel` 的状态收敛，而不是只检查客户端是否发出了通知。

“效果”要做对照实验：固定任务分别运行无该 Tool、旧版本和候选版本；不仅看调用率，还看它是否提升最终成功率、证据质量，并控制延迟、Token、外部费用和副作用风险。对随机或实时结果使用不变量、范围和 metamorphic test，而不是要求字面完全一致；会写数据的 Tool 在隔离环境中测试，并以业务状态对账作为 oracle。

轨迹回流先做首错点归因：能力发现失败、描述误导、选错 Tool、参数构造、Server 执行、结果契约、Observation 未被模型使用，还是下游推理错误。Badcase 脱敏后保留输入、候选工具、schema/Server/模型版本、调用参数、结果摘要、时序和人工标签；聚类后转成最小可复现用例，分别进入契约集、语义回归集或 Agent 路由集。修复应对症：改 schema/实现、Tool Description、路由样本或恢复策略，而不是所有失败都靠改 Prompt。

发布时对旧版和候选版跑同一不可变回归集，再做 shadow 和按租户灰度；严重越权、重复副作用和契约破坏是一票否决，质量、延迟与成本采用分层阈值。每个 Badcase 绑定修复版本与回归用例，持续监控线上分布漂移和长尾工具覆盖率，防止只把热门工具越测越好。

**差距在哪**：新手把“能调通”当成“工具可用”，高手分离协议、功能、SLO、安全和 Agent 效用，用首错点归因把轨迹 Badcase 变成可复现回归门禁。面试官考的是能否把 MCP 工具生态做成持续交付的基础设施。
