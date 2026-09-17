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
pageSha256: "f8523ac55664b409df5339a211ad042b29ad54675ff132dbb895ea33ce7bceb4"
contentMode: "local-full"
zh: ""
---

## Ring 3: Multiple tools, parallel calls

Agents rarely have just one capability. Add a second tool, `list_calendar_events`, so Claude can check the existing schedule before creating something new.

When Claude has multiple independent tool calls to make, it might return several `tool_use` blocks in a single response. Your loop needs to process all of them and send back all results together in one user message. Iterate over every `tool_use` block in `response.content`, not just the first.

  ```bash cURL
  #!/bin/bash
  # Ring 3: Multiple tools, parallel calls.

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
          "attendees": {"type": "array", "items": {"type": "string", "format": "email"}},
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
    },
    {
      "name": "list_calendar_events",
      "description": "List all calendar events on a given date.",
      "input_schema": {
        "type": "object",
        "properties": {"date": {"type": "string", "format": "date"}},
        "required": ["date"]
      }
    }
  ]'

  run_tool() {
    case "$1" in
      create_calendar_event)
        jq -n --arg title "$(echo "$2" | jq -r '.title')" '{event_id: "evt_123", status: "created", title: $title}' ;;
      list_calendar_events)
        echo '{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}' ;;
      *)
        echo "{\"error\": \"Unknown tool: $1\"}" ;;
    esac
  }

  MESSAGES='[{"role": "user", "content": "Check what I have next Monday, then schedule a planning session that avoids any conflicts."}]'

  call_api() {
    curl -s https://api.anthropic.com/v1/messages \
      -H "x-api-key: $ANTHROPIC_API_KEY" \
      -H "anthropic-version: 2023-06-01" \
      -H "content-type: application/json" \
      -d "$(jq -n --argjson tools "$TOOLS" --argjson messages "$MESSAGES" \
        '{model: "claude-opus-5", max_tokens: 1024, tools: $tools, messages: $messages}')"
  }

  RESPONSE=$(call_api)

  while [ "$(echo "$RESPONSE" | jq -r '.stop_reason')" = "tool_use" ]; do
    # A single response can contain multiple tool_use blocks. Process all of
    # them and return all results together in one user message.
    TOOL_RESULTS='[]'
    while read -r block; do
      NAME=$(echo "$block" | jq -r '.name')
      INPUT=$(echo "$block" | jq -c '.input')
      ID=$(echo "$block" | jq -r '.id')
      RESULT=$(run_tool "$NAME" "$INPUT")
      TOOL_RESULTS=$(echo "$TOOL_RESULTS" | jq --arg id "$ID" --arg result "$RESULT" \
        '. + [{type: "tool_result", tool_use_id: $id, content: $result}]')
    done < <(echo "$RESPONSE" | jq -c '.content[] | select(.type == "tool_use")')

    MESSAGES=$(echo "$MESSAGES" | jq \
      --argjson assistant "$(echo "$RESPONSE" | jq '.content')" \
      --argjson results "$TOOL_RESULTS" \
      '. + [{role: "assistant", content: $assistant}, {role: "user", content: $results}]')

    RESPONSE=$(call_api)
  done

  echo "$RESPONSE" | jq -r '.content[] | select(.type == "text") | .text'
  ```

  ```bash CLI
  #!/usr/bin/env bash
  # Ring 3: Multiple tools, parallel calls.
  # Uses jq for cross-turn message-array state — building an agentic loop in shell
  # requires JSON manipulation beyond ant's single-call --transform scope.
  set -euo pipefail

  run_tool() {
    case "$1" in
      create_calendar_event)
        jq -n --arg title "$(jq -r '.title' <<<"$2")" \
          '{event_id: "evt_123", status: "created", title: $title}' ;;
      list_calendar_events)
        echo '{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}' ;;
      *)
        printf '{"error": "Unknown tool: %s"}' "$1" ;;
    esac
  }

  MESSAGES='[{"role": "user", "content": "Check what I have next Monday, then schedule a planning session that avoids any conflicts."}]'

  call_api() {
    # ant reads the request body as YAML on stdin: no auth headers, no
    # hand-built JSON envelope. The static keys (model, tools) live in a
    # quoted heredoc; the growing messages array is appended as JSON,
    # which YAML accepts as flow syntax.
    {
      cat <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
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
    - name: list_calendar_events
      description: List all calendar events on a given date.
      input_schema:
        type: object
        properties:
          date: {type: string, format: date}
        required: [date]
  YAML
      printf 'messages: %s\n' "$MESSAGES"
    } | ant messages create --format json
  }

  RESPONSE=$(call_api)

  while [ "$(jq -r '.stop_reason' <<<"$RESPONSE")" = "tool_use" ]; do
    # A single response can contain multiple tool_use blocks. Process all
    # of them and return all results together in one user message.
    TOOL_RESULTS='[]'
    while read -r block; do
      NAME=$(jq -r '.name' <<<"$block")
      INPUT=$(jq -c '.input' <<<"$block")
      ID=$(jq -r '.id' <<<"$block")
      RESULT=$(run_tool "$NAME" "$INPUT")
      TOOL_RESULTS=$(jq --arg id "$ID" --arg result "$RESULT" \
        '. + [{type: "tool_result", tool_use_id: $id, content: $result}]' \
        <<<"$TOOL_RESULTS")
    done < <(jq -c '.content[] | select(.type == "tool_use")' <<<"$RESPONSE")

    MESSAGES=$(jq \
      --argjson assistant "$(jq '.content' <<<"$RESPONSE")" \
      --argjson results "$TOOL_RESULTS" \
      '. + [
        {role: "assistant", content: $assistant},
        {role: "user", content: $results}
      ]' <<<"$MESSAGES")

    RESPONSE=$(call_api)
  done

  jq -r '.content[] | select(.type == "text") | .text' <<<"$RESPONSE"
  ```

  ```python Python
  # Ring 3: Multiple tools, parallel calls.

  import json

  import anthropic

  client = anthropic.Anthropic()

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
      },
      {
          "name": "list_calendar_events",
          "description": "List all calendar events on a given date.",
          "input_schema": {
              "type": "object",
              "properties": {
                  "date": {"type": "string", "format": "date"},
              },
              "required": ["date"],
          },
      },
  ]

  def run_tool(name, tool_input):
      if name == "create_calendar_event":
          return {"event_id": "evt_123", "status": "created", "title": tool_input["title"]}
      if name == "list_calendar_events":
          return {"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}
      return {"error": f"Unknown tool: {name}"}

  messages = [
      {
          "role": "user",
          "content": "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
      }
  ]

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=tools,
      messages=messages,
  )

  while response.stop_reason == "tool_use":
      # A single response can contain multiple tool_use blocks. Process all of
      # them and return all results together in one user message.
      tool_results = []
      for block in response.content:
          if block.type == "tool_use":
              result = run_tool(block.name, block.input)
              tool_results.append(
                  {
                      "type": "tool_result",
                      "tool_use_id": block.id,
                      "content": json.dumps(result),
                  }
              )

      messages.append({"role": "assistant", "content": response.content})
      messages.append({"role": "user", "content": tool_results})

      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          tools=tools,
          messages=messages,
      )

  final_text = next(block for block in response.content if block.type == "text")
  print(final_text.text)
  ```

  ```typescript TypeScript
  // Ring 3: Multiple tools, parallel calls.

  import Anthropic from "@anthropic-ai/sdk";

  const client = new Anthropic();

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
    {
      name: "list_calendar_events",
      description: "List all calendar events on a given date.",
      input_schema: {
        type: "object",
        properties: {
          date: { type: "string", format: "date" },
        },
        required: ["date"],
      },
    },
  ];

  function runTool(name: string, input: Record<string, unknown>) {
    if (name === "create_calendar_event") {
      return { event_id: "evt_123", status: "created", title: input.title };
    }
    if (name === "list_calendar_events") {
      return {
        events: [{ title: "Existing meeting", start: "14:00", end: "15:00" }],
      };
    }
    return { error: `Unknown tool: ${name}` };
  }

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content:
        "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
    },
  ];

  let response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools,
    messages,
  });

  while (response.stop_reason === "tool_use") {
    // A single response can contain multiple tool_use blocks. Process all of
    // them and return all results together in one user message.
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === "tool_use") {
        const result = runTool(block.name, block.input as Record<string, unknown>);
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }
    }

    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user", content: toolResults });

    response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      tools,
      messages,
    });
  }

  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
  ```

  ```csharp C#
  // Ring 3: Multiple tools, parallel calls.

  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text.Json;
  using System.Threading.Tasks;
  using Anthropic;
  using Anthropic.Models.Messages;

  AnthropicClient client = new();

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
      new ToolUnion(new Tool()
      {
          Name = "list_calendar_events",
          Description = "List all calendar events on a given date.",
          InputSchema = new InputSchema()
          {
              Properties = new Dictionary<string, JsonElement>
              {
                  ["date"] = JsonSerializer.SerializeToElement(new { type = "string", format = "date" }),
              },
              Required = ["date"],
          },
      }),
  ];

  string RunTool(ToolUseBlock toolUse)
  {
      if (toolUse.Name == "create_calendar_event")
      {
          var title = toolUse.Input.TryGetValue("title", out var t) ? t.GetString() : "";
          return JsonSerializer.Serialize(new { event_id = "evt_123", status = "created", title });
      }
      if (toolUse.Name == "list_calendar_events")
      {
          return """{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}""";
      }
      return JsonSerializer.Serialize(new { error = $"Unknown tool: {toolUse.Name}" });
  }

  List<MessageParam> messages =
  [
      new()
      {
          Role = Role.User,
          Content = "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
      },
  ];

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools = tools,
      Messages = messages,
  });

  while (response.StopReason == StopReason.ToolUse)
  {
      // A single response can contain multiple tool_use blocks. Process all of
      // them and return all results together in one user message.
      List<ContentBlockParam> toolResults = [];
      foreach (var block in response.Content)
      {
          if (block.TryPickToolUse(out var toolUse))
          {
              toolResults.Add(new ContentBlockParam(new ToolResultBlockParam()
              {
                  ToolUseID = toolUse.ID,
                  Content = RunTool(toolUse),
              }));
          }
      }

      messages.Add(new()
      {
          Role = Role.Assistant,
          Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList(),
      });
      messages.Add(new() { Role = Role.User, Content = new MessageParamContent(toolResults) });

      response = await client.Messages.Create(new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools = tools,
          Messages = messages,
      });
  }

  foreach (var block in response.Content)
  {
      if (block.TryPickText(out var text))
      {
          Console.WriteLine(text.Text);
      }
  }
  ```

  ```go Go
  // Ring 3: Multiple tools, parallel calls.

  package main

  import (
  	"context"
  	"encoding/json"
  	"fmt"
  	"log"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  func runTool(name string, input map[string]any) string {
  	if name == "create_calendar_event" {
  		title, _ := input["title"].(string)
  		return fmt.Sprintf(`{"event_id": "evt_123", "status": "created", "title": %q}`, title)
  	}
  	if name == "list_calendar_events" {
  		return `{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}`
  	}
  	return fmt.Sprintf(`{"error": "Unknown tool: %s"}`, name)
  }

  func main() {
  	client := anthropic.NewClient()
  	ctx := context.Background()

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
  		{OfTool: &anthropic.ToolParam{
  			Name:        "list_calendar_events",
  			Description: anthropic.String("List all calendar events on a given date."),
  			InputSchema: anthropic.ToolInputSchemaParam{
  				Properties: map[string]any{
  					"date": map[string]any{"type": "string", "format": "date"},
  				},
  				Required: []string{"date"},
  			},
  		}},
  	}

  	messages := []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock(
  			"Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
  		)),
  	}

  	response, err := client.Messages.New(ctx, anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 1024,
  		Tools:     tools,
  		Messages:  messages,
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	for response.StopReason == "tool_use" {
  		// A single response can contain multiple tool_use blocks. Process all of
  		// them and return all results together in one user message.
  		var toolResults []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			if block.Type == "tool_use" {
  				var input map[string]any
  				if err := json.Unmarshal(block.Input, &input); err != nil {
  					log.Fatal(err)
  				}
  				result := runTool(block.Name, input)
  				toolResults = append(toolResults, anthropic.NewToolResultBlock(block.ID, result, false))
  			}
  		}

  		var assistantContent []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			assistantContent = append(assistantContent, block.ToParam())
  		}
  		messages = append(messages, anthropic.NewAssistantMessage(assistantContent...))
  		messages = append(messages, anthropic.NewUserMessage(toolResults...))

  		response, err = client.Messages.New(ctx, anthropic.MessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 1024,
  			Tools:     tools,
  			Messages:  messages,
  		})
  		if err != nil {
  			log.Fatal(err)
  		}
  	}

  	for _, block := range response.Content {
  		if block.Type == "text" {
  			fmt.Println(block.Text)
  		}
  	}
  }
  ```

  ```java Java
  // Ring 3: Multiple tools, parallel calls.

  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.core.JsonValue;
  import com.anthropic.models.messages.ContentBlock;
  import com.anthropic.models.messages.ContentBlockParam;
  import com.anthropic.models.messages.Message;
  import com.anthropic.models.messages.MessageCreateParams;
  import com.anthropic.models.messages.MessageParam;
  import com.anthropic.models.messages.Model;
  import com.anthropic.models.messages.StopReason;
  import com.anthropic.models.messages.Tool;
  import com.anthropic.models.messages.Tool.InputSchema;
  import com.anthropic.models.messages.ToolResultBlockParam;
  import com.anthropic.models.messages.ToolUseBlock;
  import java.util.ArrayList;
  import java.util.List;
  import java.util.Map;

  String runTool(ToolUseBlock toolUse) {
      // The raw tool input is a JSON object; read fields out of it as a map.
      Map<String, JsonValue> input = (Map<String, JsonValue>) toolUse._input().asObject().get();
      if (toolUse.name().equals("create_calendar_event")) {
          String title = input.containsKey("title") ? input.get("title").asStringOrThrow() : "";
          return "{\"event_id\": \"evt_123\", \"status\": \"created\", \"title\": \"" + title + "\"}";
      }
      if (toolUse.name().equals("list_calendar_events")) {
          return "{\"events\": [{\"title\": \"Existing meeting\", \"start\": \"14:00\", \"end\": \"15:00\"}]}";
      }
      return "{\"error\": \"Unknown tool: " + toolUse.name() + "\"}";
  }

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

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

      Tool listTool = Tool.builder()
          .name("list_calendar_events")
          .description("List all calendar events on a given date.")
          .inputSchema(InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "date", Map.of("type", "string", "format", "date")
              )))
              .required(List.of("date"))
              .build())
          .build();

      List<MessageParam> messages = new ArrayList<>();
      messages.add(MessageParam.builder()
          .role(MessageParam.Role.USER)
          .content("Check what I have next Monday, then schedule a planning session that avoids any conflicts.")
          .build());

      Message response = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(calendarTool)
          .addTool(listTool)
          .messages(messages)
          .build());

      while (response.stopReason().isPresent()
              && response.stopReason().get().equals(StopReason.TOOL_USE)) {
          // A single response can contain multiple tool_use blocks. Process all of
          // them and return all results together in one user message.
          List<ContentBlockParam> toolResults = new ArrayList<>();
          for (ContentBlock block : response.content()) {
              if (block.toolUse().isPresent()) {
                  ToolUseBlock toolUse = block.toolUse().get();
                  toolResults.add(ContentBlockParam.ofToolResult(
                      ToolResultBlockParam.builder()
                          .toolUseId(toolUse.id())
                          .content(runTool(toolUse))
                          .build()));
              }
          }

          messages.add(response.toParam());
          messages.add(MessageParam.builder()
              .role(MessageParam.Role.USER)
              .contentOfBlockParams(toolResults)
              .build());

          response = client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024L)
              .addTool(calendarTool)
              .addTool(listTool)
              .messages(messages)
              .build());
      }

      response.content().stream()
          .flatMap(block -> block.text().stream())
          .forEach(textBlock -> IO.println(textBlock.text()));
  }
  ```

  ```php PHP
  <?php

  // Ring 3: Multiple tools, parallel calls.

  use Anthropic\Client;

  $client = new Client();

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
      [
          'name' => 'list_calendar_events',
          'description' => 'List all calendar events on a given date.',
          'input_schema' => [
              'type' => 'object',
              'properties' => [
                  'date' => ['type' => 'string', 'format' => 'date'],
              ],
              'required' => ['date'],
          ],
      ],
  ];

  function runTool(string $name, array $input): string
  {
      if ($name === 'create_calendar_event') {
          return json_encode([
              'event_id' => 'evt_123',
              'status' => 'created',
              'title' => $input['title'],
          ]);
      }
      if ($name === 'list_calendar_events') {
          return json_encode([
              'events' => [['title' => 'Existing meeting', 'start' => '14:00', 'end' => '15:00']],
          ]);
      }

      return json_encode(['error' => "Unknown tool: {$name}"]);
  }

  $messages = [
      [
          'role' => 'user',
          'content' => 'Check what I have next Monday, then schedule a planning session that avoids any conflicts.',
      ],
  ];

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: $tools,
      messages: $messages,
  );

  while ($response->stopReason === 'tool_use') {
      // A single response can contain multiple tool_use blocks. Process all of
      // them and return all results together in one user message.
      $toolResults = [];
      foreach ($response->content as $block) {
          if ($block->type === 'tool_use') {
              $toolResults[] = [
                  'type' => 'tool_result',
                  'tool_use_id' => $block->id,
                  'content' => runTool($block->name, $block->input),
              ];
          }
      }

      $messages[] = ['role' => 'assistant', 'content' => $response->content];
      $messages[] = ['role' => 'user', 'content' => $toolResults];

      $response = $client->messages->create(
          model: 'claude-opus-5',
          maxTokens: 1024,
          tools: $tools,
          messages: $messages,
      );
  }

  foreach ($response->content as $block) {
      if ($block->type === 'text') {
          echo $block->text, "\n";
      }
  }
  ```

  ```ruby Ruby
  # Ring 3: Multiple tools, parallel calls.

  require "anthropic"

  client = Anthropic::Client.new

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
    },
    {
      name: "list_calendar_events",
      description: "List all calendar events on a given date.",
      input_schema: {
        type: "object",
        properties: {
          date: {type: "string", format: "date"}
        },
        required: ["date"]
      }
    }
  ]

  def run_tool(name, input)
    case name
    when "create_calendar_event"
      JSON.generate({event_id: "evt_123", status: "created", title: input[:title]})
    when "list_calendar_events"
      JSON.generate({events: [{title: "Existing meeting", start: "14:00", end: "15:00"}]})
    else
      JSON.generate({error: "Unknown tool: #{name}"})
    end
  end

  messages = [
    {
      role: "user",
      content: "Check what I have next Monday, then schedule a planning session that avoids any conflicts."
    }
  ]

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: tools,
    messages: messages
  )

  while response.stop_reason == :tool_use
    # A single response can contain multiple tool_use blocks. Process all of
    # them and return all results together in one user message.
    tool_results = response.content.select { |block| block.type == :tool_use }.map do |tool_use|
      {
        type: "tool_result",
        tool_use_id: tool_use.id,
        content: run_tool(tool_use.name, tool_use.input)
      }
    end

    messages << {role: "assistant", content: response.content}
    messages << {role: "user", content: tool_results}

    response = client.messages.create(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: tools,
      messages: messages
    )
  end

  response.content.each do |block|
    puts block.text if block.type == :text
  end
  ```

**What to expect**

```text Output wrap
I checked your calendar for next Monday and found an existing meeting from 2pm to 3pm. I've scheduled the planning session for 10am to 11am to avoid the conflict.
```

For more on concurrent execution and ordering guarantees, see [Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use).
