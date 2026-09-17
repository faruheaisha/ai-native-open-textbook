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
pageSha256: "030e8a25a4aedb18263d0546992808df87d9b58aec3ccb68f490749f57eac726"
contentMode: "local-full"
zh: ""
---

## Streaming

You can use streaming to process model responses or function call arguments as they are being generated, and parse them as structured data.

That way, you don't have to wait for the entire response to complete before handling it.
This is particularly useful if you would like to display JSON fields one by one, or handle function call arguments as soon as they are available.

We recommend relying on the SDKs to handle streaming with Structured Outputs.

```javascript
import { OpenAI } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const EntitiesSchema = z.object({
  attributes: z.array(z.string()),
  colors: z.array(z.string()),
  animals: z.array(z.string()),
});

const openai = new OpenAI();
const stream = openai.responses
  .stream({
    model: "gpt-6-astra",
    input: [
      { role: "user", content: "What's the weather like in Paris today?" },
    ],
    text: {
      format: zodTextFormat(EntitiesSchema, "entities"),
    },
  })
  .on("response.refusal.delta", (event) => {
    process.stdout.write(event.delta);
  })
  .on("response.output_text.delta", (event) => {
    process.stdout.write(event.delta);
  })
  .on("response.output_text.done", () => {
    process.stdout.write("\n");
  })
  .on("error", (error) => {
    console.error(error);
  });

const result = await stream.finalResponse();

console.log(result);
```

```python
from typing import List

from openai import OpenAI
from pydantic import BaseModel

class EntitiesModel(BaseModel):
    attributes: List[str]
    colors: List[str]
    animals: List[str]

client = OpenAI()

with client.responses.stream(
    model="gpt-6-astra",
    input=[
        {"role": "system", "content": "Extract entities from the input text"},
        {
            "role": "user",
            "content": "The quick brown fox jumps over the lazy dog with piercing blue eyes",
        },
    ],
    text_format=EntitiesModel,
) as stream:
    for event in stream:
        if event.type == "response.refusal.delta":
            print(event.delta, end="")
        elif event.type == "response.output_text.delta":
            print(event.delta, end="")
        elif event.type == "response.error":
            print(event.error, end="")
        elif event.type == "response.completed":
            print("Completed")  # print(event.response.output)

    final_response = stream.get_final_response()
    print(final_response)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.core.http.StreamResponse;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseFormatTextJsonSchemaConfig;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.ResponseStreamEvent;
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
                        .content("Extract entities from the input text")
                        .build()),
                ResponseInputItem.ofEasyInputMessage(
                    EasyInputMessage.builder()
                        .role(EasyInputMessage.Role.USER)
                        .content(
                            "The quick brown fox jumps over the lazy dog with piercing blue eyes")
                        .build())))
        .text(
            ResponseTextConfig.builder()
                .format(
                    ResponseFormatTextJsonSchemaConfig.builder()
                        .name("entities")
                        .strict(true)
                        .schema(
                            ResponseFormatTextJsonSchemaConfig.Schema.builder()
                                .putAdditionalProperty("type", JsonValue.from("object"))
                                .putAdditionalProperty(
                                    "properties",
                                    JsonValue.from(
                                        Map.of(
                                            "attributes",
                                            Map.of(
                                                "type",
                                                "array",
                                                "items",
                                                Map.of("type", "string")),
                                            "colors",
                                            Map.of(
                                                "type",
                                                "array",
                                                "items",
                                                Map.of("type", "string")),
                                            "animals",
                                            Map.of(
                                                "type",
                                                "array",
                                                "items",
                                                Map.of("type", "string")))))
                                .putAdditionalProperty(
                                    "required",
                                    JsonValue.from(List.of("attributes", "colors", "animals")))
                                .putAdditionalProperty(
                                    "additionalProperties", JsonValue.from(false))
                                .build())
                        .build())
                .build())
        .build();

try (StreamResponse<ResponseStreamEvent> stream = client.responses().createStreaming(params)) {
  stream.stream()
      .forEach(
          event -> {
            event.outputTextDelta().ifPresent(delta -> System.out.print(delta.delta()));
            event.refusalDelta().ifPresent(refusal -> System.out.print(refusal.delta()));
            event.error().ifPresent(error -> System.out.println(error.message()));
            event
                .completed()
                .ifPresent(
                    completed -> {
                      System.out.println("Completed");
                      System.out.println(completed.response());
                    });
          });
}
```

```ruby
require "openai"

client = OpenAI::Client.new
entities_schema = {
  type: :object,
  properties: {
    attributes: {type: :array, items: {type: :string}},
    colors: {type: :array, items: {type: :string}},
    animals: {type: :array, items: {type: :string}}
  },
  required: %w[attributes colors animals],
  additionalProperties: false
}

stream = client.responses.stream(
  model: "gpt-6-astra",
  input: [
    {role: :system, content: "Extract entities from the input text."},
    {
      role: :user,
      content: "The quick brown fox jumps over the lazy dog with piercing blue eyes."
    }
  ],
  text: {
    format: {
      type: :json_schema,
      name: "entities",
      strict: true,
      schema: entities_schema
    }
  }
)

stream.each do |event|
  case event
  when OpenAI::Models::Responses::ResponseRefusalDeltaEvent,
       OpenAI::Models::Responses::ResponseTextDeltaEvent
    print(event.delta)
  when OpenAI::Models::Responses::ResponseErrorEvent
    warn(event.message)
  when OpenAI::Models::Responses::ResponseCompletedEvent
    puts("\nCompleted")
  end
end
```
