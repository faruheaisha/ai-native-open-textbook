---
title: "Bicep Validation Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/bicep/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/bicep/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/bicep/errors.md"
sourceSha256: "1ea678fc06e712af10d14635e62b95a77eeb14bf801dd26ab7a12757e3b25e72"
pageSha256: "1ea678fc06e712af10d14635e62b95a77eeb14bf801dd26ab7a12757e3b25e72"
contentMode: "local-full"
zh: ""
---

# Bicep Validation Errors

| Error | Fix |
|-------|-----|
| `BCP035: Invalid type` | Check API version |
| `BCP037: Not a member` | Check resource schema |
| `BCP018: Expected character` | Fix syntax |
| `Module not found` | Check relative paths |
| `Template validation failed` | Review error details |

## Debug

```bash
az bicep build --file ./infra/main.bicep 2>&1
```
