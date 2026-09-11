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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

import SupportCTA from "/snippets/support-cta.mdx";

This lane focuses on production-minded system concerns, which is one of the
main opportunities for this repository to stand apart from lighter agent
courses and cookbook repos.

## What belongs here

- Context engineering
- Protocol interoperability
- Evaluation
- Observability
- Reliability
- Safety and governance
- Deployment and operations

## Editorial intent

Pages in this lane should move beyond demos. The goal is to explain how agent
systems behave as real software systems with interfaces, traces, boundaries,
and operational tradeoffs.

## Current pages

- [Context Engineering](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/context-engineering/README.md): how systems write, select,
  compress, and isolate context for reliable multi-step work.
- [Agent Security And Prompt Injection](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/agent-security-and-prompt-injection/README.md):
  how teams contain untrusted inputs, dangerous tools, and external side
  effects in production-minded agent systems.
- [Agent UI Protocols And Generative UI](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/agent-ui-protocols-and-generative-ui/README.md):
  how AG-UI and A2UI separate user-facing interaction from tool and agent
  protocols.
- [Protocols And Interoperability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/protocols-and-interoperability/README.md): how
  tool access, agent collaboration, and network discovery fit together.
- [Evaluation And Observability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/evaluation-and-observability/README.md): how to
  measure capability, turn written intent into runnable evals, and explain
  failures in production-minded agent systems.

## Example starters

- [Weather MCP Server Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/examples/weather-mcp-server-starter/README.md):
  a thin protocol-facing tool service sketch for future interop examples.
