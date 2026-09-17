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
pageSha256: "a4ad28657ed90b435f301ce7aad861d7215df4f96e21c9e8dd4c9e5f5418242b"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents URL MCP Server Params

- `BetaManagedAgentsURLMCPServerParams object`

  URL-based MCP server connection.

  - `type: "url"`

  - `name: string`

    Unique name for this server, referenced by mcp_toolset configurations. 1-255 characters.

    minLength: 1, maxLength: 255

  - `url: string`

    Endpoint URL for the MCP server.

    maxLength: 2048
