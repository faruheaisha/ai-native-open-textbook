---
title: "deploy-mcp-docs-agent"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-mcp-docs-agent/README.md"
sourceRel: "examples/deploy-mcp-docs-agent/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/deploy-mcp-docs-agent/README.md"
sourceSha256: "eee863f8b7fc0a933dc44875189004fc2cbee1904d4655ce0c5becbc99d98c89"
pageSha256: "eee863f8b7fc0a933dc44875189004fc2cbee1904d4655ce0c5becbc99d98c89"
contentMode: "local-full"
zh: ""
---

# deploy-mcp-docs-agent

A documentation research agent deployed with `deepagents deploy`. It answers developer questions about LangChain, LangGraph, and Deep Agents by searching the live docs via MCP before relying on general knowledge.

## Prerequisites

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude model access |
| `LANGSMITH_API_KEY` | Required for deploy |

## Deploy

```bash
deepagents deploy
```

MCP servers are now workspace-level resources. Register the LangChain docs server once, then reference it in `tools.json`:

```bash
deepagents mcp-servers add --url https://docs.langchain.com/mcp --name docs-langchain
```

## What to try

Once deployed, open the agent in LangSmith and ask it questions like:

- `"How do I configure memory in Deep Agents?"`
- `"What's the difference between sync and async subagents?"`
- `"Show me how to add an MCP server to deepagents.toml"`
- `"What models are supported for deploy?"`

The agent always searches the docs first and cites the page it found the answer on.

## Query via SDK

```python
from langgraph_sdk import get_client
