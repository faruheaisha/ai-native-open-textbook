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
sourceRel: "api/docs/guides/structured-outputs.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/structured-outputs.md"
sourceSha256: "5aa9479e1f6b87ae01d05d8f478aee51c5b52996c52163ae0340c7da813adc8f"
pageSha256: "98fbf4efb8a4953bfbcda8812716e683d1dc7561c1bc13cfc0f11469a38e8da4"
contentMode: "local-full"
zh: ""
---

## Step 2: Supply your schema in the API call

To use Structured Outputs, simply specify

```json
text: { format: { type: "json_schema", "strict": true, "schema": … } }
```

For example:

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "system",
      content:
        "You are a helpful math tutor. Guide the user through the solution step by step.",
    },
    { role: "user", content: "how can I solve 8x + 7 = -23" },
  ],
  text: {
    format: {
      type: "json_schema",
      name: "math_response",
      schema: {
        type: "object",
        properties: {
          steps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                explanation: { type: "string" },
                output: { type: "string" },
              },
              required: ["explanation", "output"],
              additionalProperties: false,
            },
          },
          final_answer: { type: "string" },
        },
        required: ["steps", "final_answer"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
});

console.log(response.output_text);
```

```python
response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "system",
            "content": "You are a helpful math tutor. Guide the user through the solution step by step.",
        },
        {"role": "user", "content": "how can I solve 8x + 7 = -23"},
    ],
    text={
        "format": {
            "type": "json_schema",
            "name": "math_response",
            "schema": {
                "type": "object",
                "properties": {
                    "steps": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "explanation": {"type": "string"},
                                "output": {"type": "string"},
                            },
                            "required": ["explanation", "output"],
                            "additionalProperties": False,
                        },
                    },
                    "final_answer": {"type": "string"},
                },
                "required": ["steps", "final_answer"],
                "additionalProperties": False,
            },
            "strict": True,
        },
    },
)

print(response.output_text)
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
	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("You are a helpful math tutor. Guide the user through the solution step by step.")},
				responses.EasyInputMessageRoleSystem,
			),
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("how can I solve 8x + 7 = -23")},
				responses.EasyInputMessageRoleUser,
			),
		}},
		Text: responses.ResponseTextConfigParam{Format: responses.ResponseFormatTextConfigUnionParam{
			OfJSONSchema: &responses.ResponseFormatTextJSONSchemaConfigParam{Name: "math_response", Schema: mathSchema(), Strict: openai.Bool(true)},
		}},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.OutputText())
}

func mathSchema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"steps":        map[string]any{"type": "array", "items": map[string]any{"type": "object", "properties": map[string]any{"explanation": map[string]any{"type": "string"}, "output": map[string]any{"type": "string"}}, "required": []string{"explanation", "output"}, "additionalProperties": false}},
			"final_answer": map[string]any{"type": "string"},
		},
		"required":             []string{"steps", "final_answer"},
		"additionalProperties": false,
	}
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
            "steps",
                Map.of(
                    "type",
                    "array",
                    "items",
                    Map.of(
                        "type",
                        "object",
                        "properties",
                        Map.of(
                            "explanation", Map.of("type", "string"),
                            "output", Map.of("type", "string")),
                        "required",
                        List.of("explanation", "output"),
                        "additionalProperties",
                        false)),
            "final_answer", Map.of("type", "string")),
        "required",
        List.of("steps", "final_answer"),
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
                        .content(
                            "You are a helpful math tutor. Guide the user through the solution step by step.")
                        .build()),
                ResponseInputItem.ofEasyInputMessage(
                    EasyInputMessage.builder()
                        .role(EasyInputMessage.Role.USER)
                        .content("How can I solve 8x + 7 = -23?")
                        .build())))
        .text(
            ResponseTextConfig.builder()
                .format(
                    ResponseFormatTextJsonSchemaConfig.builder()
                        .name("math_response")
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
using System.Text.Json;
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

BinaryData schema = BinaryData.FromString(
    """
    {
      "type": "object",
      "properties": {
        "steps": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "explanation": { "type": "string" },
              "output": { "type": "string" }
            },
            "required": ["explanation", "output"],
            "additionalProperties": false
          }
        },
        "final_answer": { "type": "string" }
      },
      "required": ["steps", "final_answer"],
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
            "math_response",
            schema,
            jsonSchemaIsStrict: true
        ),
    },
};
options.InputItems.Add(ResponseItem.CreateSystemMessageItem("You are a helpful math tutor. Guide the user through the solution step by step."));
options.InputItems.Add(ResponseItem.CreateUserMessageItem("How can I solve 8x + 7 = -23?"));

ResponseResult response = await client.CreateResponseAsync(options);
using JsonDocument parsed = JsonDocument.Parse(response.GetOutputText());
Console.WriteLine(parsed.RootElement);
```

```ruby
require "openai"

client = OpenAI::Client.new
math_schema = {
  type: :object,
  properties: {
    steps: {
      type: :array,
      items: {
        type: :object,
        properties: {
          explanation: {type: :string},
          output: {type: :string}
        },
        required: %w[explanation output],
        additionalProperties: false
      }
    },
    final_answer: {type: :string}
  },
  required: %w[steps final_answer],
  additionalProperties: false
}

response = client.responses.create(
  model: "gpt-6-astra",
  input: [
    {
      role: :system,
      content: "You are a helpful math tutor. Guide the user through the solution step by step."
    },
    {role: :user, content: "How can I solve 8x + 7 = -23?"}
  ],
  text: {
    format: {
      type: :json_schema,
      name: "math_response",
      strict: true,
      schema: math_schema
    }
  }
)

puts(response.output_text)
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-astra",
    "input": [
      {
        "role": "system",
        "content": "You are a helpful math tutor. Guide the user through the solution step by step."
      },
      {
        "role": "user",
        "content": "how can I solve 8x + 7 = -23"
      }
    ],
    "text": {
      "format": {
        "type": "json_schema",
        "name": "math_response",
        "schema": {
          "type": "object",
          "properties": {
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "explanation": { "type": "string" },
                  "output": { "type": "string" }
                },
                "required": ["explanation", "output"],
                "additionalProperties": false
              }
            },
            "final_answer": { "type": "string" }
          },
          "required": ["steps", "final_answer"],
          "additionalProperties": false
        },
        "strict": true
      }
    }
  }'
```

**Note:** the first request you make with any schema will have additional latency as our API processes the schema, but subsequent requests with the same schema will not have additional latency.
