---
title: "Attach a Guardrail"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-attach.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-attach.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-attach.md"
sourceSha256: "dfc99c7eaaaaf4fad9f43a947bd8448f4dc9e449d1677cf54a4ca7cbb29d7082"
pageSha256: "dfc99c7eaaaaf4fad9f43a947bd8448f4dc9e449d1677cf54a4ca7cbb29d7082"
contentMode: "local-full"
zh: ""
---

# Attach a Guardrail

After creating a guardrail (via [portal](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-manage) or [REST API](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-api-create)), attach it to one of three targets:

- [Hosted Agent](#hosted-agent) — `agent.yaml` `policies` block
- [Model Deployment](#model-deployment) — REST API or request-time header
- [Toolbox](#toolbox) — `policies.rai_config.rai_policy_name` in toolbox definition

---

## Hosted Agent

A guardrail assigned to an agent **fully overrides** the underlying model deployment's guardrail. If no guardrail is assigned, the agent inherits the model deployment's guardrail.

Add a `policies` block to `agent.yaml` with the guardrail's full ARM resource ID:

```yaml
policies:
  - type: rai_policy
