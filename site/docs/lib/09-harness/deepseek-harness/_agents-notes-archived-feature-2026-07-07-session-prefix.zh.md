---
title: "Agent Note: 会话前缀——派生历史之前的仅请求消息"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-07-session-prefix.zh.md"
sourceRel: ".agents/notes/archived/feature/2026-07-07-session-prefix.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-07-session-prefix.zh.md"
sourceSha256: "9a15bbed3a53db84ac12e3dfb93b00bf93dabe6b9e39bebfdfc04e00ba8ff135"
pageSha256: "9a15bbed3a53db84ac12e3dfb93b00bf93dabe6b9e39bebfdfc04e00ba8ff135"
contentMode: "local-full"
zh: ""
---

# Agent Note: 会话前缀——派生历史之前的仅请求消息

Status: implemented
Archived: 2026-07-28

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-07-session-prefix) | 中文

下文所述的仅请求前缀 seam 后来已被[统一带来源消息的决策](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-22-unified-send-and-coalesced-user-messages)移除。当前的生产方在 `agent/step` 时注入持久的带来源 `user/message` 上下文；本记录保留了早先的设计及其权衡。

## 问题
