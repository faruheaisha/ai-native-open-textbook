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
pageSha256: "dfa2299c40448d48c2b4f8715826a7d72681f62ef95939c3a32ad24938dd59a9"
contentMode: "local-full"
zh: ""
---

## Import MCP servers from Claude Desktop

If you've already configured MCP servers in Claude Desktop, you can import them:

    ```bash theme=\{null\}
    # Basic syntax
    claude mcp add-from-claude-desktop
    ```

    After running the command, you'll see an interactive dialog that allows you to select which servers you want to import.

    ```bash theme=\{null\}
    claude mcp list
    ```

Server names added through `claude mcp` commands can contain only letters, numbers, hyphens, and underscores. Claude Desktop doesn't apply that restriction, so a Claude Desktop server whose name contains any other character, such as a space, can't be imported. The import reports each name it rejects and still imports the other servers you selected. Before v2.1.205, the first invalid name stopped the import and none of the selected servers were added.

  Tips:

  * This feature only works on macOS and Windows Subsystem for Linux (WSL)
  * It reads the Claude Desktop configuration file from its standard location on those platforms
  * Use the `--scope user` flag to add servers to your user configuration
  * Imported servers keep the same names as in Claude Desktop when the name contains only letters, numbers, hyphens, and underscores. Claude Code reports a server whose name contains any other character and skips it
  * If servers with the same names already exist, they get a numerical suffix (for example, `server_1`)
