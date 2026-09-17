---
title: "Container Apps Revision Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/revisions.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/revisions.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/revisions.md"
sourceSha256: "3eeb85de1d201e0cc7d127d20d4dbdc3cbed105715ad276d63f5fe4342c92f5f"
pageSha256: "3eeb85de1d201e0cc7d127d20d4dbdc3cbed105715ad276d63f5fe4342c92f5f"
contentMode: "local-full"
zh: ""
---

# Container Apps Revision Management

Revisions are immutable snapshots of a Container App version. Use them for blue/green deployments, canary releases, and instant rollback.

## Revision Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Single` | New revision replaces old immediately | Simple apps, dev/test |
| `Multiple` | Multiple revisions run simultaneously with traffic splitting | Production blue/green, canary |

## Setting Revision Mode (Bicep)

```bicep
resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: appName
  location: location
  properties: {
    configuration: {
      activeRevisionsMode: 'Multiple'
      ingress: {
        external: true
        targetPort: 8080
        traffic: [
          { latestRevision: true, weight: 100 }
        ]
      }
    }
  }
}
```

> 💡 **Tip:** In Bicep/ARM deployments, you typically can't predictably target a specific new revision name. Use `latestRevision: true` in Bicep for initial deployment, then configure traffic splitting or labels via CLI after the new revision is created.

> ⚠️ **Warning:** For blue/green workflows, you must first pin traffic to a named revision before deploying a new one. With `latestRevision: true, weight: 100`, new revisions automatically receive all traffic — there is no validation window.

## Traffic Splitting Patterns

### Blue/Green Deployment

Pin traffic to the current revision, deploy a new one, validate, then switch:

```bash
# Deploy new revision and capture its name from the update output
NEW_REV=$(az containerapp update -n $APP -g $RG --image $NEW_IMAGE \
  --query properties.latestRevisionName -o tsv)

# Test the new revision directly via its revision-specific URL
az containerapp revision list -n $APP -g $RG -o table

# Switch 100% traffic to the new revision
az containerapp ingress traffic set -n $APP -g $RG \
  --revision-weight "$NEW_REV=100"
```

### Canary Release

Gradually shift traffic to validate the new revision under load:

| Phase | Current | Canary | Duration |
|-------|---------|--------|----------|
| 1 | 90% | 10% | 15 min |
| 2 | 50% | 50% | 30 min |
| 3 | 0% | 100% | — |

```bash
# List revisions to identify current stable and new canary
az containerapp revision list -n $APP -g $RG -o table
