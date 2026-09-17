---
title: "AZCLI Validation Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/errors.md"
sourceSha256: "61a2ee32b6854551dcad06fd8a108d63c6f4c00ae30ef7bf4d36c6aceddfed8c"
pageSha256: "61a2ee32b6854551dcad06fd8a108d63c6f4c00ae30ef7bf4d36c6aceddfed8c"
contentMode: "local-full"
zh: ""
---

# AZCLI Validation Errors

| Error | Fix |
|-------|-----|
| `AADSTS700082: Token expired` | `az login` |
| `Please run 'az login'` | `az login` |
| `AADSTS50076: MFA required` | `az login --use-device-code` |
| `AuthorizationFailed` | Request Contributor role |
| `npm ci` fails with `missing: package-lock.json` | Run `npm install --package-lock-only` in the service directory before building |
| `Template validation failed` | Check Bicep syntax |

## Debug

```bash
az &lt;command> --verbose --debug
```
