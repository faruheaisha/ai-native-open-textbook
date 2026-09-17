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
pageSha256: "5066ad587ae682e03119cf7ce3b8eabd68c04c092633137350dbbe7b6e53cfdd"
contentMode: "local-full"
zh: ""
---

## Use MCP resources

MCP servers can expose resources that you can reference using @ mentions, similar to how you reference files.

### Reference MCP resources

    Type `@` in your prompt to see available resources from all connected MCP servers. Resources appear alongside files in the autocomplete menu.

    Use the format `@server:protocol://resource/path` to reference a resource:

    ```text wrap theme=\{null\}
    Can you analyze @github:issue://123 and suggest a fix?
    ```

    ```text wrap theme=\{null\}
    Please review the API documentation at @docs:file://api/authentication
    ```

    You can reference multiple resources in a single prompt:

    ```text wrap theme=\{null\}
    Compare @postgres:schema://users with @docs:file://database/user-model
    ```

  Tips:

  * Resources are automatically fetched and included as attachments when referenced
  * Resource paths are fuzzy-searchable in the @ mention autocomplete
  * Claude Code automatically provides tools to list and read MCP resources when servers support them
  * Resources can contain any type of content that the MCP server provides (text, JSON, structured data, etc.)
