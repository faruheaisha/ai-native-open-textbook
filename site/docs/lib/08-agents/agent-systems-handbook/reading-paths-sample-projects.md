---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/reading-paths/sample-projects.mdx"
sourceRel: "reading-paths/sample-projects.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/reading-paths/sample-projects.mdx"
sourceSha256: "4df3c08168cd63e2b33f8eeee5835ef2ea251df17ecec6da2c15ba30877f0d58"
pageSha256: "4df3c08168cd63e2b33f8eeee5835ef2ea251df17ecec6da2c15ba30877f0d58"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

Part of [GW01 · Setup and Examples](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/reading-paths/environment-setup/README.md), a general workshop-type specialization.

Starter projects are small, repo-owned code examples attached to the handbook
lanes. They exist to give readers something inspectable after a concept page:
clear files, narrow boundaries, and an obvious next step without claiming to be
production apps.

Use this page as the entrypoint before opening an individual project guide or
GitHub folder.

## Current starter projects

| Lane | Project guide | Source code | Status | Focus |
| --- | --- | --- | --- | --- |
| Patterns | [Agent Memory Retrieval Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/examples/agent-memory-retrieval-starter/README.md) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/patterns/examples/agent-memory-retrieval-starter) | `starter` | active notes, working memory, retrieval inputs, and durable artifacts |
| Patterns | [Prompt Cache Agent Starter](/lib/08-agents/agent-systems-handbook/patterns-examples-prompt-cache-agent-starter-2) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/patterns/examples/prompt-cache-agent-starter) | `starter` | stable prompt prefixes, dynamic memory boundaries, cache reads, cache writes, and tiny cost/latency comparisons |
| Systems | [Weather MCP Server Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/examples/weather-mcp-server-starter/README.md) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/systems/examples/weather-mcp-server-starter) | `starter` | request validation and protocol-facing tool boundaries |
| Ecosystem | [LangGraph Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/ecosystem/examples/langgraph-starter/README.md) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/ecosystem/examples/langgraph-starter) | `starter` | a minimal graph-shaped plan, route, synthesize flow |
| Case Studies | [Deep Research Agent Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/case-studies/examples/deep-research-agent-starter/README.md) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/case-studies/examples/deep-research-agent-starter) | `starter` | planning, evidence collection, and citation-aware synthesis |
| Case Studies | [Customer Support Email Agent Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/case-studies/examples/customer-support-email-agent-starter/README.md) | [GitHub folder](https://github.com/Prompthon-IO/agent-systems-handbook/tree/main/case-studies/examples/customer-support-email-agent-starter) | `starter` | email triage, local policy grounding, and safe reply drafting |

## How to use these starters

- Start with the related lab page linked from each project index.
- Use [Environment Setup](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/reading-paths/environment-setup/README.md) before running starter-code
  checks locally.
- Run `python3 scripts/verify_example_projects.py` from the repository root to
  smoke-test the current example code.

## Why they are here

These projects are public starter examples, not hidden internal drafts or
upstream ports. They clarify system shape, code boundaries, and extension
points in this repo's own terms.

They are also intentionally incomplete:

- no sample project in the current repo claims to be a finished production app
- some examples validate core Python behavior without yet wiring a real
  framework, protocol transport, search adapter, or persistence layer
- each project index should say clearly whether the project is `starter`,
  `partial`, or `runnable`

## Where future starters belong

Future starter projects should stay lane-local:

- `patterns/examples/`
- `systems/examples/`
- `ecosystem/examples/`
- `case-studies/examples/`
