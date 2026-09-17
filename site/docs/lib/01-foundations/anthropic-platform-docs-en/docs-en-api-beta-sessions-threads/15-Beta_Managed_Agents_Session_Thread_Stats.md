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
sourceRel: "docs/en/api/beta/sessions/threads.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/threads.md"
sourceSha256: "7c49e8a644bf5fce181657fff779684ba2ebac0aff547f9d1b8b8c4d2042bd66"
pageSha256: "84f1a100dcf552ee137b2f4280789df47b6b421b7d8eb46c3e7c2f7fedf280e0"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Thread Stats

- `BetaManagedAgentsSessionThreadStats object`

  Timing statistics for a session thread.

  - `active_seconds: optional number`

    Cumulative time in seconds the thread spent actively running. Excludes idle time.

    format: double

  - `duration_seconds: optional number`

    Elapsed time since thread creation in seconds. For archived threads, frozen at the final update.

    format: double

  - `startup_seconds: optional number`

    Time in seconds for the thread to begin running. Zero for child threads, which start immediately.

    format: double
