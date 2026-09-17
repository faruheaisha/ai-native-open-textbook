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
sourceRel: "api/docs/guides/migrate-to-responses.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/migrate-to-responses.md"
sourceSha256: "418a01fec7cbfbdaef2ab472f11c2144b33de5e3007b8b68aa65db3ee85c7a10"
pageSha256: "b0d925d3dee85fd182e0ea95df2c02b5ba415dad9a71edd6fd26349bf7c7a63e"
contentMode: "local-full"
zh: ""
---

## Responses benefits

The Responses API contains several benefits over Chat Completions:

- **Better performance**: Using reasoning models, like GPT-5, with Responses will result in better model intelligence when compared to Chat Completions. Our internal evals reveal a 3% improvement in SWE-bench with same prompt and setup.
- **Agentic by default**: The Responses API is an agentic loop, allowing the model to call multiple tools, like `web_search`, `image_generation`, `file_search`, `code_interpreter`, remote MCP servers, as well as your own custom functions, within the span of one API request.
- **Lower costs**: Results in lower costs due to improved cache utilization (40% to 80% improvement when compared to Chat Completions in internal tests).
- **Stateful context**: Use `store: true` to maintain state from turn to turn, preserving reasoning and tool context from turn-to-turn.
- **Flexible inputs**: Pass a string with input or a list of messages; use instructions for system-level guidance.
- **Encrypted reasoning**: Opt-out of statefulness while still benefiting from advanced reasoning.
- **Future-proof**: Future-proofed for upcoming models.

| Capabilities        | Chat Completions API  | Responses API         |
| ------------------- | --------------------- | --------------------- |
| Text generation     | | |
| Audio               | | Coming soon           |
| Vision              | | |
| Structured Outputs  | | |
| Function calling    | | |
| Web search          | | |
| File search         | | |
| Computer use        | | |
| Code interpreter    | | |
| MCP                 | | |
| Image generation    | | |
| Reasoning summaries | | |

### Examples

See how the Responses API compares to the Chat Completions API in specific scenarios.

#### Messages vs. Items

Both APIs make it easy to generate output from our models. The input to, and result of, a call to Chat completions is an array of _Messages_, while
the Responses API uses _Items_. An Item is a union of many types, representing the range of possibilities
of model actions. A `message` is a type of Item, as is a `function_call` or `function_call_output`. Unlike a Chat Completions Message, where
many concerns are glued together into one object, Items are distinct from one another and better represent the basic unit of model context.

Additionally, Chat Completions can return multiple parallel generations as `choices`, using the `n` param. In Responses, we've removed this param, leaving only one generation.

  Chat Completions API

```python
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-6-astra",
    messages=[
        {
            "role": "user",
            "content": "Write a one-sentence bedtime story about a unicorn.",
        }
    ],
)

print(completion.choices[0].message.content)
```

```ruby
require "openai"

client = OpenAI::Client.new
completion = client.chat.completions.create(
  model: "gpt-6-astra",
  messages: [{role: :user, content: "Write a one-sentence bedtime story about a unicorn."}]
)
puts(completion.choices.fetch(0).message.content)
```

  Responses API

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Write a one-sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  input: "Write a one-sentence bedtime story about a unicorn."
)
puts(response.output_text)
```

When you get a response back from the Responses API, the fields differ slightly.
Instead of a `message`, you receive a typed `response` object with its own `id`.
Responses are stored by default. Chat completions are stored by default for new accounts.
To disable storage when using either API, set `store: false`.

The objects you receive back from these APIs will differ slightly. In Chat Completions, you receive an array of
`choices`, each containing a `message`. In Responses, you receive an array of Items labeled `output`.

#### Chat Completions API

```json
{
    "id": "chatcmpl-C9EDpkjH60VPPIB86j2zIhiR8kWiC",
    "object": "chat.completion",
    "created": 1756315657,
    "model": "gpt-5.5",
    "choices": [
      {
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "Under a blanket of starlight, a sleepy unicorn tiptoed through moonlit meadows, gathering dreams like dew to tuck beneath its silver mane until morning.",
          "refusal": null,
          "annotations": []
        },
        "finish_reason": "stop"
      }
    ],
    ...
}
```

#### Responses API

```json
{
    "id": "resp_68af4030592c81938ec0a5fbab4a3e9f05438e46b5f69a3b",
    "object": "response",
    "created_at": 1756315696,
    "model": "gpt-5.5",
    "output": [
      {
        "id": "rs_68af4030baa48193b0b43b4c2a176a1a05438e46b5f69a3b",
        "type": "reasoning",
        "content": [],
        "summary": []
      },
      {
        "id": "msg_68af40337e58819392e935fb404414d005438e46b5f69a3b",
        "type": "message",
        "status": "completed",
        "content": [
          {
            "type": "output_text",
            "annotations": [],
            "logprobs": [],
            "text": "Under a quilt of moonlight, a drowsy unicorn wandered through quiet meadows, brushing blossoms with her glowing horn so they sighed soft lullabies that carried every dreamer gently to sleep."
          }
        ],
        "role": "assistant"
      }
    ],
    ...
}
```

### Additional differences

- Responses are stored by default. Chat completions are stored by default for new accounts. To disable storage in either API, set `store: false`.
- [Reasoning](https://developers.openai.com/api/docs/guides/reasoning) models have a richer experience in the Responses API with [improved tool usage](https://developers.openai.com/api/docs/guides/reasoning#keeping-reasoning-items-in-context). Starting with GPT-5.4, Chat Completions does not support tool calling with `reasoning_effort` values other than `none`.
- Structured Outputs API shape is different. Instead of `response_format`, use `text.format` in Responses. Learn more in the [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) guide.
- The function-calling API shape is different, both for the function config on the request, and function calls sent back in the response. See the full difference in the [function calling guide](https://developers.openai.com/api/docs/guides/function-calling).
- The Responses SDK has an `output_text` helper, which the Chat Completions SDK does not have.
- In Chat Completions, conversation state must be managed manually. The Responses API has compatibility with the [Conversations API](https://developers.openai.com/api/docs/guides/conversation-state?api-mode=responses#using-the-conversations-api) for persistent conversations, or the ability to pass a `previous_response_id` to easily chain Responses together.
