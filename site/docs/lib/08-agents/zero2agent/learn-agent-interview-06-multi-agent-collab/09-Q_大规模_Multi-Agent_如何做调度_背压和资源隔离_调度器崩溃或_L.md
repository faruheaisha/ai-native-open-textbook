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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/06-multi-agent-collab/index.md"
sourceRel: "learn-agent-interview/06-multi-agent-collab/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/06-multi-agent-collab/index.md"
sourceSha256: "5ee244b67f4d348fad5285b36ca146b5ff0d9717e0f3b855e900f08593dbf592"
pageSha256: "bdce07822a1b94bdfecb1f865903403ffd86e971a73b1698332f44f0f388b434"
contentMode: "local-full"
zh: ""
---

## Q：大规模 Multi-Agent 如何做调度、背压和资源隔离？调度器崩溃或 Leader 派错任务时怎么恢复？

> 来源：深信服 / Agent 开发 / 一面；钉学科技 / FDE 实习 / 一面

**新手答**：“开线程池限制并发，失败就重试，调度器重启后接着跑。”

**高手答**：

第一步是让系统有明确的容量边界。入口做 admission control，设置全局、租户和任务三级并发预算；每个子任务按预计 token、工具连接数或 GPU 占用领取加权 semaphore，而不是把所有 Agent 当成等价请求。队列必须有界，按业务优先级加权公平调度，并为 LLM Provider、数据库、浏览器和 GPU 建独立资源池，防止一种慢资源耗尽全部槽位。

背压不能只看“当前并发数”。我会同时监控队列深度、最老任务等待时间、P95/P99 延迟、token/请求速率、Provider quota，以及 CPU、内存、连接池和 GPU 饱和度。任一指标越过分级阈值时，依次采取延迟低优先级任务、减少 fan-out、切换轻量模型或缓存结果、返回 `Retry-After`，最后拒绝新任务；所有重试使用指数退避加抖动和全链路 retry budget，避免下游故障触发重试风暴。

Leader 派活前从能力注册表筛选满足输入 schema、工具权限、健康状态和剩余预算的 Agent，并记录路由置信度。派错时，子 Agent 应以结构化 `capability_rejected` 尽早拒绝；Leader 最多重新路由一次，仍失败就走通用 fallback 或人工升级。错误路由、候选集合和最终结果都回灌 badcase 评测集，重点跟踪路由准确率、拒绝率、重复 handoff 率和纠偏成功率，不能让 Agent 之间无限转派。

调度器崩溃恢复依赖持久化状态，而不是进程内存：

| 机制 | 具体决策 | 防止的故障 |
|------|---------|-----------|
| 持久任务账本 | 保存 `task_id`、DAG 版本、状态、依赖、尝试次数和 checkpoint | 重启后不知道任务做到哪一步 |
| 租约与心跳 | Worker 领取有限期 lease，超时后任务才可被重新领取 | Worker 失联导致任务永久卡住 |
| 幂等键与 checkpoint | 副作用调用携带 idempotency key，长任务按阶段落盘 | 重放造成重复扣款、重复写入或整步重算 |
| fencing token | 新 lease 的单调递增 token 高于旧 Worker | 旧 Worker 恢复后用过期结果覆盖新结果 |
| 重试预算与死信队列 | 区分瞬时错误和永久错误，达到上限进入 DLQ | 无限重试耗尽容量 |
| 对账与回放 | 新调度器扫描无有效 lease 的 `RUNNING` 任务，从最近 checkpoint 重放 | 崩溃窗口内的状态遗漏 |

调度器本身做无状态多副本，任务状态放在具备条件更新能力的存储中。恢复后不能承诺虚假的 exactly-once，而是用 at-least-once 调度 + 幂等副作用实现业务上的一次效果。验收至少覆盖任务成功率、排队时间、资源利用率、超时率、重试放大系数、恢复时间 RTO 和重复副作用数；重点压测配额耗尽、热点租户挤占、调度器在 checkpoint 前后崩溃、旧 Worker 迟到回写等故障。

**差距在哪**：新手把大规模调度等同于线程池和无限重试。高手会给并发预算、资源池、背压信号和公平策略设明确边界，也能用能力拒绝与有限重路由纠正错分配，并通过任务账本、租约、幂等、fencing token、checkpoint 和死信队列让调度器崩溃后可恢复、可对账。
