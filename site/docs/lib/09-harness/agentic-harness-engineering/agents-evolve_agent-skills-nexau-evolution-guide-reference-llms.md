---
title: "🧠 Core Concepts: LLM Configuration"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/agents/evolve_agent/skills/nexau-evolution-guide/reference/llms.md"
sourceRel: "agents/evolve_agent/skills/nexau-evolution-guide/reference/llms.md"
rawUrl: "/raw/09-harness/agentic-harness-engineering/agents/evolve_agent/skills/nexau-evolution-guide/reference/llms.md"
sourceSha256: "c1cfe63c615049bb1df1e4eab699f3e190250fda42000c57fa76e4786358e638"
pageSha256: "c1cfe63c615049bb1df1e4eab699f3e190250fda42000c57fa76e4786358e638"
contentMode: "local-full"
zh: ""
---

# 🧠 Core Concepts: LLM Configuration

NexAU is designed to work with any OpenAI-compatible API, giving you the flexibility to choose from a wide range of providers.

## LLM Configuration

You configure the LLM provider using the `LLMConfig` class.

#### Supported Providers

```python
from nexau.archs.llm import LLMConfig

# OpenAI
llm_config = LLMConfig(
    model="gpt-4",
    base_url="[https://api.openai.com/v1](https://api.openai.com/v1)",
    api_key="your-openai-key",
    temperature=0.7,
    max_tokens=4096
)

# Anthropic Claude (via a compatible proxy)
llm_config = LLMConfig(
    model="claude-3-sonnet-20240229",
    base_url="[https://api.anthropic.com](https://api.anthropic.com)", # or your proxy URL
    api_key="your-anthropic-key",
    temperature=0.7,
    max_tokens=4096
)

# Local/Custom endpoint (e.g., Ollama, vLLM)
llm_config = LLMConfig(
    model="custom-model",
    base_url="http://localhost:8000/v1",
    api_key="not-needed-for-local",
    temperature=0.7,
    max_tokens=4096
)
```

## Customizing LLM Calls

Advanced behaviors (logging, caching, provider routing) are implemented via middlewares that override `wrap_model_call(params, call_next)`. See [Hooks/Middleware](https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/agents/evolve_agent/skills/nexau-evolution-guide/reference/advanced-guides/hooks.md) for end-to-end examples.
