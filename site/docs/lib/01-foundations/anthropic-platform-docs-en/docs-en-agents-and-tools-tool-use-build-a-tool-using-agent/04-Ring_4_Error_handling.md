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
pageSha256: "e250340d8716f6bc0d90a9f9567c1e7d7a58f96c7979b9b7966367a1b4adabb0"
contentMode: "local-full"
zh: ""
---

## Ring 4: Error handling

Tools fail. A calendar API might reject an event with too many attendees, or a date might be malformed. When a tool raises an error, send the error message back with `is_error: true` instead of crashing. Claude reads the error and can retry with corrected input, ask the user for clarification, or explain the limitation.

  ```bash cURL
  #!/bin/bash
  # Ring 4: Error handling.

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
        local count=$(echo "$2" | jq '.attendees | length // 0')
        if [ "$count" -gt 10 ]; then
          echo "ERROR: Too many attendees (max 10)"
          return 1
        fi
        jq -n --arg title "$(echo "$2" | jq -r '.title')" '{event_id: "evt_123", status: "created", title: $title}' ;;
      list_calendar_events)
        echo '{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}' ;;
      *)
        echo "ERROR: Unknown tool: $1"
        return 1 ;;
    esac
  }

  EMAILS=$(seq 0 14 | sed 's/.*/user&@example.com/' | paste -sd, -)
  MESSAGES="[{\"role\": \"user\", \"content\": \"Schedule an all-hands with everyone: $EMAILS\"}]"

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
    TOOL_RESULTS='[]'
    while read -r block; do
      NAME=$(echo "$block" | jq -r '.name')
      INPUT=$(echo "$block" | jq -c '.input')
      ID=$(echo "$block" | jq -r '.id')
      if OUTPUT=$(run_tool "$NAME" "$INPUT"); then
        TOOL_RESULTS=$(echo "$TOOL_RESULTS" | jq --arg id "$ID" --arg result "$OUTPUT" \
          '. + [{type: "tool_result", tool_use_id: $id, content: $result}]')
      else
        # Signal failure so Claude can retry or ask for clarification.
        TOOL_RESULTS=$(echo "$TOOL_RESULTS" | jq --arg id "$ID" --arg result "$OUTPUT" \
          '. + [{type: "tool_result", tool_use_id: $id, content: $result, is_error: true}]')
      fi
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
  # Ring 4: Error handling.
  # Uses jq for cross-turn message-array state — building an agentic loop in shell
  # requires JSON manipulation beyond ant's single-call --transform scope.
  set -euo pipefail

  run_tool() {
    case "$1" in
      create_calendar_event)
        local count
        count=$(jq '.attendees | length // 0' <<<"$2")
        if [ "$count" -gt 10 ]; then
          echo "ERROR: Too many attendees (max 10)"
          return 1
        fi
        jq -n --arg title "$(jq -r '.title' <<<"$2")" \
          '{event_id: "evt_123", status: "created", title: $title}' ;;
      list_calendar_events)
        echo '{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}' ;;
      *)
        echo "ERROR: Unknown tool: $1"
        return 1 ;;
    esac
  }

  EMAILS=$(seq 0 14 | sed 's/.*/user&@example.com/' | paste -sd, -)
  MESSAGES=$(jq -n --arg msg "Schedule an all-hands with everyone: $EMAILS" \
    '[{role: "user", content: $msg}]')

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
    TOOL_RESULTS='[]'
    while read -r block; do
      NAME=$(jq -r '.name' <<<"$block")
      INPUT=$(jq -c '.input' <<<"$block")
      ID=$(jq -r '.id' <<<"$block")
      if OUTPUT=$(run_tool "$NAME" "$INPUT"); then
        TOOL_RESULTS=$(jq --arg id "$ID" --arg result "$OUTPUT" \
          '. + [{type: "tool_result", tool_use_id: $id, content: $result}]' \
          <<<"$TOOL_RESULTS")
      else
        # Signal failure so Claude can retry or ask for clarification.
        TOOL_RESULTS=$(jq --arg id "$ID" --arg result "$OUTPUT" \
          '. + [{type: "tool_result", tool_use_id: $id, content: $result, is_error: true}]' \
          <<<"$TOOL_RESULTS")
      fi
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
  # Ring 4: Error handling.

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
          if "attendees" in tool_input and len(tool_input["attendees"]) > 10:
              raise ValueError("Too many attendees (max 10)")
          return {"event_id": "evt_123", "status": "created", "title": tool_input["title"]}
      if name == "list_calendar_events":
          return {"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}
      raise ValueError(f"Unknown tool: {name}")

  messages = [
      {
          "role": "user",
          "content": "Schedule an all-hands with everyone: " + ", ".join(f"user{i}@example.com" for i in range(15)),
      }
  ]

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=tools,
      messages=messages,
  )

  while response.stop_reason == "tool_use":
      tool_results = []
      for block in response.content:
          if block.type == "tool_use":
              try:
                  result = run_tool(block.name, block.input)
                  tool_results.append(
                      {"type": "tool_result", "tool_use_id": block.id, "content": json.dumps(result)}
                  )
              except Exception as exc:
                  # Signal failure so Claude can retry or ask for clarification.
                  tool_results.append(
                      {
                          "type": "tool_result",
                          "tool_use_id": block.id,
                          "content": str(exc),
                          "is_error": True,
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
  // Ring 4: Error handling.

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
      const attendees = input.attendees as string[] | undefined;
      if (attendees && attendees.length > 10) {
        throw new Error("Too many attendees (max 10)");
      }
      return { event_id: "evt_123", status: "created", title: input.title };
    }
    if (name === "list_calendar_events") {
      return {
        events: [{ title: "Existing meeting", start: "14:00", end: "15:00" }],
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  }

  const emails = Array.from({ length: 15 }, (_, i) => `user${i}@example.com`);
  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `Schedule an all-hands with everyone: ${emails.join(", ")}`,
    },
  ];

  let response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools,
    messages,
  });

  while (response.stop_reason === "tool_use") {
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === "tool_use") {
        try {
          const result = runTool(block.name, block.input as Record<string, unknown>);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        } catch (err) {
          // Signal failure so Claude can retry or ask for clarification.
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: String(err),
            is_error: true,
          });
        }
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
  // Ring 4: Error handling.

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
          if (toolUse.Input.TryGetValue("attendees", out var attendees) && attendees.GetArrayLength() > 10)
          {
              throw new InvalidOperationException("Too many attendees (max 10)");
          }
          var title = toolUse.Input.TryGetValue("title", out var t) ? t.GetString() : "";
          return JsonSerializer.Serialize(new { event_id = "evt_123", status = "created", title });
      }
      if (toolUse.Name == "list_calendar_events")
      {
          return """{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}""";
      }
      throw new InvalidOperationException($"Unknown tool: {toolUse.Name}");
  }

  // Build a request that exceeds the tool's attendee limit so the error path runs.
  var emails = string.Join(", ", Enumerable.Range(0, 15).Select(i => $"user{i}@example.com"));

  List<MessageParam> messages =
  [
      new() { Role = Role.User, Content = $"Schedule an all-hands with everyone: {emails}" },
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
      List<ContentBlockParam> toolResults = [];
      foreach (var block in response.Content)
      {
          if (block.TryPickToolUse(out var toolUse))
          {
              ToolResultBlockParam toolResult;
              try
              {
                  toolResult = new ToolResultBlockParam() { ToolUseID = toolUse.ID, Content = RunTool(toolUse) };
              }
              catch (Exception e)
              {
                  // Signal failure so Claude can retry or ask for clarification.
                  toolResult = new ToolResultBlockParam()
                  {
                      ToolUseID = toolUse.ID,
                      Content = e.Message,
                      IsError = true,
                  };
              }
              toolResults.Add(new ContentBlockParam(toolResult));
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
  // Ring 4: Error handling.

  package main

  import (
  	"context"
  	"encoding/json"
  	"fmt"
  	"log"
  	"strings"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  func runTool(name string, input map[string]any) (string, error) {
  	if name == "create_calendar_event" {
  		if attendees, ok := input["attendees"].([]any); ok && len(attendees) > 10 {
  			return "", fmt.Errorf("too many attendees (max 10)")
  		}
  		title, _ := input["title"].(string)
  		return fmt.Sprintf(`{"event_id": "evt_123", "status": "created", "title": %q}`, title), nil
  	}
  	if name == "list_calendar_events" {
  		return `{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}`, nil
  	}
  	return "", fmt.Errorf("unknown tool: %s", name)
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

  	// Build a request that exceeds the tool's attendee limit so the error path runs.
  	emails := make([]string, 15)
  	for i := range emails {
  		emails[i] = fmt.Sprintf("user%d@example.com", i)
  	}
  	messages := []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock(
  			"Schedule an all-hands with everyone: " + strings.Join(emails, ", "),
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
  		var toolResults []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			if block.Type == "tool_use" {
  				var input map[string]any
  				if err := json.Unmarshal(block.Input, &input); err != nil {
  					log.Fatal(err)
  				}
  				result, toolErr := runTool(block.Name, input)
  				if toolErr != nil {
  					// Signal failure so Claude can retry or ask for clarification.
  					toolResults = append(toolResults, anthropic.NewToolResultBlock(block.ID, toolErr.Error(), true))
  				} else {
  					toolResults = append(toolResults, anthropic.NewToolResultBlock(block.ID, result, false))
  				}
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
  // Ring 4: Error handling.

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
  import java.util.stream.Collectors;
  import java.util.stream.IntStream;

  String runTool(ToolUseBlock toolUse) {
      // The raw tool input is a JSON object; read fields out of it as a map.
      Map<String, JsonValue> input = (Map<String, JsonValue>) toolUse._input().asObject().get();
      if (toolUse.name().equals("create_calendar_event")) {
          int attendeeCount = input.containsKey("attendees")
              ? ((List<?>) input.get("attendees").asArray().get()).size()
              : 0;
          if (attendeeCount > 10) {
              throw new IllegalArgumentException("Too many attendees (max 10)");
          }
          String title = input.containsKey("title") ? input.get("title").asStringOrThrow() : "";
          return "{\"event_id\": \"evt_123\", \"status\": \"created\", \"title\": \"" + title + "\"}";
      }
      if (toolUse.name().equals("list_calendar_events")) {
          return "{\"events\": [{\"title\": \"Existing meeting\", \"start\": \"14:00\", \"end\": \"15:00\"}]}";
      }
      throw new IllegalArgumentException("Unknown tool: " + toolUse.name());
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

      // Build a request that exceeds the tool's attendee limit so the error path runs.
      String emails = IntStream.range(0, 15)
          .mapToObj(i -> "user" + i + "@example.com")
          .collect(Collectors.joining(", "));

      List<MessageParam> messages = new ArrayList<>();
      messages.add(MessageParam.builder()
          .role(MessageParam.Role.USER)
          .content("Schedule an all-hands with everyone: " + emails)
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
          List<ContentBlockParam> toolResults = new ArrayList<>();
          for (ContentBlock block : response.content()) {
              if (block.toolUse().isPresent()) {
                  ToolUseBlock toolUse = block.toolUse().get();
                  ToolResultBlockParam.Builder resultBuilder = ToolResultBlockParam.builder()
                      .toolUseId(toolUse.id());
                  try {
                      resultBuilder.content(runTool(toolUse));
                  } catch (Exception e) {
                      // Signal failure so Claude can retry or ask for clarification.
                      resultBuilder.content(e.getMessage()).isError(true);
                  }
                  toolResults.add(ContentBlockParam.ofToolResult(resultBuilder.build()));
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

  // Ring 4: Error handling.

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
          if (count($input['attendees'] ?? []) > 10) {
              throw new InvalidArgumentException('Too many attendees (max 10)');
          }

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

      throw new InvalidArgumentException("Unknown tool: {$name}");
  }

  // Build a request that exceeds the tool's attendee limit so the error path runs.
  $emails = array_map(fn (int $i): string => "user{$i}@example.com", range(0, 14));
  $messages = [
      [
          'role' => 'user',
          'content' => 'Schedule an all-hands with everyone: ' . implode(', ', $emails),
      ],
  ];

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: $tools,
      messages: $messages,
  );

  while ($response->stopReason === 'tool_use') {
      $toolResults = [];
      foreach ($response->content as $block) {
          if ($block->type === 'tool_use') {
              try {
                  $toolResults[] = [
                      'type' => 'tool_result',
                      'tool_use_id' => $block->id,
                      'content' => runTool($block->name, $block->input),
                  ];
              } catch (Exception $e) {
                  // Signal failure so Claude can retry or ask for clarification.
                  $toolResults[] = [
                      'type' => 'tool_result',
                      'tool_use_id' => $block->id,
                      'content' => $e->getMessage(),
                      'is_error' => true,
                  ];
              }
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
  # Ring 4: Error handling.

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
      attendees = input[:attendees]
      raise ArgumentError, "Too many attendees (max 10)" if attendees && attendees.length > 10
      JSON.generate({event_id: "evt_123", status: "created", title: input[:title]})
    when "list_calendar_events"
      JSON.generate({events: [{title: "Existing meeting", start: "14:00", end: "15:00"}]})
    else
      raise ArgumentError, "Unknown tool: #{name}"
    end
  end

  # Build a request that exceeds the tool's attendee limit so the error path runs.
  emails = (0...15).map { |i| "user#{i}@example.com" }
  messages = [
    {
      role: "user",
      content: "Schedule an all-hands with everyone: #{emails.join(", ")}"
    }
  ]

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: tools,
    messages: messages
  )

  while response.stop_reason == :tool_use
    tool_results = response.content.select { |block| block.type == :tool_use }.map do |tool_use|
      begin
        {
          type: "tool_result",
          tool_use_id: tool_use.id,
          content: run_tool(tool_use.name, tool_use.input)
        }
      rescue => e
        # Signal failure so Claude can retry or ask for clarification.
        {
          type: "tool_result",
          tool_use_id: tool_use.id,
          content: e.message,
          is_error: true
        }
      end
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
I tried to schedule the all-hands but the calendar only allows 10 attendees per event. I can split this into two sessions, or you can let me know which 10 people to prioritize.
```

The `is_error` flag is the only difference from a successful result. Claude sees the flag and the error text, and responds accordingly. See [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) for the full error-handling reference.
