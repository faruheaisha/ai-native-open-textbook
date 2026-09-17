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
pageSha256: "6a3542c6fa0d5f06c56a0f564be9601cc8a6e5af402b2941db10c290a3610a8e"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Multiagent Roster Entry Params

- `BetaManagedAgentsMultiagentRosterEntryParams = string or BetaManagedAgentsAgentParams or BetaManagedAgentsMultiagentSelfParams or BetaManagedAgentsAdvisorParams`

  An entry in a multiagent roster: an agent ID string, a versioned agent reference, or `self`.

  - `string`

  - `BetaManagedAgentsAgentParams object`

    Specification for an Agent. Provide a specific `version` or use the short-form `agent="agent_id"` for the most recent version

    - `type: "agent"`

    - `id: string`

      The `agent` ID.

      minLength: 1, maxLength: 128

    - `version: optional number`

      The specific `agent` version to use. Omit to use the latest version. Must be at least 1 if specified.

      format: int32

  - `BetaManagedAgentsMultiagentSelfParams object`

    Sentinel roster entry meaning "the agent that owns this configuration". Resolved server-side to a concrete agent reference.

    - `type: "self"`

  - `BetaManagedAgentsAdvisorParams object`

    Platform advisor roster entry: a model the session's primary thread may consult mid-turn. At most one per roster; the entry occupies the roster name `anthropic.advisor`.

    - `type: "advisor"`

    - `model: string`

      A Claude model id. The model must be permitted as an advisor for this agent's model — see the sessions/threads/advisor spec.

      minLength: 1, maxLength: 256
