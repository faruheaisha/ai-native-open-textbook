---
title: "Model Context Protocol"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/extend/mcp.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/extend/mcp.md"
sourceSha256: "41f531ed9200f16cda4519d632e42589c40f50671bd370ce45cf8f1ebf67fa2d"
pageSha256: "41f531ed9200f16cda4519d632e42589c40f50671bd370ce45cf8f1ebf67fa2d"
contentMode: "local-full"
zh: ""
---

# Model Context Protocol

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Model Context Protocol (MCP) connects models to tools and context. Use it to
give ChatGPT or Codex access to third-party documentation, or to let it
interact with developer tools like your browser or Figma.

ChatGPT web can use remote MCP-backed tools supplied by plugins. Local Codex
clients can also connect directly to MCP servers and share their configuration.

The ChatGPT desktop app, Codex CLI, and IDE extension support MCP servers and
share MCP configuration for the same Codex host.

The supported server features below apply to MCP servers configured on a Codex
host. Hosted plugin tools can have different capabilities.

## Supported MCP features

- **STDIO servers**: Servers that run as a local process (started by a command).
  - Environment variables
- **Streamable HTTP servers**: Servers that you access at an address.
  - Bearer token authentication
  - OAuth authentication, including Client ID Metadata Documents (CIMD) and
    Dynamic Client Registration (DCR)
  - ChatGPT session authentication for trusted first-party servers
- **Server instructions**: Codex reads the MCP `instructions` field returned during initialization and uses it as server-wide guidance alongside the server's tools.

If you build or maintain an MCP server for Codex, use `instructions` for cross-tool workflows, constraints, and rate limits that apply across the server. Keep the first 512 characters self-contained so the most important guidance is available when Codex is deciding how to use the server.

## Connect Codex to an MCP server

Codex stores MCP configuration in `config.toml` alongside other Codex configuration settings. By default this is `~/.codex/config.toml`, but you can also scope MCP servers to a project with `.codex/config.toml` (trusted projects only).

The ChatGPT desktop app, Codex CLI, and IDE extension share this configuration.
Once you configure your MCP servers, you can switch among those clients without
redoing setup.

### Configure in the ChatGPT desktop app

1. Open **Settings**, then select **MCP servers**.
2. Select **Add server**.
3. Enter a name, choose **STDIO** or **Streamable HTTP**, and provide the
   server's command or URL.
4. Save the server, then select **Restart**.

The server list shows which servers are enabled and which require OAuth. Select
**Authenticate** when an OAuth server requires sign-in. In the composer, type `/mcp`
to view connected servers.

## Use MCP-backed tools in ChatGPT web

In a hosted ChatGPT Work chat, install a [plugin](https://learn.chatgpt.com/docs/plugins) to use its
bundled connectors and remote MCP tools. After installation, Chat and Work can
use those tools. Workspace administrators can control which plugins and tools
are available.

ChatGPT web doesn't read local Codex configuration files or expose the local
Codex command menu. Open the **Plugins** tab to browse and manage available
tools.

### Configure with the CLI

#### Add an MCP server

```bash
