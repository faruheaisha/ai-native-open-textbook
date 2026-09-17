---
title: "Azure CLI Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/errors.md"
sourceSha256: "75446f81c1df2eb9dd3522023bc5ff98dd75b97542d13075a13fe9673e05c257"
pageSha256: "75446f81c1df2eb9dd3522023bc5ff98dd75b97542d13075a13fe9673e05c257"
contentMode: "local-full"
zh: ""
---

# Azure CLI Errors

| Error | Resolution |
|-------|------------|
| Not authenticated | `az login` |
| Subscription not found | `az account list` |
| Deployment failed | `az deployment sub show --name <name>` |
| Template error | `az deployment sub validate` |
| Permission denied | Verify RBAC roles |
| Quota exceeded | Request increase or change region |

## Cleanup (DESTRUCTIVE)

```bash
