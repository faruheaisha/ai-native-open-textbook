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
pageSha256: "c1f7be28b82e2c7585bc83920828e2778f492229b4208b711d2069ac6e53a8b4"
contentMode: "local-full"
zh: ""
---

## Add MCP servers from JSON configuration

If you have a JSON configuration for an MCP server, you can add it directly:

    ```bash theme=\{null\}
    # Basic syntax
    claude mcp add-json &lt;name> '&lt;json>'

    # Example: Adding an HTTP server with JSON configuration
    claude mcp add-json weather-api '\{"type":"http","url":"https://api.weather.com/mcp","headers":\{"Authorization":"Bearer token"&#125;&#125;'

    # Example: Adding a stdio server with JSON configuration
    claude mcp add-json local-weather '\{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":\{"CACHE_DIR":"/tmp"&#125;&#125;'

    # Example: Adding an HTTP server with pre-configured OAuth credentials
    claude mcp add-json my-server '\{"type":"http","url":"https://mcp.example.com/mcp","oauth":\{"clientId":"your-client-id","callbackPort":8080&#125;&#125;' --client-secret
    ```

    ```bash theme=\{null\}
    claude mcp get weather-api
    ```

  Tips:

  * Make sure the JSON is properly escaped in your shell
  * The JSON must conform to the MCP server configuration schema
  * You can use `--scope user` to add the server to your user configuration instead of the project-specific one
