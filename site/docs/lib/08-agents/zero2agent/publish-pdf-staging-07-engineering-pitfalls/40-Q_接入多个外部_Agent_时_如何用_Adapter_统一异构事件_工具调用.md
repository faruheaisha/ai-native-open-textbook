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
pageSha256: "fbdc0d0d439acbc503675a4dafed86aa60980df68455f0c73bf3af10e42461b8"
contentMode: "local-full"
zh: ""
---

## Q：接入多个外部 Agent 时，如何用 Adapter 统一异构事件、工具调用和生命周期协议？

> 来源：北京 B 端 AI 小厂面经（2026-07）

**新手答**：“为每个 Agent 写一个 Adapter，把它们的 JSON 转成统一格式。”

**高手答**：

核心是建立一层 anti-corruption layer：内部先定义稳定的 canonical protocol，外部 A2A、厂商 SDK、Webhook 或私有流式协议各自实现 Adapter。统一事件信封至少包含 `tenant_id、run_id、task_id、event_id、sequence、type、timestamp、trace_id、causation_id、deadline、schema_version`；`type` 用判别联合表达 `message / tool_request / tool_result / status / artifact / error`，厂商特性放显式 extension，不能为了最低公分母静默丢失语义。

Adapter 不只是改字段名，还要完成三类语义映射：

1. **能力与工具**：握手时发现模态、流式、取消、回调和工具能力；工具加命名空间，参数按内部 schema 校验，凭证由网关注入，外部 Agent 不能继承宿主的全部权限
2. **状态机**：把各家的 `queued/running/waiting/completed/failed/cancelled` 映射到受控状态迁移表；无法精确映射时保留原状态并标记 `unknown`，不能猜成成功
3. **流式与制品**：文本增量、工具事件、进度和 artifact 分通道处理；大对象只传受权引用与摘要，内部顺序由 sequence 和 causation 关系确定

可靠性边界由接入层兜住：按 `event_id` 幂等去重，对乱序事件做有界缓冲并检测序号缺口；取消和 deadline 向下传播，迟到事件必须携带当前 `lifecycle_epoch`，旧 epoch 的回调不能覆盖新任务状态。有副作用的工具使用幂等键、状态查询和人工审批，重连后从持久化 offset 恢复，而不是把整个任务盲目重跑。

每个 Adapter 都跑同一套 conformance suite，覆盖能力协商、正常/异常工具调用、流式中断、取消、重复与乱序事件、版本升级和鉴权失败；生产 trace 同时保留原始协议摘要与 canonical event，badcase 可离线回放。协议升级采用双读、单写和按 Agent 灰度，确认指标稳定后再退役旧映射。

**差距在哪**：新手做 DTO 转换，高手统一的是事件语义、状态所有权、权限和恢复行为，同时保留扩展能力与原始证据。面试官考的是异构 Agent 接入能否长期演进，而不只是第一次联调成功。
