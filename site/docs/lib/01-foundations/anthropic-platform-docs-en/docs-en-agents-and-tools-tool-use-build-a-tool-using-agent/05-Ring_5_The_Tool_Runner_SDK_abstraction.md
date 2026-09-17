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
pageSha256: "684705aa737aa0076d7bc91757e724873e12a5a70f15800d923657693f5cbe04"
contentMode: "local-full"
zh: ""
---

## Ring 5: The Tool Runner SDK abstraction

Rings 2 through 4 wrote the same loop by hand: call the API, check `stop_reason`, run tools, append results, repeat. The Tool Runner does this for you. Define each tool as a function, pass the list to `tool_runner`, and retrieve the final message once the loop completes. Error wrapping, result formatting, and conversation management are handled internally.

Each SDK provides a helper that turns an ordinary function into a runnable tool and derives the input schema from its signature; the tabs below show the idiomatic form for each language.

  Tool Runner is available in all seven SDKs: Python, TypeScript, C#, Go, Java, PHP, and Ruby. See [Tool Runner](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner) for the full reference. The cURL and CLI tabs show a note instead of code; keep the Ring 4 loop for curl- or CLI-based scripts.

  ```bash cURL
  #!/bin/bash
  # Ring 5: The Tool Runner SDK abstraction.

  # The Tool Runner SDK abstraction is available in all seven SDKs: Python,
  # TypeScript, C#, Go, Java, PHP, and Ruby. There is no equivalent for raw
  # curl requests. Switch to any SDK tab to see Ring 5, or keep the Ring 4
  # loop as your shell implementation.
  ```

  ```bash CLI
  #!/usr/bin/env bash
  # Ring 5: The Tool Runner SDK abstraction.
  set -euo pipefail

  # The Tool Runner SDK abstraction is available in all seven SDKs: Python,
  # TypeScript, C#, Go, Java, PHP, and Ruby. The ant CLI exposes the Messages
  # API directly and has no equivalent helper. Switch to any SDK tab to see
  # Ring 5, or keep the Ring 4 loop as your CLI implementation.
  ```

  ```python Python
  # Ring 5: The Tool Runner SDK abstraction.

  import json

  import anthropic
  from anthropic import beta_tool

  client = anthropic.Anthropic()

  @beta_tool
  def create_calendar_event(
      title: str,
      start: str,
      end: str,
      attendees: list[str] | None = None,
      recurrence: dict | None = None,
  ) -> str:
      """Create a calendar event with attendees and optional recurrence.

      Args:
          title: Event title.
          start: Start time in ISO 8601 format.
          end: End time in ISO 8601 format.
          attendees: Email addresses to invite.
          recurrence: Dict with 'frequency' (daily, weekly, monthly) and 'count'.
      """
      if attendees and len(attendees) > 10:
          raise ValueError("Too many attendees (max 10)")
      return json.dumps({"event_id": "evt_123", "status": "created", "title": title})

  @beta_tool
  def list_calendar_events(date: str) -> str:
      """List all calendar events on a given date.

      Args:
          date: Date in YYYY-MM-DD format.
      """
      return json.dumps({"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]})

  final_message = client.beta.messages.tool_runner(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[create_calendar_event, list_calendar_events],
      messages=[
          {
              "role": "user",
              "content": "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
          }
      ],
  ).until_done()

  for block in final_message.content:
      if block.type == "text":
          print(block.text)
  ```

  ```typescript TypeScript
  // Ring 5: The Tool Runner SDK abstraction.

  import Anthropic from "@anthropic-ai/sdk";
  import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
  import { z } from "zod";

  const client = new Anthropic();

  const createCalendarEvent = betaZodTool({
    name: "create_calendar_event",
    description:
      "Create a calendar event with attendees and optional recurrence.",
    inputSchema: z.object({
      title: z.string(),
      start: z.string().datetime(),
      end: z.string().datetime(),
      attendees: z.array(z.string().email()).optional(),
      recurrence: z
        .object({
          frequency: z.enum(["daily", "weekly", "monthly"]),
          count: z.number().int().min(1),
        })
        .optional(),
    }),
    run: async (input) => {
      if (input.attendees && input.attendees.length > 10) {
        throw new Error("Too many attendees (max 10)");
      }
      return JSON.stringify({
        event_id: "evt_123",
        status: "created",
        title: input.title,
      });
    },
  });

  const listCalendarEvents = betaZodTool({
    name: "list_calendar_events",
    description: "List all calendar events on a given date.",
    inputSchema: z.object({
      date: z.string().date(),
    }),
    run: async () => {
      return JSON.stringify({
        events: [{ title: "Existing meeting", start: "14:00", end: "15:00" }],
      });
    },
  });

  const finalMessage = await client.beta.messages.toolRunner({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [createCalendarEvent, listCalendarEvents],
    messages: [
      {
        role: "user",
        content:
          "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
      },
    ],
  });

  for (const block of finalMessage.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
  ```

  ```csharp C#
  // Ring 5: The Tool Runner SDK abstraction.

  using System;
  using System.Collections.Generic;
  using System.Text.Json;
  using System.Threading.Tasks;
  using Anthropic;
  using Anthropic.Helpers.Beta;
  using Anthropic.Models.Beta.Messages;
  using MessageCreateParams = Anthropic.Models.Beta.Messages.MessageCreateParams;
  using InputSchema = Anthropic.Models.Beta.Messages.InputSchema;
  using Role = Anthropic.Models.Beta.Messages.Role;
  using Model = Anthropic.Models.Messages.Model;

  AnthropicClient client = new();

  // Define each tool as a runnable tool: the definition carries the JSON Schema
  // and the Run callback holds the implementation. Throwing an exception sends
  // the message back to Claude as a tool result with is_error set.
  var createCalendarEvent = new BetaRunnableTool
  {
      Name = "create_calendar_event",
      Definition = new BetaTool
      {
          Name = "create_calendar_event",
          Description = "Create a calendar event with attendees and optional recurrence.",
          InputSchema = new InputSchema
          {
              Properties = new Dictionary<string, JsonElement>
              {
                  ["title"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Event title" }),
                  ["start"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Start time in ISO 8601 format" }),
                  ["end"] = JsonSerializer.SerializeToElement(new { type = "string", description = "End time in ISO 8601 format" }),
                  ["attendees"] = JsonSerializer.SerializeToElement(new
                  {
                      type = "array",
                      items = new { type = "string" },
                      description = "Email addresses to invite",
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
      },
      Run = (toolUse, _) =>
      {
          if (toolUse.Input.TryGetValue("attendees", out var attendees) && attendees.GetArrayLength() > 10)
          {
              throw new InvalidOperationException("Too many attendees (max 10)");
          }
          var title = toolUse.Input.TryGetValue("title", out var t) ? t.GetString() : "";
          return Task.FromResult<BetaToolResultBlockParamContent>(
              JsonSerializer.Serialize(new { event_id = "evt_123", status = "created", title })
          );
      },
  };

  var listCalendarEvents = new BetaRunnableTool
  {
      Name = "list_calendar_events",
      Definition = new BetaTool
      {
          Name = "list_calendar_events",
          Description = "List all calendar events on a given date.",
          InputSchema = new InputSchema
          {
              Properties = new Dictionary<string, JsonElement>
              {
                  ["date"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Date in YYYY-MM-DD format" }),
              },
              Required = ["date"],
          },
      },
      Run = (toolUse, _) => Task.FromResult<BetaToolResultBlockParamContent>(
          """{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}"""
      ),
  };

  // The runner calls the API, runs requested tools, and feeds results back
  // until Claude produces a final answer.
  var runner = client.Beta.Messages.ToolRunner(
      new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
              },
          ],
      },
      [createCalendarEvent, listCalendarEvents]
  );

  BetaMessage? finalMessage = null;
  await foreach (var message in runner)
  {
      finalMessage = message;
  }

  foreach (var block in finalMessage!.Content)
  {
      if (block.TryPickText(out var text))
      {
          Console.WriteLine(text.Text);
      }
  }
  ```

  ```go Go
  // Ring 5: The Tool Runner SDK abstraction.

  package main

  import (
  	"context"
  	"fmt"
  	"log"

  	"github.com/anthropics/anthropic-sdk-go"
  	"github.com/anthropics/anthropic-sdk-go/toolrunner"
  )

  // The input structs define each tool's schema. The tool runner generates the
  // JSON Schema from the struct fields and their jsonschema tags.
  type RecurrenceInput struct {
  	Frequency string `json:"frequency,omitempty" jsonschema:"enum=daily,enum=weekly,enum=monthly,description=How often the event repeats"`
  	Count     int    `json:"count,omitempty" jsonschema:"description=Number of occurrences"`
  }

  type CreateCalendarEventInput struct {
  	Title      string           `json:"title" jsonschema:"required,description=Event title"`
  	Start      string           `json:"start" jsonschema:"required,description=Start time in ISO 8601 format"`
  	End        string           `json:"end" jsonschema:"required,description=End time in ISO 8601 format"`
  	Attendees  []string         `json:"attendees,omitempty" jsonschema:"description=Email addresses to invite"`
  	Recurrence *RecurrenceInput `json:"recurrence,omitempty"`
  }

  type ListCalendarEventsInput struct {
  	Date string `json:"date" jsonschema:"required,description=Date in YYYY-MM-DD format"`
  }

  func main() {
  	client := anthropic.NewClient()
  	ctx := context.Background()

  	// Define each tool as a handler function. Returning an error sends the
  	// message back to Claude as a tool result with is_error set.
  	createCalendarEvent, err := toolrunner.NewBetaToolFromJSONSchema(
  		"create_calendar_event",
  		"Create a calendar event with attendees and optional recurrence.",
  		func(ctx context.Context, input CreateCalendarEventInput) (anthropic.BetaToolResultBlockParamContentUnion, error) {
  			if len(input.Attendees) > 10 {
  				return anthropic.BetaToolResultBlockParamContentUnion{}, fmt.Errorf("too many attendees (max 10)")
  			}
  			return anthropic.BetaToolResultBlockParamContentUnion{
  				OfText: &anthropic.BetaTextBlockParam{
  					Text: fmt.Sprintf(`{"event_id": "evt_123", "status": "created", "title": %q}`, input.Title),
  				},
  			}, nil
  		},
  	)
  	if err != nil {
  		log.Fatal(err)
  	}

  	listCalendarEvents, err := toolrunner.NewBetaToolFromJSONSchema(
  		"list_calendar_events",
  		"List all calendar events on a given date.",
  		func(ctx context.Context, input ListCalendarEventsInput) (anthropic.BetaToolResultBlockParamContentUnion, error) {
  			return anthropic.BetaToolResultBlockParamContentUnion{
  				OfText: &anthropic.BetaTextBlockParam{
  					Text: `{"events": [{"title": "Existing meeting", "start": "14:00", "end": "15:00"}]}`,
  				},
  			}, nil
  		},
  	)
  	if err != nil {
  		log.Fatal(err)
  	}

  	// The runner calls the API, runs requested tools, and feeds results back
  	// until Claude produces a final answer.
  	runner := client.Beta.Messages.NewToolRunner(
  		[]anthropic.BetaTool{createCalendarEvent, listCalendarEvents},
  		anthropic.BetaToolRunnerParams{
  			BetaMessageNewParams: anthropic.BetaMessageNewParams{
  				Model:     anthropic.ModelClaudeOpus5,
  				MaxTokens: 1024,
  				Messages: []anthropic.BetaMessageParam{
  					anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(
  						"Check what I have next Monday, then schedule a planning session that avoids any conflicts.",
  					)),
  				},
  			},
  		},
  	)

  	var finalMessage *anthropic.BetaMessage
  	for message, err := range runner.All(ctx) {
  		if err != nil {
  			log.Fatal(err)
  		}
  		finalMessage = message
  	}

  	for _, block := range finalMessage.Content {
  		if block.Type == "text" {
  			fmt.Println(block.Text)
  		}
  	}
  }
  ```

  ```java Java
  // Ring 5: The Tool Runner SDK abstraction.

  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.helpers.BetaToolRunner;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;
  import com.fasterxml.jackson.annotation.JsonClassDescription;
  import com.fasterxml.jackson.annotation.JsonPropertyDescription;
  import java.util.List;
  import java.util.function.Supplier;

  // Define each tool as a class: the fields describe the input schema, and the
  // get() method holds the implementation. Throwing an exception sends the
  // message back to Claude as a tool result with is_error set.
  @JsonClassDescription("Create a calendar event with attendees.")
  static class CreateCalendarEvent implements Supplier<String> {
      @JsonPropertyDescription("Event title")
      public String title;

      @JsonPropertyDescription("Start time in ISO 8601 format")
      public String start;

      @JsonPropertyDescription("End time in ISO 8601 format")
      public String end;

      @JsonPropertyDescription("Email addresses to invite")
      public List<String> attendees;

      @Override
      public String get() {
          if (attendees != null && attendees.size() > 10) {
              throw new IllegalArgumentException("Too many attendees (max 10)");
          }
          return "{\"event_id\": \"evt_123\", \"status\": \"created\", \"title\": \"" + title + "\"}";
      }
  }

  @JsonClassDescription("List all calendar events on a given date.")
  static class ListCalendarEvents implements Supplier<String> {
      @JsonPropertyDescription("Date in YYYY-MM-DD format")
      public String date;

      @Override
      public String get() {
          return "{\"events\": [{\"title\": \"Existing meeting\", \"start\": \"14:00\", \"end\": \"15:00\"}]}";
      }
  }

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // The runner calls the API, runs requested tools, and feeds results back
      // until Claude produces a final answer.
      BetaToolRunner runner = client.beta()
              .messages()
              .toolRunner(MessageCreateParams.builder()
                      .model(Model.CLAUDE_OPUS_5)
                      .maxTokens(1024)
                      .addBeta("structured-outputs-2025-11-13")
                      .addUserMessage("Check what I have next Monday, then schedule a planning session that avoids any conflicts.")
                      .addTool(CreateCalendarEvent.class)
                      .addTool(ListCalendarEvents.class)
                      .build());

      BetaMessage finalMessage = null;
      for (BetaMessage message : runner) {
          finalMessage = message;
      }

      finalMessage.content().stream()
          .flatMap(block -> block.text().stream())
          .forEach(textBlock -> IO.println(textBlock.text()));
  }
  ```

  ```php PHP
  <?php

  // Ring 5: The Tool Runner SDK abstraction.

  use Anthropic\Client;
  use Anthropic\Lib\Tools\BetaRunnableTool;
  use Anthropic\Messages\Model;

  $client = new Client();

  // Define each tool as a runnable tool: the definition carries the JSON Schema
  // and the run closure holds the implementation. Throwing an exception sends the
  // message back to Claude as a tool result with is_error set.
  $createCalendarEvent = new BetaRunnableTool(
      definition: [
          'name' => 'create_calendar_event',
          'description' => 'Create a calendar event with attendees and optional recurrence.',
          'input_schema' => [
              'type' => 'object',
              'properties' => [
                  'title' => ['type' => 'string', 'description' => 'Event title'],
                  'start' => ['type' => 'string', 'description' => 'Start time in ISO 8601 format'],
                  'end' => ['type' => 'string', 'description' => 'End time in ISO 8601 format'],
                  'attendees' => [
                      'type' => 'array',
                      'items' => ['type' => 'string'],
                      'description' => 'Email addresses to invite',
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
      run: function (array $input): string {
          if (count($input['attendees'] ?? []) > 10) {
              throw new InvalidArgumentException('Too many attendees (max 10)');
          }

          return json_encode([
              'event_id' => 'evt_123',
              'status' => 'created',
              'title' => $input['title'],
          ]);
      },
  );

  $listCalendarEvents = new BetaRunnableTool(
      definition: [
          'name' => 'list_calendar_events',
          'description' => 'List all calendar events on a given date.',
          'input_schema' => [
              'type' => 'object',
              'properties' => [
                  'date' => ['type' => 'string', 'description' => 'Date in YYYY-MM-DD format'],
              ],
              'required' => ['date'],
          ],
      ],
      run: fn (array $input): string => json_encode([
          'events' => [['title' => 'Existing meeting', 'start' => '14:00', 'end' => '15:00']],
      ]),
  );

  // The runner calls the API, runs requested tools, and feeds results back
  // until Claude produces a final answer.
  $runner = $client->beta->messages->toolRunner(
      maxTokens: 1024,
      messages: [
          [
              'role' => 'user',
              'content' => 'Check what I have next Monday, then schedule a planning session that avoids any conflicts.',
          ],
      ],
      model: Model::CLAUDE_OPUS_5,
      tools: [$createCalendarEvent, $listCalendarEvents],
  );

  $finalMessage = null;
  foreach ($runner as $message) {
      $finalMessage = $message;
  }

  foreach ($finalMessage->content as $block) {
      if ($block->type === 'text') {
          echo $block->text, "\n";
      }
  }
  ```

  ```ruby Ruby
  # Ring 5: The Tool Runner SDK abstraction.

  require "anthropic"

  client = Anthropic::Client.new

  # Define each tool as a class: a typed input model describes the schema, and
  # the call method holds the implementation. Raising an error sends the message
  # back to Claude as a tool result with is_error set.
  class RecurrenceInput < Anthropic::BaseModel
    optional :frequency, Anthropic::InputSchema::EnumOf["daily", "weekly", "monthly"],
             doc: "How often the event repeats"
    optional :count, Integer, doc: "Number of occurrences"
  end

  class CreateCalendarEventInput < Anthropic::BaseModel
    required :title, String, doc: "Event title"
    required :start, String, doc: "Start time in ISO 8601 format"
    required :end, String, doc: "End time in ISO 8601 format"
    optional :attendees, Anthropic::InputSchema::ArrayOf[String], doc: "Email addresses to invite"
    optional :recurrence, RecurrenceInput, doc: "Optional recurrence rule"
  end

  class CreateCalendarEvent < Anthropic::BaseTool
    doc "Create a calendar event with attendees and optional recurrence."
    input_schema CreateCalendarEventInput

    def call(input)
      raise ArgumentError, "Too many attendees (max 10)" if input.attendees && input.attendees.length > 10
      JSON.generate({event_id: "evt_123", status: "created", title: input.title})
    end
  end

  class ListCalendarEventsInput < Anthropic::BaseModel
    required :date, String, doc: "Date in YYYY-MM-DD format"
  end

  class ListCalendarEvents < Anthropic::BaseTool
    doc "List all calendar events on a given date."
    input_schema ListCalendarEventsInput

    def call(input)
      JSON.generate({events: [{title: "Existing meeting", start: "14:00", end: "15:00"}]})
    end
  end

  # The runner calls the API, runs requested tools, and feeds results back
  # until Claude produces a final answer.
  runner = client.beta.messages.tool_runner(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [CreateCalendarEvent.new, ListCalendarEvents.new],
    messages: [
      {
        role: "user",
        content: "Check what I have next Monday, then schedule a planning session that avoids any conflicts."
      }
    ]
  )

  final_message = nil
  runner.each_message { |message| final_message = message }

  final_message.content.each do |block|
    puts block.text if block.type == :text
  end
  ```

**What to expect**

```text Output wrap
I checked your calendar for next Monday and found an existing meeting from 2pm to 3pm. I've scheduled the planning session for 10am to 11am to avoid the conflict.
```

The output is identical to Ring 3. The difference is in the code: roughly half the lines, no manual loop, and the schema lives next to the implementation.
