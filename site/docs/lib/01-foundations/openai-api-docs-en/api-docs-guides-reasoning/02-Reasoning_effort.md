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
pageSha256: "38522ededdbcc117bf7a69ddc72ea2d82e2700cfea92daeb69e27c34834cd0e8"
contentMode: "local-full"
zh: ""
---

## Reasoning effort

The `reasoning.effort` parameter guides the model on how much to think when performing a task.

Supported values are model-dependent and can include `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`. Lower effort favors speed and lower token usage, while at higher effort the model thinks more completely to provide higher quality responses. The models also reason adaptively across reasoning efforts, using fewer tokens for simpler tasks and thinking harder for complex tasks.

[GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) does not support `none` reasoning
  effort. Setting `reasoning.effort` (Responses) or `reasoning_effort` (Chat
  Completions) to `none` returns HTTP 400.

Use the [Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses) for function
calling. Chat Completions does not support function calling with GPT-6 Astra.

Defaults are also model-dependent rather than universal. `gpt-5.5` defaults to `medium` reasoning effort. This is the best starting point for `gpt-5.5`’s full balance of quality, reliability and performance.

| Effort   | Best for                                                                                                                                                                                                                                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`   | Latency-critical tasks that do not benefit from any reasoning or multi-chained tool calls. For latency-sensitive use cases with `gpt-5.5`, we recommend trying `low` to begin with and then moving to `none` if required.<br /><br />Common use cases include voice, fast information retrieval, and classification.                                                 |
| `low`    | Efficient reasoning with a modest latency increase. Ideal for use cases requiring tool-use, planning, search, or multi-step decision making, while optimizing for speed and cost.<br /><br />Common use cases include data analysis, drafting, execution-oriented coding, and customer support / chat assistant workflows.                                           |
| `medium` | When quality and reliability matter, and the task involves planning, complex reasoning, and judgement. Default configuration for most workloads, and a well-balanced point on the pareto curve of latency, performance and cost.<br /><br />Common use cases include agentic coding, research, working with spreadsheets & slides, and delegating long-horizon work. |
| `high`   | Hard reasoning, complex debugging, deep planning, and high-value tasks where quality and intelligence matters more than latency. Recommended for complex workflows and agentic tasks.<br /><br />Common use cases include agentic coding, long-horizon research, and knowledge work. Depending on the complexity of the task, evaluate both `medium` and `high`.     |
| `xhigh`  | Deep research, asynchronous workflows and agentic tasks that require long runs. Only use when your evals show a clear benefit that justifies the extra latency and cost.<br /><br />Common use cases include security and code review, enterprise productivity, deeper research tasks, and challenging coding workflows.                                             |
| `max`    | Maximum reasoning for your most complex tasks. If you are currently using `xhigh`, evaluate if `max` results in stronger performance                                                                                                                                                                                                                                 |

For faster time to first visible token in latency-sensitive applications, ask the model to generate a short preamble before continuing with deeper reasoning.

Some models support only a subset of these values, so check the relevant [model page](https://developers.openai.com/api/docs/models) before choosing a setting.
