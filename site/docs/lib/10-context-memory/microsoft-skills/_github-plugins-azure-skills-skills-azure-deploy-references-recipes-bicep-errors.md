---
title: "Bicep Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/errors.md"
sourceSha256: "74ba4487481a6c065b595a8c21de741a0a98c489a7d9d144a34123995d8777a0"
pageSha256: "74ba4487481a6c065b595a8c21de741a0a98c489a7d9d144a34123995d8777a0"
contentMode: "local-full"
zh: ""
---

# Bicep Errors

| Error | Resolution |
|-------|------------|
| Syntax error | `az bicep build` to check |
| Missing parameter | Add to parameters file |
| Invalid property | Check `mcp_bicep_get_az_resource_type_schema` |
| Resource conflict | Check existing resources |
| Deployment failed | `az deployment sub show --name <name>` |
| Permission denied | Verify RBAC roles |

## Cleanup (DESTRUCTIVE)

```bash
