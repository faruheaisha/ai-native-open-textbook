---
title: "AKS Automatic Migration Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/migration-guide-summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/migration-guide-summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/migration-guide-summary.md"
sourceSha256: "81e555345e5b75c7bb9107e97f8a26206a02510378f05e0c1012d4df828244ce"
pageSha256: "81e555345e5b75c7bb9107e97f8a26206a02510378f05e0c1012d4df828244ce"
contentMode: "local-full"
zh: ""
---

# AKS Automatic Migration Guide

Loaded when user asks about migration steps or after assessment is complete.

---

## Migration Checklist

### Phase 1 — Assessment (this skill)

- [ ] Run the AKS Automatic compatibility assessment (via `mcp_azure_mcp_aks(\{ action: "discover" \})` then the assessment action returned, or the offline manifest scan)
- [ ] Resolve all `incompatible` findings — these are hard blockers
- [ ] Apply all `requiresChanges` fixes — these will be denied at admission
- [ ] Review `autoFixed` items — understand what AKS Automatic will mutate at runtime
- [ ] Address cluster-level Day-0 config issues (see below)

### Phase 2 — Create AKS Automatic Cluster (use `azure-kubernetes` skill)

```bash
az aks create \
