---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/mcp.md"
sourceSha256: "10c37e3b840932b59cb7c7ab34e81595c598b0213bd2f1bb15c8effa1d7bc22b"
pageSha256: "7d0f935ef69127209d008c2a277906de6406badb76b0a7c63cf6d8dd060c9c85"
contentMode: "local-full"
zh: ""
---

## Find and build MCP servers

Browse reviewed connectors in the [Anthropic Directory](https://claude.ai/directory). Directory connectors use the same MCP infrastructure as Claude Code, so you can add any remote server listed there with `claude mcp add`.

  Verify you trust each server before connecting it. Servers that fetch external content can expose you to [prompt injection risk](https://code.claude.com/docs/en/security#protect-against-prompt-injection).

To build your own server, see the [MCP server guide](https://modelcontextprotocol.io/docs/develop/build-server) for protocol fundamentals and the [Claude connector building docs](https://claude.com/docs/connectors/building) for authentication, testing, and Directory submission.

You can also have Claude scaffold a server for you with the official [`mcp-server-dev` plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev).

    In a Claude Code session, run:

    ```
    /plugin install mcp-server-dev@claude-plugins-official
    ```

    If the install fails, match the message Claude Code reports:

    * `Marketplace "claude-plugins-official" not found`: add the marketplace with `/plugin marketplace add anthropics/claude-plugins-official`, then retry the install.
    * The plugin is [not found in the marketplace](https://code.claude.com/docs/en/discover-plugins#install-plugins): check the plugin name.

    If the install summary reports `Run /reload-plugins to activate.`, Claude Code then runs that reload for you. If the reload warns that your next message would re-read the conversation, run `/reload-plugins --force`.

    ```
    /mcp-server-dev:build-mcp-server
    ```

    Claude asks about your use case and scaffolds a remote HTTP or local stdio server.
