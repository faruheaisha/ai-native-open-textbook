---
title: "Post-Deployment Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/post-deployment-validation.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/post-deployment-validation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/post-deployment-validation.md"
sourceSha256: "8e15a5a71b99668edb99505a2255892a37405559a0acd695329c7a143a5ccd9d"
pageSha256: "8e15a5a71b99668edb99505a2255892a37405559a0acd695329c7a143a5ccd9d"
contentMode: "local-full"
zh: ""
---

# Post-Deployment Validation

Run after deployment succeeds. Steps 1-3 can run from anywhere (management plane). Steps 4-5 require VNet access.

## 1. Infrastructure Verification

### 1.1 Resource State

Verify all resources are in `Succeeded` state:

```bash
az deployment operation group list \
