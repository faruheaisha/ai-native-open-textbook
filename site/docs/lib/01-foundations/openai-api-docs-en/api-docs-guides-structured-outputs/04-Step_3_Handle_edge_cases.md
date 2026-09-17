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
pageSha256: "0f8ac7005f04babf24f11f4c45a145ae50fb83597869d429bf5d91150c5b7c25"
contentMode: "local-full"
zh: ""
---

## Step 3: Handle edge cases

In some cases, the model might not generate a valid response that matches the provided JSON schema.

This can happen in the case of a refusal, if the model refuses to answer for safety reasons, or if for example you reach a max tokens limit and the response is incomplete.

```javascript
try {
  const response = await openai.responses.create({
    model: "gpt-6-astra",
    input: [
      {
        role: "system",
        content:
          "You are a helpful math tutor. Guide the user through the solution step by step.",
      },
      {
        role: "user",
        content: "how can I solve 8x + 7 = -23",
      },
    ],
    max_output_tokens: 50,
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
                  explanation: {
                    type: "string",
                  },
                  output: {
                    type: "string",
                  },
                },
                required: ["explanation", "output"],
                additionalProperties: false,
              },
            },
            final_answer: {
              type: "string",
            },
          },
          required: ["steps", "final_answer"],
          additionalProperties: false,
        },
        strict: true,
      },
    },
  });

  if (
    response.status === "incomplete" &&
    response.incomplete_details.reason === "max_output_tokens"
  ) {
    // Handle the case where the model did not return a complete response
    throw new Error("Incomplete response");
  }

  const message = response.output.find((item) => item.type === "message");
  const math_response = message?.content[0];

  if (!math_response) {
    throw new Error("No response content");
  }

  if (math_response.type === "refusal") {
    // handle refusal
    console.log(math_response.refusal);
  } else if (math_response.type === "output_text") {
    console.log(math_response.text);
  } else {
    throw new Error("No response content");
  }
} catch (e) {
  // Handle edge cases
  console.error(e);
}
```

```python
try:
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
                "strict": True,
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
            },
        },
        max_output_tokens=50,
    )

    if (
        response.status == "incomplete"
        and response.incomplete_details.reason == "max_output_tokens"
    ):
        raise Exception("Incomplete response")

    message = next((item for item in response.output if item.type == "message"), None)
    math_response = message.content[0] if message and message.content else None

    if not math_response:
        raise Exception("No response content")

    if math_response.type == "refusal":
        print(math_response.refusal)
    elif math_response.type == "output_text":
        print(math_response.text)
    else:
        raise Exception("No response content")
except Exception as e:
    # handle errors like finish_reason, refusal, content_filter, etc.
    print(e)
```

```go
package main

import (
	"context"
	"errors"
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
		MaxOutputTokens: openai.Int(1024),
		Text: responses.ResponseTextConfigParam{Format: responses.ResponseFormatTextConfigUnionParam{
			OfJSONSchema: &responses.ResponseFormatTextJSONSchemaConfigParam{Name: "math_response", Schema: mathSchema(), Strict: openai.Bool(true)},
		}},
	})
	if err != nil {
		panic(err)
	}
	if response.Status == "incomplete" {
		panic(errors.New("incomplete response"))
	}

	for _, output := range response.Output {
		if output.Type != "message" {
			continue
		}
		for _, content := range output.AsMessage().Content {
			if content.Type == "refusal" {
				fmt.Println(content.AsRefusal().Refusal)
				return
			}
			if content.Type == "output_text" {
				fmt.Println(content.AsOutputText().Text)
				return
			}
		}
	}
	panic(errors.New("no response content"))
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
import com.openai.models.responses.ResponseStatus;
import com.openai.models.responses.ResponseTextConfig;
import java.util.List;
import java.util.Map;

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
                            ResponseFormatTextJsonSchemaConfig.Schema.builder()
                                .putAdditionalProperty("type", JsonValue.from("object"))
                                .putAdditionalProperty(
                                    "properties",
                                    JsonValue.from(
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
                                                        "explanation",
                                                        Map.of("type", "string"),
                                                        "output",
                                                        Map.of("type", "string")),
                                                    "required",
                                                    List.of("explanation", "output"),
                                                    "additionalProperties",
                                                    false)),
                                            "final_answer",
                                            Map.of("type", "string"))))
                                .putAdditionalProperty(
                                    "required",
                                    JsonValue.from(List.of("steps", "final_answer")))
                                .putAdditionalProperty(
                                    "additionalProperties", JsonValue.from(false))
                                .build())
                        .build())
                .build())
        .maxOutputTokens(1_024L)
        .build();

var response = client.responses().create(params);
if (response.status().filter(ResponseStatus.INCOMPLETE::equals).isPresent()) {
  throw new IllegalStateException("Incomplete response");
}

var content =
    response.output().stream()
        .flatMap(item -> item.message().stream())
        .flatMap(message -> message.content().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No response content"));

if (content.refusal().isPresent()) {
  System.out.println(content.refusal().orElseThrow().refusal());
} else {
  System.out.println(
      content
          .outputText()
          .orElseThrow(() -> new IllegalStateException("No response content"))
          .text());
}
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
    MaxOutputTokenCount = 300,
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
if (
    response.Status == ResponseStatus.Incomplete
    && response.IncompleteStatusDetails?.Reason == ResponseIncompleteStatusReason.MaxOutputTokens
)
{
    throw new InvalidOperationException("The structured response was incomplete.");
}
if (
    response.Status == ResponseStatus.Incomplete
    && response.IncompleteStatusDetails?.Reason == ResponseIncompleteStatusReason.ContentFilter
)
{
    throw new InvalidOperationException("The structured response was interrupted by the content filter.");
}
MessageResponseItem message = response.OutputItems.OfType<MessageResponseItem>().FirstOrDefault()
    ?? throw new InvalidOperationException("The response did not include an output message.");
ResponseContentPart content = message.Content.FirstOrDefault()
    ?? throw new InvalidOperationException("The response did not include output content.");
Console.WriteLine(
    content.Kind == ResponseContentPartKind.Refusal ? content.Refusal : content.Text
);
```

```ruby
require "openai"

client = OpenAI::Client.new
step_schema = {
  type: :object,
  properties: {
    explanation: {type: :string},
    output: {type: :string}
  },
  required: %w[explanation output],
  additionalProperties: false
}
math_schema = {
  type: :object,
  properties: {
    steps: {type: :array, items: step_schema},
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
  max_output_tokens: 1_024,
  text: {
    format: {
      type: :json_schema,
      name: "math_response",
      strict: true,
      schema: math_schema
    }
  }
)

if response.status == OpenAI::Responses::ResponseStatus::INCOMPLETE
  raise "Incomplete response"
end

message = response.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputMessage)
end
unless message.is_a?(OpenAI::Models::Responses::ResponseOutputMessage)
  raise "No response message"
end

content = message.content.fetch(0)
if content.is_a?(OpenAI::Models::Responses::ResponseOutputRefusal)
  puts(content.refusal)
else
  puts(content.text)
end
```

Refusals with Structured Outputs

When using Structured Outputs with user-generated input, OpenAI models may occasionally refuse to fulfill the request for safety reasons. Since a refusal does not necessarily follow the schema you have supplied in `response_format`, the API response will include a new field called `refusal` to indicate that the model refused to fulfill the request.

When the `refusal` property appears in your output object, you might present the refusal in your UI, or include conditional logic in code that consumes the response to handle the case of a refused request.

```javascript
const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const response = await openai.responses.parse({
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
    format: zodTextFormat(MathReasoning, "math_response"),
  },
});

for (const output of response.output) {
  if (output.type !== "message") {
    continue;
  }

  for (const item of output.content) {
    if (item.type == "refusal") {
      // If the model refuses to respond, you will get a refusal message
      console.log(item.refusal);
      continue;
    }

    if (!item.parsed) {
      throw new Error("Could not parse response");
    }

    console.log(item.parsed);
  }
}
```

```python
class Step(BaseModel):
    explanation: str
    output: str

class MathReasoning(BaseModel):
    steps: list[Step]
    final_answer: str

response = client.responses.parse(
    model="gpt-6-astra",
    input=[
        {
            "role": "system",
            "content": "You are a helpful math tutor. Guide the user through the solution step by step.",
        },
        {"role": "user", "content": "how can I solve 8x + 7 = -23"},
    ],
    text_format=MathReasoning,
)

for output in response.output:
    if output.type != "message":
        continue

    for item in output.content:
        if item.type == "refusal":
            # If the model refuses to respond, you will get a refusal message
            print(item.refusal)
            continue

        if not item.parsed:
            raise Exception("Could not parse response")

        print(item.parsed)
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

	for _, output := range response.Output {
		if output.Type != "message" {
			continue
		}
		for _, content := range output.AsMessage().Content {
			if content.Type == "refusal" {
				fmt.Println(content.AsRefusal().Refusal)
				continue
			}
			fmt.Println(content.AsOutputText().Text)
		}
	}
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
                        .name("math_reasoning")
                        .strict(true)
                        .schema(
                            JsonValue.from(schema)
                                .convert(ResponseFormatTextJsonSchemaConfig.Schema.class))
                        .build())
                .build())
        .build();

var response = client.responses().create(params);
for (var output : response.output()) {
  if (output.message().isEmpty()) continue;
  for (var content : output.message().orElseThrow().content()) {
    if (content.refusal().isPresent()) {
      System.out.println(content.refusal().orElseThrow().refusal());
    } else {
      content.outputText().ifPresent(text -> System.out.println(text.text()));
    }
  }
}
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
foreach (MessageResponseItem message in response.OutputItems.OfType<MessageResponseItem>())
{
    foreach (ResponseContentPart content in message.Content)
    {
        Console.WriteLine(
            content.Kind == ResponseContentPartKind.Refusal ? content.Refusal : content.Text
        );
    }
}
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

response.output.each do |item|
  next unless item.is_a?(OpenAI::Models::Responses::ResponseOutputMessage)

  item.content.each do |content|
    case content
    when OpenAI::Models::Responses::ResponseOutputRefusal
      puts(content.refusal)
    when OpenAI::Models::Responses::ResponseOutputText
      puts(content.text)
    end
  end
end
```

The API response from a refusal will look something like this:

```json
{
  "id": "resp_1234567890",
  "object": "response",
  "created_at": 1721596428,
  "status": "completed",
  "completed_at": 1721596429,
  "error": null,
  "incomplete_details": null,
  "input": [],
  "instructions": null,
  "max_output_tokens": null,
  "model": "gpt-4o-2024-08-06",
  "output": [{
    "id": "msg_1234567890",
    "type": "message",
    "role": "assistant",
    "content": [
      // highlight-start
      {
        "type": "refusal",
        "refusal": "I'm sorry, I cannot assist with that request."
      }
      // highlight-end
    ]
  }],
  "usage": {
    "input_tokens": 81,
    "output_tokens": 11,
    "total_tokens": 92,
    "output_tokens_details": {
      "reasoning_tokens": 0,
    }
  },
}
```

Tips and best practices

#### Handling user-generated input

If your application is using user-generated input, make sure your prompt includes instructions on how to handle situations where the input cannot result in a valid response.

The model will always try to adhere to the provided schema, which can result in hallucinations if the input is completely unrelated to the schema.

You could include language in your prompt to specify that you want to return empty parameters, or a specific sentence, if the model detects that the input is incompatible with the task.

#### Handling mistakes

Structured Outputs can still contain mistakes. If you see mistakes, try adjusting your instructions, providing examples in the system instructions, or splitting tasks into simpler subtasks. Refer to the [prompt engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering) for more guidance on how to tweak your inputs.

#### Avoid JSON schema divergence

To prevent your JSON Schema and corresponding types in your programming language from diverging, we strongly recommend using the native Pydantic/zod sdk support.

If you prefer to specify the JSON schema directly, you could add CI rules that flag when either the JSON schema or underlying data objects are edited, or add a CI step that auto-generates the JSON Schema from type definitions (or vice-versa).
