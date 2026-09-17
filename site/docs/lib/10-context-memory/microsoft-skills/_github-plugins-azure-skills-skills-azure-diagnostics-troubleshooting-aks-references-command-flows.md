---
title: "AKS Command Flows"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/command-flows.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/command-flows.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/command-flows.md"
sourceSha256: "b4fc209525a46021cae205d8fb8e3f7701365bd01d16298b1f2472574803a510"
pageSha256: "b4fc209525a46021cae205d8fb8e3f7701365bd01d16298b1f2472574803a510"
contentMode: "local-full"
zh: ""
---

# AKS Command Flows

## Cluster Baseline Flow

```text
Resolve subscription -> resolve resource group -> resolve cluster -> inspect cluster state -> inspect node pools -> inspect resource health -> inspect recent operations
```

CLI fallback when AKS-MCP cannot perform the cluster baseline read — run the **[`aks-baseline`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/aks-baseline.sh)** script, which gathers cluster state, node pools, and recent operations as one read-only digest:

```bash
# bash
