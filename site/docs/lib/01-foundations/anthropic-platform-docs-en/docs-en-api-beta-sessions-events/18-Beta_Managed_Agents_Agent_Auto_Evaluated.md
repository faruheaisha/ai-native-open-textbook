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
pageSha256: "8d820e4cd4fd9d007f8384584838c6676f3503566e46e40ecd6f4166a0f6dfa2"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Auto Evaluated Permission Ask

- `BetaManagedAgentsAgentAutoEvaluatedPermissionAsk object`

  The server reached no judgement; the invocation is held for client approval.

  - `type: "ask"`

  - `reason_code: string`

    The judgement's grounds in registry-bound terms, for client branching and audit rather than end-user display. Open registry; currently "indeterminate" (no judgement was reached). Clients must tolerate values outside this set.

    maxLength: 64
