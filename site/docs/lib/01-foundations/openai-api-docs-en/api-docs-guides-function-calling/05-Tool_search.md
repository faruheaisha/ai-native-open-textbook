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
pageSha256: "b1430958b66c6ceb9a072cc37ed7b614ad2c2af7d430de6de2541cda5d39ed31"
contentMode: "local-full"
zh: ""
---

## Tool search

If you need to give the model access to a large ecosystem of tools, you can defer loading some or all of those tools with `tool_search`. The `tool_search` tool lets the model search for relevant tools, add them to the model context, and then use them. Only `gpt-5.4` and later models support it. Read the [tool search guide](https://developers.openai.com/api/docs/guides/tools-tool-search) to learn more.

### Best practices for defining functions

1. **Write clear and detailed function names, parameter descriptions, and instructions.**
   - **Explicitly describe the purpose of the function and each parameter** (and its format), and what the output represents.
   - **Use the system prompt to describe when (and when not) to use each function.** Generally, tell the model _exactly_ what to do.
   - **Include examples and edge cases**, especially to rectify any recurring failures. (**Note:** Adding examples may hurt performance for [reasoning models](https://developers.openai.com/api/docs/guides/reasoning).)
   - **For deferred tools, put detailed guidance in the function description and keep the namespace description concise.** The namespace helps the model choose what to load; the function description helps it use the loaded tool correctly.

1. **Apply software engineering best practices.**
   - **Make the functions predictable and intuitive**. ([principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment))
   - **Use enums** and object structure to prevent invalid states. For example, `toggle_light(on: bool, off: bool)` allows for invalid calls.
   - **Pass the intern test.** Can an intern/human correctly use the function given nothing but what you gave the model? (If not, what questions do they ask you? Add the answers to the prompt.)

1. **Offload the burden from the model and use code where possible.**
   - **Don't make the model fill arguments you already know.** For example, if you already have an `order_id` based on a previous menu, don't include an `order_id` parameter. Instead, define `submit_refund()` with no parameters and pass the `order_id` in your code.
   - **Combine functions that are always called in sequence.** For example, if you always call `mark_location()` after `query_location()`, just move the marking logic into the query function call.

1. **Keep the number of initially available functions small for higher accuracy.**
   - **Evaluate your performance** with different numbers of functions.
   - **Aim for fewer than 20 functions available at the start of a turn** at any one time, though this is just a soft suggestion.
   - **Use tool search** to defer large or infrequently used parts of your tool surface instead of exposing everything up front.

1. **Leverage OpenAI resources.**
   - **Generate and iterate on function schemas** in the [Playground](https://platform.openai.com/playground).
   - **Consider [fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization) to increase function calling accuracy** for large numbers of functions or difficult tasks. ([cookbook](https://developers.openai.com/cookbook/examples/fine_tuning_for_function_calling))

### Token Usage

Under the hood, functions are injected into the system message in a syntax the model has been trained on. This means callable function definitions count against the model's context limit and are billed as input tokens. If you run into token limits, we suggest limiting the number of functions loaded up front, shortening descriptions where possible, or using [tool search](https://developers.openai.com/api/docs/guides/tools-tool-search) so deferred tools are loaded only when needed.

It is also possible to use [fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization#fine-tuning-examples) to reduce the number of tokens used if you have many functions defined in your tools specification.
