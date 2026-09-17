---
title: "Web Search Tool (Preview)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-web-search.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-web-search.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-web-search.md"
sourceSha256: "84dc761e7e0454c7a1b8732fb43ed7637d6f41bfbfcc14067ac98d8fa2a71acf"
pageSha256: "84dc761e7e0454c7a1b8732fb43ed7637d6f41bfbfcc14067ac98d8fa2a71acf"
contentMode: "local-full"
zh: ""
---

# Web Search Tool (Preview)

Enables agents to retrieve and ground responses with real-time public web information before generating output. Returns up-to-date answers with inline URL citations. This is the **default tool for web search** — no external resource or connection setup required.

> ⚠️ **Warning:** For Bing Grounding or Bing Custom Search (which require a separate Bing resource and project connection), see [tool-bing-grounding.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-bing-grounding). Only use those when explicitly requested.

## Important Disclosures

- Web Search (preview) uses Grounding with Bing Search and Grounding with Bing Custom Search, which are [First Party Consumption Services](https://www.microsoft.com/licensing/terms/product/Glossary/EAEAS) governed by [Grounding with Bing terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and the [Microsoft Privacy Statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409).
- The [Data Protection Addendum](https://aka.ms/dpa) **does not apply** to data sent to Grounding with Bing Search and Grounding with Bing Custom Search.
- Data transfers occur **outside compliance and geographic boundaries**.
- Usage incurs costs — see [pricing](https://www.microsoft.com/bing/apis/grounding-pricing).

## Prerequisites

- A [basic or standard agent environment](https://learn.microsoft.com/azure/ai-foundry/agents/environment-setup)
- Azure credentials configured (e.g., `DefaultAzureCredential`)

## Setup

No external resource or project connection is required. The web search tool works out of the box when added to an agent definition.

## Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `user_location` | Approximate location (country/region/city) for localized results | None |
| `search_context_size` | Context window space for search: `low`, `medium`, `high` | `medium` |

## Administrator Control

Admins can enable or disable web search at the subscription level via Azure CLI. Requires Owner or Contributor access.
