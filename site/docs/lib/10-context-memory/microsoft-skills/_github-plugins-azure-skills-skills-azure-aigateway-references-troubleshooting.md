---
title: "AI Gateway Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/troubleshooting.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/references/troubleshooting.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/references/troubleshooting.md"
sourceSha256: "ebe564f5b4a5628887d49aa11699ccc967eba0c96e336c989c8ce28028e842e8"
pageSha256: "ebe564f5b4a5628887d49aa11699ccc967eba0c96e336c989c8ce28028e842e8"
contentMode: "local-full"
zh: ""
---

# AI Gateway Troubleshooting

Common issues when using Azure API Management as an AI Gateway.

---

## Authentication Issues

### 401 Unauthorized from Backend

**Symptom**: APIM returns `401` when calling Azure OpenAI.

**Causes & Solutions**:

| Cause | Fix |
|-------|-----|
| Managed identity not enabled on APIM | `az apim update --name <apim> --resource-group <rg> --set identity.type=SystemAssigned` |
