---
title: "Function calling"
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
pageSha256: "2ba56a044f2605bebbc537fd39d6a9d45bcfd486971897dfcd5b605090ded2bb"
contentMode: "local-full"
zh: ""
---

# Function calling

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

**Function calling** (also known as **tool calling**) provides a powerful and flexible way for OpenAI models to interface with external systems and access data outside their training data. This guide shows how you can connect a model to data and actions provided by your application. We'll show how to use function tools (defined by a JSON schema) and custom tools which work with free form text inputs and outputs.

For Agents API sessions, use [Functions](https://developers.openai.com/api/docs/guides/agents-api/tools/functions) to register functions and handle session action requests. The examples in this guide show the Responses API and Chat Completions integrations.

If your application has many functions or large schemas, you can pair function calling with [tool search](https://developers.openai.com/api/docs/guides/tools-tool-search) to defer rarely used tools and load them only when the model needs them. Only `gpt-5.4` and later models support `tool_search`.

GPT-6 Astra requires the Responses API for tool calling. The Chat Completions
  examples use GPT-5.6 for compatibility. See the [migration
  guide](https://developers.openai.com/api/docs/guides/migrate-to-responses) to update an existing
  integration.

## 本篇目录

- [How it works](https://developers.openai.com/api/docs)
- [Function tool example](https://developers.openai.com/api/docs)
- [Defining functions](https://developers.openai.com/api/docs)
- [Defining namespaces](https://developers.openai.com/api/docs)
- [Tool search](https://developers.openai.com/api/docs)
- [Handling function calls](https://developers.openai.com/api/docs)
- [Additional configurations](https://developers.openai.com/api/docs)
- [Streaming](https://developers.openai.com/api/docs)
- [Custom tools](https://developers.openai.com/api/docs)
