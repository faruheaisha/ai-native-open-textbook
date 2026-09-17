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
pageSha256: "4592b797fc9a627e1a3f1af84f18ce514ab47feab0947d5a5fce8c8422cabd39"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Multiagent Params

- `BetaManagedAgentsMultiagentParams object`

  A coordinator topology: the session's primary thread orchestrates work by spawning session threads, each running an agent drawn from the `agents` roster.

  - `type: "coordinator"`

  - `agents: array of BetaManagedAgentsMultiagentRosterEntryParams`

    Agents the coordinator may spawn as session threads. 1–20 entries. Each entry is an agent ID string, a versioned `\{"type":"agent","id","version"\}` reference, or `\{"type":"self"\}` to allow recursive self-invocation. Entries must reference distinct agents (after resolving `self` and string forms); at most one `self`. Referenced agents must exist, must not be archived, and must not themselves have `multiagent` set (depth limit 1).

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
