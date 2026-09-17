---
title: "deploy-gtm-agent"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-gtm-agent/README.md"
sourceRel: "examples/deploy-gtm-agent/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/deploy-gtm-agent/README.md"
sourceSha256: "09db4d94e3d49c2dca1c839d7b96b5426dd22e3a61e7dd0a7be63e6bd755807a"
pageSha256: "09db4d94e3d49c2dca1c839d7b96b5426dd22e3a61e7dd0a7be63e6bd755807a"
contentMode: "local-full"
zh: ""
---

# deploy-gtm-agent

A go-to-market strategy agent deployed with `deepagents deploy`. Given a product or feature, it coordinates a **sync** market-researcher subagent and an **async** content-writer subagent to produce a full GTM plan with supporting marketing materials.

This example demonstrates the sync/async subagent pattern: market research blocks on results before strategy is written, while content creation runs in the background and is integrated when ready.

## Prerequisites

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Model access (gpt-5.4-nano) |
| `LANGSMITH_API_KEY` | Required for deploy |

Copy `.env` and fill in your keys.

## Deploy

```bash
deepagents deploy
```

The subagents defined under `subagents/` are automatically discovered and wired in at deploy time.

## What to try

Once deployed, open the agent in LangSmith and send it prompts like:

- `"We're launching a new Python SDK for AI agents next month — build me a GTM plan"`
- `"Help us position our vector database product against Pinecone and Weaviate"`
- `"We're targeting mid-market engineering teams — what channels should we prioritize?"`

The agent will kick off market research, synthesize a strategy, and produce content briefs in parallel.

## Query via SDK

```python
from langgraph_sdk import get_client
