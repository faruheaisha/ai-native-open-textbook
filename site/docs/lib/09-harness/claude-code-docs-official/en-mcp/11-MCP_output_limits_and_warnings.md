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
pageSha256: "0a1fbef87991e40c5cd3614449ae0f2c2793afd811906a1b9ae960fc7e5a2570"
contentMode: "local-full"
zh: ""
---

## MCP output limits and warnings

When MCP tools produce large outputs, Claude Code helps manage the token usage to prevent overwhelming your conversation context:

* **Output warning threshold**: Claude Code displays a warning when any MCP tool output exceeds 10,000 tokens
* **Configurable limit**: you can adjust the maximum allowed MCP output tokens using the `MAX_MCP_OUTPUT_TOKENS` environment variable
* **Default limit**: the default maximum is 25,000 tokens
* **Scope**: the environment variable applies to tools that don't declare their own limit. Tools that set [`anthropic/maxResultSizeChars`](#raise-the-limit-for-a-specific-tool) use that value instead for text content, regardless of what `MAX_MCP_OUTPUT_TOKENS` is set to. Tools that return image data are still subject to `MAX_MCP_OUTPUT_TOKENS`
* **Over the limit**: when a result with no image content exceeds the limit, Claude Code saves it to a file and replaces it in the conversation with a message that names the file path, so Claude reads the file when it needs the content. The file goes in the session's `tool-results` directory under [`~/.claude/projects/`](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically).

To increase the limit for tools that produce large outputs:

```bash theme={null}
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

### Raise the limit for a specific tool

If you're building an MCP server, you can allow individual tools to return results larger than the default persist-to-disk threshold by setting `_meta["anthropic/maxResultSizeChars"]` in the tool's `tools/list` response entry. Claude Code raises that tool's threshold to the annotated value, up to a hard ceiling of 500,000 characters.

This is useful for tools that return inherently large but necessary outputs, such as database schemas or full file trees. Without the annotation, results that exceed the default threshold are persisted to disk and replaced with a file reference in the conversation.

```json theme={null}
{
  "name": "get_schema",
  "description": "Returns the full database schema",
  "_meta": {
    "anthropic/maxResultSizeChars": 200000
  }
}
```

The annotation applies independently of `MAX_MCP_OUTPUT_TOKENS` for text content, so users don't need to raise the environment variable for tools that declare it. Tools that return image data are still subject to the token limit.

  If you frequently encounter output warnings with specific MCP servers you don't control, consider increasing the `MAX_MCP_OUTPUT_TOKENS` limit. You can also ask the server author to add the `anthropic/maxResultSizeChars` annotation or to paginate their responses. The annotation has no effect on tools that return image content; for those, raising `MAX_MCP_OUTPUT_TOKENS` is the only option.
