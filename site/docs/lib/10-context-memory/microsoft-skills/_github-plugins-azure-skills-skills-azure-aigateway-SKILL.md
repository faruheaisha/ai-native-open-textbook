---
title: "Azure AI Gateway"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/SKILL.md"
sourceSha256: "05acd88e75ab23776d2876a1f91f6cfe2fd666c48f4f45176e7ea9d3d873b9be"
pageSha256: "05acd88e75ab23776d2876a1f91f6cfe2fd666c48f4f45176e7ea9d3d873b9be"
contentMode: "local-full"
zh: ""
---

# Azure AI Gateway

Configure Azure API Management (APIM) as an AI Gateway for governing AI models, MCP tools, and agents.

> **To deploy APIM**, use the **azure-prepare** skill. See [APIM deployment guide](https://learn.microsoft.com/azure/api-management/get-started-create-service-instance).

## When to Use This Skill

| Category | Triggers |
|----------|----------|
| **Model Governance** | "semantic caching", "token limits", "load balance AI", "track token usage" |
| **Tool Governance** | "rate limit MCP", "protect my tools", "configure my tool", "convert API to MCP" |
| **Agent Governance** | "content safety", "jailbreak detection", "filter harmful content" |
| **Configuration** | "add Azure OpenAI backend", "configure my model", "add AI Foundry model" |
| **Testing** | "test AI gateway", "call OpenAI through gateway" |

---

## Quick Reference

| Policy | Purpose | Details |
|--------|---------|---------|
| `azure-openai-token-limit` | Cost control | [Model Policies](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-aigateway-references-policies#token-rate-limiting) |
| `azure-openai-semantic-cache-lookup/store` | 60-80% cost savings | [Model Policies](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-aigateway-references-policies#semantic-caching) |
| `azure-openai-emit-token-metric` | Observability | [Model Policies](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-aigateway-references-policies#token-metrics) |
| `llm-content-safety` | Safety & compliance | [Agent Policies](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-aigateway-references-policies#content-safety) |
| `rate-limit-by-key` | MCP/tool protection | [Tool Policies](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-aigateway-references-policies#request-rate-limiting) |

---

## Get Gateway Details

```bash
# Get gateway URL
