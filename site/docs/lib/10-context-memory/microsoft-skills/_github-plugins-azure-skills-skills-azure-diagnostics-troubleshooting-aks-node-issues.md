---
title: "Node & Cluster Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/node-issues.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/node-issues.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/node-issues.md"
sourceSha256: "1913b8383ecf748ea2fae53b1e3dfb176205c0f1a4183070f5a35ecce01a41d6"
pageSha256: "1913b8383ecf748ea2fae53b1e3dfb176205c0f1a4183070f5a35ecce01a41d6"
contentMode: "local-full"
zh: ""
---

# Node & Cluster Troubleshooting

## Node NotReady

**Diagnostics:**

```bash
kubectl get nodes -o wide
