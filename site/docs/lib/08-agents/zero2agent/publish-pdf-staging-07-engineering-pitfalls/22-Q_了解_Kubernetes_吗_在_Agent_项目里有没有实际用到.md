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
pageSha256: "a9bb3643305b6ef84645620912612dcac26b1ca83dc8dbb4680c06dcc9cbd2ae"
contentMode: "local-full"
zh: ""
---

## Q：了解 Kubernetes 吗？在 Agent 项目里有没有实际用到？

> 来源：视频面经汇总

**新手答**：“了解一些，用过 Docker 部署。”

**高手答**：

K8s 在 Agent 项目中主要解决三个问题：

**1. 弹性伸缩**：Agent 请求是典型的“长连接 + 高 token 消耗”——一个复杂任务可能执行 30s+。用 HPA 基于自定义指标（如当前活跃 Agent 会话数）做 Pod 扩缩容，而不是简单的 CPU/内存。

**2. 服务编排**：一个完整 Agent 系统拆成多个服务——Gateway、Planner、Tool Executor、RAG Service、Memory Service。K8s 的 Service + Deployment 天然适合管理这种微服务拓扑，配合 ConfigMap 做各环境配置隔离。

**3. GPU 调度**：如果自部署 Embedding 或 Rerank 模型，K8s 的 `nvidia.com/gpu` 资源类型 + Node Affinity 可以精确调度 GPU Pod，避免抢占。

**实际使用中的踩坑**：
- Agent 长任务 Pod 被 HPA 缩容杀掉 → 设置 `terminationGracePeriodSeconds` + 任务 checkpoint，被 kill 前保存状态
- SSE 长连接通过 Ingress 时被 nginx 超时断开 → 调整 `proxy_read_timeout` 到 300s+
- 向量数据库（Milvus）的 StatefulSet 扩容后需要 rebalance segment → 用 CronJob 定期触发

**差距在哪**：面试官不是要考你 K8s 八股，而是看你有没有在 AI 应用场景下用过。能说出 Agent 长任务的优雅终止、SSE 超时配置、GPU 调度，说明你真正在生产环境部署过 Agent 系统。
