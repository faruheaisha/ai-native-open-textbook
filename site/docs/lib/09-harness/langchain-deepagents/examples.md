---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/README.md"
sourceRel: "examples/README.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/README.md"
sourceSha256: "043a83a460b7f2cf64402abded5a83253e541309eb66994e7d5d126639614628"
pageSha256: "043a83a460b7f2cf64402abded5a83253e541309eb66994e7d5d126639614628"
contentMode: "local-full"
zh: ""
---

# LangChain DeepAgents

<source media="(prefers-color-scheme: dark)" srcset="/mirror/18/189ebcf3c6787085937eb051e680d286714fed26.svg">
      <source media="(prefers-color-scheme: light)" srcset="/mirror/c9/c9388249bafa67ab09a9d3b6215cd312dd2d8fa3.svg">
      <img alt="Deep Agents Logo" src="/mirror/18/189ebcf3c6787085937eb051e680d286714fed26.svg" width="50%">

<h3 align="center">Examples</h3>

<p align="center"><em>Real agents and patterns built on Deep Agents.</em></p>

## Featured





### Deep Agents Code

A pre-built coding Deep Agent in your terminal — similar to Claude Code or Codex — powered by any LLM. Includes an interactive TUI, web search, remote sandboxes, persistent memory, custom skills, and human-in-the-loop approval.

```bash
curl -LsSf https://langch.in/dcode | bash
```

<sub>[Source](/lib/09-harness/langchain-deepagents/libs-code) · [Docs](https://docs.langchain.com/oss/python/deepagents/cli/overview)</sub>




### Open SWE

An open-source, async coding agent for your org's internal workflows. Runs each task in an isolated cloud sandbox, integrates with Slack, Linear, and GitHub, and ships PRs end-to-end.

```text
@open-swe fix this user-reported bug plz!
```

<sub>[Repository](https://github.com/langchain-ai/open-swe) · [Blog post](https://blog.langchain.com/open-swe-an-open-source-framework-for-internal-coding-agents/)</sub>





## In the wild

Production agents powered by the LangChain stack:

| Project | Description |
|---|---|
| [**LangSmith Fleet**](https://www.langchain.com/langsmith/fleet) | No-code platform for building AI agents from templates; connect your accounts and let the agent handle routine work |
| [**Chat LangChain**](https://chat.langchain.com/) | Documentation assistant that answers questions about LangChain, LangGraph, and LangSmith ([source](https://github.com/langchain-ai/chat-langchain)) |

## All examples

### Research

| Example | Description |
|---|---|
| [**Deep Research**](/lib/09-harness/langchain-deepagents/examples-deep_research) | Multi-step web research with Tavily, parallel sub-agents, and strategic reflection |
| [**MCP Docs Agent**](/lib/09-harness/langchain-deepagents/examples-deploy-mcp-docs-agent) | Docs research agent using MCP tools over LangChain documentation |

### Coding

| Example | Description |
|---|---|
| [**Coding Agent**](/lib/09-harness/langchain-deepagents/examples-deploy-coding-agent) | Autonomous coding agent in a LangSmith sandbox |
| [**Nemotron Research Agent**](/lib/09-harness/langchain-deepagents/examples-nvidia_deep_agent) | NVIDIA Nemotron Super for research + GPU-accelerated execution via RAPIDS |

### Content

| Example | Description |
|---|---|
| [**Content Builder**](/lib/09-harness/langchain-deepagents/examples-content-builder-agent) | Blog posts, LinkedIn posts, and tweets with memory (`AGENTS.md`), skills, and subagents |
| [**Text-to-SQL**](/lib/09-harness/langchain-deepagents/examples-text-to-sql-agent) | Natural language to SQL with planning and skill-based workflows on the Chinook demo database |
| [**LLM Wiki**](/lib/09-harness/langchain-deepagents/examples-llm-wiki) | Script-first LLM wiki synced via `langsmith hub init/pull/push` |

### Deployable services

| Example | Description |
|---|---|
| [**Content Writer**](/lib/09-harness/langchain-deepagents/examples-deploy-content-writer) | Content writer with per-user memory and Supabase auth |
| [**GTM Strategist**](/lib/09-harness/langchain-deepagents/examples-deploy-gtm-agent) | GTM strategy agent coordinating sync and async subagents |
| [**Async Subagent Server**](/lib/09-harness/langchain-deepagents/examples-async-subagent-server) | Self-hosted Agent Protocol server exposing a researcher as an async subagent |

### Advanced patterns

| Example | Description |
|---|---|
| [**Ralph Loop**](/lib/09-harness/langchain-deepagents/examples-ralph_mode) | Autonomous looping with fresh context each iteration, using the filesystem for persistence |
| [**Agents as Folders**](/lib/09-harness/langchain-deepagents/examples-downloading_agents) | Download a zip, unzip, and run |
| [**Better Harness**](/lib/09-harness/langchain-deepagents/examples-better-harness) | Eval-driven outer-loop optimization of a Deep Agents harness |
| [**Rubric Middleware**](/lib/09-harness/langchain-deepagents/examples-rubric_middleware) | Grader-model rubric feedback loop that revises output until all criteria pass |

Each example has its own `README` with setup instructions.

<details>
<summary><h2>Contributing an example</h2></summary>

See the [Contributing Guide](https://docs.langchain.com/oss/python/contributing/overview) for general contribution guidelines.

When adding a new example:

- **Use uv** for dependency management with a `pyproject.toml` and `uv.lock` (commit the lock file)
- **Pin to deepagents version** — use a version range (e.g., `>=0.3.5,<0.4.0`) in dependencies
- **Include a `README`** with clear setup and usage instructions
- **Add tests** for reusable utilities or non-trivial helper logic
- **Keep it focused** — each example should demonstrate one use-case or workflow
- **Follow the structure** of existing examples (see `deep_research/` or `text-to-sql-agent/` as references)

</details>

## Resources

- [LangChain Academy](https://academy.langchain.com/) — Comprehensive, free courses on LangChain libraries and products, made by the LangChain team.
- [Code of Conduct](https://github.com/langchain-ai/langchain/?tab=coc-ov-file) — community guidelines and standards
