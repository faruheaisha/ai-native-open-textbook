---
title: "Copilot Widget Protocol"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/references/copilot-widget-protocol.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/references/copilot-widget-protocol.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/references/copilot-widget-protocol.md"
sourceSha256: "ba98e93fca2f5108feb3900f9671a11d6d1d819d7a735ddd6141ff86e5ca550d"
pageSha256: "ba98e93fca2f5108feb3900f9671a11d6d1d819d7a735ddd6141ff86e5ca550d"
contentMode: "local-full"
zh: ""
---

# Copilot Widget Protocol

Language-agnostic protocol requirements for MCP servers that render widgets in Microsoft 365 Copilot Chat. This document describes **what** your server must implement, regardless of programming language. For a complete TypeScript reference implementation, see [mcp-server-pattern.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-ui-widget-developer-references-mcp-server-pattern).

## Table of Contents
- [Transport: Streamable HTTP](#transport-streamable-http)
- [CORS Configuration](#cors-configuration)
- [Server Capabilities](#server-capabilities)
- [MCP Resources for Widgets](#mcp-resources-for-widgets)
- [MCP Tool Response Format](#mcp-tool-response-format)
- [Widget Shell and Asset Serving](#widget-shell-and-asset-serving)
- [Widget-Resource-Tool Triplet](#widget-resource-tool-triplet)
- [Environment Configuration](#environment-configuration)
- [Adaptation Checklist: Existing MCP Server](#adaptation-checklist-existing-mcp-server)
- [Language SDK References](#language-sdk-references)

## Transport: Streamable HTTP

Your server must expose a single `/mcp` endpoint that handles three HTTP methods:

| Method | Purpose | Key Headers |
|--------|---------|-------------|
| `POST /mcp` | Send JSON-RPC messages (initialize, tool calls, resource reads) | `Content-Type: application/json`, `mcp-session-id` (after init) |
| `GET /mcp` | Open SSE stream for server-to-client notifications | `mcp-session-id` (required) |
| `DELETE /mcp` | Terminate a session | `mcp-session-id` (required) |

**Session lifecycle:**
1. Client sends `POST /mcp` with an `initialize` request (no `mcp-session-id` header)
2. Server generates a session ID and returns it in the `mcp-session-id` response header
3. All subsequent requests include the `mcp-session-id` header

**Initialize request:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-03-26",
    "capabilities": {},
    "clientInfo": { "name": "copilot", "version": "1.0.0" }
  }
}
```

**Initialize response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2025-03-26",
    "capabilities": { "resources": {}, "tools": {} },
    "serverInfo": { "name": "my-server", "version": "1.0.0" }
  }
}
```

## CORS Configuration

The `/mcp` endpoint must handle CORS for cross-origin requests from Copilot. Use **origin-checking** rather than a blanket wildcard — validate the request's `Origin` header against an allowlist and reflect the origin back if it matches.

**Required allowed origins** (at minimum):
- `m365.cloud.microsoft` — the base Copilot Chat domain
- `*.m365.cloud.microsoft` — any subdomain (e.g., `copilot.m365.cloud.microsoft`)

**Preflight (OPTIONS /mcp):**
```
