---
title: "Model provider examples"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/model_providers/README.md"
sourceRel: "examples/model_providers/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/model_providers/README.md"
sourceSha256: "552abb3a275dbda3f405bdaa6dab2d8936a6c109e9ddcc712efead2dd19d545f"
pageSha256: "552abb3a275dbda3f405bdaa6dab2d8936a6c109e9ddcc712efead2dd19d545f"
contentMode: "local-full"
zh: ""
---

# Model provider examples

The examples in this directory show how to route models through adapter layers such as LiteLLM and
any-llm. The default examples all use OpenRouter so you only need one API key:

```bash
export OPENROUTER_API_KEY="..."
```

Run one of the adapter examples:

```bash
uv run examples/model_providers/any_llm_provider.py
uv run examples/model_providers/any_llm_auto.py
uv run examples/model_providers/litellm_provider.py
uv run examples/model_providers/litellm_auto.py
```

Direct-model examples let you override the target model:

```bash
uv run examples/model_providers/any_llm_provider.py --model openrouter/openai/gpt-5.4-mini
uv run examples/model_providers/litellm_provider.py --model openrouter/openai/gpt-5.4-mini
```
