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
pageSha256: "ec6d9eba513c2117df9b95783c0fa26fa90ef462396c55ec6e3550a987ce762f"
contentMode: "local-full"
zh: ""
---

## Handling function calls

When the model calls a function, you must execute it and return the result. Since model responses can include zero, one, or multiple calls, it is best practice to assume there are several.

The response `output` array contains an entry with the `type` having a value of `function_call`. Each entry with a `call_id` (used later to submit the function result), `name`, and JSON-encoded `arguments`.

Sample response with multiple function calls

```json
[
    {
        "id": "fc_12345xyz",
        "call_id": "call_12345xyz",
        "type": "function_call",
        "name": "get_weather",
        "arguments": "{\"location\":\"Paris, France\"}"
    },
    {
        "id": "fc_67890abc",
        "call_id": "call_67890abc",
        "type": "function_call",
        "name": "get_weather",
        "arguments": "{\"location\":\"Bogotá, Colombia\"}"
    },
    {
        "id": "fc_99999def",
        "call_id": "call_99999def",
        "type": "function_call",
        "name": "send_email",
        "arguments": "{\"to\":\"bob@email.com\",\"body\":\"Hi bob\"}"
    }
]
```

If you are using [tool search](https://developers.openai.com/api/docs/guides/tools-tool-search), you may also see `tool_search_call` and `tool_search_output` items before a `function_call`. Once the function is loaded, handle the function call in the same way shown here.

Execute function calls and append results

```javascript
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

input.push(...toResponseInputItems(response.output));

for (const toolCall of response.output) {
  if (toolCall.type !== "function_call") {
    continue;
  }

  const name = toolCall.name;
  const args = JSON.parse(toolCall.arguments);

  const result = await callFunction(name, args);
  input.push({
    type: "function_call_output",
    call_id: toolCall.call_id,
    output: result.toString(),
  });
}
```

```python
input_messages += response.output

for tool_call in response.output:
    if tool_call.type != "function_call":
        continue

    name = tool_call.name
    args = json.loads(tool_call.arguments)

    result = call_function(name, args)
    input_messages.append(
        {
            "type": "function_call_output",
            "call_id": tool_call.call_id,
            "output": json.dumps(result),
        }
    )
```

```go
input = append(input, responseOutputAsInput(response.Output)...)

for _, output := range response.Output {
	if output.Type != "function_call" {
		continue
	}
	toolCall := output.AsFunctionCall()
	var arguments functionArguments
	if err := json.Unmarshal([]byte(toolCall.Arguments), &arguments); err != nil {
		panic(err)
	}
	result, err := callFunction(toolCall.Name, arguments)
	if err != nil {
		panic(err)
	}
	toolOutput := responses.ResponseInputItemParamOfFunctionCallOutput(result)
	toolOutput.OfFunctionCallOutput.CallID = openai.String(toolCall.CallID)
	input = append(input, toolOutput)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

response.output().stream()
    .map(item -> JsonValue.from(item).convert(ResponseInputItem.class))
    .forEach(input::add);
response.output().stream()
    .flatMap(item -> item.functionCall().stream())
    .forEach(
        call -> {
          String result;
          if (call.name().equals("get_weather")) {
            record Coordinates(double latitude, double longitude) {}

            Coordinates coordinates = call.arguments(Coordinates.class);
            result =
                JsonValue.from(
                        Map.of(
                            "latitude", coordinates.latitude(),
                            "longitude", coordinates.longitude(),
                            "temperature_c", 18))
                    .toString();
          } else if (call.name().equals("send_email")) {
            record Email(String to, String body) {}

            Email message = call.arguments(Email.class);
            result = JsonValue.from(Map.of("to", message.to(), "status", "sent")).toString();
          } else {
            throw new IllegalArgumentException("Unknown function: " + call.name());
          }
          var output =
              ResponseInputItem.ofFunctionCallOutput(
                  ResponseInputItem.FunctionCallOutput.builder()
                      .callId(call.callId())
                      .output(result)
                      .build());
          input.add(output);
          System.out.println(call.callId() + " " + result);
        });
```

```ruby
input.concat(response.output)

response.output.each do |tool_call|
  next unless tool_call.is_a?(OpenAI::Models::Responses::ResponseFunctionToolCall)

  arguments = JSON.parse(tool_call.arguments)
  result = call_function(tool_call.name, arguments)

  input << {
    type: :function_call_output,
    call_id: tool_call.call_id,
    output: JSON.generate(result)
  }
end
```

In the example above, we have a hypothetical `call_function` to route each call. Here’s a possible implementation:

Execute function calls and append results

```javascript
const callFunction = async (name, args) => {
  if (name === "get_weather") {
    return getWeather(args.latitude, args.longitude);
  }
  if (name === "send_email") {
    return sendEmail(args.to, args.body);
  }
  throw new Error(`Unknown function: ${name}`);
};
```

```python
def call_function(name, args):
    if name == "get_weather":
        return get_weather(**args)
    if name == "send_email":
        return send_email(**args)
    raise ValueError(f"Unknown function: {name}")
```

```go
func callFunction(name string, arguments functionArguments) (string, error) {
	switch name {
	case "get_weather":
		return getWeather(arguments.Location), nil
	case "send_email":
		return sendEmail(arguments.To, arguments.Body), nil
	default:
		return "", fmt.Errorf("unknown function: %s", name)
	}
}
```

```ruby
def call_function(name, arguments)
  case name
  when "get_weather"
    FunctionCallingExample.get_weather(
      arguments.fetch("latitude"),
      arguments.fetch("longitude")
    )
  when "send_email"
    FunctionCallingExample.send_email(
      arguments.fetch("to"),
      arguments.fetch("body")
    )
  else
    raise ArgumentError, "Unknown function: #{name}"
  end
end
```

### Formatting results

The result you pass in the `function_call_output` message should typically be a string, where the format is up to you (JSON, error codes, plain text, etc.). The model will interpret that string as needed.

For functions that return images or files, you can pass an [array of image or file objects](https://developers.openai.com/api/reference/resources/responses/methods/create#responses_create-input-input_item_list-item-function_tool_call_output-output) instead of a string.

If your function has no return value (for example, `send_email`), return a string that indicates success or failure, such as `"success"`.

### Incorporating results into response

After appending the results to your `input`, you can send them back to the model to get a final response.

Send results back to model

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input,
  tools,
});
```

```python
response = client.responses.create(
    model="gpt-6-astra",
    input=input_messages,
    tools=responses_tools,
)

print(response.output_text)
```

```go
response, err = client.Responses.New(context.Background(), responses.ResponseNewParams{
	Model: "gpt-6-astra",
	Input: responses.ResponseNewParamsInputUnion{OfInputItemList: input},
	Tools: tools,
})
if err != nil {
	panic(err)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.FunctionTool;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFunctionToolCall;
import com.openai.models.responses.ResponseInputItem;
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
        .inputOfResponse(
            List.of(
                ResponseInputItem.ofEasyInputMessage(
                    EasyInputMessage.builder()
                        .role(EasyInputMessage.Role.USER)
                        .content("What is the weather like in Paris?")
                        .build()),
                ResponseInputItem.ofFunctionCall(
                    ResponseFunctionToolCall.builder()
                        .callId("call_weather")
                        .name("get_weather")
                        .arguments("{\"city\":\"Paris\"}")
                        .build()),
                ResponseInputItem.ofFunctionCallOutput(
                    ResponseInputItem.FunctionCallOutput.builder()
                        .callId("call_weather")
                        .output("{\"city\":\"Paris\",\"temperature_c\":18}")
                        .build())))
        .addTool(weather)
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
input = [
  {role: :user, content: "What is the weather like in Paris?"},
  {
    type: :function_call,
    call_id: "call_weather",
    name: "get_weather",
    arguments: '{"city":"Paris"}'
  },
  {
    type: :function_call_output,
    call_id: "call_weather",
    output: '{"city":"Paris","temperature_c":18}'
  }
]
tools = [{
  type: :function,
  name: "get_weather",
  description: "Get the weather for a city",
  parameters: {
    type: :object,
    properties: {city: {type: :string}},
    required: ["city"],
    additionalProperties: false
  },
  strict: true
}]
response = client.responses.create(
  model: "gpt-6-astra",
  input: input,
  tools: tools
)

puts(response.output_text)
```

Final response

```json
"It's about 15°C in Paris, 18°C in Bogotá, and I've sent that email to Bob."
```
