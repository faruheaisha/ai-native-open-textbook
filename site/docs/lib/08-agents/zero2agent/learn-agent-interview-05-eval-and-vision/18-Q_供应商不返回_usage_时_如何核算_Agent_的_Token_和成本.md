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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "e2a222e0bd40e1e313d84f2329ab14395abcb2cab37a87c0be830a82774fe0f1"
contentMode: "local-full"
zh: ""
---

## Q：供应商不返回 usage 时，如何核算 Agent 的 Token 和成本？

> 来源：成都晓多科技 Agent 开发岗二面（2026-08-12）

**新手答**：“用对应 Tokenizer 重新数一遍。”

**高手答**：模型网关统一记录请求、响应、模型版本和流式终止状态；有官方 usage 时以其为准，没有时用匹配版本的 Tokenizer 估算，并标注 `estimated`。工具、子 Agent、重试、缓存和被取消流都按 trace 聚合，价格表带生效区间和输入/输出/缓存单价。账单抽样与供应商对账，偏差超阈值就修正估算规则，不能把估算值伪装成精确账单。

**差距在哪**：新手只数文本，高手解决跨模型版本、异步补账和财务可追溯性。
