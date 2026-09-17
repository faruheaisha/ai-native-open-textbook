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
pageSha256: "06ccbb123340fab02ae7119c1986a53841cae048440cf62e44e1f57dbdf43960"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Advisor Params

- `BetaManagedAgentsAdvisorParams object`

  Platform advisor roster entry: a model the session's primary thread may consult mid-turn. At most one per roster; the entry occupies the roster name `anthropic.advisor`.

  - `type: "advisor"`

  - `model: string`

    A Claude model id. The model must be permitted as an advisor for this agent's model — see the sessions/threads/advisor spec.

    minLength: 1, maxLength: 256
