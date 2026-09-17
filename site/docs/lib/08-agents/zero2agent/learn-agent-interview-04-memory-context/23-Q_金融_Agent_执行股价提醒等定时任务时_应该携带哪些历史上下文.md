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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/04-memory-context/index.md"
sourceRel: "learn-agent-interview/04-memory-context/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/04-memory-context/index.md"
sourceSha256: "a4b675e45f2a978a8587cbf3322b6bf968fb5dc972a390f232490f9b0ce03666"
pageSha256: "c2e5a203eeba8bffda93113eeb300c71188a083ae5875bb4d6d411a306b2caaa"
contentMode: "local-full"
zh: ""
---

## Q：金融 Agent 执行股价提醒等定时任务时，应该携带哪些历史上下文？

> 来源：顺极 Agent 开发二面（2026-08-23）

**新手答**：“把创建任务时的对话历史一起存下来，触发时再恢复。”

**高手答**：

定时任务应保存经过确认的结构化契约，而不是整段聊天：标的、阈值、方向、有效期、时区、通知渠道、频率、权限和创建时引用的规则版本。触发时加载当前行情、任务契约和仍然有效的用户偏好；闲聊、过期市场判断和创建时的临时推理不应自动带入。

历史可分三类：执行必需的事实进入任务状态；稳定偏好进入长期记忆并带来源、更新时间和撤销入口；原始对话只作为审计证据按需读取。若规则、权限或风险等级已变化，应重新确认，而不是沿用旧上下文执行。每次触发记录使用了哪些版本和证据，防止“历史语义漂移”造成错误提醒或交易副作用。

**差距在哪**：新手把聊天记录当任务状态，高手区分契约、偏好、实时证据和审计原文。面试官考的是长生命周期任务如何避免过期上下文污染。
