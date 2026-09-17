---
title: "Async Subagent Server"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/async-subagent-server/README.md"
sourceRel: "examples/async-subagent-server/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/async-subagent-server/README.md"
sourceSha256: "5993458ae009fdcd244d14f5f97e6ade624fb2f51a1877a930f4095c7da56188"
pageSha256: "5993458ae009fdcd244d14f5f97e6ade624fb2f51a1877a930f4095c7da56188"
contentMode: "local-full"
zh: ""
---

# Async Subagent Server

A self-hosted [Agent Protocol](https://github.com/langchain-ai/agent-protocol) server that exposes a Deep Agents researcher as an async subagent. Use this as a starting point for hosting your own agent on any infrastructure and connecting it to a Deep Agents supervisor.

The example includes both sides of the pattern:

- **`server.py`** — the FastAPI server your subagent runs on
- **`supervisor.py`** — an interactive REPL showing how to connect to it

## Prerequisites

- `ANTHROPIC_API_KEY` — required
- `TAVILY_API_KEY` — optional; stub search is used if not set

## Quickstart

**1. Install dependencies:**

```bash
cd examples/async-subagent-server
uv sync
```

**2. Set up your environment:**

```bash
cp .env.example .env
# fill in ANTHROPIC_API_KEY (and optionally TAVILY_API_KEY)
```

**3. Start the server:**

```bash
uv run uvicorn server:app --port 2024
```

**4. In another terminal, start the supervisor:**

```bash
cd examples/async-subagent-server
ANTHROPIC_API_KEY=... uv run python supervisor.py
```

Try these prompts:

```
> research the latest developments in quantum computing
