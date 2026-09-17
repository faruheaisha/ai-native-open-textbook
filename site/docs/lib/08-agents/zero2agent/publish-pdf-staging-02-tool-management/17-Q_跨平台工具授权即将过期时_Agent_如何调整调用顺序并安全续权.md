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
pageSha256: "7b7ef75e68fd52ae812648421cb7970c0254d6b09662816ef35bfa1ca488ad89"
contentMode: "local-full"
zh: ""
---

## Q：跨平台工具授权即将过期时，Agent 如何调整调用顺序并安全续权？

> 来源：TikTok Agent 工程师面试（2026-08-18）

**新手答**：“Token 快过期就刷新，然后继续调用。”

**高手答**：规划器要把授权有效期、scope、刷新能力和副作用纳入工具元数据。先执行强依赖且耗时可控的授权步骤；不足以覆盖剩余链路时，在调用前续权或暂停请求用户确认。刷新凭据只由工具网关持有，模型不接触秘密；续权失败后不得重放已完成副作用，需根据 checkpoint 查询状态、换只读方案或转人工。

**差距在哪**：新手只处理 HTTP 401，高手把授权生命周期放进任务规划和恢复协议。
