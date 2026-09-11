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

MCP server that exposes Managed Agents session primitives as tools. Two entrypoints sharing one tool set: `src/server.ts` (stdio → Claude Desktop) and `src/server-http.ts` (Streamable HTTP → claude.ai web Connector).

## When the user asks to set this up, extend it, or debug it

1. **Invoke `/claude-api` first.** That skill loads the full Managed Agents API reference (agents, sessions, events, environments). Use it as the source of truth for any SDK call — don't guess field names.
2. **Read `./skill.md`** and walk the user through it. First ask which client they're targeting (Claude Desktop → stdio path; claude.ai web → HTTP + deploy + Connector), then follow that path's checklist. Both end with the same `send_message → wait_for_idle` loop and relay-mode Project instructions.
3. **Adding a tool?** Map the CMA endpoint 1:1 in `src/cma.ts`, then register it in `src/server.ts` with a zod schema. See the tier table in skill.md for what's deliberately **not** exposed (destructive ops, secrets).

Commands: `bun run stdio` (Desktop), `bun run http` (claude.ai), `bun run typecheck`.
