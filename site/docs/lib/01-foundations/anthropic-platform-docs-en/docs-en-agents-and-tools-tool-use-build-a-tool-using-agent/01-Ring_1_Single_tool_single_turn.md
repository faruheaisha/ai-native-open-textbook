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
sourceRel: "docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md"
sourceSha256: "2e704eb55773e50e3408501b9a533b88f0f8944182cf49d0f912106e04851cef"
pageSha256: "eb5cb4d93b9575b2c7afa1277666a01c235c721499b5d5b69070e37c4dce9157"
contentMode: "local-full"
zh: ""
---

## Ring 1: Single tool, single turn

The smallest possible tool-using program: one tool, one user message, one tool call, one result. The code is heavily commented so you can map each line to the [tool use lifecycle](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works).

The request sends a `tools` array alongside the user message. When Claude determines that a tool call is needed, the response comes back with `stop_reason: "tool_use"` and a `tool_use` content block containing the tool name, a unique `id`, and the structured `input`. Your code runs the tool, then sends the result back in a `tool_result` block whose `tool_use_id` matches the `id` from the call.

  ```bash cURL
  #!/bin/bash
  # Ring 1: Single tool, single turn.

  # Define one tool as a JSON fragment. The input_schema is a JSON Schema
  # object describing the arguments Claude should pass when it calls this
  # tool. This schema includes nested objects (recurrence), arrays
  # (attendees), and optional fields, which is closer to real-world tools
  # than a flat string argument.
  TOOLS='[
    {
      "name": "create_calendar_event",
      "description": "Create a calendar event with attendees and optional recurrence.",
      "input_schema": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "start": {"type": "string", "format": "date-time"},
          "end": {"type": "string", "format": "date-time"},
          "attendees": {
            "type": "array",
            "items": {"type": "string", "format": "email"}
          },
          "recurrence": {
            "type": "object",
            "properties": {
              "frequency": {"enum": ["daily", "weekly", "monthly"]},
              "count": {"type": "integer", "minimum": 1}
            }
          }
        },
        "required": ["title", "start", "end"]
      }
    }
  ]'

  USER_MSG="Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am."

  # Send the user's request along with the tool definition. Claude decides
  # whether to call the tool based on the request and the tool description.
  RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d "$(jq -n \
      --argjson tools "$TOOLS" \
      --arg msg "$USER_MSG" \
      '{
        model: "claude-opus-5",
        max_tokens: 1024,
        tools: $tools,
        tool_choice: {type: "auto", disable_parallel_tool_use: true},
        messages: [{role: "user", content: $msg}]
      }')")

  # When Claude calls a tool, the response has stop_reason "tool_use"
  # and the content array contains a tool_use block alongside any text.
  echo "stop_reason: $(echo "$RESPONSE" | jq -r '.stop_reason')"

  # Find the tool_use block. A response may contain text blocks before the
  # tool_use block, so filter by type rather than assuming position.
  TOOL_USE=$(echo "$RESPONSE" | jq '.content[] | select(.type == "tool_use")')
  TOOL_USE_ID=$(echo "$TOOL_USE" | jq -r '.id')
  echo "Tool: $(echo "$TOOL_USE" | jq -r '.name')"
  echo "Input: $(echo "$TOOL_USE" | jq -c '.input')"

  # Execute the tool. In a real system this would call your calendar API.
  # Here the result is hardcoded to keep the example self-contained.
  RESULT='{"event_id": "evt_123", "status": "created"}'

  # Send the result back. The tool_result block goes in a user message and
  # its tool_use_id must match the id from the tool_use block above. The
  # assistant's previous response is included so Claude has the full history.
  ASSISTANT_CONTENT=$(echo "$RESPONSE" | jq '.content')
  FOLLOWUP=$(curl -s https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d "$(jq -n \
      --argjson tools "$TOOLS" \
      --arg msg "$USER_MSG" \
      --argjson assistant "$ASSISTANT_CONTENT" \
      --arg tool_use_id "$TOOL_USE_ID" \
      --arg result "$RESULT" \
      '{
        model: "claude-opus-5",
        max_tokens: 1024,
        tools: $tools,
        tool_choice: {type: "auto", disable_parallel_tool_use: true},
        messages: [
          {role: "user", content: $msg},
          {role: "assistant", content: $assistant},
          {role: "user", content: [
            {type: "tool_result", tool_use_id: $tool_use_id, content: $result}
          ]}
        ]
      }')")

  # With the tool result in hand, Claude produces a final natural-language
  # answer and stop_reason becomes "end_turn".
  echo "stop_reason: $(echo "$FOLLOWUP" | jq -r '.stop_reason')"
  echo "$FOLLOWUP" | jq -r '.content[] | select(.type == "text") | .text'
  ```

  ```bash CLI
  #!/usr/bin/env bash
  # Ring 1: Single tool, single turn.
  # Uses jq for cross-turn message-array state — building an agentic loop in shell
  # requires JSON manipulation beyond ant's single-call --transform scope.
  set -euo pipefail

  USER_MSG="Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am."
  MESSAGES=$(jq -n --arg msg "$USER_MSG" '[{role: "user", content: $msg}]')

  # Define one tool. The input_schema is a JSON Schema object describing
  # the arguments Claude should pass when it calls this tool. This schema
  # includes nested objects (recurrence), arrays (attendees), and optional
  # fields, which is closer to real-world tools than a flat string argument.
  call_api() {
    # ant reads the request body as YAML on stdin: no auth headers, no
    # hand-built JSON envelope. The static keys (model, tools, tool_choice)
    # live in a quoted heredoc; the growing messages array is appended as
    # JSON, which YAML accepts as flow syntax.
    {
      cat <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  tool_choice: {type: auto, disable_parallel_tool_use: true}
  tools:
    - name: create_calendar_event
      description: Create a calendar event with attendees and optional recurrence.
      input_schema:
        type: object
        properties:
          title: {type: string}
          start: {type: string, format: date-time}
          end: {type: string, format: date-time}
          attendees:
            type: array
            items: {type: string, format: email}
          recurrence:
            type: object
            properties:
              frequency: {enum: [daily, weekly, monthly]}
              count: {type: integer, minimum: 1}
        required: [title, start, end]
  YAML
      printf 'messages: %s\n' "$MESSAGES"
    } | ant messages create --format json
  }

  # Send the user's request along with the tool definition. Claude decides
  # whether to call the tool based on the request and the tool description.
  RESPONSE=$(call_api)

  # When Claude calls a tool, the response has stop_reason "tool_use"
  # and the content array contains a tool_use block alongside any text.
  echo "stop_reason: $(jq -r '.stop_reason' <<<"$RESPONSE")"

  # Find the tool_use block. A response may contain text blocks before the
  # tool_use block, so filter by type rather than assuming position.
  TOOL_USE=$(jq '.content[] | select(.type == "tool_use")' <<<"$RESPONSE")
  TOOL_USE_ID=$(jq -r '.id' <<<"$TOOL_USE")
  echo "Tool: $(jq -r '.name' <<<"$TOOL_USE")"
  echo "Input: $(jq -c '.input' <<<"$TOOL_USE")"

  # Execute the tool. In a real system this would call your calendar API.
  # Here the result is hardcoded to keep the example self-contained.
  RESULT='{"event_id": "evt_123", "status": "created"}'

  # Send the result back. The tool_result block goes in a user message and
  # its tool_use_id must match the id from the tool_use block above. The
  # assistant's previous response is included so Claude has the full history.
  MESSAGES=$(jq \
    --argjson assistant "$(jq '.content' <<<"$RESPONSE")" \
    --arg tool_use_id "$TOOL_USE_ID" \
    --arg result "$RESULT" \
    '. + [
      {role: "assistant", content: $assistant},
      {role: "user", content: [
        {type: "tool_result", tool_use_id: $tool_use_id, content: $result}
      ]}
    ]' <<<"$MESSAGES")

  FOLLOWUP=$(call_api)

  # With the tool result in hand, Claude produces a final natural-language
  # answer and stop_reason becomes "end_turn".
  echo "stop_reason: $(jq -r '.stop_reason' <<<"$FOLLOWUP")"
  jq -r '.content[] | select(.type == "text") | .text' <<<"$FOLLOWUP"
  ```

  ```python Python
  # Ring 1: Single tool, single turn.

  import json

  import anthropic

  # Create a client. It reads ANTHROPIC_API_KEY from the environment.
  client = anthropic.Anthropic()

  # Define one tool. The input_schema is a JSON Schema object describing
  # the arguments Claude should pass when it calls this tool. This schema
  # includes nested objects (recurrence), arrays (attendees), and optional
  # fields, which is closer to real-world tools than a flat string argument.
  tools = [
      {
          "name": "create_calendar_event",
          "description": "Create a calendar event with attendees and optional recurrence.",
          "input_schema": {
              "type": "object",
              "properties": {
                  "title": {"type": "string"},
                  "start": {"type": "string", "format": "date-time"},
                  "end": {"type": "string", "format": "date-time"},
                  "attendees": {
                      "type": "array",
                      "items": {"type": "string", "format": "email"},
                  },
                  "recurrence": {
                      "type": "object",
                      "properties": {
                          "frequency": {"enum": ["daily", "weekly", "monthly"]},
                          "count": {"type": "integer", "minimum": 1},
                      },
                  },
              },
              "required": ["title", "start", "end"],
          },
      }
  ]

  # Send the user's request along with the tool definition. Claude decides
  # whether to call the tool based on the request and the tool description.
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=tools,
      tool_choice={"type": "auto", "disable_parallel_tool_use": True},
      messages=[
          {
              "role": "user",
              "content": "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.",
          }
      ],
  )

  # When Claude calls a tool, the response has stop_reason "tool_use"
  # and the content array contains a tool_use block alongside any text.
  print(f"stop_reason: {response.stop_reason}")

  # Find the tool_use block. A response may contain text blocks before the
  # tool_use block, so scan the content array rather than assuming position.
  tool_use = next(block for block in response.content if block.type == "tool_use")
  print(f"Tool: {tool_use.name}")
  print(f"Input: {tool_use.input}")

  # Execute the tool. In a real system this would call your calendar API.
  # Here the result is hardcoded to keep the example self-contained.
  result = {"event_id": "evt_123", "status": "created"}

  # Send the result back. The tool_result block goes in a user message and
  # its tool_use_id must match the id from the tool_use block above. The
  # assistant's previous response is included so Claude has the full history.
  followup = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=tools,
      tool_choice={"type": "auto", "disable_parallel_tool_use": True},
      messages=[
          {
              "role": "user",
              "content": "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.",
          },
          {"role": "assistant", "content": response.content},
          {
              "role": "user",
              "content": [
                  {
                      "type": "tool_result",
                      "tool_use_id": tool_use.id,
                      "content": json.dumps(result),
                  }
              ],
          },
      ],
  )

  # With the tool result in hand, Claude produces a final natural-language
  # answer and stop_reason becomes "end_turn".
  print(f"stop_reason: {followup.stop_reason}")
  final_text = next(block for block in followup.content if block.type == "text")
  print(final_text.text)
  ```

  ```typescript TypeScript
  // Ring 1: Single tool, single turn.

  import Anthropic from "@anthropic-ai/sdk";

  // Create a client. It reads ANTHROPIC_API_KEY from the environment.
  const client = new Anthropic();

  // Define one tool. The input_schema is a JSON Schema object describing
  // the arguments Claude should pass when it calls this tool. This schema
  // includes nested objects (recurrence), arrays (attendees), and optional
  // fields, which is closer to real-world tools than a flat string argument.
  const tools: Anthropic.Tool[] = [
    {
      name: "create_calendar_event",
      description:
        "Create a calendar event with attendees and optional recurrence.",
      input_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          start: { type: "string", format: "date-time" },
          end: { type: "string", format: "date-time" },
          attendees: {
            type: "array",
            items: { type: "string", format: "email" },
          },
          recurrence: {
            type: "object",
            properties: {
              frequency: { enum: ["daily", "weekly", "monthly"] },
              count: { type: "integer", minimum: 1 },
            },
          },
        },
        required: ["title", "start", "end"],
      },
    },
  ];

  // Send the user's request along with the tool definition. Claude decides
  // whether to call the tool based on the request and the tool description.
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools,
    tool_choice: { type: "auto", disable_parallel_tool_use: true },
    messages: [
      {
        role: "user",
        content:
          "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.",
      },
    ],
  });

  // When Claude calls a tool, the response has stop_reason "tool_use"
  // and the content array contains a tool_use block alongside any text.
  console.log(`stop_reason: ${response.stop_reason}`);

  // Find the tool_use block. A response may contain text blocks before the
  // tool_use block, so scan the content array rather than assuming position.
  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
  )!;
  console.log(`Tool: ${toolUse.name}`);
  console.log(`Input: ${JSON.stringify(toolUse.input)}`);

  // Execute the tool. In a real system this would call your calendar API.
  // Here the result is hardcoded to keep the example self-contained.
  const result = { event_id: "evt_123", status: "created" };

  // Send the result back. The tool_result block goes in a user message and
  // its tool_use_id must match the id from the tool_use block above. The
  // assistant's previous response is included so Claude has the full history.
  const followup = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools,
    tool_choice: { type: "auto", disable_parallel_tool_use: true },
    messages: [
      {
        role: "user",
        content:
          "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.",
      },
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          },
        ],
      },
    ],
  });

  // With the tool result in hand, Claude produces a final natural-language
  // answer and stop_reason becomes "end_turn".
  console.log(`stop_reason: ${followup.stop_reason}`);
  for (const block of followup.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
  ```

  ```csharp C#
  // Ring 1: Single tool, single turn.

  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text.Json;
  using System.Threading.Tasks;
  using Anthropic;
  using Anthropic.Models.Messages;

  // Create a client. It reads ANTHROPIC_API_KEY from the environment.
  AnthropicClient client = new();

  // Define one tool. The input schema is a JSON Schema object describing
  // the arguments Claude should pass when it calls this tool. This schema
  // includes nested objects (recurrence), arrays (attendees), and optional
  // fields, which is closer to real-world tools than a flat string argument.
  List<ToolUnion> tools =
  [
      new ToolUnion(new Tool()
      {
          Name = "create_calendar_event",
          Description = "Create a calendar event with attendees and optional recurrence.",
          InputSchema = new InputSchema()
          {
              Properties = new Dictionary<string, JsonElement>
              {
                  ["title"] = JsonSerializer.SerializeToElement(new { type = "string" }),
                  ["start"] = JsonSerializer.SerializeToElement(new { type = "string", format = "date-time" }),
                  ["end"] = JsonSerializer.SerializeToElement(new { type = "string", format = "date-time" }),
                  ["attendees"] = JsonSerializer.SerializeToElement(new
                  {
                      type = "array",
                      items = new { type = "string", format = "email" },
                  }),
                  ["recurrence"] = JsonSerializer.SerializeToElement(new
                  {
                      type = "object",
                      properties = new
                      {
                          frequency = new { @enum = new[] { "daily", "weekly", "monthly" } },
                          count = new { type = "integer", minimum = 1 },
                      },
                  }),
              },
              Required = ["title", "start", "end"],
          },
      }),
  ];

  // Ask for at most one tool call per turn so the single-turn flow below
  // stays predictable.
  var toolChoice = new ToolChoice(new ToolChoiceAuto { DisableParallelToolUse = true });

  const string userPrompt =
      "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.";

  // Send the user's request along with the tool definition. Claude decides
  // whether to call the tool based on the request and the tool description.
  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools = tools,
      ToolChoice = toolChoice,
      Messages = [new() { Role = Role.User, Content = userPrompt }],
  });

  // When Claude calls a tool, the response has stop_reason "tool_use"
  // and the content array contains a tool_use block alongside any text.
  Console.WriteLine($"stop_reason: {response.StopReason?.Raw()}");

  // Find the tool_use block. A response may contain text blocks before the
  // tool_use block, so scan the content array rather than assuming position.
  ToolUseBlock? toolUse = null;
  foreach (var block in response.Content)
  {
      if (block.TryPickToolUse(out var picked))
      {
          toolUse = picked;
          break;
      }
  }
  Console.WriteLine($"Tool: {toolUse!.Name}");
  Console.WriteLine($"Input: {JsonSerializer.Serialize(toolUse.Input)}");

  // Execute the tool. In a real system this would call your calendar API.
  // Here the result is hardcoded to keep the example self-contained.
  var result = """{"event_id": "evt_123", "status": "created"}""";

  // Send the result back. The tool_result block goes in a user message and
  // its tool_use_id must match the id from the tool_use block above. The
  // assistant's previous response is included so Claude has the full history.
  List<ContentBlockParam> toolResults =
  [
      new ContentBlockParam(new ToolResultBlockParam()
      {
          ToolUseID = toolUse.ID,
          Content = result,
      }),
  ];

  var followup = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools = tools,
      ToolChoice = toolChoice,
      Messages =
      [
          new() { Role = Role.User, Content = userPrompt },
          new() { Role = Role.Assistant, Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList() },
          new() { Role = Role.User, Content = new MessageParamContent(toolResults) },
      ],
  });

  // With the tool result in hand, Claude produces a final natural-language
  // answer and stop_reason becomes "end_turn".
  Console.WriteLine($"stop_reason: {followup.StopReason?.Raw()}");
  foreach (var block in followup.Content)
  {
      if (block.TryPickText(out var text))
      {
          Console.WriteLine(text.Text);
      }
  }
  ```

  ```go Go
  // Ring 1: Single tool, single turn.

  package main

  import (
  	"context"
  	"fmt"
  	"log"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  func main() {
  	// Create a client. It reads ANTHROPIC_API_KEY from the environment.
  	client := anthropic.NewClient()
  	ctx := context.Background()

  	// Define one tool. The input schema is a JSON Schema object describing
  	// the arguments Claude should pass when it calls this tool. This schema
  	// includes nested objects (recurrence), arrays (attendees), and optional
  	// fields, which is closer to real-world tools than a flat string argument.
  	tools := []anthropic.ToolUnionParam{
  		{OfTool: &anthropic.ToolParam{
  			Name:        "create_calendar_event",
  			Description: anthropic.String("Create a calendar event with attendees and optional recurrence."),
  			InputSchema: anthropic.ToolInputSchemaParam{
  				Properties: map[string]any{
  					"title": map[string]any{"type": "string"},
  					"start": map[string]any{"type": "string", "format": "date-time"},
  					"end":   map[string]any{"type": "string", "format": "date-time"},
  					"attendees": map[string]any{
  						"type":  "array",
  						"items": map[string]any{"type": "string", "format": "email"},
  					},
  					"recurrence": map[string]any{
  						"type": "object",
  						"properties": map[string]any{
  							"frequency": map[string]any{"enum": []string{"daily", "weekly", "monthly"}},
  							"count":     map[string]any{"type": "integer", "minimum": 1},
  						},
  					},
  				},
  				Required: []string{"title", "start", "end"},
  			},
  		}},
  	}

  	// Ask for at most one tool call per turn so the single-turn flow below
  	// stays predictable.
  	toolChoice := anthropic.ToolChoiceUnionParam{
  		OfAuto: &anthropic.ToolChoiceAutoParam{DisableParallelToolUse: anthropic.Bool(true)},
  	}

  	userMessage := anthropic.NewUserMessage(anthropic.NewTextBlock(
  		"Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.",
  	))

  	// Send the user's request along with the tool definition. Claude decides
  	// whether to call the tool based on the request and the tool description.
  	response, err := client.Messages.New(ctx, anthropic.MessageNewParams{
  		Model:      anthropic.ModelClaudeOpus5,
  		MaxTokens:  1024,
  		Tools:      tools,
  		ToolChoice: toolChoice,
  		Messages:   []anthropic.MessageParam{userMessage},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	// When Claude calls a tool, the response has stop_reason "tool_use"
  	// and the content array contains a tool_use block alongside any text.
  	fmt.Printf("stop_reason: %s\n", response.StopReason)

  	// Find the tool_use block. A response may contain text blocks before the
  	// tool_use block, so scan the content array rather than assuming position.
  	var toolUse anthropic.ContentBlockUnion
  	for _, block := range response.Content {
  		if block.Type == "tool_use" {
  			toolUse = block
  			break
  		}
  	}
  	fmt.Printf("Tool: %s\n", toolUse.Name)
  	fmt.Printf("Input: %s\n", string(toolUse.Input))

  	// Execute the tool. In a real system this would call your calendar API.
  	// Here the result is hardcoded to keep the example self-contained.
  	result := `{"event_id": "evt_123", "status": "created"}`

  	// Send the result back. The tool_result block goes in a user message and
  	// its tool_use_id must match the id from the tool_use block above. The
  	// assistant's previous response is included so Claude has the full history.
  	var assistantContent []anthropic.ContentBlockParamUnion
  	for _, block := range response.Content {
  		assistantContent = append(assistantContent, block.ToParam())
  	}

  	followup, err := client.Messages.New(ctx, anthropic.MessageNewParams{
  		Model:      anthropic.ModelClaudeOpus5,
  		MaxTokens:  1024,
  		Tools:      tools,
  		ToolChoice: toolChoice,
  		Messages: []anthropic.MessageParam{
  			userMessage,
  			anthropic.NewAssistantMessage(assistantContent...),
  			anthropic.NewUserMessage(anthropic.NewToolResultBlock(toolUse.ID, result, false)),
  		},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	// With the tool result in hand, Claude produces a final natural-language
  	// answer and stop_reason becomes "end_turn".
  	fmt.Printf("stop_reason: %s\n", followup.StopReason)
  	for _, block := range followup.Content {
  		if block.Type == "text" {
  			fmt.Println(block.Text)
  		}
  	}
  }
  ```

  ```java Java
  // Ring 1: Single tool, single turn.

  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.core.JsonValue;
  import com.anthropic.models.messages.ContentBlockParam;
  import com.anthropic.models.messages.Message;
  import com.anthropic.models.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;
  import com.anthropic.models.messages.Tool;
  import com.anthropic.models.messages.Tool.InputSchema;
  import com.anthropic.models.messages.ToolChoiceAuto;
  import com.anthropic.models.messages.ToolResultBlockParam;
  import com.anthropic.models.messages.ToolUseBlock;
  import java.util.List;
  import java.util.Map;

  void main() {
      // Create a client. It reads ANTHROPIC_API_KEY from the environment.
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // Define one tool. The input schema is a JSON Schema object describing
      // the arguments Claude should pass when it calls this tool. This schema
      // includes nested objects (recurrence), arrays (attendees), and optional
      // fields, which is closer to real-world tools than a flat string argument.
      Tool calendarTool = Tool.builder()
          .name("create_calendar_event")
          .description("Create a calendar event with attendees and optional recurrence.")
          .inputSchema(InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "title", Map.of("type", "string"),
                  "start", Map.of("type", "string", "format", "date-time"),
                  "end", Map.of("type", "string", "format", "date-time"),
                  "attendees", Map.of(
                      "type", "array",
                      "items", Map.of("type", "string", "format", "email")
                  ),
                  "recurrence", Map.of(
                      "type", "object",
                      "properties", Map.of(
                          "frequency", Map.of("enum", List.of("daily", "weekly", "monthly")),
                          "count", Map.of("type", "integer", "minimum", 1)
                      )
                  )
              )))
              .required(List.of("title", "start", "end"))
              .build())
          .build();

      // Ask for at most one tool call per turn so the single-turn flow below
      // stays predictable.
      ToolChoiceAuto toolChoice = ToolChoiceAuto.builder()
          .disableParallelToolUse(true)
          .build();

      String userPrompt =
          "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.";

      // Send the user's request along with the tool definition. Claude decides
      // whether to call the tool based on the request and the tool description.
      Message response = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(calendarTool)
          .toolChoice(toolChoice)
          .addUserMessage(userPrompt)
          .build());

      // When Claude calls a tool, the response has stop_reason "tool_use"
      // and the content array contains a tool_use block alongside any text.
      IO.println("stop_reason: " + response.stopReason().orElse(null));

      // Find the tool_use block. A response may contain text blocks before the
      // tool_use block, so scan the content array rather than assuming position.
      ToolUseBlock toolUse = response.content().stream()
          .flatMap(block -> block.toolUse().stream())
          .findFirst()
          .orElseThrow();
      IO.println("Tool: " + toolUse.name());
      IO.println("Input: " + toolUse._input());

      // Execute the tool. In a real system this would call your calendar API.
      // Here the result is hardcoded to keep the example self-contained.
      String result = "{\"event_id\": \"evt_123\", \"status\": \"created\"}";

      // Send the result back. The tool_result block goes in a user message and
      // its tool_use_id must match the id from the tool_use block above. The
      // assistant's previous response is included so Claude has the full history.
      Message followup = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(calendarTool)
          .toolChoice(toolChoice)
          .addUserMessage(userPrompt)
          .addMessage(response)
          .addUserMessageOfBlockParams(List.of(ContentBlockParam.ofToolResult(
              ToolResultBlockParam.builder()
                  .toolUseId(toolUse.id())
                  .content(result)
                  .build())))
          .build());

      // With the tool result in hand, Claude produces a final natural-language
      // answer and stop_reason becomes "end_turn".
      IO.println("stop_reason: " + followup.stopReason().orElse(null));
      followup.content().stream()
          .flatMap(block -> block.text().stream())
          .forEach(textBlock -> IO.println(textBlock.text()));
  }
  ```

  ```php PHP
  <?php

  // Ring 1: Single tool, single turn.

  use Anthropic\Client;
  use Anthropic\Messages\ToolChoiceAuto;

  // Create a client. It reads ANTHROPIC_API_KEY from the environment.
  $client = new Client();

  // Define one tool. The input_schema is a JSON Schema object describing
  // the arguments Claude should pass when it calls this tool. This schema
  // includes nested objects (recurrence), arrays (attendees), and optional
  // fields, which is closer to real-world tools than a flat string argument.
  $tools = [
      [
          'name' => 'create_calendar_event',
          'description' => 'Create a calendar event with attendees and optional recurrence.',
          'input_schema' => [
              'type' => 'object',
              'properties' => [
                  'title' => ['type' => 'string'],
                  'start' => ['type' => 'string', 'format' => 'date-time'],
                  'end' => ['type' => 'string', 'format' => 'date-time'],
                  'attendees' => [
                      'type' => 'array',
                      'items' => ['type' => 'string', 'format' => 'email'],
                  ],
                  'recurrence' => [
                      'type' => 'object',
                      'properties' => [
                          'frequency' => ['enum' => ['daily', 'weekly', 'monthly']],
                          'count' => ['type' => 'integer', 'minimum' => 1],
                      ],
                  ],
              ],
              'required' => ['title', 'start', 'end'],
          ],
      ],
  ];

  $userMessage = [
      'role' => 'user',
      'content' => 'Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am.',
  ];

  // Ask for at most one tool call per turn so the single-turn flow below
  // stays predictable.
  $toolChoice = ToolChoiceAuto::with(disableParallelToolUse: true);

  // Send the user's request along with the tool definition. Claude decides
  // whether to call the tool based on the request and the tool description.
  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: $tools,
      toolChoice: $toolChoice,
      messages: [$userMessage],
  );

  // When Claude calls a tool, the response has stop_reason "tool_use"
  // and the content array contains a tool_use block alongside any text.
  printf("stop_reason: %s\n", $response->stopReason);

  // Find the tool_use block. A response may contain text blocks before the
  // tool_use block, so scan the content array rather than assuming position.
  $toolUse = null;
  foreach ($response->content as $block) {
      if ($block->type === 'tool_use') {
          $toolUse = $block;
          break;
      }
  }
  printf("Tool: %s\n", $toolUse->name);
  printf("Input: %s\n", json_encode($toolUse->input));

  // Execute the tool. In a real system this would call your calendar API.
  // Here the result is hardcoded to keep the example self-contained.
  $result = ['event_id' => 'evt_123', 'status' => 'created'];

  // Send the result back. The tool_result block goes in a user message and
  // its tool_use_id must match the id from the tool_use block above. The
  // assistant's previous response is included so Claude has the full history.
  $followup = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: $tools,
      toolChoice: $toolChoice,
      messages: [
          $userMessage,
          ['role' => 'assistant', 'content' => $response->content],
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'tool_result',
                      'tool_use_id' => $toolUse->id,
                      'content' => json_encode($result),
                  ],
              ],
          ],
      ],
  );

  // With the tool result in hand, Claude produces a final natural-language
  // answer and stop_reason becomes "end_turn".
  printf("stop_reason: %s\n", $followup->stopReason);
  foreach ($followup->content as $block) {
      if ($block->type === 'text') {
          echo $block->text, "\n";
      }
  }
  ```

  ```ruby Ruby
  # Ring 1: Single tool, single turn.

  require "anthropic"

  # Create a client. It reads ANTHROPIC_API_KEY from the environment.
  client = Anthropic::Client.new

  # Define one tool. The input_schema is a JSON Schema object describing
  # the arguments Claude should pass when it calls this tool. This schema
  # includes nested objects (recurrence), arrays (attendees), and optional
  # fields, which is closer to real-world tools than a flat string argument.
  tools = [
    {
      name: "create_calendar_event",
      description: "Create a calendar event with attendees and optional recurrence.",
      input_schema: {
        type: "object",
        properties: {
          title: {type: "string"},
          start: {type: "string", format: "date-time"},
          end: {type: "string", format: "date-time"},
          attendees: {
            type: "array",
            items: {type: "string", format: "email"}
          },
          recurrence: {
            type: "object",
            properties: {
              frequency: {enum: ["daily", "weekly", "monthly"]},
              count: {type: "integer", minimum: 1}
            }
          }
        },
        required: ["title", "start", "end"]
      }
    }
  ]

  user_message = {
    role: "user",
    content: "Schedule a 30-minute sync with alice@example.com and bob@example.com on Monday, March 30, 2026 at 10am."
  }

  # Ask for at most one tool call per turn so the single-turn flow below
  # stays predictable.
  tool_choice = {type: "auto", disable_parallel_tool_use: true}

  # Send the user's request along with the tool definition. Claude decides
  # whether to call the tool based on the request and the tool description.
  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: tools,
    tool_choice: tool_choice,
    messages: [user_message]
  )

  # When Claude calls a tool, the response has stop_reason "tool_use"
  # and the content array contains a tool_use block alongside any text.
  puts "stop_reason: #{response.stop_reason}"

  # Find the tool_use block. A response may contain text blocks before the
  # tool_use block, so scan the content array rather than assuming position.
  tool_use = response.content.find { |block| block.type == :tool_use }
  puts "Tool: #{tool_use.name}"
  puts "Input: #{tool_use.input}"

  # Execute the tool. In a real system this would call your calendar API.
  # Here the result is hardcoded to keep the example self-contained.
  result = {event_id: "evt_123", status: "created"}

  # Send the result back. The tool_result block goes in a user message and
  # its tool_use_id must match the id from the tool_use block above. The
  # assistant's previous response is included so Claude has the full history.
  followup = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: tools,
    tool_choice: tool_choice,
    messages: [
      user_message,
      {role: "assistant", content: response.content},
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: tool_use.id,
            content: JSON.generate(result)
          }
        ]
      }
    ]
  )

  # With the tool result in hand, Claude produces a final natural-language
  # answer and stop_reason becomes "end_turn".
  puts "stop_reason: #{followup.stop_reason}"
  followup.content.each do |block|
    puts block.text if block.type == :text
  end
  ```

**What to expect**

```text Output wrap
stop_reason: tool_use
Tool: create_calendar_event
Input: {'title': 'Sync', 'start': '2026-03-30T10:00:00', 'end': '2026-03-30T10:30:00', 'attendees': ['alice@example.com', 'bob@example.com']}
stop_reason: end_turn
I've scheduled your 30-minute sync with Alice and Bob for Monday, March 30 at 10am.
```

The first `stop_reason` is `tool_use` because Claude is waiting for the calendar result. After you send the result, the second `stop_reason` is `end_turn` and the content is natural language for the user.
