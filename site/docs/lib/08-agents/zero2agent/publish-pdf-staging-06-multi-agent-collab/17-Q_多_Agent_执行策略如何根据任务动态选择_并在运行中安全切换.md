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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-multi-agent-collab.md"
sourceRel: "publish-pdf/staging/06-multi-agent-collab.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/06-multi-agent-collab.md"
sourceSha256: "45cd341f24a023f5affe2db1b6c5c8527844255ad74a8e55796c4ce86d984b7e"
pageSha256: "caae6b6fbb6f2d861ec94de6152ac5129f11b9ec58786bfa43061e3f643d4a73"
contentMode: "local-full"
zh: ""
---

## Q：多 Agent 执行策略如何根据任务动态选择，并在运行中安全切换？

> 来源：字节 AI Agent 二面实习面经（2026-03-22）

**新手答**：“简单任务串行执行，复杂任务并行或让多个 Agent 讨论；发现效果不好就重新选择策略。”

**高手答**：

先把顺序链、并行分治、Supervisor、handoff、debate 等策略实现成共享 `TaskState` 和输入输出契约的可替换执行计划。Strategy Controller 根据任务依赖图、可并行度、意图置信度、风险、deadline、Token 预算、Agent/工具健康状态和历史成功率选择策略，并记录选择理由与计划版本。规则负责权限和硬约束，学习式 Router 只在允许的候选中排序，避免模型自行绕过安全边界。

运行中持续观察关键路径延迟、失败/冲突率、无进展轮次、剩余预算和外部依赖状态。切换必须有门槛、滞回和冷却时间：一次慢响应只触发局部重试，连续超阈值才从并行降级为顺序或备用 Agent；高不确定但可逆的任务可以升级为 debate，高风险副作用则转人工。否则控制器会在两种策略间来回震荡。

安全切换只能发生在可恢复边界。编排器先停止派发新步骤，排空或取消只读在途任务，把已验证事实、artifact、剩余依赖、预算和 checkpoint 写入持久状态；不可取消的副作用先查询最终状态，不能直接重放。新策略领取递增的 `strategy_epoch` 和 fencing token，旧策略的迟到事件被拒绝；节点使用幂等键，状态更新使用版本条件写。迁移的是已验证状态和证据，不是某个 Agent 隐含的思维过程。

上线前用同一任务集比较各策略，并注入慢 Agent、冲突答案、工具故障、切换中崩溃和旧事件迟到等故障。指标除成功率外，还要看切换收益、重复副作用、无效 fan-out、路由稳定性、延迟和成本；若切换后的预计收益不能覆盖迁移成本，就继续当前策略或直接降级。

**差距在哪**：新手只会列多 Agent 模式，高手把策略做成可观测、可迁移的执行计划，并用 checkpoint、幂等、epoch 和滞回机制保证运行中切换不丢状态、不重复副作用、不发生策略震荡。
