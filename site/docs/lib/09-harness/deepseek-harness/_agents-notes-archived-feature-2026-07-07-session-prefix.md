---
title: "Agent Note: The session prefix — request-only messages in front of the derived history"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-07-session-prefix.md"
sourceRel: ".agents/notes/archived/feature/2026-07-07-session-prefix.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-07-session-prefix.md"
sourceSha256: "1cfd8e46467111b671b0bd9c2370ef07316ff9b2846fecc0cd29389686c6bbf8"
pageSha256: "1cfd8e46467111b671b0bd9c2370ef07316ff9b2846fecc0cd29389686c6bbf8"
contentMode: "local-full"
zh: ""
---

# Agent Note: The session prefix — request-only messages in front of the derived history

Status: implemented
Archived: 2026-07-28

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-07-session-prefix.zh)

The request-only prefix seam described below was later removed by the [unified sourced-message decision](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-22-unified-send-and-coalesced-user-messages). Current producers inject durable sourced `user/message` context at `agent/step`; this record preserves the earlier design and its trade-offs.

## Problem
