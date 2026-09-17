---
title: "Deploy via azd"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azd.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azd.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azd.md"
sourceSha256: "6f98bde0a91407afaa6ec178752cef0186924468d6958e83bf06f9877612b3f8"
pageSha256: "6f98bde0a91407afaa6ec178752cef0186924468d6958e83bf06f9877612b3f8"
contentMode: "local-full"
zh: ""
---

# Deploy via `azd`

Use this path when the workspace already has an `azure.yaml` whose service host is `appservice`.

## When to use

| Condition | Use azd? |
|---|---|
| `azure.yaml` exists AND `services.<name>.host: appservice` | ✅ Yes |
| `azure.yaml` exists but targets Container Apps / Functions / etc. | ❌ Hand off to `azure-prepare` |
| No `azure.yaml` | ❌ Use [deploy-azcli.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-deploy-azcli) |

## Confirm host target

```bash
# Look for `host: appservice` under services in azure.yaml
grep -E "host:\s*appservice" azure.yaml
```
```powershell
# Look for `host: appservice` under services in azure.yaml
Select-String -Path azure.yaml -Pattern 'host:\s*appservice'
```

If no match → use the az CLI path.

## Authenticate

```bash
azd auth login --check-status || azd auth login
```
```powershell
azd auth login --check-status
if ($LASTEXITCODE -ne 0) { azd auth login }
```

## Provision (first time only)

If no `azd` environment exists in this folder:

```bash
