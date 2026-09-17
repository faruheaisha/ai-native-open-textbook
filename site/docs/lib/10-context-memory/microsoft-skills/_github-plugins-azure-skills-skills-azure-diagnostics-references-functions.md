---
title: "Function Apps Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/references/functions/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/references/functions/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/references/functions/README.md"
sourceSha256: "c251fd5a6201d88f325c8f5da3c39409719e277dc3e2b561c8d204eb5b0481c7"
pageSha256: "c251fd5a6201d88f325c8f5da3c39409719e277dc3e2b561c8d204eb5b0481c7"
contentMode: "local-full"
zh: ""
---

# Function Apps Troubleshooting

## Find Linked App Insights / Log Analytics

### Preferred: Use Azure Resource Graph

A single ARG query returns the App Insights name, instrumentation key, connection string, and Log Analytics workspace for a given function app:

```bash
az graph query -q "
