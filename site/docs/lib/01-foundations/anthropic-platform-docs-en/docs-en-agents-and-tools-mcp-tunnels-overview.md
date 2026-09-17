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
sourceRel: "docs/en/agents-and-tools/mcp-tunnels/overview.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/mcp-tunnels/overview.md"
sourceSha256: "8232992e56c56c5bc8c8001c475d8d6b65cf328cbecddf68e0dd608496807bd1"
pageSha256: "8232992e56c56c5bc8c8001c475d8d6b65cf328cbecddf68e0dd608496807bd1"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

MCP tunnels let you connect Claude to Model Context Protocol (MCP) servers that run inside your private network. Traffic flows over an outbound-only connection, so you don't need to open inbound firewall ports, expose services to the public internet, or allowlist Anthropic's IP ranges on your origin.

  MCP tunnels are in research preview. [Request access](https://claude.com/form/mcp-tunnels) to try them. They are provided "as-is" without any uptime, support, or continuity commitment, and they depend on a third-party network provider (Cloudflare) that makes no availability commitment for the underlying transport. Anthropic may modify or discontinue MCP tunnels at any time.

For Zero Data Retention and HIPAA BAA eligibility, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#feature-eligibility).

## How it works

The [tunnel stack](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) is two components that run inside your network:

* **[cloudflared](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components):** Cloudflare's open-source tunnel connector. It initiates outbound-only connections to the [tunnel edge](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) and carries encrypted traffic from Anthropic to your proxy.
* **[Proxy](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components):** Anthropic's routing component. It terminates [inner TLS](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components), validates that upstream IPs fall within an allowed range, and routes each request to the correct [upstream MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) based on hostname.
