---
title: "Bing Grounding Tool"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-bing-grounding.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-bing-grounding.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-bing-grounding.md"
sourceSha256: "999b48eaa0c5ac4803307ae2f230ea82ae932e777d7c1c63cae3a567f2e79e50"
pageSha256: "999b48eaa0c5ac4803307ae2f230ea82ae932e777d7c1c63cae3a567f2e79e50"
contentMode: "local-full"
zh: ""
---

# Bing Grounding Tool

Access real-time web information via Bing Search. Unlike the [Web Search tool](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-web-search) (which works out of the box), Bing Grounding requires a dedicated Bing resource and a project connection.

> ⚠️ **Warning:** Use the [Web Search tool](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-web-search) as the default for web search. Only use Bing Grounding when the user **explicitly** requests Grounding with Bing Search or Grounding with Bing Custom Search.

## When to Use

- User explicitly asks for "Bing Grounding" or "Grounding with Bing Search"
- User explicitly asks for "Bing Custom Search" or "Grounding with Bing Custom Search"
- User needs to restrict web search to specific domains (Bing Custom Search)
- User has an existing Bing Grounding resource they want to use

## Prerequisites

- A [Grounding with Bing Search resource](https://portal.azure.com/#create/Microsoft.BingGroundingSearch) in Azure portal
- `Contributor` or `Owner` role at subscription/RG level to create Bing resource and get keys
- `Foundry Project Manager` role on the project to create a connection
- A project connection configured with the Bing resource key — see [connections](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-connections)

## Setup

1. Register the Bing provider: `az provider register --namespace 'Microsoft.Bing'`
2. Create a Grounding with Bing Search resource in the Azure portal
3. Create a project connection with the Bing resource key — see [connections](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-connections)
4. Set `BING_PROJECT_CONNECTION_NAME` environment variable

## Important Disclosures

- Bing data flows **outside Azure compliance boundary**
- Review [Grounding with Bing terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise)
- Not supported with VPN/Private Endpoints
- Usage incurs costs — see [pricing](https://www.microsoft.com/bing/apis/grounding-pricing)

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| Connection not found | Name mismatch or wrong project | Use `project_connection_list` to find the correct `connectionName` |
| Unauthorized creating connection | Missing Foundry Project Manager role | Assign role on the Foundry project |
| Bing resource creation fails | Provider not registered | Run `az provider register --namespace 'Microsoft.Bing'` |
| No results returned | Connection misconfigured | Verify Bing resource key and connection setup |

## References

- [Bing Grounding tool documentation](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/bing-grounding?view=foundry)
- [Tool Catalog](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/tool-catalog?view=foundry)
- [Grounding with Bing Terms](https://www.microsoft.com/bing/apis/grounding-legal-enterprise)
- [Connections Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-connections)
- [Web Search Tool (default)](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-web-search)
