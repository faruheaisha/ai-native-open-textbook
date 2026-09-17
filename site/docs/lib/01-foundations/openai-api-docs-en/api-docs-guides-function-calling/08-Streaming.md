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
sourceRel: "api/docs/guides/function-calling.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/function-calling.md"
sourceSha256: "c692c979afcb8a1fec5391194c89921878122f15ce1d7e4c024323e3a85718e0"
pageSha256: "41413a864c4d66692e378368628a2cff63b9b4668c8374ab0372dd01da23bcb7"
contentMode: "local-full"
zh: ""
---

## Streaming

Streaming can be used to surface progress by showing which function is called as the model fills its arguments, and even displaying the arguments in real time.

Streaming function calls is very similar to streaming regular responses: you set `stream` to `true` and get different `event` objects.

Streaming function calls

```javascript
import { OpenAI } from "openai";

const openai = new OpenAI();

/** @type {OpenAI.Responses.Tool[]} */
const tools = [
  {
    type: "function",
    name: "get_weather",
    description: "Get current temperature for provided coordinates in celsius.",
    parameters: {
      type: "object",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
      required: ["latitude", "longitude"],
      additionalProperties: false,
    },
    strict: true,
  },
];

const stream = await openai.responses.create({
  model: "gpt-6-astra",
  input: [{ role: "user", content: "What's the weather like in Paris today?" }],
  tools,
  stream: true,
  store: true,
});

for await (const event of stream) {
  console.log(event);
}
```

```python
from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country e.g. Bogotá, Colombia",
                }
            },
            "required": ["location"],
            "additionalProperties": False,
        },
    }
]

stream = client.responses.create(
    model="gpt-6-astra",
    input=[{"role": "user", "content": "What's the weather like in Paris today?"}],
    tools=tools,
    stream=True,
)

for event in stream:
    print(event)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	parameters := map[string]any{
		"type": "object",
		"properties": map[string]any{
			"location": map[string]any{"type": "string", "description": "City and country e.g. Bogotá, Colombia"},
		},
		"required":             []string{"location"},
		"additionalProperties": false,
	}
	tool := responses.ToolParamOfFunction("get_weather", parameters, true)
	stream := client.Responses.NewStreaming(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("What's the weather like in Paris today?")},
		Tools: []responses.ToolUnionParam{tool},
	})
	for stream.Next() {
		fmt.Println(stream.Current().Type)
	}
	if err := stream.Err(); err != nil {
		panic(err)
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.core.http.StreamResponse;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseStreamEvent;
import java.util.List;
import java.util.Map;

FunctionTool weather =
    FunctionTool.builder()
        .name("get_weather")
        .description("Get the weather for a city.")
        .parameters(
            FunctionTool.Parameters.builder()
                .putAdditionalProperty("type", JsonValue.from("object"))
                .putAdditionalProperty(
                    "properties", JsonValue.from(Map.of("city", Map.of("type", "string"))))
                .putAdditionalProperty("required", JsonValue.from(List.of("city")))
                .putAdditionalProperty("additionalProperties", JsonValue.from(false))
                .build())
        .strict(true)
        .build();
ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("What is the weather in Paris?")
        .addTool(weather)
        .build();

try (StreamResponse<ResponseStreamEvent> stream = client.responses().createStreaming(params)) {
  stream.stream()
      .forEach(
          event -> {
            System.out.println(event);
            event
                .outputItemAdded()
                .ifPresent(added -> System.out.println("response.output_item.added: " + added));
            event
                .functionCallArgumentsDelta()
                .ifPresent(
                    delta ->
                        System.out.println("response.function_call_arguments.delta: " + delta));
          });
}
```

```ruby
require "openai"

client = OpenAI::Client.new
stream = client.responses.stream(
  model: "gpt-6-astra",
  input: "What is the weather in Paris?",
  tools: [{type: :function, name: "get_weather", description: "Get the weather for a city", parameters: {type: :object, properties: {city: {type: :string}}, required: ["city"], additionalProperties: false}, strict: true}]
)

stream.each { |event| puts(event.type) }
```

Output events

```json
{"type":"response.output_item.added","response_id":"resp_1234xyz","output_index":0,"item":{"type":"function_call","id":"fc_1234xyz","call_id":"call_1234xyz","name":"get_weather","arguments":""}}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":"{\""}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":"location"}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":"\":\""}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":"Paris"}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":","}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":" France"}
{"type":"response.function_call_arguments.delta","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"delta":"\"}"}
{"type":"response.function_call_arguments.done","response_id":"resp_1234xyz","item_id":"fc_1234xyz","output_index":0,"arguments":"{\"location\":\"Paris, France\"}"}
{"type":"response.output_item.done","response_id":"resp_1234xyz","output_index":0,"item":{"type":"function_call","id":"fc_1234xyz","call_id":"call_1234xyz","name":"get_weather","arguments":"{\"location\":\"Paris, France\"}"}}
```

Instead of aggregating chunks into a single `content` string, however, you're aggregating chunks into an encoded `arguments` JSON object.

When the model calls one or more functions an event of type `response.output_item.added` will be emitted for each function call that contains the following fields:

| Field          | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `response_id`  | The id of the response that the function call belongs to                                                     |
| `output_index` | The index of the output item in the response. This represents the individual function calls in the response. |
| `item`         | The in-progress function call item that includes a `name`, `arguments` and `id` field                        |

Afterwards you will receive a series of events of type `response.function_call_arguments.delta` which will contain the `delta` of the `arguments` field. These events contain the following fields:

| Field          | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `response_id`  | The id of the response that the function call belongs to                                                     |
| `item_id`      | The id of the function call item that the delta belongs to                                                   |
| `output_index` | The index of the output item in the response. This represents the individual function calls in the response. |
| `delta`        | The delta of the `arguments` field.                                                                          |

Below is a code snippet demonstrating how to aggregate the `delta`s into a final `tool_call` object.

Accumulating tool_call deltas

```javascript
const finalToolCalls = {};

for await (const event of stream) {
  if (
    event.type === "response.output_item.added" &&
    event.item.type === "function_call"
  ) {
    finalToolCalls[event.output_index] = event.item;
  } else if (event.type === "response.function_call_arguments.delta") {
    const index = event.output_index;

    if (finalToolCalls[index]) {
      finalToolCalls[index].arguments += event.delta;
    }
  }
}
```

```python
final_tool_calls = {}

for event in stream:
    if event.type == "response.output_item.added":
        final_tool_calls[event.output_index] = event.item
    elif event.type == "response.function_call_arguments.delta":
        index = event.output_index

        if final_tool_calls[index]:
            final_tool_calls[index].arguments += event.delta
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	parameters := map[string]any{
		"type": "object",
		"properties": map[string]any{
			"location": map[string]any{"type": "string"},
		},
		"required":             []string{"location"},
		"additionalProperties": false,
	}
	tool := responses.ToolParamOfFunction("get_weather", parameters, true)
	stream := client.Responses.NewStreaming(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("What's the weather like in Paris today?"),
		},
		Tools: []responses.ToolUnionParam{tool},
	})

	finalToolCalls := map[int64]responses.ResponseFunctionToolCall{}
	for stream.Next() {
		event := stream.Current()
		if event.Type == "response.output_item.added" && event.Item.Type == "function_call" {
			finalToolCalls[event.OutputIndex] = event.Item.AsFunctionCall()
		}
		if event.Type == "response.function_call_arguments.delta" {
			finalToolCall, ok := finalToolCalls[event.OutputIndex]
			if !ok {
				continue
			}
			finalToolCall.Arguments += event.Delta
			finalToolCalls[event.OutputIndex] = finalToolCall
		}
	}
	if err := stream.Err(); err != nil {
		panic(err)
	}
	fmt.Println(finalToolCalls)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.core.http.StreamResponse;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFunctionToolCall;
import com.openai.models.responses.ResponseStreamEvent;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

FunctionTool weather =
    FunctionTool.builder()
        .name("get_weather")
        .description("Get the weather for a city.")
        .parameters(
            FunctionTool.Parameters.builder()
                .putAdditionalProperty("type", JsonValue.from("object"))
                .putAdditionalProperty(
                    "properties", JsonValue.from(Map.of("location", Map.of("type", "string"))))
                .putAdditionalProperty("required", JsonValue.from(List.of("location")))
                .putAdditionalProperty("additionalProperties", JsonValue.from(false))
                .build())
        .strict(true)
        .build();
ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("What is the weather in Paris?")
        .addTool(weather)
        .build();

Map<Long, ResponseFunctionToolCall> toolCalls = new LinkedHashMap<>();
try (StreamResponse<ResponseStreamEvent> stream = client.responses().createStreaming(params)) {
  stream.stream()
      .forEach(
          event -> {
            event
                .outputItemAdded()
                .ifPresent(
                    added ->
                        added
                            .item()
                            .functionCall()
                            .ifPresent(call -> toolCalls.put(added.outputIndex(), call)));
            event
                .functionCallArgumentsDelta()
                .ifPresent(
                    delta ->
                        toolCalls.computeIfPresent(
                            delta.outputIndex(),
                            (ignored, call) ->
                                call.toBuilder()
                                    .arguments(call.arguments() + delta.delta())
                                    .build()));
          });
}
toolCalls.values().forEach(System.out::println);
```

```ruby
require "openai"

client = OpenAI::Client.new
stream = client.responses.stream(
  model: "gpt-6-astra",
  input: "What is the weather in Paris?",
  tools: [{
    type: :function,
    name: "get_weather",
    parameters: {
      type: :object,
      properties: {location: {type: :string}},
      required: ["location"],
      additionalProperties: false
    },
    strict: true
  }]
)

final_tool_calls = {}
stream.each do |event|
  case event
  when OpenAI::Models::Responses::ResponseOutputItemAddedEvent
    item = event.item
    next unless item.is_a?(OpenAI::Models::Responses::ResponseFunctionToolCall)

    final_tool_calls[event.output_index] = {
      id: item.id,
      call_id: item.call_id,
      name: item.name,
      type: item.type,
      arguments: item.arguments.dup
    }
  when OpenAI::Models::Responses::ResponseFunctionCallArgumentsDeltaEvent
    tool_call = final_tool_calls[event.output_index]
    tool_call[:arguments] << event.delta if tool_call
  end
end

puts(final_tool_calls.sort.to_h.values)
```

Accumulated final_tool_calls[0]

```json
{
    "type": "function_call",
    "id": "fc_1234xyz",
    "call_id": "call_2345abc",
    "name": "get_weather",
    "arguments": "{\"location\":\"Paris, France\"}"
}
```

When the model has finished calling the functions an event of type `response.function_call_arguments.done` will be emitted. This event contains the entire function call including the following fields:

| Field          | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `response_id`  | The id of the response that the function call belongs to                                                     |
| `output_index` | The index of the output item in the response. This represents the individual function calls in the response. |
| `item`         | The function call item that includes a `name`, `arguments` and `id` field.                                   |
