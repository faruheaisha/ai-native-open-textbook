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
pageSha256: "1ee874c1ae6b0d0e37156171f8ab3a1122f156f5ad1578db60688581b76f74e8"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Tool Evaluation

- `BetaManagedAgentsAgentToolEvaluation = BetaManagedAgentsAgentToolEvaluationAlwaysAllow or BetaManagedAgentsAgentToolEvaluationAlwaysAsk or BetaManagedAgentsAgentToolEvaluationAuto`

  Names the resolved permission_policy that produced evaluated_permission, and under auto carries the judgement. Open union: clients must tolerate unknown variants.

  - `BetaManagedAgentsAgentToolEvaluationAlwaysAllow object`

    The resolved permission_policy was always_allow; accompanies evaluated_permission "allow".

    - `type: "always_allow"`

  - `BetaManagedAgentsAgentToolEvaluationAlwaysAsk object`

    The resolved permission_policy was always_ask; accompanies evaluated_permission "ask".

    - `type: "always_ask"`

  - `BetaManagedAgentsAgentToolEvaluationAuto object`

    The resolved permission_policy was auto: the server judged this invocation individually.

    - `type: "auto"`

    - `evaluated_permission: BetaManagedAgentsAgentAutoEvaluatedPermission`

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
