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
pageSha256: "4a5b4cd8d75685c4f33234d67648c543c9b4d6fbf05f394bb03a395f5ef5f148"
contentMode: "local-full"
zh: ""
---

The advisor tool lets a faster, lower-cost **executor model** consult a higher-intelligence **advisor model** mid-generation for strategic guidance. The advisor reads the full conversation, produces a plan or course correction, and the executor continues with the task.

This pattern fits long-horizon agentic workloads (coding agents, computer use, multistep research pipelines) where most turns are mechanical but having an excellent plan is crucial. You get close to advisor-solo quality while the bulk of token generation happens at executor-model rates. For measured results, including how the benefit shrinks as the executor's own capability approaches the advisor's, see [Optimizing for cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence).

```mermaid
sequenceDiagram
  participant U as Your application
  participant E as Executor model
  participant A as Advisor model

  U->>E: Request with advisor tool
  note over E: Executor begins the task
  E->>A: server_tool_use (server-side)
  note over A: Reads the full transcript,<br/>returns strategic guidance
  A-->>E: advisor_tool_result
  note over E: Executor continues,<br/>informed by the advice
  E-->>U: Response
```

  To learn how zero data retention (ZDR) applies to this feature, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).

## 本篇目录

- [When to use it](https://platform.claude.com/docs)
- [Quick start](https://platform.claude.com/docs)
- [How it works](https://platform.claude.com/docs)
- [Tool parameters](https://platform.claude.com/docs)
- [Response structure](https://platform.claude.com/docs)
- [Multi-turn conversations](https://platform.claude.com/docs)
- [Streaming](https://platform.claude.com/docs)
- [Usage and billing](https://platform.claude.com/docs)
- [Advisor prompt caching](https://platform.claude.com/docs)
- [Combining with other tools](https://platform.claude.com/docs)
- [Best practices](https://platform.claude.com/docs)
- [Model compatibility](https://platform.claude.com/docs)
- [Advisor on Claude Managed Agents](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
