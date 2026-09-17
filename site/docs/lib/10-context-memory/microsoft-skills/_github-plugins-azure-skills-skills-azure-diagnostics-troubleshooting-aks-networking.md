---
title: "Networking Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/networking.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/networking.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/networking.md"
sourceSha256: "75ec5358fc5baff4a8c3f5891e3c6bf8fbb6930972abe00cbc09096aa96db66a"
pageSha256: "75ec5358fc5baff4a8c3f5891e3c6bf8fbb6930972abe00cbc09096aa96db66a"
contentMode: "local-full"
zh: ""
---

# Networking Troubleshooting

For CNI-specific issues, check CNI pod health and review [AKS networking concepts](https://learn.microsoft.com/azure/aks/concepts-network).

## Service Unreachable / Connection Refused

**Diagnostics - always start here:**

```bash
# 1. Verify service exists and has endpoints (read-only)
