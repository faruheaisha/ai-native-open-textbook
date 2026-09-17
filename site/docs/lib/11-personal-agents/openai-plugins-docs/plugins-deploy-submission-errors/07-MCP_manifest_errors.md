---
title: "openai-plugins-docs"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/deploy/submission-errors.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/deploy/submission-errors.md"
sourceSha256: "c475dca167f14136260f331f35c506f730e1c93d226a3ec5ebe9ce1e385f2380"
pageSha256: "0a7a7b7e8ab57174b84052667dfd32a24ec60544b72c84cb2c0bfcaa677e40e1"
contentMode: "local-full"
zh: ""
---

## MCP manifest errors

These errors apply to the compatibility `.mcp.json` file. For portable packages,
ingestion derives this file and `.codex-plugin/plugin.json` from root
`plugin.json` and `mcp.json`. The component-path errors above can also refer to
these generated files. Fix the source portable configuration; don't rename
`mcp.json` to `.mcp.json` just because a compatibility diagnostic names it.

| Name                          | Requirement                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `mcp_manifest_unreadable`     | `.mcp.json` must be readable UTF-8 text.                                                      |
| `mcp_manifest_json_malformed` | `.mcp.json` must contain valid JSON; malformed syntax is reported with a line number.         |
| `mcp_manifest_wrong_type`     | `.mcp.json` must contain a JSON object at the top level.                                      |
| `mcp_servers_missing`         | `.mcp.json` must contain the top-level `mcpServers` field.                                    |
| `mcp_servers_wrong_type`      | `mcpServers` must be an object.                                                               |
| `mcp_server_name_empty`       | Every MCP server name must contain at least one non-whitespace character.                     |
