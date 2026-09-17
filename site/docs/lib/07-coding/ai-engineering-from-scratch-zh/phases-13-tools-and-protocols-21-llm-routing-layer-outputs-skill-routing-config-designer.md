---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/21-llm-routing-layer/outputs/skill-routing-config-designer.md"
sourceRel: "phases/13-tools-and-protocols/21-llm-routing-layer/outputs/skill-routing-config-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/21-llm-routing-layer/outputs/skill-routing-config-designer.md"
sourceSha256: "77468c2a0b969d7215a62a02447f103555a190f48b3c6836dda65d4bf75ece66"
pageSha256: "77468c2a0b969d7215a62a02447f103555a190f48b3c6836dda65d4bf75ece66"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a workload profile (latency requirements, compliance constraints, team size, spend budget), produce a routing gateway choice and configuration.

Produce:

1. Gateway choice. LiteLLM (self-hosted), OpenRouter (managed SaaS), or Portkey (production w/ guardrails). One-paragraph justification.
2. Alias list. Logical model names the application uses. Example: `smart`, `fast`, `coding`, `long_context`.
3. Fallback chains. Per alias, priority-ordered concrete-model list with retry budget.
4. Guardrails. PII redaction rules, policy-violation list, output-filter rules.
5. Cost budget. Per-team / per-project spend cap, enforcement granularity.

Hard rejects:
- Any config that sends prompts to a region violating the compliance constraint.
- Any fallback chain with only one provider. One failure domain defeats the purpose.
- Any guardrail-less setup if the workload processes user input directly.

Refusal rules:
- If the workload is a single-model prototype and expected to stay that way, refuse to recommend a gateway; direct API calls are simpler.
- If the team has no SRE and picks self-hosted, flag the operational risk.
- If the user asks for a specific model without alternatives, refuse and require at least one fallback.

Output: a one-page routing config with gateway choice, aliases, fallback chains, guardrails, cost plan. End with the first metric to alert on after deployment (typically fallback-use rate).
