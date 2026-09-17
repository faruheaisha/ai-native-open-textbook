---
title: "Structured model outputs"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/structured-outputs.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/structured-outputs.md"
sourceSha256: "5aa9479e1f6b87ae01d05d8f478aee51c5b52996c52163ae0340c7da813adc8f"
pageSha256: "ef9272cab1c55b6412afa991ff2ec24b592278e6b62a8cec9738f243ce337a68"
contentMode: "local-full"
zh: ""
---

# Structured model outputs

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

JSON is one of the most widely used formats in the world for applications to exchange data.

Structured Outputs is a feature that ensures the model will always generate responses that adhere to your supplied [JSON Schema](https://json-schema.org/overview/what-is-jsonschema), so you don't need to worry about the model omitting a required key, or hallucinating an invalid enum value.

Some benefits of Structured Outputs include:

1. **Reliable type-safety:** No need to validate or retry incorrectly formatted responses
1. **Explicit refusals:** Safety-based model refusals are now programmatically detectable
1. **Simpler prompting:** No need for strongly worded prompts to achieve consistent formatting

In addition to supporting JSON Schema in the REST API, the OpenAI SDKs for [Python](https://github.com/openai/openai-python/blob/main/helpers.md#structured-outputs-parsing-helpers) and [JavaScript](https://github.com/openai/openai-node/blob/master/helpers.md#structured-outputs-parsing-helpers) also make it easy to define object schemas using [Pydantic](https://docs.pydantic.dev/latest/) and [Zod](https://zod.dev/) respectively. Below, you can see how to extract information from unstructured text that conforms to a schema defined in code.

Getting a structured response

```javascript
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const CalendarEvent = z.object({
  name: z.string(),
  date: z.string(),
  participants: z.array(z.string()),
});

const response = await openai.responses.parse({
  model: "gpt-6-astra",
  input: [
    { role: "system", content: "Extract the event information." },
    {
      role: "user",
      content: "Alice and Bob are going to a science fair on Friday.",
    },
  ],
  text: {
    format: zodTextFormat(CalendarEvent, "event"),
  },
});

const event = response.output_parsed;
```

```python
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.responses.parse(
    model="gpt-6-astra",
    input=[
        {"role": "system", "content": "Extract the event information."},
        {
            "role": "user",
            "content": "Alice and Bob are going to a science fair on Friday.",
        },
    ],
    text_format=CalendarEvent,
)

event = response.output_parsed
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
	schema := map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name":         map[string]any{"type": "string"},
			"date":         map[string]any{"type": "string"},
			"participants": map[string]any{"type": "array", "items": map[string]any{"type": "string"}},
		},
		"required":             []string{"name", "date", "participants"},
		"additionalProperties": false,
	}

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("Extract the event information.")},
				responses.EasyInputMessageRoleSystem,
			),
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("Alice and Bob are going to a science fair on Friday.")},
				responses.EasyInputMessageRoleUser,
			),
		}},
		Text: responses.ResponseTextConfigParam{Format: responses.ResponseFormatTextConfigUnionParam{
			OfJSONSchema: &responses.ResponseFormatTextJSONSchemaConfigParam{Name: "event", Schema: schema, Strict: openai.Bool(true)},
		}},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFormatTextJsonSchemaConfig;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.ResponseTextConfig;
import java.util.List;
import java.util.Map;

Map<String, Object> schema =
    Map.of(
        "type",
        "object",
        "properties",
        Map.of(
            "name", Map.of("type", "string"),
            "date", Map.of("type", "string"),
            "participants", Map.of("type", "array", "items", Map.of("type", "string"))),
        "required",
        List.of("name", "date", "participants"),
        "additionalProperties",
        false);

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .inputOfResponse(
            List.of(
                ResponseInputItem.ofEasyInputMessage(
                    EasyInputMessage.builder()
                        .role(EasyInputMessage.Role.SYSTEM)
                        .content("Extract the event information.")
                        .build()),
                ResponseInputItem.ofEasyInputMessage(
                    EasyInputMessage.builder()
                        .role(EasyInputMessage.Role.USER)
                        .content("Alice and Bob are going to a science fair on Friday.")
                        .build())))
        .text(
            ResponseTextConfig.builder()
                .format(
                    ResponseFormatTextJsonSchemaConfig.builder()
                        .name("event")
                        .strict(true)
                        .schema(
                            JsonValue.from(schema)
                                .convert(ResponseFormatTextJsonSchemaConfig.Schema.class))
                        .build())
                .build())
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

BinaryData schema = BinaryData.FromString(
    """
    {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "date": { "type": "string" },
        "participants": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["name", "date", "participants"],
      "additionalProperties": false
    }
    """
);
CreateResponseOptions options = new()
{
    Model = "gpt-6-astra",
    TextOptions = new ResponseTextOptions
    {
        TextFormat = ResponseTextFormat.CreateJsonSchemaFormat(
            "event",
            schema,
            jsonSchemaIsStrict: true
        ),
    },
};
options.InputItems.Add(
    ResponseItem.CreateSystemMessageItem("Extract the event information.")
);
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem(
        "Alice and Bob are going to a science fair on Friday."
    )
);

ResponseResult response = await client.CreateResponseAsync(options);

Console.WriteLine(response.GetOutputText());
```

```ruby
require "openai"

client = OpenAI::Client.new
event_schema = {
  type: :object,
  properties: {
    name: {type: :string},
    date: {type: :string},
    participants: {type: :array, items: {type: :string}}
  },
  required: %w[name date participants],
  additionalProperties: false
}

response = client.responses.create(
  model: "gpt-6-astra",
  input: [
    {role: :system, content: "Extract the event information."},
    {role: :user, content: "Alice and Bob are going to a science fair on Friday."}
  ],
  text: {
    format: {
      type: :json_schema,
      name: "event",
      strict: true,
      schema: event_schema
    }
  }
)

puts(response.output_text)
```

### Supported models

Structured Outputs is available in our [latest large language models](https://developers.openai.com/api/docs/models), starting with GPT-4o. For new projects, start with [`gpt-6-astra`](https://developers.openai.com/api/docs/models/gpt-6-astra). Older models like `gpt-4-turbo` and earlier may use [JSON mode](#json-mode) instead.

  

When to use Structured Outputs via function calling vs via 
    
text.format

Structured Outputs is available in two forms in the OpenAI API:

1. When using [function calling](https://developers.openai.com/api/docs/guides/function-calling)
2. When using a `json_schema` response format

Function calling is useful when you are building an application that bridges the models and functionality of your application.

For example, you can give the model access to functions that query a database in order to build an AI assistant that can help users with their orders, or functions that can interact with the UI.

Conversely, Structured Outputs via `response_format` are more suitable when you want to indicate a structured schema for use when the model responds to the user, rather than when the model calls a tool.

For example, if you are building a math tutoring application, you might want the assistant to respond to your user using a specific JSON Schema so that you can generate a UI that displays different parts of the model's output in distinct ways.

Put simply:

  - If you are connecting the model to tools, functions, data, etc. in your
  system, then you should use function calling - If you want to structure the
  model's output when it responds to the user, then you should use a structured
  `text.format`

  The remainder of this guide will focus on non-function calling use cases in
    the Responses API. To learn more about how to use Structured Outputs with
    function calling, check out the 
    [Function Calling](https://developers.openai.com/api/docs/guides/function-calling#strict-mode) 
    guide.

### Structured Outputs vs JSON mode

Structured Outputs is the evolution of [JSON mode](#json-mode). While both ensure valid JSON is produced, only Structured Outputs ensure schema adherence. Both Structured Outputs and JSON mode are supported in the Responses API, Chat Completions API, Assistants API, Fine-tuning API and Batch API.

We recommend always using Structured Outputs instead of JSON mode when possible.

However, Structured Outputs with `response_format: \{type: "json_schema", ...\}` is only supported with the `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, and `gpt-4o-2024-08-06` model snapshots and later.

|                                            | Structured Outputs                                                                                                             | JSON Mode                                  |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| **Outputs valid JSON**                     | Yes                                                                                                                            | Yes                                        |
| **Adheres to schema**                      | Yes (see [supported schemas](#supported-schemas))                                               | No                                         |
| **Compatible models**                      | `gpt-4o-mini`, `gpt-4o-2024-08-06`, and later                                                                                  | `gpt-3.5-turbo`, `gpt-4-*`, `gpt-4o-*`, and compatible GPT-5 models |
| **Enabling**                               | `text: \{ format: \{ type: "json_schema", "strict": true, "schema": ... \} \}`                                       | `text: \{ format: \{ type: "json_object" \} \}` |

## 本篇目录

- [Examples](https://developers.openai.com/api/docs)
- [Step 1: Define your schema](https://developers.openai.com/api/docs)
- [Step 2: Supply your schema in the API call](https://developers.openai.com/api/docs)
- [Step 3: Handle edge cases](https://developers.openai.com/api/docs)
- [Streaming](https://developers.openai.com/api/docs)
- [Supported schemas](https://developers.openai.com/api/docs)
- [JSON mode](https://developers.openai.com/api/docs)
- [Resources](https://developers.openai.com/api/docs)
