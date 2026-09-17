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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "d171061ec4d4c916c2e012698502342cfaac92a69e8de4cefda1292b9147286b"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Retries Exhausted

- `BetaManagedAgentsSessionRetriesExhausted object`

  The turn ended because repeated errors exhausted the retry budget or an error escalated to `retry_status: 'exhausted'`.

  - `type: "retries_exhausted"`
