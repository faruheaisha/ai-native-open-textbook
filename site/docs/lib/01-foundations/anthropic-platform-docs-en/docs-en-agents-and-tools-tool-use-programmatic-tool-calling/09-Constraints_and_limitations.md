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
sourceRel: "docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
sourceSha256: "5256f453318138b7eb03910688ec74c8df7cbe541509c6528bbd721e702f7df1"
pageSha256: "3292f81b5543ccedad84cae748375133d1e6c1cac070a8628e3b7d139128748e"
contentMode: "local-full"
zh: ""
---

## Constraints and limitations

### Feature incompatibilities

* **Structured outputs:** Tools with `strict: true` are not supported with programmatic calling
* **Tool choice:** You cannot force programmatic calling of a specific tool through `tool_choice`
* **Parallel tool use:** `disable_parallel_tool_use: true` is not supported with programmatic calling

### Input schema limitations

Custom tools whose `input_schema` contains a recursive `$ref` (a reference cycle, such as a schema that refers to itself) cannot be enabled for programmatic calling. Including a code execution tool version in `allowed_callers` for such a tool causes the request to fail with a `400 invalid_request_error` whose message contains `Circular $ref detected`. The same schema is accepted for direct tool calling.

To work around this, do one of the following:

* Keep the tool direct-only by omitting `allowed_callers` (or setting it to `["direct"]`). Other tools in the same request can still use programmatic calling.
* Remove the cycle from the schema. For example, unroll the recursion to a fixed depth and describe any deeper nesting in the `description` of the innermost level, or replace the recursive property with a plain `\{"type": "object"\}` whose `description` explains the expected shape.

### Tool restrictions

The following tools cannot be called programmatically:

* Tools provided by an [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)
* The [computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) and [browser use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool) toolsets (`computer_toolset_20260801` and `browser_toolset_20260801`), whose `allowed_callers` field accepts only `"direct"`

### Message formatting restrictions

When responding to programmatic tool calls, there are strict formatting requirements:

**Tool result only responses:** If there are pending programmatic tool calls waiting for results, your response message must contain **only** `tool_result` blocks. You cannot include any text content, even after the tool results.

Invalid - Cannot include text when responding to programmatic tool calls:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01",
      "content": "[{\"customer_id\": \"C1\", \"revenue\": 45000}]"
    },
    { "type": "text", "text": "What should I do next?" }
  ]
}
```

Valid - Only tool results when responding to programmatic tool calls:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01",
      "content": "[{\"customer_id\": \"C1\", \"revenue\": 45000}]"
    }
  ]
}
```

This restriction only applies when responding to programmatic (code execution) tool calls. For regular client-side tool calls, you can include text content after tool results.

**Text-only tool result content:** The `content` of each `tool_result` that answers a programmatic call must be a string or `text` blocks. Image, document, and other content block types are rejected.

### Rate limits

Programmatic tool calls are subject to the same rate limits as regular tool calls. Each tool call from code execution counts as a separate invocation.

### Validate tool results before use

When implementing user-defined tools that will be called programmatically:

* **Tool results are returned as strings:** They can contain any content, including code snippets or executable commands that may be processed by the execution environment.
* **Validate external tool results:** If your tool returns data from external sources or accepts user input, be aware of code injection risks if the output will be interpreted or executed as code.
