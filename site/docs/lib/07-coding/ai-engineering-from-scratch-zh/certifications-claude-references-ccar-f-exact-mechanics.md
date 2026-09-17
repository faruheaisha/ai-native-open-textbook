---
title: "CCAR-F 精确机制复习"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/references/ccar-f-exact-mechanics.md"
sourceRel: "certifications/claude/references/ccar-f-exact-mechanics.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/references/ccar-f-exact-mechanics.md"
sourceSha256: "e648e99da817871c93f61448154c997d98be84e3bc8621fbfe2632bcd7324627"
pageSha256: "e648e99da817871c93f61448154c997d98be84e3bc8621fbfe2632bcd7324627"
contentMode: "local-full"
zh: ""
---

# CCAR-F 精确机制复习

> 在理解架构后，将此文档用作带日期的查阅演练。它不能替代亲手构建工作流。

**指南：** Claude Certified Architect - Foundations，版本 1.0
**指南生效时间：** 2026 年 7 月
**已核验：** 2026-08-18

公开的 CCAR-F 指南考查持久的判断力和精确的操作机制。
本复习汇集指南中具名的接口，帮助你区分正确设计与看似合理的命令、路径或字段。发布前，请始终根据当前官方指南和文档重新核对每一项。

## 代理循环与会话状态

| 机制 | 需要记住的内容 | 决策边界 |
|---|---|---|
| `stop_reason: "tool_use"` | 执行请求的工具，追加匹配的结果，然后继续 | 不要根据自然语言短语推断循环状态 |
| `stop_reason: "end_turn"` | 模型已抵达正常的终止回合 | 生产环境还要处理错误、限制、取消和其他终止状态 |
| 工具结果标识 | 针对原始工具使用标识返回每一项结果 | 不要按数组位置关联并发结果 |
| 对话状态 | 保留下一次请求所需的内容块 | 将持久事实提取到有损摘要之外 |
