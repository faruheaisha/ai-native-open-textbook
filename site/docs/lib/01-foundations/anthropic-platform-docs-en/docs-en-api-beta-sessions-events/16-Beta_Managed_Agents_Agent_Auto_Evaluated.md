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
pageSha256: "2e44343063c235a2746e2c48cc76812d484651138d41104621382500d8dcbe16"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Auto Evaluated Permission

- `BetaManagedAgentsAgentAutoEvaluatedPermission = BetaManagedAgentsAgentAutoEvaluatedPermissionAllow or BetaManagedAgentsAgentAutoEvaluatedPermissionAsk or BetaManagedAgentsAgentAutoEvaluatedPermissionDeny`

  The server's per-invocation judgement under the auto permission policy. Its type always equals the event's top-level evaluated_permission. Open union: clients must tolerate unknown variants.

  - `BetaManagedAgentsAgentAutoEvaluatedPermissionAllow object`

    The server judged the invocation safe to execute without client approval.

    - `type: "allow"`

  - `BetaManagedAgentsAgentAutoEvaluatedPermissionAsk object`

    The server reached no judgement; the invocation is held for client approval.

    - `type: "ask"`

    - `reason_code: string`

      The judgement's grounds in registry-bound terms, for client branching and audit rather than end-user display. Open registry; currently "indeterminate" (no judgement was reached). Clients must tolerate values outside this set.

      maxLength: 64

  - `BetaManagedAgentsAgentAutoEvaluatedPermissionDeny object`

    The server judged the invocation high-risk; it does not execute and a synthetic error tool result is appended.

    - `type: "deny"`

    - `reason_code: string`

      The judgement's grounds in registry-bound terms. Open registry; currently "high_risk" (judged high-risk; the call does not run). Clients must tolerate values outside this set.

      maxLength: 64
