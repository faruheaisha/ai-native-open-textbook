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
pageSha256: "0ea89a489a2a0c5006f625b0dbdee6c91a33c4733d02aceb54ab76c8de66db86"
contentMode: "local-full"
zh: ""
---

## Q：如何设计同时兼顾吞吐、首 Token 延迟和租户公平性的推理调度器？

> 来源：智象未来 AI Infra 一面（2026-08-20）

**新手答**：“做动态批处理，批次越大吞吐越高。”

**高手答**：

调度器要显式承认三个目标冲突：大批次提高 GPU 吞吐，却会增加排队和 TTFT；长生成任务持续占用 KV Cache，又可能饿死短请求。入口先按租户设置并发与 Token 配额，队列按等待时间、请求长度、SLO 和租户权重做加权公平调度；Prefill 与 Decode 可分离或使用 chunked prefill，连续批处理只吸收不会突破延迟预算的请求。

运行时持续监控队列等待、TTFT、TPOT、完成延迟、有效 Token/s、KV Cache 占用和抢占次数。内存压力下优先暂停或换出可恢复请求，而不是随机失败；过载时用背压和明确的 `429/retry-after` 保护系统。验收必须同时看总体吞吐和每个租户、长度分桶的 P95/P99。

**差距在哪**：新手只优化平均吞吐，高手把延迟预算、KV 资源、长短请求和多租户公平放进同一个调度问题。面试官考的是是否理解线上推理不是单纯的 batching。
