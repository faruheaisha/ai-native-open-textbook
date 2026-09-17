---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "fdcca7aeba97627daf2a5c1634b89eb670194b28f060e124896fcb3f233be04c"
contentMode: "local-full"
zh: ""
---

By default, Managed Agents executes tools and code inside [Anthropic-managed cloud sandboxes](https://platform.claude.com/docs/en/managed-agents/cloud-sandboxes-reference). Self-hosted sandboxes keep the orchestration on Anthropic's side but move tool execution into infrastructure you control, so the agent's code, filesystem, and network egress never leave your environment.

Tool execution stays on your host: the filesystem the agent reads and writes, the processes it spawns, and the network it can reach are all under your control. Tool inputs and outputs still flow to Anthropic's control plane (where Claude runs) so the model can see results and determine what to do next. The agent's [skills](https://platform.claude.com/docs/en/managed-agents/skills) and the contents of any [memory stores](https://platform.claude.com/docs/en/managed-agents/memory) attached to the session are stored by Anthropic and copied into your sandbox for the session; changes the agent makes to memory files sync back to the store. See the [security model](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-security) for the full data-flow boundary.

  Self-hosted sandboxes support all Claude models available in Managed Agents, including Claude Opus 4.8 and Claude Opus 5. The model is configured on the [agent](https://platform.claude.com/docs/en/managed-agents/agent-setup), not the environment.

## 本篇目录

- [How it differs from cloud environments](https://platform.claude.com/docs)
- [When to combine with MCP tunnels](https://platform.claude.com/docs)
- [Environment worker](https://platform.claude.com/docs)
- [Before you begin](https://platform.claude.com/docs)
- [Run a worker](https://platform.claude.com/docs)
- [Start a session](https://platform.claude.com/docs)
- [Use memory stores](https://platform.claude.com/docs)
- [Serve custom tools from your sandbox](https://platform.claude.com/docs)
- [Monitoring and operations](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
