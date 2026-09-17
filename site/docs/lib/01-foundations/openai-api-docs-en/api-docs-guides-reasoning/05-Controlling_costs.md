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
sourceRel: "api/docs/guides/reasoning.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/reasoning.md"
sourceSha256: "cf636c88ee3feaf7cad399534f49fe70ca853728f4bd2f387c6295206c10e93d"
pageSha256: "adcde285620458ebf9b92a6941eb4e19a1e3326ac37d7cfcb59c40c986555b70"
contentMode: "local-full"
zh: ""
---

## Controlling costs

To manage costs with reasoning models, you can limit the total number of tokens the
model generates, including reasoning tokens, visible output tokens, and non-visible
formatting tokens, by using the
[`max_output_tokens`](https://developers.openai.com/api/reference/resources/responses/methods/create#responses-create-max_output_tokens)
parameter. See [output token counts](https://developers.openai.com/api/docs/guides/token-counting#understand-output-token-counts) for details about how generated tokens are reflected in usage and output limits.

### Managing the context window

It's important to ensure there's enough space in the context window for reasoning tokens when creating responses. Depending on the problem's complexity, the models may generate anywhere from a few hundred to tens of thousands of reasoning tokens. The exact number of reasoning tokens used is visible in the [usage object of the response object](https://developers.openai.com/api/reference/resources/responses), under `output_tokens_details`:

```json
{
  "usage": {
    "input_tokens": 75,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 1186,
    "output_tokens_details": {
      "reasoning_tokens": 1024
    },
    "total_tokens": 1261
  }
}
```

Context window lengths are found on the [model reference page](https://developers.openai.com/api/docs/models), and will differ across model snapshots.

### Allocating space for reasoning

If the generated tokens reach the context window limit or the `max_output_tokens` value you've set, you'll receive a response with a `status` of `incomplete` and `incomplete_details` with `reason` set to `max_output_tokens`. This might occur before any visible output tokens are produced, meaning you could incur costs for input and reasoning tokens without receiving a visible response.

To prevent this, ensure there's sufficient space in the context window or adjust the `max_output_tokens` value to a higher number. OpenAI recommends reserving at least 25,000 tokens for reasoning and outputs when you start experimenting with these models. As you become familiar with the number of reasoning tokens your prompts require, you can adjust this buffer accordingly.

Handling incomplete responses

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const prompt = `
Write a bash script that takes a matrix represented as a string with
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
`;

const response = await openai.responses.create({
  model: "gpt-6-astra",
  reasoning: { effort: "medium" },
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
  max_output_tokens: 300,
});

if (
  response.status === "incomplete" &&
  response.incomplete_details.reason === "max_output_tokens"
) {
  console.log("Ran out of tokens");
  if (response.output_text?.length > 0) {
    console.log("Partial output:", response.output_text);
  } else {
    console.log("Ran out of tokens during reasoning");
  }
}
```

```python
from openai import OpenAI

client = OpenAI()

prompt = """
Write a bash script that takes a matrix represented as a string with
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
"""

response = client.responses.create(
    model="gpt-6-astra",
    reasoning={"effort": "medium"},
    input=[{"role": "user", "content": prompt}],
    max_output_tokens=300,
)

if (
    response.status == "incomplete"
    and response.incomplete_details.reason == "max_output_tokens"
):
    print("Ran out of tokens")
    if response.output_text:
        print("Partial output:", response.output_text)
    else:
        print("Ran out of tokens during reasoning")
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
	prompt := `Write a bash script that takes a matrix represented as a string with
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.`

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:           "gpt-6-astra",
		MaxOutputTokens: openai.Int(300),
		Reasoning: responses.ReasoningParam{
			Effort: responses.ReasoningEffortMedium,
		},
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt),
		},
	})
	if err != nil {
		panic(err)
	}

	if response.Status == responses.ResponseStatusIncomplete {
		fmt.Println("Ran out of tokens")
		if text := response.OutputText(); text != "" {
			fmt.Println("Partial output:", text)
		}
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseStatus;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input(
            "Write a bash script that takes a matrix represented as a string with format "
                + "'[1,2],[3,4],[5,6]' and prints the transpose in the same format.")
        .maxOutputTokens(300)
        .reasoning(Reasoning.builder().effort(ReasoningEffort.MEDIUM).build())
        .build();

var response = client.responses().create(params);
if (response.status().filter(ResponseStatus.INCOMPLETE::equals).isPresent()
    && response
        .incompleteDetails()
        .flatMap(Response.IncompleteDetails::reason)
        .filter(Response.IncompleteDetails.Reason.MAX_OUTPUT_TOKENS::equals)
        .isPresent()) {
  System.out.println("Ran out of tokens");
  response.output().stream()
      .flatMap(item -> item.message().stream())
      .flatMap(message -> message.content().stream())
      .flatMap(content -> content.outputText().stream())
      .forEach(text -> System.out.println("Partial output: " + text.text()));
}
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6-astra",
    MaxOutputTokenCount = 300,
    ReasoningOptions = new ResponseReasoningOptions
    {
        ReasoningEffortLevel = ResponseReasoningEffortLevel.Medium,
    },
};
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Write a bash script that transposes a matrix.")
);

ResponseResult response = await client.CreateResponseAsync(options);
if (
    response.Status == ResponseStatus.Incomplete
    && response.IncompleteStatusDetails?.Reason == ResponseIncompleteStatusReason.MaxOutputTokens
)
{
    Console.WriteLine("The response ended before all output tokens were generated.");
    string partialOutput = response.GetOutputText();
    Console.WriteLine(
        string.IsNullOrWhiteSpace(partialOutput)
            ? "Ran out of tokens during reasoning."
            : $"Partial output: {partialOutput}"
    );
}
else if (
    response.Status == ResponseStatus.Incomplete
    && response.IncompleteStatusDetails?.Reason == ResponseIncompleteStatusReason.ContentFilter
)
{
    Console.WriteLine("The response was interrupted by the content filter.");
}
else if (response.Status == ResponseStatus.Completed)
{
    Console.WriteLine(response.GetOutputText());
}
else
{
    throw new InvalidOperationException($"The response ended with status: {response.Status}");
}
```

```ruby
require "openai"

client = OpenAI::Client.new
prompt = <<~PROMPT
  Write a bash script that takes a matrix represented as a string with format
  '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
PROMPT

response = client.responses.create(
  model: "gpt-6-astra",
  max_output_tokens: 300,
  reasoning: {effort: :medium},
  input: prompt
)

if response.status == OpenAI::Responses::ResponseStatus::INCOMPLETE
  puts("Ran out of tokens")
  puts("Partial output: #{response.output_text}") unless response.output_text.empty?
end
```
