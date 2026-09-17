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
pageSha256: "7da2bb7577ba2e80621038abf5a01d25abd962238d471fa86340ff81717730aa"
contentMode: "local-full"
zh: ""
---

## Get started with reasoning

Call the [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) and specify your reasoning model and reasoning effort:

Using a reasoning model in the Responses API

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const prompt = `
Write a bash script that takes a matrix represented as a string with
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
`;

const response = await openai.responses.create({
  model: "gpt-6-astra",
  reasoning: { effort: "low" },
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

console.log(response.output_text);
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
    reasoning={"effort": "low"},
    input=[{"role": "user", "content": prompt}],
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
	prompt := `Write a bash script that takes a matrix represented as a string with
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.`

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Reasoning: responses.ReasoningParam{
			Effort: responses.ReasoningEffortLow,
		},
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt),
		},
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
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.ResponseCreateParams;

String prompt =
    """
    Write a bash script that takes a matrix represented as a string with format
    '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
    """
        .strip();

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input(prompt)
        .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
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

string prompt =
    """
    Write a bash script that takes a matrix represented as a string with format
    '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
    """;
CreateResponseOptions options = new()
{
    Model = "gpt-6-astra",
    ReasoningOptions = new ResponseReasoningOptions
    {
        ReasoningEffortLevel = ResponseReasoningEffortLevel.Low,
    },
};
options.InputItems.Add(ResponseItem.CreateUserMessageItem(prompt));

ResponseResult response = await client.CreateResponseAsync(options);

Console.WriteLine(response.GetOutputText());
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
  reasoning: {effort: :low},
  input: prompt
)

puts(response.output_text)
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "reasoning": {"effort": "low"},
    "input": [
      {
        "role": "user",
        "content": "Write a bash script that takes a matrix represented as a string with format \"[1,2],[3,4],[5,6]\" and prints the transpose in the same format."
      }
    ]
  }'
```
