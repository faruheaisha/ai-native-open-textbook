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
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/THREAT_MODEL.md"
sourceRel: "libs/code/THREAT_MODEL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/THREAT_MODEL.md"
sourceSha256: "3c2cc0e59404e891c3f675fd7a4f39e610cbad666bd5ec5ae6b0f1b09774c3dc"
pageSha256: "f950cf1103f6a8f3b7ee8a42e03012a087947cfe42e3941963bfd07b3d548ebb"
contentMode: "local-full"
zh: ""
---

## Open Questions

1. Should the raw-character limits for goal objectives, rubric criteria, status notes, and complete notices instead account for HTML-escaped/rendered size or provider tokenization and available context? This is required to resolve the residual risk in T17.
2. Should `/rubric file` display a provider-disclosure warning or require confirmation before its full contents are persisted and sent to the configured model provider? This determines the intended handling for T16.
3. Is automatic injection permitted only for content the user intentionally designates as agent-control input, or may it include arbitrary repository-file content? This trust contract determines whether T15 is an accepted product risk or needs a different retrieval design.
4. What retention, deletion, geographic-processing, and logging commitments does each configured model provider make for goal/rubric notices? The model provider and its credentials are user-configured; those facts are not established by the scoped code.
