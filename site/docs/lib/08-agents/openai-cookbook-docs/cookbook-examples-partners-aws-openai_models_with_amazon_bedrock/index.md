---
title: "Getting Started with OpenAI Models on Amazon Bedrock"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/aws/openai_models_with_amazon_bedrock.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/aws/openai_models_with_amazon_bedrock.md"
sourceSha256: "dc2d616a3e8a977b0dc8a6774677aafd9d469e862410a55c90e90e1c11b30a98"
pageSha256: "ec43ef5b80e76820ae12982dcc683d302534b83c64ad6c21cd822facae0402ac"
contentMode: "local-full"
zh: ""
---

# Getting Started with OpenAI Models on Amazon Bedrock

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

OpenAI models on Amazon Bedrock expose an OpenAI-compatible Responses API surface for production workflows that need text generation, structured outputs, application tools, direct file inputs, response state, prompt caching, and background work. This cookbook keeps the examples concrete by building a support-assistant workflow for **BrightCart**, a fictional retailer handling delayed and damaged-order replacement requests.

You will use the OpenAI Python SDK for normal application calls and a small raw HTTPS helper when it is useful to inspect the exact request body. The flow starts with setup and a minimal preflight, then layers on response lifecycle, model controls, structured JSON, application tools, file input, state management, caching, background processing, context compaction, operations checks, and cleanup.

You will learn how to:

1. Configure a Bedrock-hosted OpenAI model with Bedrock-specific environment variables.
2. Verify the Responses endpoint and inspect response schema, usage metadata, and normalized errors.
3. Send text requests with both raw HTTPS and the OpenAI SDK.
4. Generate schema-constrained JSON and lighter JSON-mode handoffs.
5. Call application-managed function tools, parallel tools, and custom text tools.
6. Send a direct PDF input, continue stateful and stateless conversations, and carry encrypted reasoning context.
7. Use prompt caching, background mode, compaction, operational smoke checks, and stored-response cleanup.

Prerequisites: a bearer token for OpenAI models on Amazon Bedrock, Python 3.9 or newer, and network access to your Bedrock OpenAI-compatible endpoint.

This guide runs `openai.gpt-5.4` in `us-west-2` by default. To use another supported pairing, change `AWS_REGION`, `BEDROCK_MODEL`, and `BEDROCK_BASE_URL` together before running the setup cells.

| AWS Region | Supported model IDs |
| --- | --- |
| `us-west-2` | `openai.gpt-5.4` |
| `us-east-2` | `openai.gpt-5.5`, `openai.gpt-5.4` |

## 本篇目录

- [1. Configure Amazon Bedrock](https://developers.openai.com/cookbook)
- [2. Make Your First Responses Requests](https://developers.openai.com/cookbook)
- [3. Generate Structured JSON](https://developers.openai.com/cookbook)
- [4. Add Application-Managed Tools](https://developers.openai.com/cookbook)
- [5. Send Direct File Input](https://developers.openai.com/cookbook)
- [6. Manage Conversation State](https://developers.openai.com/cookbook)
- [7. Use Prompt Caching](https://developers.openai.com/cookbook)
- [8. Run Background Work](https://developers.openai.com/cookbook)
- [9. Compact Long-Running Context](https://developers.openai.com/cookbook)
- [10. Run Operational Smoke Checks](https://developers.openai.com/cookbook)
- [11. Clean Up and Review Results](https://developers.openai.com/cookbook)
