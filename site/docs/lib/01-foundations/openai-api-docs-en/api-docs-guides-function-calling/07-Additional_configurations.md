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
pageSha256: "c6d52519dd3e2d62f8435ae040e16ac05e9c2b6e9c2cb758ef1ad09be385387e"
contentMode: "local-full"
zh: ""
---

## Additional configurations

### Tool choice

By default the model will determine when and how many tools to use. You can force specific behavior with the `tool_choice` parameter.

1. **Auto:** (_Default_) Call zero, one, or multiple functions. `tool_choice: "auto"`
1. **Required:** Call one or more functions.
   `tool_choice: "required"`
1. **Forced Function:** Call exactly one specific function.
   `tool_choice: \{"type": "function", "name": "get_weather"\}`
1. **Allowed tools:** Restrict the tool calls the model can make to a subset of
   the tools available to the model.

**When to use `allowed_tools`**

You might want to configure an `allowed_tools` list in case you want to make only
a subset of tools available across model requests, but not modify the list of tools you pass in, so you can maximize savings from [prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching).

```json
"tool_choice": {
    "type": "allowed_tools",
    "mode": "auto",
    "tools": [
        { "type": "function", "name": "get_weather" },
        { "type": "function", "name": "search_docs" }
    ]
  }
}
```

You can also set `tool_choice` to `"none"` to imitate the behavior of passing no functions.

When you use tool search, `tool_choice` still applies to the tools that are currently callable in the turn. This is most useful after you load a subset of tools and want to constrain the model to that subset.

### Parallel function calling

On supported models beginning with GPT-5, functions can be called in parallel
  when [built-in tools](https://developers.openai.com/api/docs/guides/tools) are also available. Built-in
  tools cannot be included in a parallel function-call batch.

The model may choose to call multiple functions in a single turn. You can prevent this by setting `parallel_tool_calls` to `false`, which ensures exactly zero or one tool is called.

**Note:** Currently, if you are using a fine tuned model and the model calls multiple functions in one turn then [strict mode](#strict-mode) will be disabled for those calls.

**Note for `gpt-4.1-nano-2025-04-14`:** This snapshot of `gpt-4.1-nano` can sometimes include multiple tool calls for the same tool if parallel tool calls are enabled. It is recommended to disable this feature when using this snapshot.

### Strict mode

Setting `strict` to `true` will ensure function calls reliably adhere to the function schema, instead of being best effort. We recommend always enabling strict mode.

Under the hood, strict mode works by leveraging our [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) feature and therefore introduces a couple requirements:

1. `additionalProperties` must be set to `false` for each object in the `parameters`.
1. All fields in `properties` must be marked as `required`.

You can denote optional fields by adding `null` as a `type` option (see example below).

If you send `strict: true` and your schema does not meet the requirements above,
the request will be rejected with details about the missing constraints. If
you omit `strict`, the default depends on the API: Responses requests will
attempt to normalize your schema into strict mode when possible, and will fall
back to non-strict, best-effort function calling if the schema cannot be made
compatible with strict mode. When fallback happens, the response tool will show
`strict: false`. Chat Completions requests remain non-strict by default. To opt
out of strict mode in Responses and keep non-strict, best-effort function
calling, explicitly set `strict: false`.

Strict mode enabled

```json
{
    "type": "function",
    "name": "get_weather",
    "description": "Retrieves current weather for the given location.",
    //highlight-start
    "strict": true,
    //highlight-end
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City and country e.g. Bogotá, Colombia"
            },
            "units": {
                //highlight-start
                "type": ["string", "null"],
                //highlight-end
                "enum": ["celsius", "fahrenheit"],
                "description": "Units the temperature will be returned in."
            }
        },
        //highlight-start
        "required": ["location", "units"],
        "additionalProperties": false
        //highlight-end
    }
}
```

  

  

    
Strict mode disabled

```json
{
    "type": "function",
    "name": "get_weather",
    "description": "Retrieves current weather for the given location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City and country e.g. Bogotá, Colombia"
            },
            "units": {
                //highlight-start
                "type": "string",
                //highlight-end
                "enum": ["celsius", "fahrenheit"],
                "description": "Units the temperature will be returned in."
            }
        },
        //highlight-start
        "required": ["location"],
        //highlight-end
    }
}
```

All schemas generated in the
  [playground](https://platform.openai.com/playground) have strict mode enabled.

While we recommend you enable strict mode, it has a few limitations:

1. Some features of JSON schema are not supported. (See [supported schemas](https://developers.openai.com/api/docs/guides/structured-outputs?context=with_parse#supported-schemas).)

Specifically for fine tuned models:

1. Schemas undergo additional processing on the first request (and are then cached). If your schemas vary from request to request, this may result in higher latencies.
2. Schemas are cached for performance, and are not eligible for [zero data retention](https://developers.openai.com/api/docs/models#how-we-use-your-data).
