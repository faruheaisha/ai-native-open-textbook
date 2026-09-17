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
sourceRel: "api/docs/guides/latest-model/gpt-5.4.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/latest-model/gpt-5.4.md"
sourceSha256: "bbf8fc52c2fd49a6a367f4e1a04491b281f706c5c1b608e99868136bbc73e71a"
pageSha256: "676c353077e254139fc918a07d2173e3ba5f1f790949c6c56400c308705eb65e"
contentMode: "local-full"
zh: ""
---

## Migration quickstart

GPT-5.4 works best with the Responses API, which supports preserving reasoning context between turns to improve performance. Read below to migrate from your current model or API.

### Migrating from other models to GPT-5.4

Use the [OpenAI Docs
  skill](https://github.com/openai/skills/tree/main/skills/.system/openai-docs)
  when migrating existing prompts or workflows to GPT-5.4. It's available in our
  public skills repository and the Codex desktop app.

While the model should be close to a drop-in replacement for GPT-5.2, there are a few key changes to call out. See [Prompt guidance for GPT-5.4](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.4#prompting-best-practices) for specific updates to make in your prompts.

Using GPT-5 models with the Responses API provides improved intelligence because of the API design. The Responses API can pass the previous turn's CoT to the model. This leads to fewer generated reasoning tokens, higher cache hit rates, and less latency. To learn more, see an [in-depth guide](https://developers.openai.com/cookbook/examples/responses_api/reasoning_items) on the benefits of the Responses API.

When migrating to GPT-5.4 from an older OpenAI model, start by experimenting with reasoning levels and prompting strategies. Use the [prompt optimizer](https://platform.openai.com/chat/edit?models=gpt-5.4&optimize=true) to update your prompts for GPT-5.4 based on current best practices, then follow this model-specific guidance:

- **`gpt-5.2`**: `gpt-5.4` with default settings is meant to be a drop-in replacement.
- **o3**: `gpt-5.4` with `medium` or `high` reasoning. Start with `medium` reasoning with prompt tuning, then increase to `high` if you aren't getting the results you want.
- **`gpt-4.1`**: `gpt-5.4` with `none` reasoning. Start with `none` and tune your prompts; increase if you need better performance.
- **`o4-mini` or `gpt-4.1-mini`**: `gpt-5.4-mini` with prompt tuning is a great replacement.
- **`gpt-4.1-nano`**: `gpt-5.4-nano` with prompt tuning is a great replacement.

### New `phase` parameter

For long-running or tool-heavy GPT-5.4 flows in the Responses API, use the assistant message `phase` field to avoid early stopping and other misbehavior.

`phase` is optional at the API level, but we highly recommend using it. Use `phase: "commentary"` for intermediate assistant updates (such as preambles before tool calls) and `phase: "final_answer"` for the completed answer. Do not add `phase` to user messages.

If you use `previous_response_id`, that is usually the simplest path because
  prior assistant state is preserved. If you replay assistant history manually,
  preserve each original `phase` value.

Missing or dropped `phase` can cause preambles to be treated as final answers
in those workflows. For additional guidance and examples, see the [GPT-5.4
prompting guide](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.4#phase-parameter).

Round-trip assistant phase values

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.4",
  input: [
    {
      role: "assistant",
      phase: "commentary",
      content:
        "I’ll inspect the logs and then summarize root cause and remediation.",
    },
    {
      role: "assistant",
      phase: "final_answer",
      content: "Root cause: cache invalidation race.",
    },
    {
      role: "user",
      content: "Great—now give me a rollout-safe fix plan.",
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input=[
        {
            "role": "assistant",
            "phase": "commentary",
            "content": "I’ll inspect the logs and then summarize root cause and remediation.",
        },
        {
            "role": "assistant",
            "phase": "final_answer",
            "content": "Root cause: cache invalidation race.",
        },
        {
            "role": "user",
            "content": "Great—now give me a rollout-safe fix plan.",
        },
    ],
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
	commentary := responses.ResponseInputItemParamOfMessage(
		"I’ll inspect the logs and then summarize root cause and remediation.",
		responses.EasyInputMessageRoleAssistant,
	)
	commentary.OfMessage.Phase = responses.EasyInputMessagePhaseCommentary
	finalAnswer := responses.ResponseInputItemParamOfMessage(
		"Root cause: cache invalidation race.",
		responses.EasyInputMessageRoleAssistant,
	)
	finalAnswer.OfMessage.Phase = responses.EasyInputMessagePhaseFinalAnswer

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-5.4",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			commentary,
			finalAnswer,
			responses.ResponseInputItemParamOfMessage("Great—now give me a rollout-safe fix plan.", responses.EasyInputMessageRoleUser),
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
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.ResponseCreateParams;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-5.4")
        .input("Explain the bug and propose a fix.")
        .reasoning(Reasoning.builder().effort(ReasoningEffort.MEDIUM).build())
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
response = client.responses.create(
  model: "gpt-5.4",
  reasoning: {effort: :medium},
  input: "Explain the bug and propose a fix."
)
puts(response.output_text)
```

### GPT-5.4 parameter compatibility

The following parameters are **only supported** when using GPT-5.4 with reasoning effort set to `none`:

- `temperature`
- `top_p`
- `logprobs`

Requests that include these fields will raise an error for GPT-5.4 or GPT-5.2 with any other reasoning effort setting, or for older GPT-5 models such as `gpt-5`, `gpt-5-mini`, or `gpt-5-nano`.

To achieve similar results with reasoning effort set higher, or with another GPT-5 family model, try these alternative parameters:

- **Reasoning depth:** `reasoning: \{ effort: "none" | "low" | "medium" | "high" | "xhigh" \}`
- **Output verbosity:** `text: \{ verbosity: "low" | "medium" | "high" \}`
- **Output length:** `max_output_tokens`

### Migrating from Chat Completions to Responses API

The biggest difference, and main reason to migrate from Chat Completions to the Responses API for GPT-5.4, is support for passing chain of thought (CoT) between turns. See a full [comparison of the APIs](https://developers.openai.com/api/docs/guides/migrate-to-responses).

Passing CoT exists only in the Responses API, and we've seen improved intelligence, fewer generated reasoning tokens, higher cache hit rates, and lower latency as a result of doing so. Most other parameters remain at parity, though the formatting is different. Here's how new parameters are handled differently between Chat Completions and the Responses API:

**Reasoning effort**

Responses API

    Generate response with reasoning effort set to none

```bash
curl --request POST \
  --url https://api.openai.com/v1/responses \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "input": "How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
  "reasoning": {
    "effort": "none"
  }
}'
```

  

  

    
Chat Completions

    Generate response with reasoning effort set to none

```bash
curl --request POST \
  --url https://api.openai.com/v1/chat/completions \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "user",
      "content": "How much gold would it take to coat the Statue of Liberty in a 1mm layer?"
    }
  ],
  "reasoning_effort": "none"
}'
```

**Verbosity**

Responses API

    Control verbosity

```bash
curl --request POST \
  --url https://api.openai.com/v1/responses \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "input": "What is the answer to the ultimate question of life, the universe, and everything?",
  "text": {
    "verbosity": "low"
  }
}'
```

  

  

    
Chat Completions

    Control verbosity

```bash
curl --request POST \
  --url https://api.openai.com/v1/chat/completions \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "user",
      "content": "What is the answer to the ultimate question of life, the universe, and everything?"
    }
  ],
  "verbosity": "low"
}'
```

**Custom tools**

Responses API

    Custom tool call

```bash
curl --request POST \
  --url https://api.openai.com/v1/responses \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "input": "Use the code_exec tool to calculate the area of a circle with radius equal to the number of r letters in blueberry",
  "tools": [
    {
      "type": "custom",
      "name": "code_exec",
      "description": "Executes arbitrary Python code"
    }
  ]
}'
```

  

  

    
Chat Completions

    Custom tool call

```bash
curl --request POST \
  --url https://api.openai.com/v1/chat/completions \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --header "Content-type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "user",
      "content": "Use the code_exec tool to calculate the area of a circle with radius equal to the number of r letters in blueberry"
    }
  ],
  "tools": [
    {
      "type": "custom",
      "custom": {
        "name": "code_exec",
        "description": "Executes arbitrary Python code"
      }
    }
  ]
}'
```
