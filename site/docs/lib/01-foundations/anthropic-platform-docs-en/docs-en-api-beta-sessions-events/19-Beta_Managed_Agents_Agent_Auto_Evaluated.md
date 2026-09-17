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
pageSha256: "21044f9f1934c177dd142e2b3a8c56fc5b6370c7422d4117b38d43fc7e935ec6"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Auto Evaluated Permission Deny

- `BetaManagedAgentsAgentAutoEvaluatedPermissionDeny object`

  The server judged the invocation high-risk; it does not execute and a synthetic error tool result is appended.

  - `type: "deny"`

  - `reason_code: string`

    The judgement's grounds in registry-bound terms. Open registry; currently "high_risk" (judged high-risk; the call does not run). Clients must tolerate values outside this set.

    maxLength: 64
