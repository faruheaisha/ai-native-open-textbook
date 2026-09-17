---
title: "Azure Developer CLI — Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azd-deployment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/sdk/azd-deployment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azd-deployment.md"
sourceSha256: "711da761d65236b357fbf24dbcd070abc50d2a5491ff4f88d5cc1689c80b2584"
pageSha256: "711da761d65236b357fbf24dbcd070abc50d2a5491ff4f88d5cc1689c80b2584"
contentMode: "local-full"
zh: ""
---

# Azure Developer CLI — Quick Reference

> Condensed from **azd-deployment**. Full patterns (Bicep modules,
> hooks, RBAC post-provision, service discovery, idempotent deploys)
> in the **azd-deployment** plugin skill if installed.

## Install
curl -fsSL https://aka.ms/install-azd.sh | bash

## Quick Start
```bash
azd auth login
azd init
azd up    # provision + build + deploy
```

## Best Practices
- Always use remoteBuild: true — local builds fail on ARM Macs deploying to AMD64
- Bicep outputs auto-populate .azure/&lt;env>/.env — don't manually edit
- Use azd env set for secrets — not main.parameters.json defaults
- Service tags (azd-service-name) are required for azd to find Container Apps
- Use `|| true` in hooks — prevent RBAC "already exists" errors from failing deploy
