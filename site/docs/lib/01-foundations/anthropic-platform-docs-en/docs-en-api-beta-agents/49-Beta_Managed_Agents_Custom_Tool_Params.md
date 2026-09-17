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
pageSha256: "e6ae9db018cc4dacc0ac56ad636555539968af181125b9855d5a110b9bae27d1"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Custom Tool Params

- `BetaManagedAgentsCustomToolParams object`

  A custom tool that is executed by the API client rather than the agent. When the agent calls this tool, an `agent.custom_tool_use` event is emitted and the session goes idle, waiting for the client to provide the result via a `user.custom_tool_result` event.

  - `type: "custom"`

  - `description: string`

    Description of what the tool does, shown to the agent to help it decide when to use the tool.

    minLength: 1

  - `input_schema: BetaManagedAgentsCustomToolInputSchema`

    JSON Schema for custom tool input parameters.

    - `type: "object"`

    - `properties: optional map[unknown] or null`

    - `required: optional array of string or null`

  - `name: string`

    Unique name for the tool. 1-128 characters; letters, digits, underscores, and hyphens.

    minLength: 1, maxLength: 128
