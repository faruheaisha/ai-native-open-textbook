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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "282a6171f4508dba67595ef288c0181f598e62dfed76e6e76995b6d0542f089d"
contentMode: "local-full"
zh: ""
---

## Advisor on Claude Managed Agents

[Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) sessions support an advisor as well, configured as part of the agent rather than as a tool definition: add a `\{"type": "advisor", "model": ...\}` entry to the agent's multiagent roster, and the session's primary thread can consult that model mid-turn. The roster entry takes no `max_uses`, `max_tokens`, or `caching` options, and advice is delivered as thread events on the session's event stream rather than as `advisor_tool_result` blocks in the response. See [Give the session an advisor](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#give-the-session-an-advisor).
