---
title: "Threat Model: deepagents-code"
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
pageSha256: "da2284c58a316b1ef7e9a24fe2ec08ba08b6bf5275b1c7fdf7b20092d990e71a"
contentMode: "local-full"
zh: ""
---

# Threat Model: deepagents-code

> **Note:** `deepagents-code` was forked from `deepagents-cli` at v0.1.0. References to "the CLI" throughout this document describe the `deepagents-code` runtime.

> Generated: 2026-08-19 | Scope: libs/code only

> **Disclaimer:** This threat model is automatically generated to help developers and security researchers understand where trust is placed in this system and where boundaries exist. It is experimental, subject to change, and not an authoritative security reference — findings should be validated before acting on them. The analysis may be incomplete or contain inaccuracies. We welcome suggestions and corrections to improve this document.

## 本篇目录

- [Scope](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/01-Scope.md)
- [System Overview](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/02-System_Overview.md)
- [Components](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/03-Components.md)
- [Data Classification](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/04-Data_Classification.md)
- [Trust Boundaries](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/05-Trust_Boundaries.md)
- [Data Flows](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/06-Data_Flows.md)
- [Threats](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/07-Threats.md)
- [Input Source Coverage](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/08-Input_Source_Coverage.md)
- [Out-of-Scope Threats](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/09-Out-of-Scope_Threats.md)
- [Open Questions](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/10-Open_Questions.md)
- [Investigated and Dismissed](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/11-Investigated_and_Dismissed.md)
- [Revision History](https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/12-Revision_History.md)
