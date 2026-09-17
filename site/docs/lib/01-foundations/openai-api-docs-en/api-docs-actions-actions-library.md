---
title: "GPT Actions library"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/actions/actions-library.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/actions/actions-library.md"
sourceSha256: "50d08031f037850bc7a99558fa83c24dd8720ad75cc809522684292b1bbd3c3c"
pageSha256: "50d08031f037850bc7a99558fa83c24dd8720ad75cc809522684292b1bbd3c3c"
contentMode: "local-full"
zh: ""
---

# GPT Actions library

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Purpose

While GPT Actions should be significantly less work for an API developer to set up than an entire application using those APIs from scratch, there’s still some set up required to get GPT Actions up and running. A Library of GPT Actions is meant to provide guidance for building GPT Actions on common applications.

## Getting started

If you’ve never built an action before, start by reading the [getting started guide](https://developers.openai.com/api/docs/actions/getting-started) first to understand better how actions work.

Generally, this guide is meant for people with familiarity and comfort with calling API calls. For debugging help, try to explain your issues to ChatGPT - and include screenshots.

## How to access

[The OpenAI Cookbook](https://developers.openai.com/cookbook) has a [directory](https://developers.openai.com/cookbook/topic/chatgpt) of 3rd party applications and middleware application.

### 3rd party Actions cookbook

GPT Actions can integrate with HTTP services directly. GPT Actions leveraging SaaS API directly will authenticate and request resources directly from SaaS providers, such as [Google Drive](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_action_google_drive) or [Snowflake](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_action_snowflake_direct).

### Middleware Actions cookbook

GPT Actions can benefit from having a middleware. It allows pre-processing, data formatting, data filtering or even connection to endpoints not exposed through HTTP (e.g: databases). Multiple middleware cookbooks are available describing an example implementation path, such as [Azure](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_middleware_azure_function), [GCP](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_middleware_google_cloud_function) and [AWS](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_middleware_aws_function).

## Give us feedback

Are there integrations that you’d like us to prioritize? Are there errors in our integrations? File a PR or issue on the cookbook page's github, and we’ll take a look.

## Contribute to our library

If you’re interested in contributing to our library, please follow the below guidelines, then submit a PR in github for us to review. In general, follow the template similar to [this example GPT Action](https://developers.openai.com/cookbook/examples/chatgpt/gpt_actions_library/gpt_action_bigquery).

Guidelines - include the following sections:

- Application Information - describe the 3rd party application, and include a link to app website and API docs
- Custom GPT Instructions - include the exact instructions to be included in a Custom GPT
- OpenAPI Schema - include the exact OpenAPI schema to be included in the GPT Action
- Authentication Instructions - for OAuth, include the exact set of items (authorization URL, token URL, scope, etc.); also include instructions on how to write the callback URL in the application (as well as any other steps)
- FAQ and Troubleshooting - what are common pitfalls that users may encounter? Write them here and workarounds

## Disclaimers

This action library is meant to be a guide for interacting with 3rd parties that OpenAI have no control over. These 3rd parties may change their API settings or configurations, and OpenAI cannot guarantee these Actions will work in perpetuity. Please see them as a starting point.

This guide is meant for developers and people with comfort writing API calls. Non-technical users will likely find these steps challenging.
