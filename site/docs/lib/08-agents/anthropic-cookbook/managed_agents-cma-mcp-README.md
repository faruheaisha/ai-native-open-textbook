---
title: "CMA as an MCP server"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
zh: ""
---

# CMA as an MCP server

A thin [MCP](https://modelcontextprotocol.io) server that wraps the Claude [Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) Sessions API — so Claude Desktop **or** claude.ai web can start and chat with your org's hosted agents as if they were tools.

```
User ─▶ Claude (Desktop or claude.ai) ─▶ MCP: send_message + wait_for_idle ─▶ CMA session
  ▲                                                                              │
  └──────────────────────── agent's reply ◀─── stream-to-idle ◀──────────────────┘
```

Nine tools — eight are 1:1 with CMA endpoints, one (`wait_for_idle`) is the SSE→request/response shim. Same handlers, two transports.

## Quickstart

```bash
cd managed_agents/cma-mcp
bun install
claude
```

Then ask: **"walk me through setting this up."** Claude reads [`skill.md`](/lib/08-agents/anthropic-cookbook/managed_agents-cma-mcp-skill) and drives whichever path you pick:

| Client | Transport | Entrypoint |
|---|---|---|
| **Claude Desktop / Claude Code** | stdio (local process) | `src/server.ts` |
| **claude.ai web** (custom Connector) | Streamable HTTP (deployed URL + bearer token) | `src/server-http.ts` |

## Tools

| Tool | CMA endpoint |
|---|---|
| `list_agents` / `get_agent` | `GET /v1/agents[/{id}]` |
| `create_session` | `POST /v1/sessions` |
| `send_message` / `interrupt` | `POST /v1/sessions/{id}/events` |
| `get_session` | `GET /v1/sessions/{id}` |
| `list_events` | `GET /v1/sessions/{id}/events` |
| `archive_session` | `POST /v1/sessions/{id}/archive` |
| **`wait_for_idle`** | streams `…/events/stream` until idle, returns reply text |

## Files

| | |
|---|---|
| `src/cma.ts` | Anthropic SDK calls — shared |
| `src/tools.ts` | Nine `server.tool(...)` registrations — shared |
| `src/server.ts` | stdio entrypoint (~10 LOC) |
| `src/server-http.ts` | HTTP entrypoint + bearer auth (~40 LOC) |
| `Dockerfile` | Fly / Railway / Render deploy for the HTTP path |

Requires `@anthropic-ai/sdk` ≥ 0.95.1.
