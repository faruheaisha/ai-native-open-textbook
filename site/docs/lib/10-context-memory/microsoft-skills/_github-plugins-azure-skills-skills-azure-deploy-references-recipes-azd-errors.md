---
title: "AZD Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/errors.md"
sourceSha256: "fcf1cfa04cac0dcc7500de9279415e73ec027d0ae5b1d0357adc150648ad2a90"
pageSha256: "fcf1cfa04cac0dcc7500de9279415e73ec027d0ae5b1d0357adc150648ad2a90"
contentMode: "local-full"
zh: ""
---

# AZD Errors

## Deployment Runtime Errors

These errors occur **during** `azd up` execution:

| Error | Cause | Resolution |
|-------|-------|------------|
| `unknown flag: --location` | `azd up` doesn't accept `--location` | Use `azd env set AZURE_LOCATION <region>` before `azd up` |
| Provision failed | Bicep template errors | Check detailed error in output |
| Deploy failed | Build or Docker errors | Check build logs |
| Package failed | Missing Dockerfile or deps | Verify Dockerfile exists and dependencies |
| Quota exceeded | Subscription limits | Request increase or change region |
| `PrincipalId '...' has type 'ServicePrincipal', which is different from specified PrincipalType 'User'` | Base template RBAC assigns roles with `principalType: 'User'` but deploying identity is a service principal (CI/CD) | Set `allowUserIdentityPrincipal: false` in the `storageEndpointConfig` variable in `infra/main.bicep`. Do NOT try clearing `AZURE_PRINCIPAL_ID` — azd repopulates it. See [Principal Type Mismatch](#principal-type-mismatch). |
| `ImagePullBackOff` or `azd up` hangs during provision for Container Apps | Container App references an image that doesn't exist in ACR yet | See [Container Apps Bootstrap Problem](#container-apps-bootstrap-problem) |
| `unauthorized: authentication required` on `docker push` to ACR | ACR auth token expired or scoped incorrectly | See [ACR Authentication Failures](#acr-authentication-failures) |
| `could not determine container registry endpoint` | Missing `AZURE_CONTAINER_REGISTRY_ENDPOINT` | See [Missing Container Registry Variables](#missing-container-registry-variables) |
| `map has no entry for key "AZURE_CONTAINER_REGISTRY_MANAGED_IDENTITY_ID"` | Missing managed identity env vars | See [Missing Container Registry Variables](#missing-container-registry-variables) |
| `map has no entry for key "MANAGED_IDENTITY_CLIENT_ID"` | Missing managed identity client ID | See [Missing Container Registry Variables](#missing-container-registry-variables) |
| `Operation expired` / revision creation timeout (900s) | RBAC propagation delay — Container App's managed identity doesn't have `AcrPull` on ACR yet | See [Container App Revision Timeout](#container-app-revision-timeout) |
