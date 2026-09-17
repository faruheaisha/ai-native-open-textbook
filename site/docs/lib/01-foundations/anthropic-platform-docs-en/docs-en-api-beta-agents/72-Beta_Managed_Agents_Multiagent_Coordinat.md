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
sourceRel: "docs/en/api/beta/agents.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/agents.md"
sourceSha256: "2701c99a56aa4313e4c59f6eb788100b1488b7b05d3135e992270e808de5849c"
pageSha256: "de3abd89ed3cf45a6d3f9898d05fa27b3d55451472be3264055e7527dfa73bde"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Multiagent Coordinator Params

- `BetaManagedAgentsMultiagentCoordinatorParams object`

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
