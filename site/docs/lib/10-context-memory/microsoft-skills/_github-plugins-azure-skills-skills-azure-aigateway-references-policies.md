---
title: "AI Gateway Policies"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/policies.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/references/policies.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/references/policies.md"
sourceSha256: "176a5bf61186a45e338dcc9ab6e9320a7b4ae3d8bb356f8613506533348b3b69"
pageSha256: "176a5bf61186a45e338dcc9ab6e9320a7b4ae3d8bb356f8613506533348b3b69"
contentMode: "local-full"
zh: ""
---

# AI Gateway Policies

Complete reference for Azure API Management AI governance policies.

---

## Policy Placement Order

Recommended order in `<inbound>` section:

```
1. Authentication (managed identity)
2. Semantic Cache Lookup
3. Token Rate Limiting
4. Content Safety
5. Backend Selection / Load Balancing
6. Token Metrics
```

---

## Model Policies

### Token Rate Limiting

Control costs by limiting token consumption per minute.

```xml
