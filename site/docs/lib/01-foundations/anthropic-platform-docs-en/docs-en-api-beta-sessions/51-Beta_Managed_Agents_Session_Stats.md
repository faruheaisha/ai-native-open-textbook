---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "e86561c49a8f1dddd896576e4ed810e8a434fd6562d926b6b9a589f85d2b6d55"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Stats

- `BetaManagedAgentsSessionStats object`

  Timing statistics for a session.

  - `active_seconds: optional number`

    Cumulative time in seconds the session spent in `running` status. Excludes idle time.

    format: double

  - `duration_seconds: optional number`

    Elapsed time since session creation in seconds. For terminated sessions, frozen at the final update.

    format: double
