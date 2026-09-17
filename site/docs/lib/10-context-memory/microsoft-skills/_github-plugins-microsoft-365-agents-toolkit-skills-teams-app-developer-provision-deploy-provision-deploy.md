---
title: "Provision and Deploy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/provision-deploy/provision-deploy.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/provision-deploy/provision-deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/provision-deploy/provision-deploy.md"
sourceSha256: "3b4dff54fba3e3eab9c862a5a79575cfd202c4e92c606664598574c738125c98"
pageSha256: "3b4dff54fba3e3eab9c862a5a79575cfd202c4e92c606664598574c738125c98"
contentMode: "local-full"
zh: ""
---

# Provision and Deploy

Provision Azure and M365 resources, then deploy your agent to the cloud.

## Local Provisioning (for Teams testing)

```bash
atk provision --env local -i false
atk deploy --env local -i false
```

This runs actions in `m365agents.local.yml` — registers Teams app, creates bot AAD app, and writes runtime config to `.localConfigs`.

### Post-Provisioning Verification (Required)

ATK's `aadApp/create` may not write `TENANT_ID` to `.localConfigs`. After provisioning, always verify:

```bash
# 1. Check TENANT_ID is in .localConfigs
grep TENANT_ID .localConfigs

# 2. If missing, copy it from the env file (aadApp/create writes it there)
grep TENANT_ID env/.env.local
