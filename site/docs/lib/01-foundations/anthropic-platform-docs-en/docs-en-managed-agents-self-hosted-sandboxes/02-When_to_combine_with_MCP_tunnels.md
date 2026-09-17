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
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "0f6481e0b1d5f0f61f3b8898536c8eeb75c7f3f5b40abafb8eff4f77ca9318ca"
contentMode: "local-full"
zh: ""
---

## When to combine with MCP tunnels

Self-hosting controls *where the agent's code executes*. [MCP tunnels](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview) control *how Anthropic reaches MCP servers in your network*. They are independent: a session running in Anthropic's cloud sandboxes can still reach private MCP servers through a tunnel, and a self-hosted session can use either tunneled or public MCP servers. Use both when you want execution and tool access to stay inside your boundary. To give the agent tools from an MCP server inside your network without running a tunnel, you can also [wrap the server as custom tools](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#wrap-an-mcp-server-as-custom-tools) served by your worker.
