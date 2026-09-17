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
pageSha256: "7be3f32f7c0e33d966d958504b0dea9a2dd74609ec909d8684053f8372cccac0"
contentMode: "local-full"
zh: ""
---

## Q：Agent 如何做版本管理与灰度？

> 来源：Agent面经八股系列

**新手答**：”把 Prompt 存到数据库，每次改了就更新版本号。”

**高手答**：

Agent 的版本管理涉及三层：Prompt/Tool Schema/Model 各自独立版本号管理。灰度方案：
1. **影子模式**（Shadow Mode）：新版 Agent 并行执行但只记录建议不真实执行，对比老版结果
2. **金丝雀发布**：先对 1% 用户群开放，观察成功率、成本、违规数等关键指标
3. **快速回滚**：保留前 N 个版本快照，任何指标异常一键回滚
4. **AB 对比**：同一批请求同时发给新旧版本，diff 输出差异自动告警

**差距在哪**：面试官要看你是否理解”Agent 不是一个函数而是一个系统”——Prompt 改了、工具改了、模型换了都算版本变更，需要联动管理。
