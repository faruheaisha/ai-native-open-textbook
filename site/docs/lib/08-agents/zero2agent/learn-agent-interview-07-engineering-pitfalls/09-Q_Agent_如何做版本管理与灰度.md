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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "b7b5a5fc1a2056f4b556bb61c5840e66b727b2c2bb046c449f96ffce32941dd8"
contentMode: "local-full"
zh: ""
---

## Q：Agent 如何做版本管理与灰度？

> 来源：Agent面经八股系列 / [蚂蚁 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/39451cad5d2245b491d16778f2a9ca01)

**新手答**：“把 Prompt 存到数据库，每次改了就更新版本号。”

**高手答**：

Agent 的版本管理涉及三层：Prompt/Tool Schema/Model 各自独立版本号管理。灰度方案：
1. **影子模式**（Shadow Mode）：新版 Agent 并行执行但只记录建议不真实执行，对比老版结果
2. **金丝雀发布**：先对 1% 用户群开放，观察成功率、成本、违规数等关键指标
3. **快速回滚**：保留前 N 个版本快照，任何指标异常一键回滚
4. **AB 对比**：同一批请求同时发给新旧版本，diff 输出差异自动告警

**差距在哪**：面试官要看你是否理解“Agent 不是一个函数而是一个系统”——Prompt 改了、工具改了、模型换了都算版本变更，需要联动管理。
