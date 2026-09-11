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
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/README.md"
zh: ""
---

<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/langchain-ai/deepagents/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/images/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/langchain-ai/deepagents/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/images/logo-light.svg">

<h3 align="center">Examples</h3>

<p align="center"><em>Real agents and patterns built on Deep Agents.</em></p>

## Featured





### Deep Agents Code

A pre-built coding Deep Agent in your terminal — similar to Claude Code or Codex — powered by any LLM. Includes an interactive TUI, web search, remote sandboxes, persistent memory, custom skills, and human-in-the-loop approval.

```bash
curl -LsSf https://langch.in/dcode | bash
```

<sub>[Source](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/README.md) · [Docs](https://docs.langchain.com/oss/python/deepagents/cli/overview)</sub>




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
| [**Deep Research**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deep_research/README.md) | Multi-step web research with Tavily, parallel sub-agents, and strategic reflection |
| [**MCP Docs Agent**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-mcp-docs-agent/README.md) | Docs research agent using MCP tools over LangChain documentation |

### Coding

| Example | Description |
|---|---|
| [**Coding Agent**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-coding-agent/README.md) | Autonomous coding agent in a LangSmith sandbox |
| [**Nemotron Research Agent**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/nvidia_deep_agent/README.md) | NVIDIA Nemotron Super for research + GPU-accelerated execution via RAPIDS |

### Content

| Example | Description |
|---|---|
| [**Content Builder**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/content-builder-agent/README.md) | Blog posts, LinkedIn posts, and tweets with memory (`AGENTS.md`), skills, and subagents |
| [**Text-to-SQL**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/text-to-sql-agent/README.md) | Natural language to SQL with planning and skill-based workflows on the Chinook demo database |
| [**LLM Wiki**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/llm-wiki/README.md) | Script-first LLM wiki synced via `langsmith hub init/pull/push` |

### Deployable services

| Example | Description |
|---|---|
| [**Content Writer**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-content-writer/README.md) | Content writer with per-user memory and Supabase auth |
| [**GTM Strategist**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-gtm-agent/README.md) | GTM strategy agent coordinating sync and async subagents |
| [**Async Subagent Server**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/async-subagent-server/README.md) | Self-hosted Agent Protocol server exposing a researcher as an async subagent |

### Advanced patterns

| Example | Description |
|---|---|
| [**Ralph Loop**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/ralph_mode/README.md) | Autonomous looping with fresh context each iteration, using the filesystem for persistence |
| [**Agents as Folders**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/downloading_agents/README.md) | Download a zip, unzip, and run |
| [**Better Harness**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/better-harness/README.md) | Eval-driven outer-loop optimization of a Deep Agents harness |
| [**Rubric Middleware**](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/rubric_middleware/README.md) | Grader-model rubric feedback loop that revises output until all criteria pass |

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
