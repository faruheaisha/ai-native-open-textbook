---
title: "Reasoning models"
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
pageSha256: "097ec5d80afea93d06be3a4bed5a1f2aade6c8f5c48cfff7459664c08a257e14"
contentMode: "local-full"
zh: ""
---

# Reasoning models

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

**Reasoning models** use internal reasoning tokens before producing a response. This helps the model plan, use tools effectively, inspect alternatives, recover from ambiguity, and solve harder multi-step tasks. Reasoning models work especially well for complex problem solving, coding, scientific reasoning, and multi-step agentic workflows. They're also the best models for [Codex CLI](https://github.com/openai/codex), our lightweight coding agent.

Start with `gpt-6-astra` for most reasoning workloads. For lower cost, consider [`gpt-5.6-terra`](https://developers.openai.com/api/docs/models/gpt-5.6-terra), or [`gpt-5.6-luna`](https://developers.openai.com/api/docs/models/gpt-5.6-luna) for the lowest cost and latency. If you're using a GPT-5.6 model, see [reasoning mode](#reasoning-mode) for its `pro` option.

**Reasoning models work better with the [Responses
  API](https://developers.openai.com/api/docs/guides/migrate-to-responses)**. While the Chat Completions API
  is still supported, you'll get improved model intelligence and performance by
  using Responses.

## 本篇目录

- [Get started with reasoning](https://developers.openai.com/api/docs)
- [Reasoning effort](https://developers.openai.com/api/docs)
- [Reasoning mode](https://developers.openai.com/api/docs)
- [How reasoning works](https://developers.openai.com/api/docs)
- [Controlling costs](https://developers.openai.com/api/docs)
- [Preserve reasoning across calls](https://developers.openai.com/api/docs)
- [Change reasoning mid-conversation](https://developers.openai.com/api/docs)
- [Reasoning summaries](https://developers.openai.com/api/docs)
- [phase parameter](https://developers.openai.com/api/docs)
- [Advice on prompting](https://developers.openai.com/api/docs)
- [Use case examples](https://developers.openai.com/api/docs)
