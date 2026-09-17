---
title: "Strands Harness SDK"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/README.md"
sourceRel: "README.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/README.md"
sourceSha256: "b4ae70e51a5b694422e20d152a3474370618944b287090eb15dcad8cb1532aaf"
pageSha256: "b4ae70e51a5b694422e20d152a3474370618944b287090eb15dcad8cb1532aaf"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

<div>
      <img src="https://strandsagents.com/latest/assets/logo-github.svg" alt="Strands Agents" width="55px" height="105px">

  <h1>
    Strands Agents
  </h1>

  <h2>
    A model-driven approach to building AI agents in just a few lines of code.
  </h2>

    
    
    
    
    
    
    
    
  
  <p>
[Documentation](https://strandsagents.com/)
    ◆ <a href="https://github.com/strands-agents/samples">Samples</a>
    ◆ <a href="https://github.com/strands-agents/tools">Tools</a>
    ◆ <a href="https://github.com/strands-agents/harness-sdk/tree/main/strands-mcp">MCP Server</a>
  </p>
</div>

Strands Agents is an open-source SDK for building and running AI agents in Python and TypeScript. Choose Strands when you would otherwise write your own agent loop: it runs in your process with no hosted control plane, and it covers the jobs a hand-rolled loop grows into. In one SDK you get [lifecycle controls](https://strandsagents.com/docs/user-guide/concepts/agents/agent-loop/) (turn limits, token budgets, cancellation, stop reasons), [tools](https://strandsagents.com/docs/user-guide/concepts/tools/) and [structured output](https://strandsagents.com/docs/user-guide/concepts/agents/structured-output/), [MCP](https://strandsagents.com/docs/user-guide/concepts/tools/mcp-tools/), [multi-agent patterns](https://strandsagents.com/docs/user-guide/concepts/multi-agent/multi-agent-patterns/), [memory](https://strandsagents.com/docs/user-guide/concepts/memory/overview/) and [sessions](https://strandsagents.com/docs/user-guide/concepts/agents/session-management/), [model portability](https://strandsagents.com/docs/user-guide/concepts/model-providers/), [streaming](https://strandsagents.com/docs/user-guide/concepts/streaming/), [guardrails](https://strandsagents.com/docs/user-guide/safety-security/guardrails/), [tracing](https://strandsagents.com/docs/user-guide/observability-evaluation/observability/), and [evals](https://strandsagents.com/docs/user-guide/evals-sdk/quickstart/).

This monorepo contains the Python SDK, TypeScript SDK, documentation site, and supporting packages:

| Directory | Description |
|-----------|-------------|
| `strands-py/` | Python SDK: agent loop, model providers, tools ([PyPI](https://pypi.org/project/strands-agents/) · [releases](https://github.com/strands-agents/harness-sdk/releases?q=python%2F&expanded=false)) |
| `strands-ts/` | TypeScript SDK: agent loop, model providers, tools ([npm](https://www.npmjs.com/package/@strands-agents/sdk) · [releases](https://github.com/strands-agents/harness-sdk/releases?q=typescript%2F&expanded=false)) |
| `site/` | Source for the [strandsagents.com](https://strandsagents.com) documentation site (Astro/Starlight) |
| `team/` | Governance and cross-SDK process docs (tenets, decisions, PR & compatibility guidelines, and `designs/` proposals) |

## Why Strands

Build an agent harness. Control it end-to-end.

- **Build your way.** Any model, any cloud. Context management, execution limits, and observability built in before you write a line of config. Swap backends when you scale; your code stays the same.
- **Model agnostic.** First-class support for Amazon Bedrock, Anthropic, OpenAI, and Gemini, plus [many more providers](https://strandsagents.com/docs/user-guide/concepts/model-providers/) and custom ones.
- **Stay in control.** The agent loop traces every decision by default. Hooks let you intercept any step to log it, validate it, or redirect it.
- **Deliver outcomes that work.** Guardrails catch mistakes before they run. Steering handlers let agents correct themselves instead of failing silently.

MCP, streaming, multi-agent patterns, and structured output are all built in.

## Quick Start

Both SDKs default to the Amazon Bedrock model provider, so you'll need AWS credentials configured and model access enabled for Claude Sonnet. The [Quickstart Guide](https://strandsagents.com/docs/user-guide/quickstart/overview/) covers configuring other providers (Anthropic, OpenAI, Gemini, Ollama, and more).

### Python

Requires Python 3.10+:

```bash
pip install strands-agents strands-agents-tools
```

```python
from strands import Agent
from strands_tools import calculator

agent = Agent(tools=[calculator])
agent("What is the square root of 1764")
```

The [Python SDK README](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/strands-py/README.md) covers tools, model providers, MCP, and bidirectional streaming.

### TypeScript

Requires Node.js 22+:

```bash
npm install @strands-agents/sdk
```

```typescript
import { Agent } from '@strands-agents/sdk'

const agent = new Agent()
const result = await agent.invoke('What is the square root of 1764?')
console.log(result)
```

More in the [TypeScript SDK README](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/strands-ts/README.md), including Zod-typed tools, structured output, and multi-agent patterns.

## Documentation

For detailed guidance & examples, explore our documentation:

- [User Guide](https://strandsagents.com/)
- [Quick Start Guide](https://strandsagents.com/docs/user-guide/quickstart/overview/)
- [Agent Loop](https://strandsagents.com/docs/user-guide/concepts/agents/agent-loop/)
- [Examples](https://strandsagents.com/docs/examples/)
- API Reference: [Python](https://strandsagents.com/docs/api/python/strands.agent.agent/) · [TypeScript](https://strandsagents.com/docs/api/typescript/)
- [Production & Deployment Guide](https://strandsagents.com/docs/user-guide/deploy/operating-agents-in-production/)

The docs themselves live in this monorepo under [`site/`](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/README.md), and doc PRs are welcome alongside code changes.

## Development

Git operations (commits, branches, PRs) are done from the repo root. Each package has its own toolchain:

**Python SDK** (`strands-py/`):
```bash
cd strands-py
pip install hatch
hatch test        # run unit tests
hatch fmt         # format & lint
```

**TypeScript SDK** (`strands-ts/`):
```bash
npm ci            # install from repo root
npm run build     # build
npm test          # run unit tests
```

**Documentation site** (`site/`):
```bash
cd site
npm install
npm run dev       # local dev server at http://localhost:4321/
```
