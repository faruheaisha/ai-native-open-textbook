---
title: "Static Web Apps - Deployment"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/deployment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/deployment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/deployment.md"
sourceSha256: "eddf74d8b7d6811836b75db605176233484c90db4fb8da2b99f4670000ed6aad"
pageSha256: "eddf74d8b7d6811836b75db605176233484c90db4fb8da2b99f4670000ed6aad"
contentMode: "local-full"
zh: ""
---

# Static Web Apps - Deployment

## azd Deploy (Default)

Standard deployment via Azure Developer CLI:

```bash
azd deploy
```

## GitHub-Linked Deployments

For CI/CD builds on Azure (instead of azd deploy):

```bicep
properties: \{
  repositoryUrl: 'https://github.com/owner/repo'
  branch: 'main'
  buildProperties: \{
    appLocation: 'src'
    apiLocation: 'api'
    outputLocation: 'dist'
  \}
\}
```

## Deployment Token

> ⚠️ **Security Warning:** Do NOT expose deployment tokens in ARM/Bicep outputs. Deployment outputs are visible in Azure portal deployment history and logs.

**Recommended approach** - retrieve token via Azure CLI and store directly in secret store:

```bash
# Capture token to variable (never echo or log)
