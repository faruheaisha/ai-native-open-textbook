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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/radar/2026-05-openai-multicloud-managed-agents.mdx"
sourceRel: "radar/2026-05-openai-multicloud-managed-agents.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/radar/2026-05-openai-multicloud-managed-agents.mdx"
sourceSha256: "fbb71b143fc3f9f17c9c8dc1d141592af6c9fd65f28c16e8a42fb36dc88cc1c1"
pageSha256: "fbb71b143fc3f9f17c9c8dc1d141592af6c9fd65f28c16e8a42fb36dc88cc1c1"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

OpenAI is shifting from single-cloud exclusivity toward a multi-cloud
distribution posture. Combined with the AWS Bedrock Managed Agents launch, this
signals that frontier model vendors are moving toward managed agent surfaces
that sit inside a customer's incumbent cloud, changing how enterprises deploy
and govern agent systems.

## Why It Matters

For most of the LLM era, frontier models were available through a single cloud
surface (primarily Azure for OpenAI). That created a deployment decision: adopt
a new cloud vendor or build on a single-provider API.

The multi-cloud shift changes the calculation:

- Enterprises can run managed agents inside their existing AWS, Azure, or GCP
  environments without adding a new vendor to their procurement and compliance
  pipeline.
- Managed-agent surfaces (like Bedrock Managed Agents) move the agent runtime
  closer to enterprise data, identity, and governance controls.
- The distribution question becomes "which managed surface fits my cloud
  strategy" rather than "which model provider do I bet on."

This matters for agent builders because the deployment surface affects
security boundaries, data residency, observability, and cost allocation.

## Evidence And Sources

- **Stratechery interview with Sam Altman and Matt Garman**: Detailed
  discussion of the OpenAI-AWS partnership for Bedrock Managed Agents. The
  key signal is that managed-agent distribution is now a joint product
  strategy, not just an API listing.
  ([Stratechery: An Interview with OpenAI CEO Sam Altman and AWS CEO Matt Garman About Bedrock Managed Agents](https://stratechery.com/2026/an-interview-with-openai-ceo-sam-altman-and-aws-ceo-matt-garman-about-bedrock-managed-agents/))

- **OpenAI-Microsoft partnership update**: OpenAI's official post on the next
  phase of the Microsoft partnership confirms that non-exclusive cloud
  distribution is now an explicit strategy, not a temporary arrangement.
  ([OpenAI: The next phase of the Microsoft OpenAI partnership](https://openai.com/index/next-phase-of-microsoft-partnership/))

## Signals To Watch

- Whether managed-agent surfaces converge on a standard security boundary model
  (agent runs in customer VPC, model inference stays in vendor cloud, data
  never leaves customer control) or whether each vendor defines its own.
- Whether local-agent runtimes (running on user devices or on-prem) remain a
  separate deployment category or get absorbed into managed-agent surfaces
  through hybrid execution models.
- Whether cloud lock-in shifts from model choice to agent-runtime choice -- if
  the managed surface is where the agent logic, tools, and memory live, moving
  between providers becomes harder even if the model itself is interchangeable.
- Whether observability and evaluation tooling (Langfuse, LangSmith) adapt to
  managed-agent surfaces where the runtime is vendor-controlled and traces may
  not be fully accessible.
- Whether small and mid-size teams benefit from managed-agent surfaces
  (reduced infra burden) or lose visibility into agent behavior compared to
  self-hosted deployments.

## Update Log

- 2026-05-18: Initial draft on OpenAI multi-cloud shift and managed-agent
  distribution signals.
