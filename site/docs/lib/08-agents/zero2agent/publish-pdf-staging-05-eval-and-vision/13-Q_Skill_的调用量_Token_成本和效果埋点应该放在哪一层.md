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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-eval-and-vision.md"
sourceRel: "publish-pdf/staging/05-eval-and-vision.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/05-eval-and-vision.md"
sourceSha256: "522251cd44ac5841f540eaf4da4f60a49782ca1736e0ab863498790f1cfd6e8e"
pageSha256: "e995845050a72f8b7b41b4b2eff28dc007f7a984147d344ad19fa17ba653d296"
contentMode: "local-full"
zh: ""
---

## Q：Skill 的调用量、Token 成本和效果埋点应该放在哪一层？

> 来源：电商库存二面（2026-08-17）

**新手答**：“在每个 Skill 里打印日志，统计调用次数和 Token。”

**高手答**：

统一埋点应放在所有 Skill 调用都会经过的运行时网关或编排器，不能依赖 Skill 作者自行上报。根 trace 记录租户、会话、任务和版本指纹；每次 Skill 调用生成 span，记录路由候选、选中原因、输入输出大小、模型与工具调用、缓存命中、延迟、Token、成本、状态和错误码。

效果不能只看调用量，还要关联任务成功率、人工接管率、回退率和增量收益。异步子任务延迟退出时，先记录 provisional cost，再按 `run_id + span_id` 幂等补账；用户断连不应丢失服务端 trace。原始 Prompt 和工具结果可能含敏感信息，应分级采样、脱敏并设置保留期。

**差距在哪**：新手把埋点散落在业务代码，高手从统一拦截、跨异步归因、版本关联和隐私治理设计可核算体系。面试官考的是能否回答“这个 Skill 到底值不值得保留”。
