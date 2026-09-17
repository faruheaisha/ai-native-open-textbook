---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/latest-model/gpt-5.4.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/latest-model/gpt-5.4.md"
sourceSha256: "bbf8fc52c2fd49a6a367f4e1a04491b281f706c5c1b608e99868136bbc73e71a"
pageSha256: "b96d92ed37136d7816bee4623f722237b65f811d8dcb4c7d8088308507faec68"
contentMode: "local-full"
zh: ""
---

## Using tools with GPT-5.4

GPT-5.4 has been post-trained on specific tools. See the [tools docs](https://developers.openai.com/api/docs/guides/tools) for more specific guidance.

### Computer use tool

Computer use lets GPT-5.4 operate software through the user interface by inspecting screenshots and returning structured actions for your harness to execute. It is a good fit for browser or desktop workflows where a person could complete the task through the UI, such as navigating a site, filling out forms, or validating that a change actually worked.

Use it in an isolated browser or VM, and keep a human in the loop for high-impact actions. The full guide covers the built-in Responses API loop, custom harness patterns, and code-execution-based setups.

[Computer use guide

      Learn how to run the built-in computer tool safely and integrate it with
    your own harness.](https://developers.openai.com/api/docs/guides/tools-computer-use)

### Tool search tool

Tool search lets GPT-5.4 defer large tool surfaces until runtime so the model loads only the definitions it needs. This is most useful when you have many functions, `namespaces`, or MCP tools and want to reduce token usage, preserve cache performance, and improve latency without exposing every schema up front.

Use hosted tool search when the candidate tools are already known at request time, or client-executed tool search when your application needs to decide what to load dynamically. The full guide also covers best practices for `namespaces`, MCP servers, and deferred loading.

[Tool search guide

      Learn how to defer tool definitions and load the right subset at runtime.](https://developers.openai.com/api/docs/guides/tools-tool-search)

### Custom tools

When the GPT-5 model family launched, we introduced a new capability called custom tools, which lets models send any raw text as tool call input but still constrain outputs if desired. This tool behavior remains true in GPT-5.4.

[Function calling guide

      Learn about custom tools in the function calling guide.](https://developers.openai.com/api/docs/guides/function-calling)

#### Freeform inputs

Define your tool with `type: custom` to enable models to send plaintext inputs directly to your tools, rather than being limited to structured JSON. The model can send any raw text—code, SQL queries, shell commands, configuration files, or long-form prose—directly to your tool.

```json
{
  "type": "custom",
  "name": "code_exec",
  "description": "Executes arbitrary python code"
}
```

#### Constraining outputs

GPT-5.4 supports context-free grammars (`CFGs`) for custom tools, letting you provide a Lark grammar to constrain outputs to a specific syntax or DSL. Attaching a CFG, for example a SQL or DSL grammar, ensures the assistant's text matches your grammar.

This enables precise, constrained tool calls or structured responses and lets you enforce strict syntactic or domain-specific formats directly in GPT-5.4's function calling, improving control and reliability for complex or constrained domains.

#### Best practices for custom tools

- **Write concise, explicit tool descriptions.** The model chooses what to send based on your description; state explicitly if you want it to always call the tool.
- **Validate outputs on the server side**. Freeform strings are powerful but require safeguards against injection or unsafe commands.

### Allowed tools

The `allowed_tools` parameter under `tool_choice` lets you pass N tool definitions but restrict the model to only M (&lt; N) of them. List your full toolkit in `tools`, and then use an `allowed_tools` block to name the subset and specify a mode—either `auto` (the model may pick any of those) or `required` (the model must invoke one).

[Function calling guide

      Learn about the allowed tools option in the function calling guide.](https://developers.openai.com/api/docs/guides/function-calling)

By separating all possible tools from the subset that can be used _now_, you gain greater safety, predictability, and improved prompt caching. You also avoid brittle prompt engineering, such as hard-coded call order. GPT-5.4 dynamically invokes or requires specific functions mid-conversation while reducing the risk of unintended tool usage over long contexts.

|                  | **Standard Tools**                        | **Allowed Tools**                                             |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------- |
| Model's universe | All tools listed under **`"tools": […]`** | Only the subset under **`"tools": […]`** in **`tool_choice`** |
| Tool invocation  | Model may or may not call any tool        | Model restricted to (or required to call) chosen tools        |
| Purpose          | Declare available capabilities            | Constrain which capabilities are actually used                |

```json
{
  "tool_choice": {
    "type": "allowed_tools",
    "mode": "auto",
    "tools": [
      { "type": "function", "name": "get_weather" },
      { "type": "function", "name": "search_docs" }
    ]
  }
}
```

For a more detailed overview of all of these new features, see the [prompt guidance for GPT-5.4](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.4#prompting-best-practices).

### Preambles

Preambles are brief, user-visible explanations that GPT-5.4 generates before invoking any tool or function, outlining its intent or plan—for example, “why I'm calling this tool.” They appear after the chain of thought and before the actual tool call, making the model's reasoning easier to understand and debug while supporting precise steering.

By letting GPT-5.4 “think out loud” before each tool call, preambles boost tool-calling accuracy (and overall task success) without bloating reasoning overhead. To enable preambles, add a system or developer instruction—for example: “Before you call a tool, explain why you are calling it.” GPT-5.4 adds a concise rationale to each specified tool call. The model may also output multiple messages between tool calls, which can enhance the interaction experience—particularly for minimal reasoning or latency-sensitive use cases.

For more on using preambles, see the [GPT-5 prompting cookbook](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide#tool-preambles).
