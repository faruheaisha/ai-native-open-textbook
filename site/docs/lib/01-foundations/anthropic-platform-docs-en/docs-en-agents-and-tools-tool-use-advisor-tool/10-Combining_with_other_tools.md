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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "56e41b5b98b56a8fb777f892f6262dfd4903ca312ebb7cb104d038e362f5f431"
contentMode: "local-full"
zh: ""
---

## Combining with other tools

The advisor tool composes with other server-side and client-side tools. Add them all to the same `tools` array:

  ```python Python
  tools = [
      {
          "type": "web_search_20250305",
          "name": "web_search",
          "max_uses": 5,
      },
      {
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-5",
      },
      {
          "name": "run_bash",
          "description": "Run a bash command",
          "input_schema": {
              "type": "object",
              "properties": {"command": {"type": "string"}},
          },
      },
  ]
  ```

  ```typescript TypeScript
  const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
    {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 5
    },
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5"
    },
    {
      name: "run_bash",
      description: "Run a bash command",
      input_schema: {
        type: "object",
        properties: { command: { type: "string" } }
      }
    }
  ];
  ```

  ```csharp C#
  using System.Text.Json;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var tools = new BetaToolUnion[]
  {
      new BetaWebSearchTool20250305 { MaxUses = 5 },
      new BetaAdvisorTool20260301 { Model = Messages::Model.ClaudeOpus5 },
      new BetaTool
      {
          Name = "run_bash",
          Description = "Run a bash command",
          InputSchema = new()
          {
              Properties = new Dictionary<string, JsonElement>
              {
                  ["command"] = JsonSerializer.SerializeToElement(new { type = "string" })
              }
          }
      }
  };
  ```

  ```go Go
  tools := []anthropic.BetaToolUnionParam{
  	{OfWebSearchTool20250305: &anthropic.BetaWebSearchTool20250305Param{
  		MaxUses: anthropic.Int(5),
  	}},
  	{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  		Model: anthropic.ModelClaudeOpus5,
  	}},
  	{OfTool: &anthropic.BetaToolParam{
  		Name:        "run_bash",
  		Description: anthropic.String("Run a bash command"),
  		InputSchema: anthropic.BetaToolInputSchemaParam{
  			Properties: map[string]any{
  				"command": map[string]any{"type": "string"},
  			},
  		},
  	}},
  }
  ```

  ```java Java
  import com.anthropic.core.JsonValue;
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaTool;
  import com.anthropic.models.beta.messages.BetaToolUnion;
  import com.anthropic.models.beta.messages.BetaWebSearchTool20250305;
  import com.anthropic.models.messages.Model;

  List<BetaToolUnion> tools = List.of(
      BetaToolUnion.ofWebSearchTool20250305(BetaWebSearchTool20250305.builder()
          .maxUses(5L)
          .build()),
      BetaToolUnion.ofAdvisorTool20260301(BetaAdvisorTool20260301.builder()
          .model(Model.CLAUDE_OPUS_5)
          .build()),
      BetaToolUnion.ofBetaTool(BetaTool.builder()
          .name("run_bash")
          .description("Run a bash command")
          .inputSchema(BetaTool.InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "command", Map.of("type", "string"))))
              .build())
          .build()));
  ```

  ```php PHP
  $tools = [
      [
          'type' => 'web_search_20250305',
          'name' => 'web_search',
          'max_uses' => 5,
      ],
      [
          'type' => 'advisor_20260301',
          'name' => 'advisor',
          'model' => 'claude-opus-5',
      ],
      [
          'name' => 'run_bash',
          'description' => 'Run a bash command',
          'input_schema' => [
              'type' => 'object',
              'properties' => ['command' => ['type' => 'string']],
          ],
      ],
  ];
  ```

  ```ruby Ruby
  tools = [
    {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 5
    },
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5"
    },
    {
      name: "run_bash",
      description: "Run a bash command",
      input_schema: {
        type: "object",
        properties: { command: { type: "string" } }
      }
    }
  ]
  ```

The executor can search the web, call the advisor, and use your custom tools in the same turn. The advisor's plan can inform which tools the executor reaches for next.

| Feature                                                                                    | Interaction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) | Supported. `usage.iterations` is reported per item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)     | Returns the executor's first-iteration input tokens only. For a rough advisor estimate, call `count_tokens` with `model` set to the advisor model and the same messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)   | `clear_tool_uses` is not fully compatible with advisor tool blocks. With `clear_thinking`, see the earlier caching warning.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pause_turn`                                                                               | A dangling advisor call ends the response with `stop_reason: "pause_turn"` and a `server_tool_use` block with no result when no client `tool_use` block is awaiting your result in the same turn. The advisor runs on resumption. If the executor also called one of your tools in that turn, the response ends with `stop_reason: "tool_use"` instead, and the pending advisor call runs at the start of your next request, after you send the `tool_result` blocks. See [Resuming a paused turn](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#resuming-a-paused-turn), [Mixing server tools and client tools in one turn](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#mixing-server-tools-and-client-tools-in-one-turn), and [Server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#the-server-side-loop-and-pause-turn). |
