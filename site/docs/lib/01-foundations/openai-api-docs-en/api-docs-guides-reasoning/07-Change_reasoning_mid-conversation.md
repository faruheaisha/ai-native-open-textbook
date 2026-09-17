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
pageSha256: "d7f612adbcdcbbb6941efb69be3703ede81e66f8b86632cd249824a035c3ae3d"
contentMode: "local-full"
zh: ""
---

## Change reasoning mid-conversation

Use `configuration_update` to increase reasoning effort for difficult work or reduce it for routine follow-ups. Add the update between responses while leaving the request-level `reasoning.effort` unchanged. This preserves the original prompt prefix for [prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching).

Configuration updates are supported only by GPT-6 Astra (`gpt-6-astra`) in
  standard, single-agent mode. They change only reasoning effort.

Add the following item before the next user message in the `input` array of an HTTP Responses request or a WebSocket `response.create` request:

```json
{
  "type": "configuration_update",
  "reasoning": {
    "effort": "high"
  }
}
```

For example, if the conversation starts with request-level effort `low`, this update selects `high` for the next response and subsequent responses until another update overrides it.

Increase reasoning effort for a follow-up

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const model = "gpt-6-astra";

const first = await client.responses.create({
  model,
  reasoning: { effort: "low" },
  input: "Draft a database migration plan.",
});

const next = await client.responses.create({
  model,
  reasoning: { effort: "low" },
  previous_response_id: first.id,
  input: [
    { type: "configuration_update", reasoning: { effort: "high" } },
    {
      role: "user",
      content: "Analyze the failure modes and propose rollback steps.",
    },
  ],
});
console.log(next.output_text);
```

```python
from openai import OpenAI

client = OpenAI()
model = "gpt-6-astra"

response = client.responses.create(
    model=model,
    reasoning={"effort": "low"},
    input="Draft a database migration plan.",
    store=True,
)
print(response.output_text)

response = client.responses.create(
    model=model,
    previous_response_id=response.id,
    reasoning={"effort": "low"},
    input=[
        {
            "type": "configuration_update",
            "reasoning": {"effort": "high"},
        },
        {
            "role": "user",
            "content": "Analyze the failure modes and propose rollback steps.",
        },
    ],
    store=True,
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
	"github.com/openai/openai-go/v3/shared"
)

func main() {
	client := openai.NewClient()
	ctx := context.Background()
	first, err := client.Responses.New(ctx, responses.ResponseNewParams{
		Store:     openai.Bool(true),
		Model:     "gpt-6-astra",
		Reasoning: shared.ReasoningParam{Effort: shared.ReasoningEffortLow},
		Input:     responses.ResponseNewParamsInputUnion{OfString: openai.String("Draft a database migration plan.")},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(first.OutputText())
	response, err := client.Responses.New(ctx, responses.ResponseNewParams{
		Model:              "gpt-6-astra",
		PreviousResponseID: openai.String(first.ID),
		// Keep the original request-level setting; the item updates the conversation.
		Reasoning: shared.ReasoningParam{Effort: shared.ReasoningEffortLow},
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			{OfConfigurationUpdate: &responses.ResponseConfigurationUpdateItemParam{
				Reasoning: responses.ResponseConfigurationUpdateItemParamReasoning{Effort: shared.ReasoningEffortHigh},
			}},
			responses.ResponseInputItemParamOfMessage("Analyze the failure modes and propose rollback steps.", responses.EasyInputMessageRoleUser),
		}},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.OutputText())
}
```

```java
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseConfigurationUpdateItemParam;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.List;

Response first =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .store(true)
                .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
                .input("Draft a database migration plan.")
                .build());
Response response =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .previousResponseId(first.id())
                // Keep the original request-level setting; the item updates the conversation.
                .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
                .inputOfResponse(
                    List.of(
                        ResponseInputItem.ofConfigurationUpdate(
                            ResponseConfigurationUpdateItemParam.builder()
                                .reasoning(
                                    ResponseConfigurationUpdateItemParam.Reasoning.builder()
                                        .effort(ReasoningEffort.HIGH)
                                        .build())
                                .build()),
                        ResponseInputItem.ofEasyInputMessage(
                            EasyInputMessage.builder()
                                .role(EasyInputMessage.Role.USER)
                                .content(
                                    "Analyze the failure modes and propose rollback steps.")
                                .build())))
                .build());
response.output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
first = client.responses.create(
  model: "gpt-6-astra",
  store: true,
  reasoning: OpenAI::Models::Reasoning.new(effort: :low),
  input: "Draft a database migration plan."
)
puts(first.output_text)
response = client.responses.create(
  model: "gpt-6-astra",
  previous_response_id: first.id,
  # Keep the original request-level setting; the item updates the conversation.
  reasoning: OpenAI::Models::Reasoning.new(effort: :low),
  input: [
    OpenAI::Models::Responses::ResponseConfigurationUpdateItemParam.new(
      reasoning: OpenAI::Models::Responses::ResponseConfigurationUpdateItemParam::Reasoning.new(
        effort: :high
      )
    ),
    OpenAI::Models::Responses::EasyInputMessage.new(
      role: :user,
      content: "Analyze the failure modes and propose rollback steps."
    )
  ]
)
puts(response.output_text)
```

Preserve updates with `previous_response_id`, or replay them in their original positions when [managing conversation history manually](https://developers.openai.com/api/docs/guides/conversation-state#manually-manage-conversation-state). The response's `reasoning.effort` continues to report the request-level setting, not the effort selected by the update.

Do not place two `configuration_update` items directly next to each other in the conversation history; the API rejects adjacent updates.

Do not combine configuration updates with automatic compaction or automatic truncation. The standalone `/responses/compact` endpoint also rejects histories containing these updates.

You can still explicitly compact history by including a `compaction_trigger` item in a `/responses` request. After compaction, add a fresh `configuration_update` with the desired effort before the next user message.

Normal prompt caching requirements still apply. To send user instructions while a response is running, use [Mid-turn steering](https://developers.openai.com/api/docs/guides/steering).
